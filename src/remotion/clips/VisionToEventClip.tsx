import { interpolate, useCurrentFrame } from 'remotion'
import { ClipShell, fadeSlide } from './ClipShell'

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const

// 9 s: frame → zona → detección → clasificación → contexto → evento estructurado.
export function VisionToEventClip() {
  const frame = useCurrentFrame()
  const vf = interpolate(frame, [8, 36], [0, 1], clamp)
  const zoneOn = frame >= 48
  const bboxDraw = interpolate(frame, [82, 112], [0, 1], clamp)
  const classOn = frame >= 122
  const ctxOn = frame >= 158
  const cardT = interpolate(frame, [192, 224], [0, 1], clamp)
  const cardEase = 1 - Math.pow(1 - cardT, 3.2)

  return (
    <ClipShell>
      {/* Encuadre de cámara */}
      <div
        style={{
          position: 'absolute',
          left: 96,
          top: 132,
          width: 1020,
          opacity: vf,
          transform: `scale(${0.96 + vf * 0.04})`,
          transformOrigin: 'left center',
        }}
      >
        <svg viewBox="0 0 640 400" style={{ width: '100%' }} fill="none">
          <rect x="4" y="4" width="632" height="392" rx="10" className="vf-frame" style={{ stroke: 'var(--border-strong)' }} />
          <line x1="4" y1="136" x2="636" y2="136" className="vf-grid" />
          <line x1="4" y1="268" x2="636" y2="268" className="vf-grid" />
          <line x1="213" y1="4" x2="213" y2="396" className="vf-grid" />
          <line x1="426" y1="4" x2="426" y2="396" className="vf-grid" />
          {/* zona restringida */}
          <rect
            x="360" y="90" width="240" height="260"
            style={{
              stroke: zoneOn ? 'var(--risk)' : 'var(--border)',
              strokeDasharray: '10 8',
              fill: zoneOn ? 'color-mix(in oklch, var(--risk) 6%, transparent)' : 'transparent',
            }}
          />
          {zoneOn ? (
            <text x="372" y="80" className="vf-tag" style={{ fill: 'var(--risk)' }}>ZONA RESTRINGIDA Z-04</text>
          ) : null}
          {/* persona */}
          <g>
            <circle cx="452" cy="196" r="12" style={{ stroke: 'var(--text-secondary)', fill: 'color-mix(in oklch, var(--surface-raised) 70%, transparent)' }} />
            <rect x="440" y="212" width="24" height="52" rx="7" style={{ stroke: 'var(--text-secondary)', fill: 'color-mix(in oklch, var(--surface-raised) 70%, transparent)' }} />
          </g>
          {/* bbox de detección que se dibuja */}
          <rect
            x="424" y="172" width="88" height="104"
            pathLength={1}
            style={{
              stroke: 'var(--perception)',
              strokeWidth: 2.4,
              strokeDasharray: 1,
              strokeDashoffset: 1 - bboxDraw,
              fill: bboxDraw > 0.9 ? 'color-mix(in oklch, var(--perception) 8%, transparent)' : 'transparent',
            }}
          />
          {bboxDraw > 0.9 ? (
            <text x="424" y="164" className="vf-tag" style={{ fill: 'var(--perception)' }}>PERSONA</text>
          ) : null}
          <text x="18" y="384" className="vf-hud">CAM-02 · 10:42:07 · REPRESENTACIÓN CONCEPTUAL</text>
        </svg>
        {/* chips de clasificación y contexto */}
        <div style={{ position: 'absolute', left: 26, top: 26, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {classOn ? (
            <span style={{ ...fadeSlide(frame, 122, 14), ...chipStyle('var(--perception)') }}>
              CLASIFICACIÓN · presencia humana
            </span>
          ) : null}
          {ctxOn ? (
            <span style={{ ...fadeSlide(frame, 158, 14), ...chipStyle('var(--signal-bright)') }}>
              CONTEXTO · turno activo · sin permiso registrado
            </span>
          ) : null}
        </div>
      </div>

      {/* payload del evento */}
      <div
        style={{
          position: 'absolute',
          right: 110,
          top: 250,
          width: 560,
          padding: '34px 38px',
          border: '1px solid var(--signal-bright)',
          borderRadius: 20,
          background: 'color-mix(in oklch, var(--background-deep) 88%, transparent)',
          boxShadow: '0 0 60px var(--glow)',
          opacity: cardEase,
          transform: `translate3d(${(1 - cardEase) * -140}px, 0, 0) scale(${0.9 + cardEase * 0.1})`,
        }}
      >
        <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 16, letterSpacing: '0.16em', color: 'var(--signal-bright)' }}>
          EVENTO ESTRUCTURADO
        </p>
        <pre
          style={{
            margin: '18px 0 0',
            fontFamily: 'var(--font-mono)',
            fontSize: 22,
            lineHeight: 1.7,
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap',
          }}
        >
{`tipo:      presencia_en_zona
zona:      Z-04 · acceso restringido
cámara:    CAM-02
hora:      10:42:07
confianza: demo conceptual`}
        </pre>
      </div>

      {/* claim final */}
      <h2
        style={{
          ...fadeSlide(frame, 234, 20, 26),
          position: 'absolute',
          left: 96,
          bottom: 108,
          margin: 0,
          maxWidth: 1100,
          fontFamily: 'var(--font-display)',
          fontSize: 56,
          fontWeight: 560,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
        }}
      >
        La cámara no es el producto. <span style={{ color: 'var(--signal-bright)' }}>El producto es el evento.</span>
      </h2>
    </ClipShell>
  )
}

function chipStyle(color: string) {
  return {
    display: 'inline-block',
    padding: '10px 16px',
    border: `1px solid ${color}`,
    borderRadius: 999,
    background: 'color-mix(in oklch, var(--background-deep) 84%, transparent)',
    fontFamily: 'var(--font-mono)',
    fontSize: 17,
    letterSpacing: '0.08em',
    color: 'var(--text-primary)',
  } as const
}
