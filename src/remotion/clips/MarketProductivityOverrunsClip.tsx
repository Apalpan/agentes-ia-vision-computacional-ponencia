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
  paper: '#F7F8FA',
  white: '#FFFFFF',
  navy: '#101B4D',
  blue: '#2856D8',
  blueSoft: '#94B8E8',
  bluePale: '#DCE8F5',
  orange: '#E4782C',
  inkSoft: '#536078',
  line: '#D7DCE6',
}

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const

const smooth = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.23, 1, 0.32, 1),
  })

const chapterOpacity = (
  frame: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number,
) =>
  smooth(frame, enterStart, enterEnd) *
  interpolate(frame, [exitStart, exitEnd], [1, 0], {
    ...clamp,
    easing: Easing.bezier(0.77, 0, 0.175, 1),
  })

const kinetic = (
  frame: number,
  fps: number,
  start: number,
  distance = 42,
): CSSProperties => {
  const reveal = spring({
    frame: frame - start,
    fps,
    durationInFrames: 28,
    config: { damping: 20, stiffness: 120, mass: 0.9 },
  })

  return {
    opacity: reveal,
    transform: `translateY(${(1 - reveal) * distance}px)`,
  }
}

const font: CSSProperties = {
  fontFamily: '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", sans-serif',
  color: COLORS.navy,
}

function BrandFrame({ children }: { children: ReactNode }) {
  return (
    <AbsoluteFill style={{ background: COLORS.paper, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          left: 82,
          right: 82,
          top: 66,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          zIndex: 20,
        }}
      >
        <img
          src={assetUrl('assets/gen-logo-navy.png')}
          alt="GEN+"
          style={{ width: 132, height: 'auto', display: 'block' }}
        />
      </div>

      {children}

      <p
        style={{
          ...font,
          position: 'absolute',
          left: 82,
          bottom: 42,
          margin: 0,
          color: COLORS.inkSoft,
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: '0.005em',
          zIndex: 20,
        }}
      >
        Fuentes referenciales: McKinsey · BCG · FMI · Oxford Economics · Dodge Data &amp; Analytics
      </p>
    </AbsoluteFill>
  )
}

function MarketChapter({ frame, fps }: { frame: number; fps: number }) {
  const opacity = chapterOpacity(frame, 0, 18, 92, 116)
  const bars = [0.34, 0.44, 0.54, 0.62, 0.7, 0.79, 0.86, 0.93, 1]
  const count = interpolate(frame, [18, 76], [4.11, 5.99], clamp)

  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      <section style={{ position: 'absolute', left: 90, top: 188, width: 820 }}>
        <p
          style={{
            ...font,
            ...kinetic(frame, fps, 4, 26),
            margin: 0,
            color: COLORS.blue,
            fontSize: 24,
            fontWeight: 650,
            letterSpacing: '0.02em',
          }}
        >
          Gran mercado
        </p>
        <h1
          style={{
            ...font,
            ...kinetic(frame, fps, 10, 54),
            margin: '18px 0 0',
            fontSize: 134,
            fontWeight: 620,
            lineHeight: 0.9,
            letterSpacing: '-0.065em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          US$ {count.toFixed(2)}T
        </h1>
        <p
          style={{
            ...font,
            ...kinetic(frame, fps, 22, 28),
            margin: '34px 0 0',
            maxWidth: 650,
            color: COLORS.inkSoft,
            fontSize: 34,
            fontWeight: 500,
            lineHeight: 1.18,
            letterSpacing: '-0.025em',
          }}
        >
          Industria global proyectada a <strong style={{ color: COLORS.blue }}>2035</strong>
        </p>
      </section>

      <div style={{ position: 'absolute', right: 100, top: 214, width: 770, height: 560 }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 60,
            height: 1,
            background: COLORS.line,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 20,
            right: 20,
            bottom: 61,
            height: 420,
            display: 'flex',
            alignItems: 'flex-end',
            gap: 20,
          }}
        >
          {bars.map((height, index) => {
            const reveal = spring({
              frame: frame - (18 + index * 4),
              fps,
              durationInFrames: 26,
              config: { damping: 22, stiffness: 130, mass: 0.8 },
            })
            return (
              <div
                key={height}
                style={{
                  flex: 1,
                  height: `${height * 100}%`,
                  transform: `scaleY(${reveal})`,
                  transformOrigin: 'bottom',
                  background:
                    index === bars.length - 1
                      ? COLORS.blue
                      : `rgba(40, 86, 216, ${0.16 + index * 0.075})`,
                  borderRadius: '8px 8px 0 0',
                }}
              />
            )
          })}
        </div>
        <span
          style={{
            ...font,
            position: 'absolute',
            left: 20,
            bottom: 12,
            color: COLORS.inkSoft,
            fontSize: 19,
            fontWeight: 560,
          }}
        >
          2026
        </span>
        <span
          style={{
            ...font,
            position: 'absolute',
            right: 20,
            bottom: 12,
            color: COLORS.blue,
            fontSize: 19,
            fontWeight: 700,
          }}
        >
          2035
        </span>
      </div>
    </div>
  )
}

function ProductivityChapter({ frame, fps }: { frame: number; fps: number }) {
  const opacity = chapterOpacity(frame, 92, 116, 198, 220)
  const lineReveal = smooth(frame, 120, 178)
  const productivity = interpolate(frame, [118, 168], [0, 1], clamp)

  const paths = [
    {
      d: 'M 70 392 C 170 360 220 318 316 260 S 492 138 700 92',
      color: COLORS.navy,
      label: 'Manufactura',
      y: 82,
    },
    {
      d: 'M 70 392 C 184 366 250 334 340 292 S 520 214 700 170',
      color: COLORS.blueSoft,
      label: 'Economía global',
      y: 160,
    },
    {
      d: 'M 70 392 C 190 385 286 372 390 360 S 560 336 700 342',
      color: COLORS.orange,
      label: 'Construcción',
      y: 332,
    },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      <section style={{ position: 'absolute', left: 90, top: 186, width: 740 }}>
        <p
          style={{
            ...font,
            ...kinetic(frame, fps, 100, 26),
            margin: 0,
            color: COLORS.blue,
            fontSize: 24,
            fontWeight: 650,
          }}
        >
          Baja productividad
        </p>
        <h1
          style={{
            ...font,
            ...kinetic(frame, fps, 106, 54),
            margin: '18px 0 0',
            fontSize: 158,
            fontWeight: 620,
            lineHeight: 0.88,
            letterSpacing: '-0.075em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          ~{productivity.toFixed(1)}%
        </h1>
        <p
          style={{
            ...font,
            ...kinetic(frame, fps, 118, 28),
            margin: '34px 0 0',
            maxWidth: 630,
            color: COLORS.inkSoft,
            fontSize: 34,
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
          }}
        >
          Crecimiento anual de la construcción <strong style={{ color: COLORS.orange }}>durante décadas</strong>
        </p>
      </section>

      <div style={{ position: 'absolute', right: 90, top: 216, width: 840, height: 560 }}>
        <svg viewBox="0 0 840 500" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          {[96, 196, 296, 396].map((y) => (
            <line key={y} x1="70" x2="700" y1={y} y2={y} stroke={COLORS.line} strokeWidth="1" />
          ))}
          <line x1="70" x2="70" y1="70" y2="396" stroke={COLORS.line} strokeWidth="1" />
          {paths.map((path) => (
            <g key={path.label}>
              <path
                d={path.d}
                fill="none"
                stroke={path.color}
                strokeWidth="5"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - lineReveal}
              />
              <text
                x="720"
                y={path.y + 10}
                fill={path.color}
                fontFamily="Plus Jakarta Sans Variable, Plus Jakarta Sans, sans-serif"
                fontSize="18"
                fontWeight="650"
                opacity={smooth(frame, 156, 182)}
              >
                {path.label}
              </text>
            </g>
          ))}
          <text x="66" y="438" fill={COLORS.inkSoft} fontFamily="Plus Jakarta Sans Variable, sans-serif" fontSize="17">1995</text>
          <text x="650" y="438" fill={COLORS.inkSoft} fontFamily="Plus Jakarta Sans Variable, sans-serif" fontSize="17">2014</text>
        </svg>
      </div>
    </div>
  )
}

function OverrunsChapter({ frame, fps }: { frame: number; fps: number }) {
  const opacity = chapterOpacity(frame, 198, 220, 292, 314)
  const divergence = smooth(frame, 224, 276)
  const low = Math.round(interpolate(frame, [218, 266], [0, 70], clamp))
  const high = Math.round(interpolate(frame, [224, 276], [0, 90], clamp))

  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      <section style={{ position: 'absolute', left: 90, top: 186, width: 850 }}>
        <p
          style={{
            ...font,
            ...kinetic(frame, fps, 204, 26),
            margin: 0,
            color: COLORS.blue,
            fontSize: 24,
            fontWeight: 650,
          }}
        >
          Sobrecostos recurrentes
        </p>
        <h1
          style={{
            ...font,
            ...kinetic(frame, fps, 210, 54),
            margin: '18px 0 0',
            fontSize: 146,
            fontWeight: 620,
            lineHeight: 0.88,
            letterSpacing: '-0.075em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {low}–{high}%
        </h1>
        <p
          style={{
            ...font,
            ...kinetic(frame, fps, 222, 28),
            margin: '34px 0 0',
            maxWidth: 720,
            color: COLORS.inkSoft,
            fontSize: 34,
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
          }}
        >
          de proyectos con desvíos en <strong style={{ color: COLORS.orange }}>costo y plazo</strong>
        </p>
      </section>

      <div style={{ position: 'absolute', right: 96, top: 252, width: 740, height: 470 }}>
        <svg viewBox="0 0 740 470" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <line x1="54" x2="686" y1="344" y2="344" stroke={COLORS.line} strokeWidth="2" />
          <path
            d="M 54 344 C 190 344 306 306 406 226 S 570 112 686 84"
            fill="none"
            stroke={COLORS.blue}
            strokeWidth="6"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - divergence}
          />
          <path
            d="M 54 344 C 180 344 302 330 410 292 S 574 230 686 198"
            fill="none"
            stroke={COLORS.orange}
            strokeWidth="6"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - divergence}
          />
          <text x="594" y="62" fill={COLORS.blue} fontFamily="Plus Jakarta Sans Variable, sans-serif" fontSize="20" fontWeight="700" opacity={smooth(frame, 254, 278)}>COSTO</text>
          <text x="590" y="190" fill={COLORS.orange} fontFamily="Plus Jakarta Sans Variable, sans-serif" fontSize="20" fontWeight="700" opacity={smooth(frame, 260, 284)}>PLAZO</text>
          <text x="48" y="388" fill={COLORS.inkSoft} fontFamily="Plus Jakarta Sans Variable, sans-serif" fontSize="17">PLAN</text>
          <text x="624" y="388" fill={COLORS.inkSoft} fontFamily="Plus Jakarta Sans Variable, sans-serif" fontSize="17">REAL</text>
        </svg>
      </div>
    </div>
  )
}

const FINAL_DATA = [
  { metric: 'US$ 5.99T', label: 'Gran mercado', note: 'proyección 2035', color: COLORS.blue },
  { metric: '~1%', label: 'Baja productividad', note: 'crecimiento anual', color: COLORS.orange },
  { metric: '70–90%', label: 'Sobrecostos recurrentes', note: 'proyectos con desvíos', color: COLORS.navy },
] as const

function FinalSynthesis({ frame, fps }: { frame: number; fps: number }) {
  const opacity = smooth(frame, 292, 316)

  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      <div
        style={{
          position: 'absolute',
          left: 86,
          right: 86,
          top: 214,
          bottom: 150,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          alignItems: 'center',
        }}
      >
        {FINAL_DATA.map((item, index) => {
          const entry = kinetic(frame, fps, 300 + index * 7, 34)
          return (
            <article
              key={item.label}
              style={{
                ...entry,
                minHeight: 460,
                padding: index === 0 ? '40px 64px 40px 10px' : '40px 64px',
                borderLeft: index === 0 ? undefined : `1px solid ${COLORS.line}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  ...font,
                  color: item.color,
                  fontSize: 80,
                  fontWeight: 650,
                  lineHeight: 0.94,
                  letterSpacing: '-0.06em',
                  fontVariantNumeric: 'tabular-nums',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.metric}
              </span>
              <strong
                style={{
                  ...font,
                  marginTop: 34,
                  fontSize: 36,
                  fontWeight: 620,
                  lineHeight: 1.08,
                  letterSpacing: '-0.035em',
                }}
              >
                {item.label}
              </strong>
              <span
                style={{
                  ...font,
                  marginTop: 14,
                  color: COLORS.inkSoft,
                  fontSize: 22,
                  fontWeight: 500,
                }}
              >
                {item.note}
              </span>
              <i
                style={{
                  display: 'block',
                  width: index === 0 ? '74%' : index === 1 ? '38%' : '88%',
                  height: 5,
                  marginTop: 42,
                  borderRadius: 99,
                  background: item.color,
                  transform: `scaleX(${smooth(frame, 314 + index * 7, 344 + index * 7)})`,
                  transformOrigin: 'left',
                }}
              />
            </article>
          )
        })}
      </div>
    </div>
  )
}

export function MarketProductivityOverrunsClip() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <BrandFrame>
      <MarketChapter frame={frame} fps={fps} />
      <ProductivityChapter frame={frame} fps={fps} />
      <OverrunsChapter frame={frame} fps={fps} />
      <FinalSynthesis frame={frame} fps={fps} />
    </BrandFrame>
  )
}
