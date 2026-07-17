import { interpolate, useCurrentFrame } from 'remotion'
import { ClipShell, fadeSlide } from './ClipShell'
import { assetUrl } from '../../components/assetUrl'

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const

// 7 s: las señales convergen → el loop se completa → idea final → GEN+ sobrio.
export function ClosingClip() {
  const frame = useCurrentFrame()
  const converge = interpolate(frame, [10, 84], [0, 1], clamp)
  const ring = interpolate(frame, [64, 132], [0, 1], clamp)
  return (
    <ClipShell>
      <div style={{ position: 'absolute', right: 60, top: '50%', transform: 'translateY(-50%)', width: 640, opacity: 0.9 }}>
        <svg viewBox="0 0 600 600" fill="none" style={{ width: '100%' }}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180
            const outer = 300 - converge * 60
            const inner = 190 - converge * 30
            return (
              <line
                key={angle}
                x1={300 + Math.cos(rad) * outer}
                y1={300 + Math.sin(rad) * outer}
                x2={300 + Math.cos(rad) * inner}
                y2={300 + Math.sin(rad) * inner}
                style={{ stroke: 'color-mix(in oklch, var(--signal) 40%, transparent)', strokeDasharray: '8 10', opacity: converge }}
              />
            )
          })}
          <circle cx="300" cy="300" r="150" style={{ stroke: 'var(--border-strong)' }} />
          <circle
            cx="300"
            cy="300"
            r="150"
            pathLength={1}
            style={{
              stroke: 'var(--signal-bright)',
              strokeWidth: 3,
              strokeDasharray: 1,
              strokeDashoffset: 1 - ring,
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
              filter: 'drop-shadow(0 0 10px var(--glow))',
            }}
          />
          {ring >= 1 ? (
            <text
              x="300"
              y="310"
              textAnchor="middle"
              style={{ fill: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 22, letterSpacing: '0.2em' }}
            >
              LOOP CERRADO
            </text>
          ) : null}
        </svg>
      </div>
      <div style={{ position: 'absolute', left: 96, top: 300, maxWidth: 960 }}>
        <h2
          style={{
            ...fadeSlide(frame, 118, 22, 30),
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontSize: 78,
            fontWeight: 560,
            lineHeight: 1.04,
            letterSpacing: '-0.045em',
            color: 'var(--text-primary)',
          }}
        >
          No necesitamos una obra llena de IA.{' '}
          <em style={{ color: 'var(--signal-bright)', fontStyle: 'normal' }}>
            Necesitamos una obra que vea, decida y aprenda.
          </em>
        </h2>
        <div style={{ ...fadeSlide(frame, 168, 18), marginTop: 48, display: 'flex', alignItems: 'center', gap: 28 }}>
          <img src={assetUrl('assets/gen-logo-white.png')} alt="GEN+" style={{ width: 140 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, letterSpacing: '0.12em', color: 'var(--text-secondary)' }}>
            ALEJANDRO PALPAN · AI CONSTRUCTION
          </span>
        </div>
      </div>
    </ClipShell>
  )
}
