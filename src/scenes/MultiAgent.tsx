import { SceneFrame } from '../components/SceneFrame'
import { Reveal } from '../motion/MotionContext'

const SPECIALISTS = [
  ['VISIÓN', 'frame de cámara', 'evento estructurado'],
  ['SEGURIDAD', 'evento + protocolo', 'criticidad evaluada'],
  ['PLANIFICACIÓN', 'frente + turno', 'impacto en secuencia'],
  ['EVIDENCIA', 'acción ejecutada', 'registro auditable'],
] as const

export function MultiAgent() {
  return (
    <SceneFrame
      eyebrow="ACTO III · ORQUESTACIÓN"
      title="Un agente que hace todo, falla. Especialistas coordinados cierran procesos."
      lead="Cada agente tiene un objetivo, herramientas limitadas y una salida verificable. El orquestador reparte, escala y audita — no improvisa."
      className="orchestra-scene"
    >
      <div className="agent-orchestra">
        <Reveal order={1} className="orchestrator">
          <small>ORQUESTADOR</small>
          <b>OBJETIVO + ESTADO</b>
          <span>coordina · escala · audita</span>
        </Reveal>
        <div className="orchestra-links" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="orchestra-row">
          {SPECIALISTS.map(([name, input, output], index) => (
            <Reveal key={name} order={index + 2} as="article" className="agent-role">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <b>{name}</b>
              <div className="role-contract">
                <p><small>entra</small>{input}</p>
                <i aria-hidden="true" />
                <p><small>sale</small>{output}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SceneFrame>
  )
}
