import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright-core'
import axe from 'axe-core'

const root = resolve(import.meta.dirname, '..')
const screenshotDir = resolve(root, 'qa', 'screenshots')
mkdirSync(resolve(screenshotDir, '1920x1080'), { recursive: true })
mkdirSync(resolve(screenshotDir, '1440x810'), { recursive: true })

const timing = JSON.parse(readFileSync(resolve(root, 'src/content/timing.json'), 'utf8'))
const sceneIds = timing.scenes.map((scene) => scene.id)
const total = sceneIds.length

const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean)
const executablePath = chromeCandidates.find((candidate) => existsSync(candidate))
if (!executablePath) throw new Error('No se encontró Chrome/Edge para QA visual')

const port = 4399
const baseUrl = `http://127.0.0.1:${port}`
const viteBin = resolve(root, 'node_modules', 'vite', 'bin', 'vite.js')
const server = spawn(process.execPath, [viteBin, 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
  cwd: root,
  stdio: 'pipe',
})

const waitForServer = async () => {
  for (let i = 0; i < 50; i += 1) {
    try {
      const response = await fetch(baseUrl)
      if (response.ok) return
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 200))
  }
  throw new Error('El servidor de preview no respondió')
}

const report = {
  generated: new Date().toISOString(),
  viewports: ['1920x1080', '1440x810'],
  slides: [],
  consoleErrors: [],
  accessibility: [],
  navigation: {},
  interactions: {},
}

const measureScene = async (page) =>
  page.evaluate(() => {
    const stage = document.querySelector('.deck-stage')
    const scene = document.querySelector('.scene')
    if (!(stage instanceof HTMLElement) || !(scene instanceof HTMLElement)) return null
    return {
      id: scene.dataset.slideId,
      stageOverflowX: stage.scrollWidth - stage.clientWidth,
      stageOverflowY: stage.scrollHeight - stage.clientHeight,
      sceneOverflowX: scene.scrollWidth - scene.clientWidth,
      sceneOverflowY: scene.scrollHeight - scene.clientHeight,
      docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      title: document.querySelector('h1, h2')?.textContent?.trim(),
      fontFamily: getComputedStyle(scene).fontFamily,
    }
  })

try {
  await waitForServer()
  const browser = await chromium.launch({ executablePath, headless: true })

  for (const [label, viewport] of [
    ['1920x1080', { width: 1920, height: 1080 }],
    ['1440x810', { width: 1440, height: 810 }],
  ]) {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1 })
    const page = await context.newPage()
    page.on('console', (message) => {
      if (message.type() === 'error') report.consoleErrors.push(`[${label}] ${message.text()}`)
    })
    page.on('pageerror', (error) => report.consoleErrors.push(`[${label}] ${error.message}`))

    for (let index = 1; index <= total; index += 1) {
      await page.goto(`${baseUrl}/?slide=${index}`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(500)
      const metrics = await measureScene(page)
      await page.screenshot({ path: resolve(screenshotDir, label, `slide-${String(index).padStart(2, '0')}.png`) })
      report.slides.push({ viewport: label, ...metrics })

      if (label === '1440x810') {
        await page.addScriptTag({ content: axe.source })
        const axeResult = await page.evaluate(async () => {
          const result = await globalThis.axe.run(document, {
            resultTypes: ['violations'],
            rules: { 'color-contrast': { enabled: true } },
          })
          return result.violations
            .filter((item) => ['critical', 'serious'].includes(item.impact ?? ''))
            .map((item) => ({ id: item.id, impact: item.impact, nodes: item.nodes.length }))
        })
        if (axeResult.length) report.accessibility.push({ slide: index, violations: axeResult })
      }
    }
    await context.close()
  }

  // Navegación por teclado + overlays + interacciones clave
  const context = await browser.newContext({ viewport: { width: 1440, height: 810 } })
  const page = await context.newPage()
  page.on('pageerror', (error) => report.consoleErrors.push(`[nav] ${error.message}`))

  await page.goto(`${baseUrl}/?slide=1`, { waitUntil: 'networkidle' })
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(140)
  report.navigation.arrowRight = await page.locator('.scene').getAttribute('data-slide-id')
  await page.keyboard.press('End')
  await page.waitForTimeout(140)
  report.navigation.end = await page.locator('.scene').getAttribute('data-slide-id')
  await page.keyboard.press('o')
  report.navigation.overview = await page.locator('.overview-overlay').count()
  await page.keyboard.press('Escape')
  await page.keyboard.press('n')
  report.navigation.notes = await page.locator('.notes-overlay').count()
  await page.keyboard.press('Escape')

  // Demo de percepción: emitir evento
  const cameraIndex = sceneIds.indexOf('camera-lab') + 1
  await page.goto(`${baseUrl}/?slide=${cameraIndex}`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Emitir evento demo' }).click()
  await page.locator('.event-card').first().waitFor({ state: 'visible', timeout: 8000 })
  report.interactions.emitEvent = await page.locator('.event-card').count()

  // Cámara denegada: sin permisos concedidos el navegador rechaza getUserMedia
  await page.getByRole('button', { name: 'Activar cámara local' }).click()
  await page.locator('.camera-error').waitFor({ state: 'visible', timeout: 15000 })
  report.interactions.cameraDenied = await page.locator('.camera-error').count()

  // Simulación del incidente completa
  const incidentIndex = sceneIds.indexOf('incident') + 1
  await page.goto(`${baseUrl}/?slide=${incidentIndex}`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Ejecutar el loop' }).click()
  await page.locator('.incident-step.is-done').nth(5).waitFor({ state: 'attached', timeout: 20000 })
  report.interactions.incidentSteps = await page.locator('.incident-step.is-done').count()
  await context.close()

  // Móvil 390×844 en escenas críticas
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
  const mobilePage = await mobile.newPage()
  for (const index of [1, sceneIds.indexOf('camera-lab') + 1, total]) {
    await mobilePage.goto(`${baseUrl}/?slide=${index}`, { waitUntil: 'networkidle' })
    await mobilePage.waitForTimeout(400)
    await mobilePage.screenshot({ path: resolve(screenshotDir, `mobile-${String(index).padStart(2, '0')}.png`), fullPage: true })
    const docOverflowX = await mobilePage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    report.slides.push({ viewport: '390x844', id: sceneIds[index - 1], docOverflowX, stageOverflowX: 0, stageOverflowY: 0, sceneOverflowX: 0, sceneOverflowY: 0 })
  }
  await mobile.close()

  // Reduced motion
  const reduced = await browser.newContext({ viewport: { width: 1440, height: 810 }, reducedMotion: 'reduce' })
  const reducedPage = await reduced.newPage()
  await reducedPage.goto(`${baseUrl}/?slide=${sceneIds.indexOf('loop') + 1}`, { waitUntil: 'networkidle' })
  await reducedPage.waitForTimeout(400)
  await reducedPage.screenshot({ path: resolve(screenshotDir, 'reduced-motion-loop.png') })
  await reduced.close()

  // Contact sheet reproducible a partir de las capturas 1920×1080
  const sheetContext = await browser.newContext({ viewport: { width: 1860, height: 1200 }, deviceScaleFactor: 1 })
  const sheetPage = await sheetContext.newPage()
  const tiles = sceneIds
    .map((id, index) => {
      const file = resolve(screenshotDir, '1920x1080', `slide-${String(index + 1).padStart(2, '0')}.png`)
      const data = readFileSync(file).toString('base64')
      return `<figure><img src="data:image/png;base64,${data}"/><figcaption>${String(index + 1).padStart(2, '0')} · ${id}</figcaption></figure>`
    })
    .join('')
  await sheetPage.setContent(`<!doctype html><html><head><style>
    body{margin:0;padding:28px;background:#02060f;font-family:Consolas,monospace}
    h1{color:#f4f8ff;font-size:20px;margin:0 0 18px;letter-spacing:.12em}
    .grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
    figure{margin:0}
    img{width:100%;border:1px solid rgba(233,240,255,.18);border-radius:8px;display:block}
    figcaption{color:#93a5c6;font-size:11px;margin-top:6px;letter-spacing:.08em}
  </style></head><body><h1>AGENTES IA × VISIÓN COMPUTACIONAL · CONTACT SHEET (1920×1080)</h1><div class="grid">${tiles}</div></body></html>`)
  await sheetPage.waitForTimeout(400)
  await sheetPage.screenshot({ path: resolve(root, 'qa', 'contact-sheet.png'), fullPage: true })
  await sheetContext.close()

  await browser.close()
} finally {
  server.kill()
}

writeFileSync(resolve(root, 'qa', 'qa-report.json'), JSON.stringify(report, null, 2))

const overflows = report.slides.filter((item) => item && (
  (item.stageOverflowX ?? 0) > 2 || (item.stageOverflowY ?? 0) > 2 ||
  (item.sceneOverflowX ?? 0) > 2 || (item.sceneOverflowY ?? 0) > 2 ||
  (item.docOverflowX ?? 0) > 2
))
const failures = []
if (overflows.length) failures.push(`overflow en ${overflows.map((item) => `${item.id}@${item.viewport}`).join(', ')}`)
if (report.consoleErrors.length) failures.push(`${report.consoleErrors.length} errores de consola`)
if (report.accessibility.length) failures.push(`a11y seria en ${report.accessibility.length} escenas`)
if (report.navigation.arrowRight !== sceneIds[1] || report.navigation.end !== sceneIds.at(-1)) failures.push('navegación de teclado')
if (report.navigation.overview !== 1 || report.navigation.notes !== 1) failures.push('overlays overview/notas')
if (report.interactions.emitEvent < 1) failures.push('la consola de eventos no emite')
if (report.interactions.cameraDenied < 1) failures.push('estado cámara denegada sin mensaje')
if (report.interactions.incidentSteps < 6) failures.push(`simulación de incidente incompleta (${report.interactions.incidentSteps}/6)`)

if (failures.length) {
  console.error(`QA FAIL: ${failures.join('; ')}`)
  process.exit(1)
}

console.log(`QA PASS: ${total} escenas × 2 resoluciones, móvil, teclado, overlays, demos, cámara denegada, reduced motion, axe y contact sheet.`)
