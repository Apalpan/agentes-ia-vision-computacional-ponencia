import { useEffect, useRef, useState } from 'react'
import { SceneFrame } from '../components/SceneFrame'
import { ClipPlayer } from '../components/ClipPlayer'
import { Reveal, useMotion } from '../motion/MotionContext'

const STAGES = [
  { key: 'senal', label: 'Señal', detail: 'presencia en zona restringida' },
  { key: 'evento', label: 'Evento', detail: 'payload con zona, cámara y hora' },
  { key: 'agente', label: 'Agente', detail: 'contrasta turno, permiso y criticidad' },
  { key: 'humano', label: 'Humano', detail: 'responsable SST confirma el protocolo' },
  { key: 'accion', label: 'Acción', detail: 'alerta con evidencia al canal SST' },
  { key: 'cierre', label: 'Evidencia', detail: 'evento, decisión y acción registrados' },
] as const

const STEP_MS = 850

export function Incident() {
  const motion = useMotion()
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), [])

  const simulate = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer))
    timers.current = []
    setRunning(true)
    setStep(1)
    for (let index = 2; index <= STAGES.length; index += 1) {
      timers.current.push(window.setTimeout(() => {
        setStep(index)
        if (index === STAGES.length) setRunning(false)
      }, (index - 1) * STEP_MS))
    }
  }

  const current = motion.isRender
    ? Math.min(STAGES.length, Math.max(0, Math.floor(motion.progress * (STAGES.length + 1))))
    : step

  return (
    <SceneFrame
      eyebrow="ACTO II · LA DEMOSTRACIÓN"
      title="Una detección crea ruido. Un loop diseñado cierra una respuesta."
      lead="Simulación conceptual, no un caso desplegado: el agente no sustituye al responsable SST — prepara contexto, activa protocolo y conserva evidencia."
      className="incident-scene"
    >
      <div className="incident-sim">
        <Reveal order={1} className="incident-zone">
          <div className="restricted-zone"><i />ZONA RESTRINGIDA · Z-04</div>
          <span className={`worker ${current > 0 ? 'worker-alert' : ''}`}>PERSONA</span>
          <div className={`zone-event ${current >= 2 ? 'is-visible' : ''}`} aria-hidden={current < 2}>
            <b>EVENTO</b>
            <span>presencia_en_zona</span>
            <span>Z-04 · CAM-02 · 10:42</span>
            <span>confianza: demo conceptual</span>
          </div>
          <p role="status">{current === 0 ? 'Escenario en espera' : current >= STAGES.length ? 'Loop cerrado con evidencia' : 'Loop en ejecución…'}</p>
        </Reveal>
        <Reveal order={2} className="incident-sequence">
          {STAGES.map((stage, index) => (
            <div key={stage.key} className={`incident-step ${current > index ? 'is-done' : ''} ${current === index + 1 ? 'is-live' : ''}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <b>{stage.label}</b>
                <small>{stage.detail}</small>
              </div>
              <em aria-hidden="true">{current > index ? '●' : '○'}</em>
            </div>
          ))}
          <div className="incident-actions">
            <button className="primary-action" type="button" onClick={simulate} disabled={running}>
              {running ? 'Ejecutando loop…' : current === STAGES.length ? 'Repetir simulación' : 'Ejecutar el loop'}
            </button>
            <ClipPlayer
              src="./media/clips/agent-loop.mp4"
              poster="./media/posters/agent-loop.png"
              label="Clip agent loop"
            />
          </div>
        </Reveal>
      </div>
    </SceneFrame>
  )
}
