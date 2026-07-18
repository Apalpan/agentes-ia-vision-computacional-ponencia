import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, statSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Captura estados temporales deterministas (0/25/50/75/100 %) de cada escena
// extrayendo frames del render completo (outputs/keynote-full.mp4).
const root = resolve(import.meta.dirname, '..')
const video = resolve(root, 'outputs', 'keynote-full.mp4')
if (!existsSync(video)) {
  throw new Error('Falta outputs/keynote-full.mp4 — ejecuta antes: npm run render:deck')
}

const renderInputs = [
  'src/content/scenes.tsx',
  'src/content/timing.json',
  'src/remotion/Root.tsx',
  'src/remotion/clips/OpeningClip.tsx',
  'src/scenes/AiFirstKeynote.tsx',
  'src/styles/ai-first-keynote.css',
  'src/components/CinematicInterlude.tsx',
  'public/media/media-manifest.json',
].map((file) => resolve(root, file))
const videoMtime = statSync(video).mtimeMs
const staleInput = renderInputs.find((file) => existsSync(file) && statSync(file).mtimeMs > videoMtime)
if (staleInput) {
  throw new Error(`outputs/keynote-full.mp4 está desactualizado respecto a ${staleInput} — ejecuta antes: npm run render:deck`)
}

const outDir = resolve(root, 'qa', 'temporal')
mkdirSync(outDir, { recursive: true })

const timing = JSON.parse(readFileSync(resolve(root, 'src/content/timing.json'), 'utf8'))
const { fps, transitionFrames } = timing

let start = 0
const failures = []
timing.scenes.forEach((scene, index) => {
  for (const pct of [0, 25, 50, 75, 100]) {
    const frame = Math.min(start + Math.round(((scene.durationInFrames - 1) * pct) / 100), start + scene.durationInFrames - 1)
    const time = (frame / fps).toFixed(3)
    const file = resolve(outDir, `${String(index + 1).padStart(2, '0')}-${scene.id}-p${String(pct).padStart(3, '0')}.png`)
    const result = spawnSync(
      'npx',
      ['remotion', 'ffmpeg', '-hide_banner', '-loglevel', 'error', '-ss', time, '-i', `"${video}"`, '-frames:v', '1', '-y', `"${file}"`],
      { cwd: root, shell: true, stdio: 'pipe' },
    )
    if (result.status !== 0 || !existsSync(file) || statSync(file).size < 20_000) {
      failures.push(`${scene.id}@${pct}%`)
    }
  }
  start += scene.durationInFrames - transitionFrames
})

if (failures.length) {
  console.error(`QA TEMPORAL FAIL: frames vacíos o no extraídos → ${failures.join(', ')}`)
  process.exit(1)
}

console.log(`QA TEMPORAL PASS: ${timing.scenes.length} escenas × 5 estados extraídos de keynote-full.mp4 sin frames vacíos.`)
