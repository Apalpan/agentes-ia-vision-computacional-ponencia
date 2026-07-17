import type { ReactNode } from 'react'

export type PresenterNotes = {
  intent: string
  opening: string
  explanation: string
  transition: string
  warning?: string
  cue?: string
}

export type MediaReference = {
  id: string
  kind: 'clip' | 'poster' | 'still'
  file: string
}

export type InteractionContract = {
  kind: 'camera' | 'simulation' | 'emit-event' | 'clip'
  fallback: string
}

export type SceneContract = {
  id: string
  eyebrow: string
  claim: string
  lead?: string
  narrativeRole: string
  evidence: string[]
  speakerIntent: string
  transitionIn: string
  transitionOut: string
  durationInFrames: number
  stableFrame: number
  media?: MediaReference[]
  interaction?: InteractionContract
  notes: PresenterNotes
  render: () => ReactNode
}
