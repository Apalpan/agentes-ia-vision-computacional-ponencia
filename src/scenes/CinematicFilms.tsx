import { CinematicInterlude } from '../components/CinematicInterlude'

export function DataBottleneckFilm() {
  return (
    <CinematicInterlude
      code="FILM 01 / 05"
      title="La información existe. Pero no actúa."
      statement="Datos en silos. Decisiones en espera."
      src="./media/clips/data-bottleneck.mp4"
      poster="./media/posters/data-bottleneck.png"
      accent="decision"
    />
  )
}

export function AiOpportunityFilm() {
  return (
    <CinematicInterlude
      code="FILM 02 / 05"
      title="La IA dejó de ser una función. Ya es infraestructura operativa."
      statement="Del prompt al sistema. Del sistema al negocio."
      src="./media/clips/ai-opportunity.mp4"
      poster="./media/posters/ai-opportunity.png"
      accent="signal"
    />
  )
}

export function AgentBrainFilm() {
  return (
    <CinematicInterlude
      code="FILM 03 / 05"
      title="Un agente no es magia. Es un sistema."
      statement="Objetivo, contexto, herramientas, memoria, verificación y permisos."
      src="./media/clips/gplus-brain.mp4"
      poster="./media/posters/gplus-brain.png"
      accent="signal"
    />
  )
}

export function MultiAgentFilm() {
  return (
    <CinematicInterlude
      code="FILM 04 / 05"
      title="Muchos agentes. Una sola operación."
      statement="Especialistas coordinados producen una salida verificable."
      src="./media/clips/multi-agent.mp4"
      poster="./media/posters/multi-agent.png"
      accent="evidence"
    />
  )
}

export function AiNativeFilm() {
  return (
    <CinematicInterlude
      code="FILM 05 / 05"
      title="La empresa no usa IA. Opera con IA."
      statement="Procesos, datos, agentes y decisiones comparten el mismo sistema operativo."
      src="./media/clips/ai-native.mp4"
      poster="./media/posters/ai-native.png"
      accent="decision"
    />
  )
}
