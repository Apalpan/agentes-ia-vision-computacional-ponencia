import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdirSync, statSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Renderiza los 4 clips conceptuales con Remotion, genera posters, copia todo a
// public/media/ y reescribe el manifiesto de medios con procedencia.
const root = resolve(import.meta.dirname, '..')
const outClips = resolve(root, 'outputs', 'clips')
const pubClips = resolve(root, 'public', 'media', 'clips')
const pubPosters = resolve(root, 'public', 'media', 'posters')
for (const dir of [outClips, pubClips, pubPosters]) mkdirSync(dir, { recursive: true })

const CLIPS = [
  { id: 'opening', composition: 'OpeningClip', posterFrame: 176, usedIn: ['cover'] },
  { id: 'vision-to-event', composition: 'VisionToEventClip', posterFrame: 258, usedIn: ['camera-lab'] },
  { id: 'agent-loop', composition: 'AgentLoopClip', posterFrame: 300, usedIn: ['incident'] },
  { id: 'closing', composition: 'ClosingClip', posterFrame: 186, usedIn: ['closing'] },
]

const run = (args) => {
  const result = spawnSync('npx', args, { cwd: root, stdio: 'inherit', shell: true })
  if (result.status !== 0) throw new Error(`Comando falló: npx ${args.join(' ')}`)
}

for (const clip of CLIPS) {
  const mp4 = resolve(outClips, `${clip.id}.mp4`)
  const poster = resolve(pubPosters, `${clip.id}.png`)
  console.log(`\n▶ Render ${clip.composition}`)
  run(['remotion', 'render', 'src/remotion/index.ts', clip.composition, mp4])
  run(['remotion', 'still', 'src/remotion/index.ts', clip.composition, poster, `--frame=${clip.posterFrame}`])
  copyFileSync(mp4, resolve(pubClips, `${clip.id}.mp4`))
}

const manifest = {
  deck: 'agentes-ia-vision-computacional-ponencia',
  updated: new Date().toISOString().slice(0, 10),
  policy:
    'No existe footage real verificable en las carpetas autorizadas del vault (inventario 2026-07-17). Todos los clips son motion graphics renderizados localmente con Remotion y se declaran en pantalla como representación conceptual. Ningún clip simula footage real ni resultados de un despliegue.',
  assets: CLIPS.flatMap((clip) => {
    const mp4Size = statSync(resolve(pubClips, `${clip.id}.mp4`)).size
    return [
      {
        id: `clip-${clip.id}`,
        file: `media/clips/${clip.id}.mp4`,
        source: `Render local Remotion · composición ${clip.composition} (src/remotion/clips)`,
        license: 'GEN+ interno · generado en este repositorio',
        status: 'conceptual',
        usedIn: clip.usedIn,
        notes: `MP4 H.264 sin audio, ${Math.round(mp4Size / 1024)} KB. Reproducción offline, activación manual, muted.`,
      },
      {
        id: `poster-${clip.id}`,
        file: `media/posters/${clip.id}.png`,
        source: `Frame ${clip.posterFrame} de la composición ${clip.composition} (remotion still)`,
        license: 'GEN+ interno · generado en este repositorio',
        status: 'conceptual',
        usedIn: clip.usedIn,
        notes: 'Poster y fallback estático del clip.',
      },
    ]
  }),
}

writeFileSync(resolve(root, 'public', 'media', 'media-manifest.json'), JSON.stringify(manifest, null, 2))
console.log('\nOK: 4 clips + 4 posters renderizados, copiados a public/media y manifiesto actualizado.')
