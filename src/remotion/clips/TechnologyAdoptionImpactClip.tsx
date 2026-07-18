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
  paper: '#F7F7F5',
  ink: '#0A1029',
  muted: '#697084',
  line: '#D9DDE5',
  blue: '#315CD8',
  red: '#EF4A50',
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

const IMPACTS = [
  {
    actor: 'PROFESIONAL',
    metric: '15–30%',
    detail: 'menos productividad potencial\ny empleabilidad estancada',
    start: 52,
  },
  {
    actor: 'EMPRESA',
    metric: '22%',
    detail: 'del retrabajo asociado a baja\nadopción tecnológica',
    start: 88,
  },
  {
    actor: 'PROYECTO',
    metric: '5%',
    detail: 'del presupuesto consumido\npor retrabajo',
    start: 124,
  },
] as const

export function TechnologyAdoptionImpactClip() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const title = spring({
    frame: frame - 4,
    fps,
    durationInFrames: 30,
    config: { damping: 22, stiffness: 130, mass: 0.85 },
  })
  const subtitle = easeOut(frame, 22, 54)
  const topRule = easeOut(frame, 34, 92)
  const close = easeOut(frame, 176, 218)

  return (
    <AbsoluteFill
      style={{
        background: COLORS.paper,
        color: COLORS.ink,
        overflow: 'hidden',
        ...font,
      }}
    >
      <img
        src={assetUrl('assets/gen-logo-navy.png')}
        alt="GEN+"
        style={{
          position: 'absolute',
          right: 86,
          top: 58,
          width: 132,
          height: 'auto',
        }}
      />

      <header
        style={{
          position: 'absolute',
          left: 88,
          top: 78,
          right: 260,
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <h1
            style={{
              margin: 0,
              fontSize: 94,
              fontWeight: 630,
              lineHeight: 1,
              letterSpacing: '-0.062em',
              opacity: title,
              transform: `translateY(${(1 - title) * 62}px)`,
            }}
          >
            La baja adopción tecnológica
          </h1>
        </div>

        <p
          style={{
            margin: '34px 0 0',
            color: COLORS.muted,
            fontSize: 31,
            fontWeight: 500,
            letterSpacing: '-0.025em',
            opacity: subtitle,
            transform: `translateY(${(1 - subtitle) * 20}px)`,
          }}
        >
          Productividad <span style={{ color: COLORS.red }}>·</span> Margen{' '}
          <span style={{ color: COLORS.red }}>·</span> Empleabilidad
        </p>
      </header>

      <div
        style={{
          position: 'absolute',
          left: 88,
          right: 88,
          top: 314,
          height: 2,
          background: COLORS.line,
          transform: `scaleX(${topRule})`,
          transformOrigin: 'left',
        }}
      >
        <span
          style={{
            display: 'block',
            width: '27%',
            height: '100%',
            background: `linear-gradient(90deg, ${COLORS.red}, ${COLORS.blue})`,
          }}
        />
      </div>

      <main
        style={{
          position: 'absolute',
          left: 88,
          right: 88,
          top: 368,
          bottom: 112,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        {IMPACTS.map((impact, index) => {
          const reveal = spring({
            frame: frame - impact.start,
            fps,
            durationInFrames: 32,
            config: { damping: 20, stiffness: 125, mass: 0.9 },
          })
          const metric = easeOut(frame, impact.start + 8, impact.start + 40)
          const separator = easeOut(frame, impact.start + 14, impact.start + 58)

          return (
            <section
              key={impact.actor}
              style={{
                position: 'relative',
                paddingLeft: index === 0 ? 0 : 54,
                paddingRight: index === 2 ? 0 : 54,
              }}
            >
              {index > 0 ? (
                <i
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 16,
                    width: 1,
                    background: COLORS.line,
                    transform: `scaleY(${separator})`,
                    transformOrigin: 'top',
                  }}
                />
              ) : null}

              <div
                style={{
                  opacity: reveal,
                  transform: `translateY(${(1 - reveal) * 38}px)`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                    color: index === 1 ? COLORS.blue : COLORS.red,
                    fontSize: 21,
                    fontWeight: 720,
                    letterSpacing: '0.14em',
                  }}
                >
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      background: 'currentColor',
                    }}
                  />
                  {impact.actor}
                </div>

                <strong
                  style={{
                    display: 'block',
                    marginTop: 44,
                    color: COLORS.ink,
                    fontSize: 122,
                    fontWeight: 650,
                    lineHeight: 0.9,
                    letterSpacing: '-0.07em',
                    fontVariantNumeric: 'tabular-nums',
                    opacity: metric,
                    transform: `translateX(${(1 - metric) * 28}px)`,
                  }}
                >
                  {impact.metric}
                </strong>

                <p
                  style={{
                    margin: '38px 0 0',
                    color: COLORS.muted,
                    fontSize: 27,
                    fontWeight: 500,
                    lineHeight: 1.34,
                    letterSpacing: '-0.025em',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {impact.detail}
                </p>
              </div>
            </section>
          )
        })}
      </main>

      <div
        style={{
          position: 'absolute',
          left: 88,
          bottom: 66,
          width: 118,
          height: 5,
          borderRadius: 99,
          background: COLORS.red,
          transform: `scaleX(${close})`,
          transformOrigin: 'left',
        }}
      />
    </AbsoluteFill>
  )
}
