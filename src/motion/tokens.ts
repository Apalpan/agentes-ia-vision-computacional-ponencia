// Gramática temporal compartida entre el deck interactivo (CSS) y Remotion (determinista).
// Interactivo: styles/tokens.css refleja estos valores como custom properties.
export const FPS = 30

// Entrada de elementos (Reveal)
export const REVEAL_BASE_FRAMES = 6 // espera inicial ≈200ms
export const REVEAL_STAGGER_FRAMES = 2 // ≈72ms entre elementos
export const REVEAL_DURATION_FRAMES = 17 // ≈560ms

// Transición entre escenas en KeynoteFull
export const SCENE_TRANSITION_FRAMES = 12

export const clamp01 = (value: number) => Math.max(0, Math.min(1, value))

// cubic-bezier(0.23, 1, 0.32, 1) aproximada para uso numérico
export const easeOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 3.2)
export const easeInOut = (t: number) => {
  const x = clamp01(t)
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}
