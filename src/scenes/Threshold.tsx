import { SceneFrame } from '../components/SceneFrame'
import { Reveal } from '../motion/MotionContext'

const LEVELS = [
  ['CHATBOT', 'Responde', 'texto', 'Una pregunta produce una respuesta.'],
  ['ASISTENTE', 'Ayuda', 'borrador', 'Acelera una tarea, pero el usuario mantiene el proceso.'],
  ['AGENTE', 'Ejecuta', 'resultado', 'Persigue un objetivo, usa herramientas y verifica.'],
  ['MULTIAGENTE', 'Coordina', 'proceso', 'Especialistas cierran partes verificables bajo un orquestador.'],
] as const

export function Threshold() {
  return (
    <SceneFrame
      eyebrow="ACTO I · EL UMBRAL"
      title="La madurez no se mide por cómo conversa. Se mide por lo que consigue cerrar."
      lead="El salto ocurre cuando la IA deja de producir texto y empieza a mantener estado, usar herramientas, coordinar especialistas y verificar resultados."
      className="threshold-scene"
    >
      <div className="threshold-ladder">
        {LEVELS.map(([name, verb, output, detail], index) => (
          <Reveal key={name} order={index + 1} as="section" className={`threshold-level ${index >= 2 ? 'is-operational' : ''}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <small>{name}</small>
            <h3>{verb}</h3>
            <strong>SALE · {output}</strong>
            <p>{detail}</p>
          </Reveal>
        ))}
      </div>
      <Reveal order={5} className="threshold-rule">
        <span>CONVERSA</span><i aria-hidden="true" /><b>EL UMBRAL</b><i aria-hidden="true" /><span>OPERA</span>
      </Reveal>
    </SceneFrame>
  )
}
