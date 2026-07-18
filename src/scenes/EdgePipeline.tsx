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

const APPLICATIONS = ['cámara en obra', 'análisis en laptop o Jetson', 'reconocimiento de voz', 'revisión normativa', 'alertas sin internet'] as const

export function EdgePipeline() {
  const motion = useMotion()
  const travel = motion.phase(6)
  return (
    <SceneFrame
      eyebrow="ACTO III · EDGE AI"
      title="IA local, rápida y privada."
      lead="La IA no siempre debe vivir en la nube: también puede vivir en obra. El evento nace cerca de la cámara y sobrevive a la mala señal."
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
        <Reveal order={7} className="edge-health" aria-label="Aplicaciones de Edge AI en campo">
          <small>APLICACIONES EN CAMPO</small>
          <div>
            {APPLICATIONS.map((application, index) => (
              <span key={application} className={index === 0 ? 'is-ok' : ''}>{application}</span>
            ))}
          </div>
        </Reveal>
        <Reveal order={8} as="p" className="edge-rule">
          No se “envía video a la nube”: se diseña una cadena local con buffer, reintentos y evidencia que no se pierde.
        </Reveal>
      </div>
    </SceneFrame>
  )
}
