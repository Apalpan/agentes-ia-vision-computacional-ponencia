import { SceneFrame } from '../components/SceneFrame'
import { Reveal } from '../motion/MotionContext'

export function HumanGate() {
  return (
    <SceneFrame
      eyebrow="ACTO III · GOBERNANZA"
      title="Autonomía proporcional al riesgo: lo crítico lo decide una persona."
      lead="Autonomía sin permisos produce riesgo. Supervisión sin contexto produce lentitud. El punto de control humano se diseña antes de automatizar."
      className="gate-scene"
    >
      <div className="risk-spectrum">
        <Reveal order={1} className="spectrum-bar" aria-hidden="true">
          <div className="spectrum-gradient" />
          <span className="spectrum-label spectrum-left">REVERSIBLE · AUTOMÁTICO</span>
          <span className="spectrum-label spectrum-right">CRÍTICO · HUMANO</span>
        </Reveal>
        <div className="spectrum-row">
          <Reveal order={2} as="section" className="spectrum-side">
            <small>EL SISTEMA HACE</small>
            <div className="action-chips">
              <span>observar</span><span>clasificar</span><span>preparar contexto</span><span>registrar</span>
            </div>
            <p>Acciones reversibles, de bajo riesgo, siempre con log.</p>
          </Reveal>
          <Reveal order={3} className="gate-core">
            <i aria-hidden="true" />
            <b>PUNTO DE CONTROL HUMANO</b>
            <span>la decisión crítica no se delega</span>
            <i aria-hidden="true" />
          </Reveal>
          <Reveal order={4} as="section" className="spectrum-side spectrum-critical">
            <small>LA PERSONA DECIDE</small>
            <div className="action-chips chips-critical">
              <span>aprobar</span><span>intervenir</span><span>detener</span><span>cerrar</span>
            </div>
            <p>Responsabilidad, excepción y validación final.</p>
          </Reveal>
        </div>
        <Reveal order={5} as="p" className="gate-rule">
          Regla de diseño: más autonomía = más logs + más permisos granulares + más aprobación humana.
        </Reveal>
      </div>
    </SceneFrame>
  )
}
