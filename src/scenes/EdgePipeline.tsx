import { SceneFrame } from '../components/SceneFrame'
import { Reveal, useMotion } from '../motion/MotionContext'
import { ClipPlayer } from '../components/ClipPlayer'

const STATIONS = [
  ['CÁMARA', 'captura el frame'],
  ['EDGE', 'filtra e infiere local'],
  ['EVENTO', 'estructura el payload'],
  ['AGENTE', 'suma contexto y reglas'],
  ['HUMANO', 'decide lo crítico'],
  ['EVIDENCIA', 'cierra y registra'],
] as const

const HEALTH = ['ONLINE', 'FEED LOST', 'UPLOAD DELAY', 'INFERENCE ERROR', 'BUFFERING', 'OFFLINE'] as const

export function EdgePipeline() {
  const motion = useMotion()
  const travel = motion.phase(6)
  return (
    <SceneFrame
      eyebrow="ACTO II · ARQUITECTURA"
      title="El evento nace cerca de la cámara. La acción, cerca del contexto."
      lead="Procesar en el edge protege ancho de banda y continuidad con red inestable. La capa de agentes conecta el evento con reglas, responsables y trazabilidad."
      className="edge-scene"
      action={<ClipPlayer src="./media/clips/edge-local.mp4" poster="./media/posters/edge-local.png" label="Clip · edge local" />}
    >
      <div className="edge-wrap">
        <div className="edge-pipeline">
          <div
            className="pipeline-payload"
            style={travel === null ? undefined : ({ '--travel': `${travel * 100}%` } as never)}
            aria-hidden="true"
          >
            <span>persona · Z-04 · 10:42</span>
          </div>
          <div className="pipeline-beam" aria-hidden="true" />
          {STATIONS.map(([title, detail], index) => (
            <Reveal key={title} order={index + 1} className={`edge-station ${index === 1 || index === 3 ? 'is-core' : ''}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{title}</strong>
              <small>{detail}</small>
            </Reveal>
          ))}
        </div>
        <Reveal order={7} className="edge-health" aria-label="Estados de salud del nodo edge">
          <small>EL SISTEMA SE OPERA — ESTADOS DE SALUD DEL NODO</small>
          <div>
            {HEALTH.map((state, index) => (
              <span key={state} className={index === 0 ? 'is-ok' : ''}>{state}</span>
            ))}
          </div>
        </Reveal>
        <Reveal order={8} as="p" className="edge-rule">
          No se “envía video a la IA”: se diseña una cadena de decisiones con estados, reintentos, buffer local y evidencia.
        </Reveal>
      </div>
    </SceneFrame>
  )
}
