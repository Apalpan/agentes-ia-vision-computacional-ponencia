import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const required = [
  'src/content/scenes.tsx',
  'src/content/timing.json',
  'src/content/types.ts',
  'src/deck/Deck.tsx',
  'src/motion/MotionContext.tsx',
  'src/remotion/Root.tsx',
  'src/styles/index.css',
  'public/source-manifest.json',
  'public/media/media-manifest.json',
  'public/assets/gen-logo-white.png',
  'dist/index.html',
  'docs/narrative.md',
  'docs/audit-ultra-premium.md',
]

const missing = required.filter((file) => !existsSync(resolve(root, file)))
if (missing.length) throw new Error(`Faltan archivos: ${missing.join(', ')}`)

const timing = JSON.parse(readFileSync(resolve(root, 'src/content/timing.json'), 'utf8'))
const content = readFileSync(resolve(root, 'src/content/scenes.tsx'), 'utf8')

const ids = [...content.matchAll(/^\s{4}id: '([^']+)'/gm)].map((match) => match[1])
const unique = new Set(ids)
if (ids.length !== unique.size) throw new Error(`Ids de escena duplicados: ${ids.length}/${unique.size}`)
if (ids.length < 12 || ids.length > 18) throw new Error(`El arco debe tener 12–18 escenas; hay ${ids.length}`)

const timingIds = timing.scenes.map((scene) => scene.id)
for (const id of ids) {
  if (!timingIds.includes(id)) throw new Error(`La escena ${id} no tiene timing en timing.json`)
}
for (const id of timingIds) {
  if (!unique.has(id)) throw new Error(`timing.json declara ${id} pero no existe en scenes.tsx`)
}
for (const scene of timing.scenes) {
  if (!Number.isFinite(scene.durationInFrames) || scene.durationInFrames <= 0) {
    throw new Error(`Duración inválida en ${scene.id}`)
  }
  if (scene.stableFrame >= scene.durationInFrames) {
    throw new Error(`stableFrame fuera de rango en ${scene.id}`)
  }
}

const requiredCopy = [
  'Cuando la obra puede',
  'La cámara no es el producto',
  'No necesitamos una obra llena de IA',
  'un evento crítico',
]
for (const phrase of requiredCopy) {
  if (!content.includes(phrase)) throw new Error(`Falta copy esencial: ${phrase}`)
}

// Contrato de notas del presentador completo por escena
for (const field of ['intent:', 'opening:', 'explanation:', 'transition:']) {
  const count = content.split(field).length - 1
  if (count < ids.length) throw new Error(`Notas incompletas: ${field} aparece ${count}/${ids.length} veces`)
}

const banned = /lorem ipsum|\bTODO\b|\bTBD\b|\bFIXME\b/g
const bannedMatches = content.match(banned)
if (bannedMatches) throw new Error(`Contenido no permitido: ${[...new Set(bannedMatches)].join(', ')}`)

const manifest = JSON.parse(readFileSync(resolve(root, 'public/source-manifest.json'), 'utf8'))
if (!Array.isArray(manifest.sources) || manifest.sources.length < 6) {
  throw new Error('El manifiesto de fuentes está incompleto')
}

const media = JSON.parse(readFileSync(resolve(root, 'public/media/media-manifest.json'), 'utf8'))
if (!Array.isArray(media.assets)) throw new Error('media-manifest.json sin lista de assets')
for (const asset of media.assets) {
  if (!asset.id || !asset.file || !asset.status || !asset.source) {
    throw new Error(`Asset de media sin procedencia completa: ${JSON.stringify(asset)}`)
  }
  if (asset.status !== 'pending_render' && !existsSync(resolve(root, 'public', asset.file))) {
    throw new Error(`Asset declarado pero ausente: ${asset.file}`)
  }
}

console.log(`OK: ${ids.length} escenas con contrato completo, ${manifest.sources.length} fuentes, ${media.assets.length} assets de media, build presente.`)
