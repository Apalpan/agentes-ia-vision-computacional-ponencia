import { SceneFrame } from '../components/SceneFrame'
import { Reveal } from '../motion/MotionContext'

const LAYERS = [
  ['Objetivo', 'qué resultado debe producir'],
  ['Contexto', 'proyecto, normas, estado, restricciones'],
  ['Herramientas', 'APIs, CDE, datos, mensajería, software'],
  ['Memoria', 'qué ocurrió y qué sigue abierto'],
  ['Verificación', 'criterios, evals y evidencia'],
  ['Permisos', 'qué puede hacer y cuándo escala'],
] as const

export function AgentAnatomy() {
  return (
    <SceneFrame
      eyebrow="ACTO II · ANATOMÍA"
      title="Un agente útil no es un chatbot con nombre. Es un sistema con límites."
      lead="El modelo es solo una pieza. Sin herramientas, memoria, verificación y permisos no hay sistema confiable — hay una demo."
      className="anatomy-scene"
    >
      <div className="agent-stack">
        <div className="agent-layers">
          {LAYERS.map(([title, detail], index) => (
            <Reveal key={title} order={index + 1} className="agent-layer">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </Reveal>
          ))}
        </div>
        <Reveal order={7} as="aside" className="anatomy-principle">
          <blockquote>
            <p>“Un agente que hace todo suele fallar.”</p>
          </blockquote>
          <div>
            <small>EL ANTÍDOTO</small>
            <b>Agente pequeño.<br />Objetivo claro.<br />Salida verificable.</b>
          </div>
        </Reveal>
      </div>
    </SceneFrame>
  )
}
