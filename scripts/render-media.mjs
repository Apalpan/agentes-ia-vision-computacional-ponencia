import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdirSync, statSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Renderiza los 13 clips conceptuales con Remotion, genera posters, copia todo a
// public/media/ y reescribe el manifiesto de medios con procedencia.
const root = resolve(import.meta.dirname, '..')
const outClips = resolve(root, 'outputs', 'clips')
const pubClips = resolve(root, 'public', 'media', 'clips')
const pubPosters = resolve(root, 'public', 'media', 'posters')
for (const dir of [outClips, pubClips, pubPosters]) mkdirSync(dir, { recursive: true })

const CLIPS = [
  { id: 'opening', composition: 'OpeningClip', posterFrame: 190, usedIn: ['film-gen-intro'] },
  { id: 'data-bottleneck', composition: 'DataBottleneckClip', posterFrame: 270, usedIn: ['film-data-bottleneck'] },
  { id: 'ai-opportunity', composition: 'AiOpportunityClip', posterFrame: 304, usedIn: ['film-ai-opportunity'] },
  { id: 'vision-to-event', composition: 'VisionToEventClip', posterFrame: 258, usedIn: ['camera-lab'] },
  { id: 'edge-local', composition: 'EdgeLocalProtocolClip', posterFrame: 186, usedIn: ['edge-pipeline'] },
  { id: 'voice-protocol', composition: 'VoiceProtocolClip', posterFrame: 188, usedIn: ['agent-anatomy'] },
  { id: 'gplus-brain', composition: 'GPlusBrainClip', posterFrame: 330, usedIn: ['agent-anatomy', 'film-agent-brain'] },
  { id: 'agent-loop', composition: 'AgentLoopClip', posterFrame: 300, usedIn: ['incident'] },
  { id: 'multi-agent', composition: 'MultiAgentProtocolClip', posterFrame: 188, usedIn: ['multiagent', 'film-multiagent'] },
  { id: 'human-gate', composition: 'HumanGateProtocolClip', posterFrame: 188, usedIn: ['human-gate'] },
  { id: 'pilot-protocol', composition: 'PilotProtocolClip', posterFrame: 190, usedIn: ['pilot'] },
  { id: 'ai-native', composition: 'AiNativeClip', posterFrame: 334, usedIn: ['film-ai-native'] },
  { id: 'closing', composition: 'ClosingClip', posterFrame: 186, usedIn: ['closing'] },
]

const requested = process.argv.slice(2)
const ACTIVE_CLIPS = requested.length ? CLIPS.filter((clip) => requested.includes(clip.id)) : CLIPS
const unknown = requested.filter((id) => !CLIPS.some((clip) => clip.id === id))
if (unknown.length) throw new Error(`Clips desconocidos: ${unknown.join(', ')}`)

const run = (args) => {
  const result = spawnSync('npx', args, { cwd: root, stdio: 'inherit', shell: true })
  if (result.status !== 0) throw new Error(`Comando falló: npx ${args.join(' ')}`)
}

for (const clip of ACTIVE_CLIPS) {
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
        notes: `MP4 H.264 sin audio, ${Math.round(mp4Size / 1024)} KB. Reproducción offline; autoplay muted en interludios y activación manual en escenas técnicas.`,
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
console.log(`\nOK: ${ACTIVE_CLIPS.length} clips renderizados; manifiesto completo de ${CLIPS.length} clips actualizado.`)
