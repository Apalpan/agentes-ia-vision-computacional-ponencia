import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright-core'
import axe from 'axe-core'

const root = resolve(import.meta.dirname, '..')
const screenshotDir = resolve(root, 'qa', 'screenshots')
mkdirSync(screenshotDir, { recursive: true })

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
  viewport: '1440x810',
  slides: [],
  consoleErrors: [],
  accessibility: [],
  navigation: {},
}

try {
  await waitForServer()
  const browser = await chromium.launch({ executablePath, headless: true })
  const context = await browser.newContext({ viewport: { width: 1440, height: 810 }, deviceScaleFactor: 1 })
  const page = await context.newPage()
  page.on('console', (message) => {
    if (message.type() === 'error') report.consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => report.consoleErrors.push(error.message))

  for (let index = 1; index <= 15; index += 1) {
    await page.goto(`${baseUrl}/?slide=${index}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(450)
    const metrics = await page.evaluate(() => {
      const stage = document.querySelector('.deck-stage')
      const scene = document.querySelector('.scene')
      if (!(stage instanceof HTMLElement) || !(scene instanceof HTMLElement)) return null
      const style = getComputedStyle(scene)
      return {
        id: scene.dataset.slideId,
        stageOverflowX: stage.scrollWidth - stage.clientWidth,
        stageOverflowY: stage.scrollHeight - stage.clientHeight,
        sceneOverflowX: scene.scrollWidth - scene.clientWidth,
        sceneOverflowY: scene.scrollHeight - scene.clientHeight,
        title: document.querySelector('h1, h2')?.textContent?.trim(),
        fontFamily: style.fontFamily,
      }
    })
    await page.screenshot({ path: resolve(screenshotDir, `slide-${String(index).padStart(2, '0')}.png`) })
    report.slides.push(metrics)

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

  await page.goto(`${baseUrl}/?slide=1`, { waitUntil: 'networkidle' })
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(120)
  report.navigation.arrowRight = await page.locator('.scene').getAttribute('data-slide-id')
  await page.keyboard.press('End')
  await page.waitForTimeout(120)
  report.navigation.end = await page.locator('.scene').getAttribute('data-slide-id')

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
  const mobilePage = await mobile.newPage()
  for (const index of [1, 8, 15]) {
    await mobilePage.goto(`${baseUrl}/?slide=${index}`, { waitUntil: 'networkidle' })
    await mobilePage.waitForTimeout(350)
    await mobilePage.screenshot({ path: resolve(screenshotDir, `mobile-${String(index).padStart(2, '0')}.png`), fullPage: true })
  }
  await mobile.close()

  const reduced = await browser.newContext({
    viewport: { width: 1440, height: 810 },
    reducedMotion: 'reduce',
  })
  const reducedPage = await reduced.newPage()
  await reducedPage.goto(`${baseUrl}/?slide=4`, { waitUntil: 'networkidle' })
  await reducedPage.screenshot({ path: resolve(screenshotDir, 'reduced-motion-04.png') })
  await reduced.close()
  await browser.close()
} finally {
  server.kill()
}

writeFileSync(resolve(root, 'qa', 'qa-report.json'), JSON.stringify(report, null, 2))

const overflows = report.slides.filter((item) => item && (
  item.stageOverflowX > 2 || item.stageOverflowY > 2 || item.sceneOverflowX > 2 || item.sceneOverflowY > 2
))
const failures = []
if (overflows.length) failures.push(`overflow en ${overflows.map((item) => item.id).join(', ')}`)
if (report.consoleErrors.length) failures.push(`${report.consoleErrors.length} errores de consola`)
if (report.accessibility.length) failures.push(`a11y seria en ${report.accessibility.length} escenas`)
if (report.navigation.arrowRight !== 'signals' || report.navigation.end !== 'closing') failures.push('navegación de teclado')

if (failures.length) {
  console.error(`QA FAIL: ${failures.join('; ')}`)
  process.exit(1)
}

console.log('QA PASS: 15 escenas, escritorio, móvil, teclado, reduced motion y axe.')
