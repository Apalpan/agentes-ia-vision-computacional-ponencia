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
  muted: '#778096',
  line: '#C8CFDA',
  blue: '#315CD8',
  blueDeep: '#172D72',
  bluePale: '#D7E0F6',
  orange: '#D96C37',
  orangePale: '#F1C4AC',
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

const quadraticPoint = (
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
) => ({
  x: (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0],
  y: (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1],
})

function RevealNode({
  children,
  frame,
  fps,
  start,
  left,
  top,
  width,
  height,
}: {
  children: ReactNode
  frame: number
  fps: number
  start: number
  left: number
  top: number
  width: number
  height: number
}) {
  const reveal = spring({
    frame: frame - start,
    fps,
    durationInFrames: 32,
    config: { damping: 21, stiffness: 122, mass: 0.9 },
  })

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 38}px) scale(${0.95 + reveal * 0.05})`,
      }}
    >
      {children}
    </div>
  )
}

function ConstructionReality({ frame }: { frame: number }) {
  const crane = easeOut(frame, 12, 70)
  const planTurn = Math.sin(frame / 29) * 3
  const float = Math.sin(frame / 22) * 4

  return (
    <svg viewBox="0 0 520 230" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <linearGradient id="site-plane" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COLORS.white} />
          <stop offset="1" stopColor={COLORS.bluePale} />
        </linearGradient>
        <linearGradient id="site-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COLORS.blue} />
          <stop offset="1" stopColor={COLORS.blueDeep} />
        </linearGradient>
        <filter id="site-shadow" x="-30%" y="-40%" width="160%" height="190%">
          <feDropShadow dx="0" dy="13" stdDeviation="10" floodColor="#172D72" floodOpacity="0.15" />
        </filter>
      </defs>

      <ellipse cx="260" cy="205" rx="210" ry="18" fill="#142354" opacity="0.07" />

      <g transform={`translate(8 ${float})`} filter="url(#site-shadow)">
        <path d="M58 126 C58 79 88 48 132 48 C176 48 206 79 206 126" fill="url(#site-plane)" stroke={COLORS.blueDeep} strokeWidth="5" />
        <path d="M48 126 H216 C216 142 204 151 190 151 H75 C60 151 48 142 48 126Z" fill="url(#site-blue)" />
        <path d="M92 52 V105 M132 48 V104 M172 57 V105" stroke={COLORS.blue} strokeWidth="4" opacity="0.56" />
      </g>

      <g transform="translate(208 25)" filter="url(#site-shadow)">
        <polygon points="28,52 102,18 176,52 102,87" fill="url(#site-plane)" />
        <polygon points="28,52 102,87 102,174 28,139" fill="#8FA4D7" />
        <polygon points="176,52 102,87 102,174 176,139" fill="url(#site-blue)" />
        {[76, 105, 134].map((y) => <path key={y} d={`M42 ${y} L102 ${y + 28} L160 ${y}`} fill="none" stroke={COLORS.white} strokeWidth="3" opacity="0.54" />)}
        <path d="M102 18 V0" stroke={COLORS.orange} strokeWidth="4" />
        <path d="M102 2 H178" stroke={COLORS.orange} strokeWidth="4" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - crane} />
        <path d="M176 2 V42" stroke={COLORS.orange} strokeWidth="3" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - crane} />
      </g>

      <g transform={`translate(392 64) rotate(${planTurn} 56 55)`} filter="url(#site-shadow)">
        <polygon points="0,24 78,0 112,84 34,108" fill={COLORS.white} stroke={COLORS.bluePale} strokeWidth="3" />
        <path d="M22 31 L72 16 L90 72 L42 88 Z M33 42 L72 30 M41 56 L80 44 M47 70 L86 58" fill="none" stroke={COLORS.blue} strokeWidth="3" opacity="0.62" />
        <path d="M12 85 L32 104 L105 81" fill="none" stroke={COLORS.orange} strokeWidth="4" />
      </g>
    </svg>
  )
}

function DataObject({ frame }: { frame: number }) {
  const chart = easeOut(frame, 126, 185)
  const float = Math.sin(frame / 23) * 4

  return (
    <svg viewBox="0 0 250 220" style={{ width: '100%', height: '100%', overflow: 'visible', transform: `translateY(${float}px)` }}>
      <defs>
        <linearGradient id="data-side" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9BAEDD" />
          <stop offset="1" stopColor={COLORS.blueDeep} />
        </linearGradient>
        <filter id="data-shadow" x="-40%" y="-40%" width="180%" height="190%">
          <feDropShadow dx="0" dy="15" stdDeviation="11" floodColor="#172D72" floodOpacity="0.17" />
        </filter>
      </defs>
      <ellipse cx="125" cy="190" rx="72" ry="13" fill="#142354" opacity="0.08" />
      <g filter="url(#data-shadow)">
        <ellipse cx="116" cy="70" rx="69" ry="30" fill={COLORS.bluePale} />
        <path d="M47 70 V151 C47 168 78 182 116 182 C154 182 185 168 185 151 V70" fill="url(#data-side)" />
        <ellipse cx="116" cy="70" rx="69" ry="30" fill={COLORS.white} stroke={COLORS.blue} strokeWidth="4" />
        <ellipse cx="116" cy="111" rx="69" ry="30" fill="none" stroke={COLORS.white} strokeWidth="3" opacity="0.5" />
        <ellipse cx="116" cy="151" rx="69" ry="30" fill="none" stroke={COLORS.white} strokeWidth="3" opacity="0.5" />
      </g>
      <path d="M74 112 L98 95 L121 105 L145 76 L171 61" fill="none" stroke={COLORS.orange} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - chart} />
      {[74, 98, 121, 145, 171].map((cx, index) => (
        <circle key={cx} cx={cx} cy={[112, 95, 105, 76, 61][index]} r="5" fill={COLORS.orange} opacity={chart} />
      ))}
    </svg>
  )
}

function AlgorithmObject({ frame }: { frame: number }) {
  const rotation = frame * 0.45
  const pulse = 1 + Math.sin(frame / 15) * 0.035

  return (
    <svg viewBox="0 0 260 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <radialGradient id="algo-core" cx="34%" cy="28%" r="72%">
          <stop offset="0" stopColor={COLORS.white} />
          <stop offset="0.4" stopColor={COLORS.orangePale} />
          <stop offset="1" stopColor={COLORS.orange} />
        </radialGradient>
        <filter id="algo-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#172D72" floodOpacity="0.18" />
        </filter>
      </defs>
      <ellipse cx="130" cy="190" rx="66" ry="12" fill="#142354" opacity="0.08" />
      <g transform={`rotate(${rotation} 130 106)`}>
        <ellipse cx="130" cy="106" rx="94" ry="35" fill="none" stroke={COLORS.blue} strokeWidth="9" opacity="0.72" />
        <circle cx="222" cy="106" r="8" fill={COLORS.blueDeep} />
      </g>
      <g transform={`rotate(${-rotation * 0.72} 130 106)`}>
        <ellipse cx="130" cy="106" rx="48" ry="92" fill="none" stroke={COLORS.bluePale} strokeWidth="8" />
        <circle cx="130" cy="16" r="7" fill={COLORS.orange} />
      </g>
      <g transform={`translate(130 106) scale(${pulse}) translate(-130 -106)`} filter="url(#algo-shadow)">
        <circle cx="130" cy="106" r="41" fill="url(#algo-core)" />
        <path d="M113 107 H147 M130 90 V124" stroke={COLORS.white} strokeWidth="6" strokeLinecap="round" opacity="0.84" />
      </g>
    </svg>
  )
}

function TechnologyObject({ frame }: { frame: number }) {
  const orbit = frame * 0.55
  const float = Math.sin((frame + 18) / 24) * 4

  return (
    <svg viewBox="0 0 250 220" style={{ width: '100%', height: '100%', overflow: 'visible', transform: `translateY(${float}px)` }}>
      <defs>
        <linearGradient id="tech-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COLORS.orangePale} />
          <stop offset="1" stopColor={COLORS.orange} />
        </linearGradient>
        <linearGradient id="tech-side" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COLORS.blue} />
          <stop offset="1" stopColor={COLORS.blueDeep} />
        </linearGradient>
        <filter id="tech-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#172D72" floodOpacity="0.18" />
        </filter>
      </defs>
      <ellipse cx="124" cy="190" rx="70" ry="13" fill="#142354" opacity="0.08" />
      <g filter="url(#tech-shadow)">
        <polygon points="124,40 188,74 124,111 60,74" fill="url(#tech-face)" />
        <polygon points="60,74 124,111 124,174 60,137" fill="#8FA4D7" />
        <polygon points="188,74 124,111 124,174 188,137" fill="url(#tech-side)" />
        <circle cx="124" cy="76" r="22" fill={COLORS.white} opacity="0.9" />
        <path d="M112 76 H136 M124 64 V88" stroke={COLORS.blueDeep} strokeWidth="5" strokeLinecap="round" />
      </g>
      <g transform={`rotate(${orbit} 124 105)`}>
        <ellipse cx="124" cy="105" rx="103" ry="56" fill="none" stroke={COLORS.bluePale} strokeWidth="3" />
        <circle cx="223" cy="105" r="7" fill={COLORS.orange} />
      </g>
    </svg>
  )
}

function FlowParticle({
  frame,
  start,
  phase,
  points,
  color,
}: {
  frame: number
  start: number
  phase: number
  points: [[number, number], [number, number], [number, number]]
  color: string
}) {
  const local = frame - start + phase
  if (local < 0) return null
  const t = (local % 112) / 112
  const point = quadraticPoint(t, points[0], points[1], points[2])
  const opacity = easeOut(frame, start, start + 24) * Math.sin(Math.PI * t)

  return <circle cx={point.x} cy={point.y} r="7" fill={color} opacity={opacity} />
}

const LOOPS = [
  {
    d: 'M 810 555 Q 600 548 418 665',
    points: [[810, 555], [600, 548], [418, 665]] as [[number, number], [number, number], [number, number]],
  },
  {
    d: 'M 418 730 Q 610 880 825 848',
    points: [[418, 730], [610, 880], [825, 848]] as [[number, number], [number, number], [number, number]],
  },
  {
    d: 'M 1095 848 Q 1310 880 1502 730',
    points: [[1095, 848], [1310, 880], [1502, 730]] as [[number, number], [number, number], [number, number]],
  },
  {
    d: 'M 1502 665 Q 1320 548 1110 555',
    points: [[1502, 665], [1320, 548], [1110, 555]] as [[number, number], [number, number], [number, number]],
  },
] as const

export function ProductStrategySystemClip() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const problem = easeOut(frame, 28, 62)
  const product = easeOut(frame, 62, 96)
  const strategy = spring({
    frame: frame - 82,
    fps,
    durationInFrames: 32,
    config: { damping: 21, stiffness: 120, mass: 0.9 },
  })
  const loop = easeOut(frame, 102, 205)
  const pipeline = easeOut(frame, 94, 144)

  return (
    <AbsoluteFill style={{ ...font, background: COLORS.paper, color: COLORS.ink, overflow: 'hidden' }}>
      <svg viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <marker id="system-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={COLORS.muted} />
          </marker>
        </defs>

        <path d="M960 270 V348" stroke={COLORS.line} strokeWidth="3" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - problem} opacity={problem} markerEnd="url(#system-arrow)" />
        <path d="M960 410 V476" stroke={COLORS.line} strokeWidth="3" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - product} opacity={product} markerEnd="url(#system-arrow)" />
        <path d="M960 640 V758" stroke={COLORS.line} strokeWidth="3" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - loop} opacity={loop} markerEnd="url(#system-arrow)" />

        {LOOPS.map((path) => (
          <path
            key={path.d}
            d={path.d}
            fill="none"
            stroke={COLORS.line}
            strokeWidth="3"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - loop}
            opacity={loop}
            markerEnd="url(#system-arrow)"
          />
        ))}

        {LOOPS.flatMap((path, index) => [
          <FlowParticle key={`${index}-a`} frame={frame} start={148 + index * 8} phase={0} points={path.points} color={index === 3 ? COLORS.orange : COLORS.blue} />,
          <FlowParticle key={`${index}-b`} frame={frame} start={148 + index * 8} phase={56} points={path.points} color={index === 3 ? COLORS.orange : COLORS.blueDeep} />,
        ])}
      </svg>

      <RevealNode frame={frame} fps={fps} start={4} left={700} top={16} width={520} height={230}>
        <ConstructionReality frame={frame} />
      </RevealNode>

      <div
        style={{
          position: 'absolute',
          left: 690,
          top: 245,
          width: 540,
          textAlign: 'center',
          fontSize: 25,
          fontWeight: 720,
          letterSpacing: '0.11em',
          color: COLORS.blueDeep,
          opacity: problem,
          transform: `translateY(${(1 - problem) * 20}px)`,
        }}
      >
        PROBLEM / NECESSITY
      </div>

      <div
        style={{
          position: 'absolute',
          left: 760,
          top: 350,
          width: 400,
          textAlign: 'center',
          fontSize: 52,
          fontWeight: 640,
          letterSpacing: '-0.045em',
          color: COLORS.blue,
          opacity: product,
          transform: `translateY(${(1 - product) * 22}px)`,
        }}
      >
        PRODUCT
      </div>

      <div
        style={{
          position: 'absolute',
          left: 748,
          top: 462,
          width: 424,
          height: 176,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: strategy,
          transform: `translateY(${(1 - strategy) * 30}px) scale(${0.97 + strategy * 0.03})`,
        }}
      >
        <img src={assetUrl('assets/gen-logo-navy.png')} alt="GEN+" style={{ width: 176, height: 'auto' }} />
        <strong style={{ marginTop: 14, fontSize: 56, fontWeight: 650, lineHeight: 1, letterSpacing: '-0.05em' }}>STRATEGY</strong>
        <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
          {[0, 1, 2, 3].map((index) => (
            <span
              key={index}
              style={{
                width: 64,
                height: 8,
                borderRadius: 99,
                background: index === 3 ? COLORS.orange : COLORS.blueDeep,
                opacity: pipeline,
                transform: `scaleX(${pipeline})`,
                transformOrigin: 'left',
              }}
            />
          ))}
        </div>
      </div>

      <RevealNode frame={frame} fps={fps} start={110} left={230} top={538} width={250} height={220}>
        <DataObject frame={frame} />
      </RevealNode>
      <RevealNode frame={frame} fps={fps} start={132} left={835} top={738} width={250} height={220}>
        <AlgorithmObject frame={frame} />
      </RevealNode>
      <RevealNode frame={frame} fps={fps} start={154} left={1440} top={538} width={250} height={220}>
        <TechnologyObject frame={frame} />
      </RevealNode>

      {[
        { label: 'DATA', left: 168, top: 735, start: 118 },
        { label: 'ALGORITHMS', left: 760, top: 954, start: 140 },
        { label: 'TECHNOLOGY', left: 1375, top: 735, start: 162 },
      ].map((item) => {
        const reveal = easeOut(frame, item.start, item.start + 32)
        return (
          <strong
            key={item.label}
            style={{
              position: 'absolute',
              left: item.left,
              top: item.top,
              width: item.label === 'ALGORITHMS' ? 400 : 380,
              textAlign: 'center',
              color: item.label === 'ALGORITHMS' ? COLORS.blueDeep : COLORS.ink,
              fontSize: 39,
              fontWeight: 650,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              opacity: reveal,
              transform: `translateY(${(1 - reveal) * 18}px)`,
            }}
          >
            {item.label}
          </strong>
        )
      })}
    </AbsoluteFill>
  )
}
