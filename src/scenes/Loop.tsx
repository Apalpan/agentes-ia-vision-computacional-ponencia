import { useEffect, useState } from 'react'
import { SceneFrame } from '../components/SceneFrame'
import { Reveal, useMotion } from '../motion/MotionContext'

const STATES = [
  ['Percibe', 'imagen → evento', 'PERCIBIENDO'],
  ['Interpreta', 'contexto + reglas', 'INTERPRETANDO'],
  ['Decide', 'plan + prioridad', 'DECIDIENDO'],
  ['Actúa', 'herramientas + flujo', 'ACTUANDO'],
  ['Escala', 'humano en lo crítico', 'ESCALANDO'],
  ['Evidencia', 'registro + cierre', 'CERRANDO'],
] as const

export function Loop() {
  const motion = useMotion()
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (motion.isRender) return
    const timer = window.setInterval(() => setTick((value) => (value + 1) % STATES.length), 2100)
    return () => window.clearInterval(timer)
  }, [motion.isRender])

  const active = motion.isRender
    ? Math.min(STATES.length - 1, Math.floor(motion.progress * STATES.length))
    : tick

  return (
    <SceneFrame
      eyebrow="ACTO II · EL LOOP OPERATIVO"
      title="El agente mantiene vivo el loop: de la señal a la evidencia."
      lead="La visión abre el ciclo. El agente lo sostiene. La persona conserva el criterio y el punto de control. La salida no es texto: es un cambio de estado registrado."
      className="loop-scene"
    >
      <Reveal order={1} className="loop-ring">
        <div className="loop-center" role="status">
          <b>{STATES[active][2]}</b>
          <span>estado del loop</span>
        </div>
        {STATES.map(([title, detail], index) => (
          <Reveal
            key={title}
            order={index + 2}
            className={`loop-node loop-node-${index + 1} ${index === active ? 'is-active' : ''} ${index < active ? 'is-done' : ''}`}
          >
            <i>{String(index + 1).padStart(2, '0')}</i>
            <b>{title}</b>
            <span>{detail}</span>
          </Reveal>
        ))}
      </Reveal>
    </SceneFrame>
  )
}
