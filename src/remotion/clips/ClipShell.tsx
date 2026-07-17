import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import type { ReactNode } from 'react'

// Lienzo común de los clips: fondo GEN+, grilla técnica y declaración conceptual.
export function ClipShell({ children, fadeIn = 12 }: { children: ReactNode; fadeIn?: number }) {
  const frame = useCurrentFrame()
  const backdrop = interpolate(frame, [0, fadeIn], [0, 1], { extrapolateRight: 'clamp' })
  return (
    <AbsoluteFill className="mode-render clip-shell" style={{ background: 'var(--background-deep)' }}>
      <AbsoluteFill
        style={{
          opacity: backdrop,
          background:
            'radial-gradient(circle at 76% 22%, color-mix(in oklch, var(--signal) 12%, transparent), transparent 32%),' +
            'radial-gradient(circle at 12% 88%, color-mix(in oklch, var(--surface-raised) 55%, transparent), transparent 36%),' +
            'linear-gradient(145deg, var(--background-deep), var(--background) 55%, color-mix(in oklch, var(--background) 82%, var(--surface-raised)))',
        }}
      />
      <AbsoluteFill className="ambient-grid" style={{ opacity: 0.24 * backdrop }} />
      <AbsoluteFill>{children}</AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: 48,
          bottom: 36,
          fontFamily: 'var(--font-mono)',
          fontSize: 15,
          letterSpacing: '0.14em',
          color: 'var(--text-faint)',
          opacity: backdrop,
        }}
      >
        REPRESENTACIÓN CONCEPTUAL · GEN+ AI CONSTRUCTION
      </div>
    </AbsoluteFill>
  )
}

export function fadeSlide(frame: number, start: number, duration = 18, distance = 22) {
  const t = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const eased = 1 - Math.pow(1 - t, 3.2)
  return { opacity: eased, transform: `translate3d(0, ${(1 - eased) * distance}px, 0)` }
}
