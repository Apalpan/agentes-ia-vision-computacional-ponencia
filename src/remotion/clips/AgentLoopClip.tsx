import { interpolate, useCurrentFrame } from 'remotion'
import { ClipShell, fadeSlide } from './ClipShell'

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const

const NODES = [
  { key: 'evento', label: 'EVENTO', at: 20 },
  { key: 'contexto', label: 'CONTEXTO', at: 60 },
  { key: 'evalua', label: 'EVALÚA', at: 100 },
  { key: 'herramienta', label: 'HERRAMIENTA', at: 140 },
  { key: 'humano', label: 'HUMANO', at: 180 },
  { key: 'accion', label: 'ACCIÓN', at: 224 },
  { key: 'evidencia', label: 'EVIDENCIA', at: 262 },
] as const

// 11 s: evento → contexto → evaluación → herramienta → humano → acción → evidencia → cierre.
export function AgentLoopClip() {
  const frame = useCurrentFrame()
  const beam = interpolate(frame, [20, 262], [0, 1], clamp)

  return (
    <ClipShell>
      <p
        style={{
          ...fadeSlide(frame, 8, 14),
          position: 'absolute',
          left: 96,
          top: 96,
          margin: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: 20,
          letterSpacing: '0.18em',
          color: 'var(--signal-bright)',
        }}
      >
        EL LOOP OPERATIVO · DE LA SEÑAL A LA EVIDENCIA
      </p>

      {/* payload que dispara el loop */}
      <div
        style={{
          ...fadeSlide(frame, 16, 18),
          position: 'absolute',
          left: 96,
          top: 170,
          padding: '18px 24px',
          border: '1px solid var(--signal-bright)',
          borderRadius: 14,
          background: 'color-mix(in oklch, var(--background-deep) 86%, transparent)',
          fontFamily: 'var(--font-mono)',
          fontSize: 19,
          color: 'var(--text-primary)',
          boxShadow: '0 0 40px var(--glow)',
        }}
      >
        presencia_en_zona · Z-04 · CAM-02 · 10:42
      </div>

      {/* riel de nodos */}
      <div style={{ position: 'absolute', left: 96, right: 96, top: 420 }}>
        <div style={{ position: 'relative', height: 2, background: 'var(--border)' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: `${beam * 100}%`,
              background: 'linear-gradient(90deg, var(--signal), var(--signal-bright))',
              boxShadow: '0 0 24px var(--glow)',
            }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 16, marginTop: -34 }}>
          {NODES.map((node) => {
            const on = frame >= node.at
            const isHuman = node.key === 'humano'
            return (
              <div key={node.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 66,
                    height: 66,
                    borderRadius: '50%',
                    border: `2px solid ${on ? (isHuman ? 'var(--decision)' : 'var(--signal-bright)') : 'var(--border)'}`,
                    background: on
                      ? isHuman
                        ? 'color-mix(in oklch, var(--decision) 18%, var(--surface))'
                        : 'color-mix(in oklch, var(--signal) 16%, var(--surface))'
                      : 'var(--surface)',
                    boxShadow: on ? `0 0 34px ${isHuman ? 'color-mix(in oklch, var(--decision) 45%, transparent)' : 'var(--glow)'}` : 'none',
                    display: 'grid',
                    placeItems: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 15,
                    color: on ? 'var(--text-primary)' : 'var(--text-faint)',
                  }}
                >
                  {on ? '●' : '○'}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 16,
                    letterSpacing: '0.1em',
                    color: on ? (isHuman ? 'var(--decision-soft)' : 'var(--text-primary)') : 'var(--text-faint)',
                  }}
                >
                  {node.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* anotaciones por etapa */}
      <div style={{ position: 'absolute', left: 96, right: 96, top: 600 }}>
        {frame >= 74 ? (
          <span style={{ ...fadeSlide(frame, 74, 14), ...noteStyle, left: '10%' }}>
            turno activo · permiso no registrado · criticidad alta
          </span>
        ) : null}
        {frame >= 192 ? (
          <span style={{ ...fadeSlide(frame, 192, 14), ...noteStyle, left: '52%', borderColor: 'var(--decision)', color: 'var(--text-primary)' }}>
            responsable SST confirma → APROBADO
          </span>
        ) : null}
        {frame >= 236 ? (
          <span style={{ ...fadeSlide(frame, 236, 14), ...noteStyle, left: '68%' }}>
            alerta con evidencia → canal SST
          </span>
        ) : null}
      </div>

      {/* cierre con evidencia */}
      <div
        style={{
          ...fadeSlide(frame, 276, 20, 24),
          position: 'absolute',
          left: 96,
          bottom: 120,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <span
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            border: '2px solid var(--evidence)',
            display: 'grid',
            placeItems: 'center',
            color: 'var(--evidence)',
            fontSize: 22,
          }}
        >
          ✓
        </span>
        <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 560, color: 'var(--text-primary)' }}>
          Evento, decisión y acción quedan <span style={{ color: 'var(--evidence)' }}>registrados</span>.
        </p>
      </div>
    </ClipShell>
  )
}

const noteStyle = {
  position: 'absolute' as const,
  padding: '10px 16px',
  border: '1px solid var(--signal-bright)',
  borderRadius: 999,
  background: 'color-mix(in oklch, var(--background-deep) 84%, transparent)',
  fontFamily: 'var(--font-mono)',
  fontSize: 16,
  letterSpacing: '0.06em',
  color: 'var(--text-primary)',
  whiteSpace: 'nowrap' as const,
}
