import { SceneFrame } from '../components/SceneFrame'
import { Reveal, useMotion } from '../motion/MotionContext'

const SIGNALS = [
  ['CAM', 'Cámara'],
  ['BIM', 'Modelo BIM'],
  ['RPT', 'Reporte diario'],
  ['MSG', 'WhatsApp'],
  ['SNS', 'Sensor'],
  ['CRN', 'Cronograma'],
] as const

export function Signals() {
  const motion = useMotion()
  const scanPhase = motion.phase(5)
  return (
    <SceneFrame
      eyebrow="ACTO I · LA FRACTURA"
      title="La obra ya produce señales. Ninguna cierra una decisión."
      lead="Cámaras, modelos, reportes y mensajes registran lo que pasa. Pero la decisión sigue dependiendo de que alguien encuentre, interprete y escale a tiempo."
      className="signals-scene"
    >
      <div className="signal-river">
        <Reveal order={1} className="signal-stream" style={scanPhase === null ? undefined : ({ '--scan-x': `${2 + scanPhase * 96}%` } as never)}>
          {SIGNALS.map(([code, name], index) => (
            <Reveal key={code} order={index + 2} className="signal-chip">
              <i>{code}</i>
              <span>{name}</span>
            </Reveal>
          ))}
        </Reveal>
        <Reveal order={5} className="signal-break" aria-hidden="true">
          <i /><i /><i />
        </Reveal>
        <Reveal order={6} className="late-decision">
          <small>LA DECISIÓN</small>
          <strong>Llega tarde.</strong>
          <p>La señal existía. Nadie la convirtió en acción a tiempo. El problema no es la falta de datos: es que ningún sistema cierra el ciclo.</p>
        </Reveal>
      </div>
    </SceneFrame>
  )
}
