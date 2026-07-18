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
  background: '#030712',
  backgroundSoft: '#071022',
  text: '#F4F6FA',
  textSoft: '#A8B3C9',
  line: '#23314B',
  blue: '#5B8EF7',
  blueMuted: '#315992',
  orange: '#DC6D35',
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

const easeInOut = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.77, 0, 0.175, 1),
  })

function Word({
  children,
  frame,
  fps,
  start,
  color = COLORS.text,
}: {
  children: string
  frame: number
  fps: number
  start: number
  color?: string
}) {
  const reveal = spring({
    frame: frame - start,
    fps,
    durationInFrames: 26,
    config: { damping: 20, stiffness: 125, mass: 0.85 },
  })

  return (
    <span
      style={{
        display: 'inline-block',
        marginRight: '0.21em',
        color,
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 54}px)`,
      }}
    >
      {children}
    </span>
  )
}

const SIGNALS = [
  { x: 1260, y: 170 },
  { x: 1600, y: 176 },
  { x: 1712, y: 388 },
  { x: 1220, y: 510 },
  { x: 1604, y: 570 },
] as const

function ConvergenceGraphic({ frame }: { frame: number }) {
  const center = { x: 1460, y: 354 }
  const converge = easeInOut(frame, 86, 176)
  const scatterOpacity = interpolate(frame, [148, 186], [0.72, 0], clamp)
  const focus = easeOut(frame, 164, 202)
  const output = easeOut(frame, 190, 244)

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        aria-hidden="true"
      >
        {SIGNALS.map((signal, index) => {
          const x = interpolate(converge, [0, 1], [signal.x, center.x])
          const y = interpolate(converge, [0, 1], [signal.y, center.y])
          const pathReveal = easeOut(frame, 28 + index * 8, 88 + index * 8)
          const dotIn = easeOut(frame, 16 + index * 7, 42 + index * 7)

          return (
            <g key={`${signal.x}-${signal.y}`}>
              <path
                d={`M ${signal.x} ${signal.y} L ${center.x} ${center.y}`}
                fill="none"
                stroke={index === 2 ? COLORS.blueMuted : COLORS.line}
                strokeWidth="1.5"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - pathReveal}
                opacity={scatterOpacity}
              />
              <circle
                cx={x}
                cy={y}
                r={index === 2 ? 7 : 5}
                fill={index === 2 ? COLORS.blue : COLORS.textSoft}
                opacity={dotIn * (0.45 + converge * 0.55)}
              />
            </g>
          )
        })}

        <circle
          cx={center.x}
          cy={center.y}
          r={54 + focus * 12}
          fill="none"
          stroke={COLORS.line}
          strokeWidth="2"
          opacity={focus}
        />
        <circle
          cx={center.x}
          cy={center.y}
          r="9"
          fill={COLORS.orange}
          opacity={focus}
        />

        <path
          d={`M ${center.x} ${center.y + 68} C ${center.x} 520 1586 558 1662 650`}
          fill="none"
          stroke={COLORS.blue}
          strokeWidth="2.5"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - output}
        />
        <circle cx="1662" cy="650" r="6" fill={COLORS.orange} opacity={output} />
      </svg>

      <div
        style={{
          ...font,
          position: 'absolute',
          right: 86,
          top: 666,
          width: 250,
          opacity: easeOut(frame, 218, 252),
          transform: `translateY(${(1 - easeOut(frame, 218, 252)) * 24}px)`,
          color: COLORS.text,
          textAlign: 'right',
        }}
      >
        <strong
          style={{
            display: 'block',
            fontSize: 74,
            fontWeight: 650,
            lineHeight: 0.86,
            letterSpacing: '-0.07em',
          }}
        >
          AI
        </strong>
        <span
          style={{
            display: 'block',
            marginTop: 15,
            color: COLORS.orange,
            fontSize: 17,
            fontWeight: 750,
            letterSpacing: '0.26em',
          }}
        >
          FIRST
        </span>
      </div>
    </div>
  )
}

function ProcessLine({ frame }: { frame: number }) {
  const items = ['PROBLEMA', 'SISTEMA', 'EVIDENCIA'] as const
  const line = easeOut(frame, 152, 214)

  return (
    <div
      style={{
        ...font,
        position: 'absolute',
        left: 90,
        bottom: 102,
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        color: COLORS.text,
      }}
    >
      {items.map((item, index) => {
        const entry = easeOut(frame, 146 + index * 14, 174 + index * 14)
        return (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <span
              style={{
                opacity: entry,
                transform: `translateY(${(1 - entry) * 16}px)`,
                fontSize: 15,
                fontWeight: 750,
                letterSpacing: '0.13em',
              }}
            >
              {item}
            </span>
            {index < items.length - 1 ? (
              <i
                style={{
                  display: 'block',
                  width: 72,
                  height: 1,
                  background: index === 0 ? COLORS.blue : COLORS.line,
                  transform: `scaleX(${line})`,
                  transformOrigin: 'left',
                }}
              />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export function ProblemFocusTypographyClip() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const subtitle = easeOut(frame, 122, 158)
  const underline = easeOut(frame, 104, 154)

  const firstLine = ['La', 'ventaja', 'no', 'es']
  const highlight = ['usar', 'IA.']
  const secondLine = ['Es', 'entender', 'bien', 'el']

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(90deg, ${COLORS.background} 0%, ${COLORS.background} 68%, ${COLORS.backgroundSoft} 100%)`,
        overflow: 'hidden',
      }}
    >
      <img
        src={assetUrl('assets/gen-logo-white.png')}
        alt="GEN+"
        style={{
          position: 'absolute',
          right: 82,
          top: 60,
          width: 132,
          height: 'auto',
          opacity: easeOut(frame, 4, 26),
        }}
      />

      <div
        style={{
          ...font,
          position: 'absolute',
          left: 88,
          top: 116,
          width: 1230,
          color: COLORS.text,
          fontSize: 104,
          fontWeight: 560,
          lineHeight: 1.02,
          letterSpacing: '-0.062em',
        }}
      >
        <div style={{ whiteSpace: 'nowrap' }}>
          {firstLine.map((word, index) => (
            <Word key={word} frame={frame} fps={fps} start={8 + index * 5}>
              {word}
            </Word>
          ))}
          {highlight.map((word, index) => (
            <Word key={word} frame={frame} fps={fps} start={34 + index * 5} color={COLORS.blue}>
              {word}
            </Word>
          ))}
        </div>
        <div style={{ marginTop: 4, whiteSpace: 'nowrap' }}>
          {secondLine.map((word, index) => (
            <Word key={word} frame={frame} fps={fps} start={58 + index * 5}>
              {word}
            </Word>
          ))}
        </div>
        <div style={{ position: 'relative', width: 'fit-content', marginTop: 4 }}>
          <Word frame={frame} fps={fps} start={86}>
            problema.
          </Word>
          <i
            style={{
              position: 'absolute',
              left: 4,
              right: 18,
              bottom: -10,
              height: 5,
              borderRadius: 99,
              background: COLORS.orange,
              transform: `scaleX(${underline})`,
              transformOrigin: 'left',
            }}
          />
        </div>
      </div>

      <p
        style={{
          ...font,
          position: 'absolute',
          left: 92,
          top: 540,
          maxWidth: 1040,
          margin: 0,
          color: COLORS.textSoft,
          fontSize: 30,
          fontWeight: 470,
          lineHeight: 1.25,
          letterSpacing: '-0.025em',
          opacity: subtitle,
          transform: `translateY(${(1 - subtitle) * 24}px)`,
        }}
      >
        De información dispersa a sistemas agentic y una operación AI First.
      </p>

      <ConvergenceGraphic frame={frame} />
      <ProcessLine frame={frame} />
    </AbsoluteFill>
  )
}
