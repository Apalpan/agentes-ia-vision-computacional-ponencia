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
  paper: '#F5F6F3',
  ink: '#0B1230',
  muted: '#616A7E',
  pale: '#D9DEE7',
  paleBlue: '#B8C7EC',
  blue: '#315CD8',
  blueDeep: '#172D72',
  orange: '#D96C37',
  white: '#FFFFFF',
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

const STAGES = [
  {
    title: 'Repetitive',
    description: 'Resuelve tareas repetitivas y libera a las personas del trabajo rutinario.',
    start: 42,
    kind: 'repetitive',
  },
  {
    title: 'Predictive',
    description: 'Anticipa información para tomar decisiones mejor fundamentadas.',
    start: 78,
    kind: 'predictive',
  },
  {
    title: 'Prescriptive',
    description: 'Actúa como socio en el proceso de toma de decisiones.',
    start: 114,
    kind: 'prescriptive',
  },
  {
    title: 'Adaptive',
    description: 'Aprende continuamente, mejora y evoluciona con la operación.',
    start: 150,
    kind: 'adaptive',
  },
] as const

function SculptureFrame({
  children,
  frame,
  index,
  reveal,
}: {
  children: ReactNode
  frame: number
  index: number
  reveal: number
}) {
  const float = Math.sin((frame + index * 14) / 22) * 5
  const turn = Math.sin((frame + index * 23) / 34) * 4

  return (
    <div
      style={{
        width: 248,
        height: 224,
        margin: '0 auto',
        opacity: reveal,
        perspective: 900,
        transform: `translateY(${(1 - reveal) * 42 + float}px) scale(${0.94 + reveal * 0.06})`,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `rotateX(5deg) rotateY(${turn}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

function RepetitiveSculpture({ frame }: { frame: number }) {
  const cycle = (frame % 90) / 90
  const dash = interpolate(cycle, [0, 1], [52, -52])

  return (
    <svg viewBox="0 0 240 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <linearGradient id="rep-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COLORS.white} />
          <stop offset="1" stopColor={COLORS.paleBlue} />
        </linearGradient>
        <linearGradient id="rep-side" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COLORS.blue} />
          <stop offset="1" stopColor={COLORS.blueDeep} />
        </linearGradient>
        <filter id="rep-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#142354" floodOpacity="0.16" />
        </filter>
      </defs>

      {[0, 22, 44].map((offset, index) => (
        <g key={offset} transform={`translate(0 ${44 - offset})`} opacity={0.5 + index * 0.24}>
          <polygon points="45,92 120,48 195,92 120,136" fill="url(#rep-top)" />
          <polygon points="45,92 120,136 120,170 45,126" fill="#8399D2" />
          <polygon points="195,92 120,136 120,170 195,126" fill="url(#rep-side)" />
        </g>
      ))}

      <g filter="url(#rep-shadow)">
        <path
          d="M76 54 C55 65 45 82 45 102"
          fill="none"
          stroke={COLORS.orange}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="18 8"
          strokeDashoffset={dash}
        />
        <path d="M39 93 L45 105 L54 94" fill="none" stroke={COLORS.orange} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

function PredictiveSculpture({ frame }: { frame: number }) {
  const orbit = frame * 0.65

  return (
    <svg viewBox="0 0 240 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <radialGradient id="predict-orb" cx="34%" cy="26%" r="72%">
          <stop offset="0" stopColor={COLORS.white} />
          <stop offset="0.42" stopColor="#DDE5F7" />
          <stop offset="1" stopColor="#7994D7" />
        </radialGradient>
        <filter id="predict-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="18" stdDeviation="13" floodColor="#142354" floodOpacity="0.2" />
        </filter>
      </defs>

      <ellipse cx="120" cy="188" rx="62" ry="12" fill="#132552" opacity="0.1" />
      <circle cx="120" cy="104" r="63" fill="url(#predict-orb)" filter="url(#predict-shadow)" />
      <ellipse cx="120" cy="104" rx="32" ry="63" fill="none" stroke={COLORS.white} strokeWidth="2" opacity="0.62" />
      <ellipse cx="120" cy="104" rx="63" ry="24" fill="none" stroke={COLORS.blueDeep} strokeWidth="2" opacity="0.32" />
      <path d="M72 128 L98 110 L119 118 L146 82 L169 68" fill="none" stroke={COLORS.blueDeep} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M157 67 L171 66 L168 81" fill="none" stroke={COLORS.blueDeep} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

      <g transform={`rotate(${orbit} 120 104)`}>
        <ellipse cx="120" cy="104" rx="93" ry="38" fill="none" stroke={COLORS.orange} strokeWidth="3" opacity="0.7" />
        <circle cx="211" cy="104" r="7" fill={COLORS.orange} />
      </g>
    </svg>
  )
}

function PrescriptiveSculpture({ frame }: { frame: number }) {
  const pulse = 1 + Math.sin(frame / 14) * 0.035

  return (
    <svg viewBox="0 0 240 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <linearGradient id="decision-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F2D2C1" />
          <stop offset="1" stopColor={COLORS.orange} />
        </linearGradient>
        <linearGradient id="decision-side" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COLORS.blue} />
          <stop offset="1" stopColor={COLORS.blueDeep} />
        </linearGradient>
        <filter id="decision-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#142354" floodOpacity="0.18" />
        </filter>
      </defs>

      <g opacity="0.42" stroke={COLORS.blueDeep} strokeWidth="2">
        <path d="M120 98 L48 54" />
        <path d="M120 98 L45 153" />
        <path d="M120 98 L192 50" />
        <path d="M120 98 L195 151" />
      </g>
      {[[48, 54], [45, 153], [192, 50], [195, 151]].map(([cx, cy], index) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="12" fill={index === 2 ? COLORS.orange : COLORS.white} stroke={index === 2 ? COLORS.orange : COLORS.paleBlue} strokeWidth="3" />
          <circle cx={cx} cy={cy} r="4" fill={index === 2 ? COLORS.white : COLORS.blue} />
        </g>
      ))}

      <g transform={`translate(120 102) scale(${pulse}) translate(-120 -102)`} filter="url(#decision-shadow)">
        <polygon points="120,45 177,82 120,119 63,82" fill="url(#decision-top)" />
        <polygon points="63,82 120,119 120,174 63,137" fill="#8DA1D3" />
        <polygon points="177,82 120,119 120,174 177,137" fill="url(#decision-side)" />
        <circle cx="120" cy="82" r="17" fill={COLORS.white} opacity="0.9" />
        <path d="M112 82 L119 89 L133 73" fill="none" stroke={COLORS.blueDeep} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

function AdaptiveSculpture({ frame }: { frame: number }) {
  const rotateA = frame * 0.48
  const rotateB = -frame * 0.34

  return (
    <svg viewBox="0 0 240 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <radialGradient id="adaptive-core" cx="32%" cy="25%" r="72%">
          <stop offset="0" stopColor={COLORS.white} />
          <stop offset="0.38" stopColor="#F2CBB7" />
          <stop offset="1" stopColor={COLORS.orange} />
        </radialGradient>
        <linearGradient id="adaptive-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COLORS.paleBlue} />
          <stop offset="0.48" stopColor={COLORS.blue} />
          <stop offset="1" stopColor={COLORS.blueDeep} />
        </linearGradient>
        <filter id="adaptive-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="18" stdDeviation="13" floodColor="#142354" floodOpacity="0.2" />
        </filter>
      </defs>

      <ellipse cx="120" cy="188" rx="58" ry="11" fill="#132552" opacity="0.1" />
      <g transform={`rotate(${rotateA} 120 105)`}>
        <ellipse cx="120" cy="105" rx="88" ry="34" fill="none" stroke="url(#adaptive-ring)" strokeWidth="13" opacity="0.82" />
        <circle cx="205" cy="105" r="7" fill={COLORS.blueDeep} />
      </g>
      <g transform={`rotate(${rotateB} 120 105)`}>
        <ellipse cx="120" cy="105" rx="42" ry="91" fill="none" stroke={COLORS.paleBlue} strokeWidth="9" opacity="0.68" />
        <circle cx="120" cy="16" r="7" fill={COLORS.orange} />
      </g>
      <circle cx="120" cy="105" r="38" fill="url(#adaptive-core)" filter="url(#adaptive-shadow)" />
      <circle cx="108" cy="93" r="8" fill={COLORS.white} opacity="0.72" />
    </svg>
  )
}

function StageSculpture({ kind, frame }: { kind: (typeof STAGES)[number]['kind']; frame: number }) {
  if (kind === 'repetitive') return <RepetitiveSculpture frame={frame} />
  if (kind === 'predictive') return <PredictiveSculpture frame={frame} />
  if (kind === 'prescriptive') return <PrescriptiveSculpture frame={frame} />
  return <AdaptiveSculpture frame={frame} />
}

export function ManMachineContinuumClip() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const header = spring({
    frame: frame - 5,
    fps,
    durationInFrames: 30,
    config: { damping: 21, stiffness: 125, mass: 0.9 },
  })
  const track = easeOut(frame, 26, 174)

  return (
    <AbsoluteFill
      style={{
        ...font,
        background: COLORS.paper,
        color: COLORS.ink,
        overflow: 'hidden',
      }}
    >
      <img
        src={assetUrl('assets/gen-logo-navy.png')}
        alt="GEN+"
        style={{ position: 'absolute', right: 84, top: 56, width: 132, height: 'auto' }}
      />

      <header style={{ position: 'absolute', left: 86, top: 62, right: 260, overflow: 'hidden' }}>
        <h1
          style={{
            margin: 0,
            fontSize: 58,
            fontWeight: 630,
            lineHeight: 1,
            letterSpacing: '-0.05em',
            opacity: header,
            transform: `translateY(${(1 - header) * 40}px)`,
          }}
        >
          <span style={{ color: COLORS.blue }}>AI</span> Man–Machine Continuum
        </h1>
      </header>

      <div
        style={{
          position: 'absolute',
          left: 184,
          right: 184,
          top: 440,
          height: 2,
          background: COLORS.pale,
        }}
      >
        <span
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, ${COLORS.blueDeep}, ${COLORS.blue}, ${COLORS.orange})`,
            transform: `scaleX(${track})`,
            transformOrigin: 'left',
          }}
        />
      </div>

      <main
        style={{
          position: 'absolute',
          left: 58,
          right: 58,
          top: 174,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          columnGap: 26,
        }}
      >
        {STAGES.map((stage, index) => {
          const reveal = spring({
            frame: frame - stage.start,
            fps,
            durationInFrames: 34,
            config: { damping: 20, stiffness: 118, mass: 0.92 },
          })
          const copy = easeOut(frame, stage.start + 15, stage.start + 48)

          return (
            <section key={stage.title} style={{ textAlign: 'left' }}>
              <SculptureFrame frame={frame} index={index} reveal={reveal}>
                <StageSculpture kind={stage.kind} frame={frame} />
              </SculptureFrame>

              <div
                style={{
                  width: 28,
                  height: 28,
                  margin: '29px auto 0',
                  borderRadius: '50%',
                  background: index === 3 ? COLORS.orange : COLORS.white,
                  border: `3px solid ${index === 3 ? COLORS.orange : COLORS.blue}`,
                  opacity: reveal,
                  transform: `scale(${0.94 + reveal * 0.06})`,
                }}
              />

              <div
                style={{
                  padding: '35px 28px 0',
                  opacity: copy,
                  transform: `translateY(${(1 - copy) * 24}px)`,
                }}
              >
                <span
                  style={{
                    display: 'block',
                    color: index === 3 ? COLORS.orange : COLORS.blue,
                    fontSize: 17,
                    fontWeight: 720,
                    letterSpacing: '0.16em',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  0{index + 1}
                </span>
                <h2
                  style={{
                    margin: '11px 0 0',
                    fontSize: 38,
                    fontWeight: 630,
                    lineHeight: 1,
                    letterSpacing: '-0.045em',
                  }}
                >
                  {stage.title}
                </h2>
                <p
                  style={{
                    margin: '20px 0 0',
                    maxWidth: 340,
                    color: COLORS.muted,
                    fontSize: 22,
                    fontWeight: 500,
                    lineHeight: 1.36,
                    letterSpacing: '-0.024em',
                  }}
                >
                  {stage.description}
                </p>
              </div>
            </section>
          )
        })}
      </main>
    </AbsoluteFill>
  )
}
