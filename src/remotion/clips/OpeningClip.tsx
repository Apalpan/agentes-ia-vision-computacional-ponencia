import { interpolate, useCurrentFrame } from 'remotion'
import { ClipShell, fadeSlide } from './ClipShell'
import { assetUrl } from '../../components/assetUrl'

const channels = [
  ['MSG', 'WhatsApp'],
  ['XLS', 'Excel'],
  ['PDF', 'Informes'],
  ['BIM', 'Modelo'],
  ['CDE', 'Documentos'],
  ['ACT', 'Reuniones'],
] as const

export function OpeningClip() {
  const frame = useCurrentFrame()
  const fractureOut = interpolate(frame, [58, 94], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const systemIn = interpolate(frame, [76, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const pulse = 0.55 + 0.45 * Math.sin(frame * 0.14)

  return (
    <ClipShell>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 46%, color-mix(in oklch, var(--signal) 20%, transparent), transparent 28%)' }} />

      <div style={{ position: 'absolute', inset: '130px 120px 140px', opacity: fractureOut }}>
        <p style={{ ...fadeSlide(frame, 8, 16), margin: 0, color: 'var(--decision-soft)', fontFamily: 'var(--font-mono)', fontSize: 18, letterSpacing: '0.18em' }}>
          INFORMACIÓN DISPERSA
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 250px)', gap: 18, marginTop: 56 }}>
          {channels.map(([code, label], index) => {
            const delay = 16 + index * 6
            return (
              <div key={code} style={{ ...fadeSlide(frame, delay, 14, index % 2 === 0 ? 26 : -18), height: 118, padding: '22px 24px', border: '1px solid var(--border-strong)', borderRadius: 18, background: 'color-mix(in oklch, var(--surface) 86%, transparent)' }}>
                <span style={{ color: 'var(--signal-bright)', fontFamily: 'var(--font-mono)', fontSize: 15, letterSpacing: '0.12em' }}>{code}</span>
                <strong style={{ display: 'block', marginTop: 22, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: 25, fontWeight: 560 }}>{label}</strong>
              </div>
            )
          })}
        </div>
        <strong style={{ ...fadeSlide(frame, 38, 18), position: 'absolute', right: 40, bottom: 0, color: 'var(--risk)', fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 560 }}>
          La decisión espera.
        </strong>
      </div>

      <div style={{ position: 'absolute', inset: 0, opacity: systemIn }}>
        <svg viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
          {[-260, -130, 0, 130, 260].map((offset, index) => (
            <path key={offset} d={`M 160 ${540 + offset} C 620 ${540 + offset}, 670 540, 940 540 S 1360 ${540 - offset * 0.16}, 1750 540`} fill="none" stroke={index === 2 ? 'var(--decision)' : 'var(--signal)'} strokeWidth={index === 2 ? 3 : 1.4} strokeDasharray={index === 2 ? undefined : '8 12'} opacity={index === 2 ? pulse : 0.48} />
          ))}
          <circle cx="940" cy="540" r="94" fill="var(--surface-raised)" stroke="var(--decision)" strokeWidth="2" />
          <circle cx="940" cy="540" r={48 + pulse * 8} fill="none" stroke="var(--signal-bright)" strokeWidth="2" opacity="0.7" />
        </svg>
        <div style={{ position: 'absolute', left: 96, top: 176, maxWidth: 980 }}>
          <p style={{ ...fadeSlide(frame, 116, 16), margin: 0, color: 'var(--signal-bright)', fontFamily: 'var(--font-mono)', fontSize: 18, letterSpacing: '0.18em' }}>
            AI CONSTRUCTION · GEN+
          </p>
          <h1 style={{ ...fadeSlide(frame, 128, 22, 34), margin: '26px 0 0', maxWidth: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: 92, fontWeight: 560, lineHeight: 0.98, letterSpacing: '-0.055em' }}>
            La IA no compite<br />con tu gente.
          </h1>
          <p style={{ ...fadeSlide(frame, 158, 18), margin: '22px 0 0', color: 'var(--decision-soft)', fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 560 }}>
            Compite con tu desorden.
          </p>
        </div>
        <div style={{ ...fadeSlide(frame, 178, 16), position: 'absolute', left: 96, right: 96, bottom: 64, paddingTop: 20, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={assetUrl('assets/gen-logo-white.png')} alt="GEN+" style={{ width: 142 }} />
          <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 16, letterSpacing: '0.14em' }}>ORDENAR · CONECTAR · ACTUAR</span>
        </div>
      </div>
    </ClipShell>
  )
}
