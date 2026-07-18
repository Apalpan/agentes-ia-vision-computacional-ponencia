import { interpolate, useCurrentFrame } from 'remotion'
import { assetUrl } from '../../components/assetUrl'
import { ClipShell, fadeSlide } from './ClipShell'

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const

const NODES = [
  [842, 294], [930, 234], [1030, 286], [1138, 222], [1244, 278], [1362, 324],
  [790, 396], [900, 376], [1012, 408], [1126, 354], [1238, 400], [1410, 432],
  [772, 520], [890, 500], [1000, 552], [1124, 486], [1240, 542], [1404, 560],
  [830, 646], [954, 652], [1072, 618], [1194, 670], [1324, 650], [1390, 742],
] as const

const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11],
  [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [6, 12], [7, 13], [8, 14], [9, 15], [10, 16], [11, 17],
  [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [12, 18], [13, 19], [14, 20], [15, 21], [16, 22], [17, 23],
  [18, 19], [19, 20], [20, 21], [21, 22], [22, 23], [2, 7], [4, 9], [8, 13], [10, 15], [14, 19], [16, 21],
] as const

const ROLE_LABELS = [
  ['OBJETIVO', 754, 252, 'var(--signal-bright)'],
  ['CONTEXTO', 1384, 288, 'var(--perception)'],
  ['HERRAMIENTAS', 720, 590, 'var(--decision-soft)'],
  ['MEMORIA', 1392, 604, 'var(--signal-bright)'],
  ['VERIFICACIÓN', 920, 784, 'var(--evidence)'],
  ['PERMISOS', 1228, 794, 'var(--risk)'],
] as const

function stage(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], clamp)
}

function connectionPath(a: readonly [number, number], b: readonly [number, number], index: number) {
  const bend = (index % 2 === 0 ? 1 : -1) * (18 + (index % 3) * 8)
  const mx = (a[0] + b[0]) / 2 + bend
  const my = (a[1] + b[1]) / 2 - bend * 0.45
  return `M ${a[0]} ${a[1]} Q ${mx} ${my} ${b[0]} ${b[1]}`
}

// 12 s, Remotion puro: silueta → sinapsis → sistema operativo → señal/decisión/evidencia.
export function GPlusBrainClip() {
  const frame = useCurrentFrame()
  const shell = stage(frame, 8, 46)
  const outline = stage(frame, 28, 86)
  const network = stage(frame, 62, 176)
  const activation = stage(frame, 128, 226)
  const roles = stage(frame, 178, 260)
  const loop = stage(frame, 232, 308)
  const scanY = interpolate(frame, [0, 359], [-140, 1090], clamp)
  const semanticMix = Math.round(activation * 100)

  return (
    <ClipShell fadeIn={18}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(2,6,15,.96) 0%, rgba(2,6,15,.72) 38%, rgba(2,6,15,.08) 72%, rgba(2,6,15,.02) 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: -240,
          right: -240,
          top: scanY,
          height: 170,
          opacity: 0.18 * shell,
          background: 'linear-gradient(180deg, transparent, color-mix(in oklch, var(--signal-bright) 35%, transparent), transparent)',
          filter: 'blur(18px)',
          transform: 'rotate(-3deg)',
        }}
      />

      <header style={{ ...fadeSlide(frame, 10, 18), position: 'absolute', left: 74, top: 62, display: 'flex', alignItems: 'center', gap: 22 }}>
        <img src={assetUrl('assets/gen-logo-white.png')} alt="GEN+" style={{ width: 138 }} />
        <i style={{ width: 1, height: 34, background: 'var(--border-strong)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, letterSpacing: '0.16em', color: 'var(--text-secondary)' }}>NEURAL OPERATING SYSTEM · AI CONSTRUCTION</span>
      </header>

      <svg viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} fill="none">
        <defs>
          <filter id="brain-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="brain-fill" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1090 500) rotate(90) scale(420 520)">
            <stop stopColor="var(--signal)" stopOpacity={0.16 * activation} />
            <stop offset="1" stopColor="var(--background-deep)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="semantic-line" x1="720" y1="300" x2="1450" y2="690" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--perception)" />
            <stop offset=".5" stopColor="var(--signal-bright)" />
            <stop offset="1" stopColor="var(--evidence)" />
          </linearGradient>
        </defs>

        <path
          d="M1081 182 C970 133 835 170 783 262 C714 271 671 336 694 402 C632 446 649 548 716 576 C690 658 758 726 836 724 C874 811 991 836 1077 776 C1117 806 1165 817 1207 798 C1280 830 1377 784 1384 704 C1465 688 1509 600 1464 536 C1519 476 1486 380 1415 354 C1406 278 1329 228 1254 246 C1215 174 1129 150 1081 182 Z"
          pathLength={1}
          style={{
            stroke: `color-mix(in oklch, var(--signal-bright) ${36 + semanticMix * 0.55}%, var(--text-secondary))`,
            strokeWidth: 3,
            strokeDasharray: 1,
            strokeDashoffset: 1 - outline,
            fill: 'url(#brain-fill)',
            filter: 'url(#brain-glow)',
            opacity: shell,
          }}
        />
        <path d="M1081 182 C1042 238 1074 296 1048 350 C1020 406 1060 454 1038 514 C1016 570 1062 616 1038 678 C1026 710 1040 749 1077 776" pathLength={1} style={{ stroke: 'var(--border-strong)', strokeWidth: 2, strokeDasharray: 1, strokeDashoffset: 1 - outline, opacity: outline }} />

        {EDGES.map(([from, to], index) => {
          const local = stage(frame, 62 + index * 2.1, 94 + index * 2.1)
          const pulse = Math.max(0, 1 - Math.abs(frame - (144 + index * 3.2)) / 22)
          return (
            <path
              key={`${from}-${to}`}
              d={connectionPath(NODES[from], NODES[to], index)}
              pathLength={1}
              style={{
                stroke: activation > 0.15 ? 'url(#semantic-line)' : 'var(--text-faint)',
                strokeWidth: 1.2 + pulse * 2.2,
                strokeDasharray: 1,
                strokeDashoffset: 1 - local,
                opacity: (0.2 + activation * 0.52 + pulse * 0.28) * network,
                filter: pulse > 0.05 ? 'url(#brain-glow)' : undefined,
              }}
            />
          )
        })}

        {NODES.map(([x, y], index) => {
          const born = stage(frame, 74 + index * 3, 96 + index * 3)
          const pulse = Math.max(0, 1 - Math.abs(frame - (136 + index * 4.6)) / 18)
          const palette = index % 5 === 0 ? 'var(--decision)' : index % 4 === 0 ? 'var(--evidence)' : index % 3 === 0 ? 'var(--perception)' : 'var(--signal-bright)'
          return (
            <g key={`${x}-${y}`} opacity={born}>
              <circle cx={x} cy={y} r={4 + pulse * 7} style={{ fill: activation > 0.08 ? palette : 'var(--text-secondary)', filter: 'url(#brain-glow)' }} />
              <circle cx={x} cy={y} r={12 + pulse * 14} style={{ stroke: palette, strokeWidth: 1, opacity: (0.08 + pulse * 0.52) * activation }} />
            </g>
          )
        })}

        <path d="M442 468 C555 468 630 454 742 430" pathLength={1} style={{ stroke: 'var(--perception)', strokeWidth: 3, strokeDasharray: 1, strokeDashoffset: 1 - stage(frame, 98, 142), filter: 'url(#brain-glow)' }} />
        <path d="M1408 546 C1512 546 1558 520 1676 520" pathLength={1} style={{ stroke: 'var(--decision)', strokeWidth: 3, strokeDasharray: 1, strokeDashoffset: 1 - stage(frame, 224, 272), filter: 'url(#brain-glow)' }} />
        <path d="M1676 520 C1738 650 1646 812 1422 840 C1150 875 866 854 678 760 C570 706 522 626 506 548" pathLength={1} style={{ stroke: 'var(--evidence)', strokeWidth: 2, strokeDasharray: '0.012 0.012', strokeDashoffset: 1 - loop, opacity: loop, filter: 'url(#brain-glow)' }} />
      </svg>

      <div style={{ ...fadeSlide(frame, 96, 18), position: 'absolute', left: 246, top: 430, width: 210 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.16em', color: 'var(--perception)' }}>ENTRA</span>
        <strong style={{ display: 'block', marginTop: 10, fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--text-primary)' }}>señal de obra</strong>
      </div>
      <div style={{ ...fadeSlide(frame, 232, 18), position: 'absolute', right: 84, top: 486, width: 230 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.16em', color: 'var(--decision-soft)' }}>SALE</span>
        <strong style={{ display: 'block', marginTop: 10, fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--text-primary)' }}>decisión acotada</strong>
      </div>

      {ROLE_LABELS.map(([label, left, top, color], index) => {
        const t = stage(frame, 178 + index * 11, 202 + index * 11)
        return <span key={label} style={{ position: 'absolute', left, top, padding: '8px 12px', borderLeft: `2px solid ${color}`, fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.12em', color, opacity: t, transform: `translateY(${(1 - t) * 12}px)` }}>{label}</span>
      })}

      <div style={{ position: 'absolute', left: 80, bottom: 110, maxWidth: 720 }}>
        <p style={{ ...fadeSlide(frame, 20, 18), margin: '0 0 16px', fontFamily: 'var(--font-mono)', fontSize: 18, letterSpacing: '0.16em', color: 'var(--signal-bright)' }}>EL NEXO · GEN+</p>
        <h1 style={{ ...fadeSlide(frame, 34, 24, 32), margin: 0, fontFamily: 'var(--font-display)', fontSize: 72, fontWeight: 560, lineHeight: 0.98, letterSpacing: '-0.055em', color: 'var(--text-primary)' }}>El modelo no es<br />el cerebro.</h1>
        <p style={{ ...fadeSlide(frame, 282, 22), margin: '24px 0 0', maxWidth: 700, fontFamily: 'var(--font-display)', fontSize: 30, lineHeight: 1.25, color: 'var(--text-secondary)' }}>El cerebro útil es el sistema completo que <span style={{ color: 'var(--perception)' }}>percibe</span>, decide con <span style={{ color: 'var(--risk)' }}>límites</span> y aprende de <span style={{ color: 'var(--evidence)' }}>evidencia</span>.</p>
      </div>
    </ClipShell>
  )
}
