import { interpolate, useCurrentFrame } from 'remotion'
import { ClipShell, fadeSlide } from './ClipShell'
import { SiteSkyline } from '../../scenes/Cover'
import { assetUrl } from '../../components/assetUrl'

// 7 s: oscuridad → estructura de obra → una cámara detecta → la señal viaja → tesis.
export function OpeningClip() {
  const frame = useCurrentFrame()
  const skyline = interpolate(frame, [14, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const signalPhase = interpolate(frame, [62, 128], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const camPing = frame > 40 && frame < 66 ? 0.5 + 0.5 * Math.sin((frame - 40) * 0.5) : frame >= 66 ? 1 : 0.25
  return (
    <ClipShell>
      <div
        style={{
          position: 'absolute',
          right: 40,
          bottom: 90,
          width: 1150,
          opacity: skyline * 0.95,
          transform: `translateY(${(1 - skyline) * 30}px)`,
        }}
      >
        <div style={{ ['--cam-ping' as never]: camPing }}>
          <SiteSkyline signalPhase={signalPhase} />
        </div>
      </div>
      <div style={{ position: 'absolute', left: 96, top: 200, maxWidth: 860 }}>
        <p
          style={{
            ...fadeSlide(frame, 118, 16),
            margin: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: 20,
            letterSpacing: '0.18em',
            color: 'var(--signal-bright)',
          }}
        >
          AI CONSTRUCTION · GEN+
        </p>
        <h1
          style={{
            ...fadeSlide(frame, 132, 22, 34),
            margin: '28px 0 0',
            fontFamily: 'var(--font-display)',
            fontSize: 96,
            fontWeight: 560,
            lineHeight: 0.98,
            letterSpacing: '-0.05em',
            color: 'var(--text-primary)',
          }}
        >
          Cuando la obra puede <em style={{ color: 'var(--signal-bright)', fontStyle: 'normal' }}>ver</em>,
          <br />el agente puede actuar.
        </h1>
        <div style={{ ...fadeSlide(frame, 172, 18), marginTop: 44 }}>
          <img src={assetUrl('assets/gen-logo-white.png')} alt="GEN+" style={{ width: 150 }} />
        </div>
      </div>
    </ClipShell>
  )
}
