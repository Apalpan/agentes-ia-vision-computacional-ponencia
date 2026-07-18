import { SceneFrame } from '../components/SceneFrame'
import { Reveal } from '../motion/MotionContext'
import { ClipPlayer } from '../components/ClipPlayer'

const PHASES = [
  ['OBSERVAR', 'Un evento crítico, una zona, una cámara.', '¿La señal existe con calidad suficiente?'],
  ['VALIDAR', 'Reglas, umbral, responsable y fallback.', '¿El evento cambia una decisión real?'],
  ['ESCALAR', 'Más turnos, frentes y automatizaciones.', '¿El loop mantiene calidad y trazabilidad?'],
] as const

export function Pilot() {
  return (
    <SceneFrame
      eyebrow="ACTO III · PRIMER PILOTO"
      title="Empieza con un evento crítico. No con una plataforma."
      lead="El piloto debe demostrar que una señal visual mejora una decisión específica antes de ampliar cámaras, clases o agentes."
      className="pilot-scene"
      action={<ClipPlayer src="./media/clips/pilot-protocol.mp4" poster="./media/posters/pilot-protocol.png" label="Clip · primer piloto" />}
    >
      <div className="pilot-steps">
        {PHASES.map(([title, action, question], index) => (
          <Reveal key={title} order={index + 1} as="section" className={`pilot-step step-${index + 1}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <small>FASE</small>
            <h3>{title}</h3>
            <p>{action}</p>
            <b>{question}</b>
          </Reveal>
        ))}
        <Reveal order={4} as="p" className="pilot-rule">
          Criterio de las fuentes: empezar por alto valor y bajo riesgo. Sin calibración por obra no se promete precisión.
        </Reveal>
      </div>
    </SceneFrame>
  )
}
