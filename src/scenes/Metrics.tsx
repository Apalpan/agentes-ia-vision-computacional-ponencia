import { SceneFrame } from '../components/SceneFrame'
import { Reveal } from '../motion/MotionContext'

const INSTRUMENTS = [
  ['TIEMPO DE CICLO', 'señal → decisión → cierre'],
  ['COBERTURA', 'eventos con evidencia completa'],
  ['CALIDAD', 'falsos positivos y negativos'],
  ['INTERVENCIÓN', 'cuándo y por qué entra una persona'],
] as const

function Gauge() {
  return (
    <svg viewBox="0 0 120 68" className="metric-gauge" aria-hidden="true">
      <path d="M12 60 A 48 48 0 0 1 108 60" className="gauge-track" />
      <path d="M12 60 A 48 48 0 0 1 46 18" className="gauge-hint" />
      <line x1="60" y1="60" x2="30" y2="34" className="gauge-needle" />
      <circle cx="60" cy="60" r="4" className="gauge-pivot" />
    </svg>
  )
}

export function Metrics() {
  return (
    <SceneFrame
      eyebrow="ACTO III · EVIDENCIA DE VALOR"
      title="No midas cuántas alertas genera. Mide cuántas decisiones mejora."
      lead="Un sistema puede detectar mucho y aportar poco. La métrica correcta conecta operación, calidad y control humano."
      className="metrics-scene"
    >
      <div className="decision-panel">
        <div className="instrument-row">
          {INSTRUMENTS.map(([title, detail], index) => (
            <Reveal key={title} order={index + 1} as="section" className="instrument">
              <Gauge />
              <strong>{title}</strong>
              <p>{detail}</p>
              <span className="instrument-state">se calibra en el piloto</span>
            </Reveal>
          ))}
        </div>
        <Reveal order={5} as="p" className="metrics-rule">
          Ningún indicador tiene valor de fábrica: se mide en obra, con umbrales propios. Prometer cifras antes del piloto — requiere validación.
        </Reveal>
      </div>
    </SceneFrame>
  )
}
