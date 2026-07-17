import { createContext, useContext } from 'react'
import type { CSSProperties, ElementType, ReactNode } from 'react'
import {
  REVEAL_BASE_FRAMES,
  REVEAL_DURATION_FRAMES,
  REVEAL_STAGGER_FRAMES,
  clamp01,
  easeOut,
} from './tokens'

export type MotionState =
  | { mode: 'interactive' }
  | { mode: 'render'; frame: number; fps: number; durationInFrames: number }

const MotionContext = createContext<MotionState>({ mode: 'interactive' })

export const MotionProvider = MotionContext.Provider

export function useMotion() {
  const state = useContext(MotionContext)
  const isRender = state.mode === 'render'
  // Progreso 0..1 de la escena. En interactivo la escena vive en su estado final.
  const progress = isRender ? clamp01(state.frame / Math.max(1, state.durationInFrames - 1)) : 1
  // Fase 0..1 de un ciclo ambiental determinista. En interactivo devuelve null:
  // el ciclo lo lleva CSS (keyframes), que reduced-motion puede apagar.
  const phase = (seconds: number, offset = 0): number | null => {
    if (!isRender) return null
    const time = state.frame / state.fps + offset
    return (time % seconds) / seconds
  }
  // Rampa easing entre dos frames de la escena. En interactivo: estado final (1).
  const ramp = (fromFrame: number, toFrame: number): number => {
    if (!isRender) return 1
    return easeOut((state.frame - fromFrame) / Math.max(1, toFrame - fromFrame))
  }
  // Umbral: ¿ya pasó este frame? En interactivo: sí.
  const after = (frame: number): boolean => (isRender ? state.frame >= frame : true)
  return { ...state, isRender, progress, phase, ramp, after }
}

export function Reveal({
  order = 0,
  as: Tag = 'div',
  axis = 'y',
  distance = 16,
  className = '',
  style,
  children,
  ...rest
}: {
  order?: number
  as?: ElementType
  axis?: 'x' | 'y'
  distance?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
} & Record<string, unknown>) {
  const motion = useMotion()
  if (motion.mode !== 'render') {
    return (
      <Tag
        className={`motion-item ${className}`.trim()}
        style={{ ...style, '--i': order } as CSSProperties}
        {...rest}
      >
        {children}
      </Tag>
    )
  }
  const start = REVEAL_BASE_FRAMES + order * REVEAL_STAGGER_FRAMES
  const eased = easeOut((motion.frame - start) / REVEAL_DURATION_FRAMES)
  const shift = (1 - eased) * distance
  const transform = axis === 'y' ? `translate3d(0, ${shift}px, 0)` : `translate3d(${shift}px, 0, 0)`
  return (
    <Tag className={className} style={{ ...style, opacity: eased, transform }} {...rest}>
      {children}
    </Tag>
  )
}
