import { SceneFrame } from '../components/SceneFrame'
import { Reveal } from '../motion/MotionContext'

export function Threshold() {
  return (
    <SceneFrame
      eyebrow="ACTO I · EL UMBRAL"
      title="Un asistente responde. Un agente persigue un objetivo."
      lead="El salto no es conversar mejor: es pasar de generar texto a observar, usar herramientas, corregir y verificar hasta cerrar un resultado."
      className="threshold-scene"
    >
      <div className="threshold-line">
        <Reveal order={1} as="section" className="threshold-side">
          <span>ASISTENTE</span>
          <div className="threshold-chain">
            <b>Pregunta</b>
            <i className="chain-arrow" aria-hidden="true" />
            <b>Respuesta</b>
          </div>
          <p>Reactivo. La salida termina en el chat: alguien todavía tiene que hacer el trabajo.</p>
        </Reveal>
        <Reveal order={2} className="threshold-gate" aria-hidden="true">
          <i /><em>EL UMBRAL</em><i />
        </Reveal>
        <Reveal order={3} as="section" className="threshold-side threshold-agent">
          <span>AGENTE</span>
          <div className="threshold-chain">
            <b>Objetivo</b>
            <i className="chain-arrow" aria-hidden="true" />
            <b>Acción</b>
            <i className="chain-arrow" aria-hidden="true" />
            <b>Verificación</b>
          </div>
          <p>Mantiene estado, usa herramientas y continúa hasta cerrar el resultado. No todo chatbot es agente.</p>
        </Reveal>
      </div>
    </SceneFrame>
  )
}
