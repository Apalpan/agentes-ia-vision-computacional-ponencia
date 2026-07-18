import type { CSSProperties } from 'react'
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { assetUrl } from '../../components/assetUrl'

const COLORS = {
  white: '#FFFFFF',
  ink: '#0A1835',
  darkGray: '#3E4758',
  muted: '#747E90',
  line: '#D7DCE4',
  navy: '#10316B',
  blue: '#2E62D8',
  service: '#A7B4C8',
}

const font: CSSProperties = {
  fontFamily: '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", sans-serif',
}

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const

const easeOut = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.23, 1, 0.32, 1),
  })

const DATA = [
  { year: '2020', height: 168, solution: 0.65, label: '$2.0B' },
  { year: '2021', height: 208, solution: 0.65, label: '$2.9B' },
  { year: '2022', height: 248, solution: 0.64, label: '$3.9B' },
  { year: '2023', height: 252, solution: 0.65, label: undefined },
  { year: '2024', height: 292, solution: 0.66, label: '$4.0B' },
  { year: '2025', height: 342, solution: 0.65, label: undefined },
  { year: '2026', height: 392, solution: 0.64, label: '$6.6B' },
  { year: '2027', height: 442, solution: 0.65, label: undefined },
  { year: '2028', height: 494, solution: 0.64, label: undefined },
  { year: '2029', height: 572, solution: 0.64, label: undefined },
  { year: '2030', height: 660, solution: 0.63, label: undefined },
] as const

export function AiMarketGrowthClip() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const title = spring({
    frame: frame - 4,
    fps,
    durationInFrames: 30,
    config: { damping: 22, stiffness: 128, mass: 0.86 },
  })
  const legend = easeOut(frame, 22, 54)
  const baseline = easeOut(frame, 24, 82)
  const curve = easeOut(frame, 114, 226)
  const endpoint = easeOut(frame, 198, 236)

  return (
    <AbsoluteFill style={{ ...font, background: COLORS.white, color: COLORS.ink, overflow: 'hidden' }}>
      <img
        src={assetUrl('assets/gen-logo-navy.png')}
        alt="GEN+"
        style={{ position: 'absolute', right: 84, top: 56, width: 132, height: 'auto' }}
      />

      <header style={{ position: 'absolute', left: 90, top: 62, right: 270, overflow: 'hidden' }}>
        <h1
          style={{
            margin: 0,
            fontSize: 78,
            fontWeight: 640,
            lineHeight: 1,
            letterSpacing: '-0.058em',
            opacity: title,
            transform: `translateY(${(1 - title) * 54}px)`,
          }}
        >
          TAMAÑO DE MERCADO <span style={{ color: COLORS.blue }}>DE LA IA</span>
        </h1>
      </header>

      <div
        style={{
          position: 'absolute',
          left: 94,
          top: 184,
          display: 'flex',
          gap: 34,
          alignItems: 'center',
          color: COLORS.darkGray,
          fontSize: 21,
          fontWeight: 620,
          letterSpacing: '0.035em',
          opacity: legend,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <i style={{ width: 15, height: 15, borderRadius: '50%', background: COLORS.navy }} />
          SOLUCIÓN
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <i style={{ width: 15, height: 15, borderRadius: '50%', background: COLORS.service }} />
          SERVICIO
        </span>
      </div>

      <svg
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          <marker id="growth-arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill={COLORS.blue} />
          </marker>
        </defs>
        <path
          d="M 150 535 C 520 510 900 440 1240 342 C 1450 282 1640 222 1760 172"
          fill="none"
          stroke={COLORS.blue}
          strokeWidth="5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - curve}
          opacity={curve}
          markerEnd={curve > 0.97 ? 'url(#growth-arrow)' : undefined}
        />
        <circle cx="1760" cy="172" r="8" fill={COLORS.blue} opacity={endpoint} />
      </svg>

      <div
        style={{
          position: 'absolute',
          right: 112,
          top: 124,
          color: COLORS.ink,
          fontSize: 30,
          fontWeight: 720,
          letterSpacing: '-0.035em',
          opacity: endpoint,
          transform: `translateY(${(1 - endpoint) * 16}px)`,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        2030
      </div>

      <div
        style={{
          position: 'absolute',
          left: 110,
          right: 110,
          top: 246,
          bottom: 126,
          display: 'grid',
          gridTemplateColumns: 'repeat(11, 1fr)',
          columnGap: 28,
          alignItems: 'end',
        }}
      >
        {DATA.map((item, index) => {
          const reveal = spring({
            frame: frame - (34 + index * 7),
            fps,
            durationInFrames: 32,
            config: { damping: 22, stiffness: 126, mass: 0.88 },
          })
          const label = easeOut(frame, 48 + index * 7, 75 + index * 7)
          const solutionHeight = item.height * item.solution
          const serviceHeight = item.height - solutionHeight

          return (
            <div
              key={item.year}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                position: 'relative',
              }}
            >
              {item.label ? (
                <strong
                  style={{
                    position: 'absolute',
                    bottom: item.height + 66,
                    color: COLORS.darkGray,
                    fontSize: 23,
                    fontWeight: 650,
                    letterSpacing: '-0.025em',
                    fontVariantNumeric: 'tabular-nums',
                    opacity: label,
                    transform: `translateY(${(1 - label) * 18}px)`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </strong>
              ) : null}

              <div
                style={{
                  width: 88,
                  height: item.height,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  filter: 'drop-shadow(0 14px 14px rgba(16, 49, 107, 0.10))',
                  transform: `scaleY(${reveal})`,
                  transformOrigin: 'bottom',
                }}
              >
                <div
                  style={{
                    height: serviceHeight,
                    background: COLORS.service,
                    borderRadius: '9px 9px 0 0',
                  }}
                />
                <div style={{ height: solutionHeight, background: COLORS.navy }} />
              </div>

              <span
                style={{
                  marginTop: 24,
                  color: index === DATA.length - 1 ? COLORS.ink : COLORS.darkGray,
                  fontSize: 22,
                  fontWeight: index === DATA.length - 1 ? 720 : 560,
                  fontVariantNumeric: 'tabular-nums',
                  opacity: label,
                }}
              >
                {item.year}
              </span>
            </div>
          )
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 84,
          right: 84,
          bottom: 174,
          height: 2,
          background: COLORS.line,
          transform: `scaleX(${baseline})`,
          transformOrigin: 'left',
        }}
      />
    </AbsoluteFill>
  )
}
