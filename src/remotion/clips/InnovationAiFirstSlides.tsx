import type { CSSProperties, ReactNode } from 'react'
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
  dark: '#030712',
  darkSoft: '#081022',
  paper: '#F6F7F5',
  white: '#F4F6FA',
  navy: '#101B4D',
  blue: '#3567DE',
  blueSoft: '#6689CC',
  orange: '#DC6D35',
  mutedDark: '#A8B3C9',
  mutedLight: '#59647A',
  darkLine: '#22304A',
  lightLine: '#D7DCE4',
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

function BrandLogo({ light = false }: { light?: boolean }) {
  return (
    <img
      src={assetUrl(light ? 'assets/gen-logo-navy.png' : 'assets/gen-logo-white.png')}
      alt="GEN+"
      style={{
        position: 'absolute',
        right: 82,
        top: 60,
        width: 132,
        height: 'auto',
      }}
    />
  )
}

function RevealMask({
  children,
  frame,
  fps,
  start,
  distance = 54,
}: {
  children: ReactNode
  frame: number
  fps: number
  start: number
  distance?: number
}) {
  const reveal = spring({
    frame: frame - start,
    fps,
    durationInFrames: 28,
    config: { damping: 21, stiffness: 125, mass: 0.9 },
  })

  return (
    <div style={{ overflow: 'hidden' }}>
      <div
        style={{
          opacity: reveal,
          transform: `translateY(${(1 - reveal) * distance}px)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

const OPERATING_WORDS = [
  {
    word: 'INNOVAR',
    statement: 'descubre valor.',
    color: COLORS.blue,
    start: 10,
  },
  {
    word: 'AUTOMATIZAR',
    statement: 'lo convierte en capacidad.',
    color: COLORS.white,
    start: 66,
  },
  {
    word: 'REDISEÑAR',
    statement: 'lo vuelve sistema.',
    color: COLORS.orange,
    start: 126,
  },
] as const

export function InnovationAutomationRedesignClip() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const spine = easeOut(frame, 16, 196)

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(90deg, ${COLORS.dark} 0%, ${COLORS.dark} 72%, ${COLORS.darkSoft} 100%)`,
        overflow: 'hidden',
      }}
    >
      <BrandLogo />

      <div
        style={{
          position: 'absolute',
          left: 88,
          top: 178,
          bottom: 160,
          width: 2,
          background: COLORS.darkLine,
        }}
      >
        <i
          style={{
            display: 'block',
            width: 2,
            height: '100%',
            background: `linear-gradient(${COLORS.blue}, ${COLORS.orange})`,
            transform: `scaleY(${spine})`,
            transformOrigin: 'top',
          }}
        />
      </div>

      <div
        style={{
          ...font,
          position: 'absolute',
          left: 132,
          right: 110,
          top: 154,
          bottom: 120,
          display: 'grid',
          gridTemplateRows: 'repeat(3, 1fr)',
          alignItems: 'center',
          color: COLORS.white,
        }}
      >
        {OPERATING_WORDS.map((item, index) => {
          const line = easeOut(frame, item.start + 30, item.start + 70)
          const statement = easeOut(frame, item.start + 20, item.start + 52)

          return (
            <section
              key={item.word}
              style={{
                display: 'grid',
                gridTemplateColumns: index === 1 ? '760px 1fr' : '650px 1fr',
                alignItems: 'baseline',
                columnGap: 54,
                position: 'relative',
              }}
            >
              <RevealMask frame={frame} fps={fps} start={item.start}>
                <strong
                  style={{
                    display: 'block',
                    color: item.color,
                    fontSize: index === 1 ? 112 : 132,
                    fontWeight: 610,
                    lineHeight: 0.92,
                    letterSpacing: '-0.07em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.word}
                </strong>
              </RevealMask>

              <p
                style={{
                  margin: 0,
                  color: index === 2 ? COLORS.white : COLORS.mutedDark,
                  fontSize: 39,
                  fontWeight: 510,
                  lineHeight: 1.08,
                  letterSpacing: '-0.04em',
                  opacity: statement,
                  transform: `translateX(${(1 - statement) * 36}px)`,
                }}
              >
                {item.statement}
              </p>

              <i
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: -30,
                  height: 1,
                  background: index === 2 ? 'transparent' : COLORS.darkLine,
                  transform: `scaleX(${line})`,
                  transformOrigin: 'left',
                }}
              />
            </section>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

export function AiFirstDefinitionClip() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const definition = easeOut(frame, 78, 118)
  const rule = easeOut(frame, 106, 166)
  const close = easeOut(frame, 154, 202)

  return (
    <AbsoluteFill style={{ background: COLORS.paper, overflow: 'hidden' }}>
      <BrandLogo light />

      <div
        style={{
          ...font,
          position: 'absolute',
          left: 92,
          right: 92,
          top: 176,
          color: COLORS.navy,
        }}
      >
        <RevealMask frame={frame} fps={fps} start={8} distance={76}>
          <h1
            style={{
              margin: 0,
              fontSize: 202,
              fontWeight: 630,
              lineHeight: 0.9,
              letterSpacing: '-0.085em',
              whiteSpace: 'nowrap',
            }}
          >
            AI <span style={{ color: COLORS.blue }}>FIRST</span>
          </h1>
        </RevealMask>

        <div
          style={{
            width: 410,
            height: 6,
            marginTop: 46,
            borderRadius: 99,
            background: COLORS.orange,
            transform: `scaleX(${rule})`,
            transformOrigin: 'left',
          }}
        />

        <p
          style={{
            maxWidth: 1420,
            margin: '62px 0 0',
            color: COLORS.mutedLight,
            fontSize: 44,
            fontWeight: 500,
            lineHeight: 1.27,
            letterSpacing: '-0.036em',
            opacity: definition,
            transform: `translateY(${(1 - definition) * 34}px)`,
          }}
        >
          Es diseñar la operación desde la capacidad de la inteligencia artificial:
          {' '}
          <strong style={{ color: COLORS.navy, fontWeight: 620 }}>
            personas, datos y agentes
          </strong>
          {' '}coordinados para{' '}
          <strong style={{ color: COLORS.blue, fontWeight: 620 }}>
            decidir, ejecutar y aprender
          </strong>
          {' '}de forma continua.
        </p>

        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 464,
            width: 180,
            height: 180,
            opacity: close,
          }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 180 180" style={{ width: '100%', height: '100%' }}>
            <circle cx="90" cy="90" r="58" fill="none" stroke={COLORS.lightLine} strokeWidth="2" />
            <circle cx="90" cy="90" r="7" fill={COLORS.orange} />
            <path
              d="M 32 90 H 148"
              fill="none"
              stroke={COLORS.blueSoft}
              strokeWidth="2"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - close}
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  )
}
