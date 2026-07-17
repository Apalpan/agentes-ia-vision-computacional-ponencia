import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const required = [
  'src/slides.tsx',
  'src/Deck.tsx',
  'src/styles.css',
  'public/source-manifest.json',
  'public/assets/gen-logo-white.png',
  'dist/index.html',
]

const missing = required.filter((file) => !existsSync(resolve(root, file)))
if (missing.length) throw new Error(`Faltan archivos: ${missing.join(', ')}`)

const slides = readFileSync(resolve(root, 'src/slides.tsx'), 'utf8')
const ids = [...slides.matchAll(/id:\s*'([^']+)'/g)].map((match) => match[1])
const unique = new Set(ids)

if (ids.length !== 15 || unique.size !== 15) {
  throw new Error(`Se esperaban 15 escenas únicas; se encontraron ${ids.length}/${unique.size}`)
}

const requiredCopy = [
  'Cuando la obra puede ver',
  'El agente convierte señales en decisiones',
  'La visión no decide',
  'Diseña un loop',
]

for (const phrase of requiredCopy) {
  if (!slides.includes(phrase)) throw new Error(`Falta copy esencial: ${phrase}`)
}

const banned = /lorem ipsum|\bTODO\b|\bTBD\b|\bNaN\b|\bundefined\b/g
const bannedMatches = slides.match(banned)
if (bannedMatches) throw new Error(`Contenido no permitido: ${[...new Set(bannedMatches)].join(', ')}`)

const manifest = JSON.parse(readFileSync(resolve(root, 'public/source-manifest.json'), 'utf8'))
if (!Array.isArray(manifest.sources) || manifest.sources.length < 6) {
  throw new Error('El manifiesto de fuentes está incompleto')
}

console.log(`OK: ${ids.length} escenas, ${manifest.sources.length} fuentes, build presente.`)
