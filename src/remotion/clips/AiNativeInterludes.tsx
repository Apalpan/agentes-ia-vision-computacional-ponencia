import type { CSSProperties } from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { ClipShell, fadeSlide } from './ClipShell'

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const

const stage = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], clamp)

const mono: CSSProperties = {
  margin: 0,
  fontFamily: 'var(--font-mono)',
  fontSize: 16,
  fontWeight: 750,
  letterSpacing: '0.16em',
  color: 'var(--signal-bright)',
}

const headline: CSSProperties = {
  margin: 0,
  fontFamily: 'var(--font-display)',
  fontSize: 68,
  fontWeight: 560,
  lineHeight: 0.98,
  letterSpacing: '-0.052em',
  color: 'var(--text-primary)',
}

const panel: CSSProperties = {
  border: '1px solid var(--border-strong)',
  borderRadius: 16,
  background: 'color-mix(in oklch, var(--background-deep) 86%, var(--surface))',
  boxShadow: '0 34px 90px -60px rgba(0,0,0,.92)',
}

const DATA_SOURCES = [
  ['WHATSAPP', 'acuerdos'],
  ['EXCEL', 'costos'],
  ['PDF / RFI', 'consultas'],
  ['CORREO', 'aprobaciones'],
  ['REUNIÓN', 'compromisos'],
  ['BIM', 'estado del modelo'],
] as const

// 10 s · múltiples fuentes quedan atrapadas antes de convertirse en decisión.
export function DataBottleneckClip() {
  const frame = useCurrentFrame()
  const sourceIn = DATA_SOURCES.map((_, index) => stage(frame, 12 + index * 9, 34 + index * 9))
  const converge = stage(frame, 66, 164)
  const pressure = stage(frame, 146, 226)
  const outcome = stage(frame, 222, 274)

  return (
    <ClipShell>
      <header style={{ ...fadeSlide(frame, 8, 18), position: 'absolute', left: 88, top: 72 }}>
        <p style={{ ...mono, color: 'var(--decision-soft)' }}>FILM 01 · LA FRACTURA OPERATIVA</p>
        <h1 style={{ ...headline, marginTop: 18 }}>La información existe.<br />Pero no actúa.</h1>
      </header>

      <div style={{ position: 'absolute', left: 88, top: 342, width: 590, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        {DATA_SOURCES.map(([name, detail], index) => (
          <div
            key={name}
            style={{
              ...panel,
              padding: '22px 24px',
              opacity: sourceIn[index],
              transform: `translateX(${(1 - sourceIn[index]) * -38}px)`,
            }}
          >
            <span style={{ ...mono, fontSize: 13, color: index % 2 ? 'var(--text-secondary)' : 'var(--signal-bright)' }}>{name}</span>
            <strong style={{ display: 'block', marginTop: 10, fontFamily: 'var(--font-display)', fontSize: 25, color: 'var(--text-primary)' }}>{detail}</strong>
          </div>
        ))}
      </div>

      <svg viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} fill="none">
        {[408, 518, 628, 738, 848, 936].map((y, index) => (
          <path
            key={y}
            d={`M 680 ${y} C 820 ${y} 806 ${590 + index * 5} 962 ${590 + index * 5}`}
            pathLength={1}
            style={{
              stroke: index % 2 ? 'var(--text-faint)' : 'var(--signal-bright)',
              strokeWidth: 2,
              strokeDasharray: '0.018 0.014',
              strokeDashoffset: 1 - converge,
              opacity: 0.34 + converge * 0.44,
            }}
          />
        ))}
        <path d="M 1082 590 C 1230 590 1290 590 1432 590" pathLength={1} style={{ stroke: 'var(--decision)', strokeWidth: 3, strokeDasharray: 1, strokeDashoffset: 1 - stage(frame, 190, 264), opacity: outcome }} />
      </svg>

      <div style={{ ...panel, position: 'absolute', left: 962, top: 400, width: 120, height: 380, overflow: 'hidden', borderColor: 'var(--decision)', boxShadow: `0 0 ${30 + pressure * 70}px color-mix(in oklch, var(--decision) ${12 + Math.round(pressure * 22)}%, transparent)` }}>
        <div style={{ position: 'absolute', left: 32, right: 32, top: 34, bottom: 34, display: 'grid', alignContent: 'center', gap: 12 }}>
          {Array.from({ length: 9 }, (_, index) => (
            <i key={index} style={{ display: 'block', height: 6, borderRadius: 99, background: index < Math.round(pressure * 9) ? 'var(--decision)' : 'var(--border-strong)', transform: `translateX(${index % 2 ? pressure * 9 : pressure * -9}px)` }} />
          ))}
        </div>
      </div>
      <span style={{ ...mono, position: 'absolute', left: 932, top: 812, width: 180, textAlign: 'center', color: 'var(--decision-soft)', fontSize: 13 }}>CUELLO DE BOTELLA</span>

      <div style={{ ...panel, position: 'absolute', right: 88, top: 426, width: 400, padding: '34px 36px', opacity: outcome, transform: `translateX(${(1 - outcome) * 54}px)`, borderColor: 'var(--risk)' }}>
        <p style={{ ...mono, color: 'var(--risk)', fontSize: 14 }}>DECISIÓN · EN ESPERA</p>
        <strong style={{ display: 'block', marginTop: 24, fontFamily: 'var(--font-display)', fontSize: 42, lineHeight: 1.05, color: 'var(--text-primary)' }}>La señal llegó.<br />El proceso no.</strong>
        <span style={{ display: 'block', marginTop: 22, fontFamily: 'var(--font-mono)', fontSize: 17, color: 'var(--text-secondary)' }}>buscar → interpretar → escalar → perseguir</span>
      </div>

      <p style={{ ...fadeSlide(frame, 258, 20), position: 'absolute', left: 88, bottom: 82, margin: 0, fontFamily: 'var(--font-display)', fontSize: 42, color: 'var(--text-primary)' }}>
        Datos en silos. <span style={{ color: 'var(--decision-soft)' }}>Decisiones en espera.</span>
      </p>
    </ClipShell>
  )
}

const MATURITY = ['PROMPT', 'VIBE CODING', 'ASISTENTE', 'AGENTE', 'MULTIAGENTE', 'LOOP', 'AI FIRST', 'AI NATIVE'] as const

// 11 s · la oportunidad se muestra como madurez operativa, no como cifra de mercado.
export function AiOpportunityClip() {
  const frame = useCurrentFrame()
  const final = stage(frame, 260, 318)

  return (
    <ClipShell>
      <header style={{ ...fadeSlide(frame, 8, 18), position: 'absolute', left: 86, right: 86, top: 66, display: 'flex', justifyContent: 'space-between', gap: 60 }}>
        <div>
          <p style={mono}>FILM 02 · OPORTUNIDAD IA</p>
          <h1 style={{ ...headline, marginTop: 18 }}>Del prompt al sistema.<br />Del sistema al negocio.</h1>
        </div>
        <p style={{ margin: 8, maxWidth: 450, fontFamily: 'var(--font-display)', fontSize: 27, lineHeight: 1.3, color: 'var(--text-secondary)' }}>La ventaja no está en sumar herramientas. Está en rediseñar cómo fluye el trabajo.</p>
      </header>

      <div style={{ position: 'absolute', left: 82, right: 82, top: 382, height: 440, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', alignItems: 'end', gap: 12 }}>
        {MATURITY.map((label, index) => {
          const reveal = stage(frame, 42 + index * 24, 78 + index * 24)
          const height = 116 + index * 42
          const isNative = index === MATURITY.length - 1
          return (
            <div key={label} style={{ position: 'relative', height }}>
              <div style={{ ...panel, position: 'absolute', inset: 0, padding: '18px 16px', borderColor: isNative ? 'var(--decision)' : index > 4 ? 'var(--evidence)' : 'var(--border-strong)', opacity: reveal, transform: `scaleY(${0.08 + reveal * 0.92})`, transformOrigin: 'bottom' }}>
                <span style={{ ...mono, fontSize: 12, color: isNative ? 'var(--decision-soft)' : index > 4 ? 'var(--evidence)' : 'var(--signal-bright)' }}>{String(index + 1).padStart(2, '0')}</span>
                <strong style={{ position: 'absolute', left: 16, right: 16, bottom: 18, fontFamily: 'var(--font-display)', fontSize: label.length > 9 ? 20 : 23, lineHeight: 1, color: 'var(--text-primary)', overflowWrap: 'anywhere' }}>{label}</strong>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ ...panel, position: 'absolute', left: 86, right: 86, bottom: 74, padding: '20px 26px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, opacity: final, transform: `translateY(${(1 - final) * 24}px)` }}>
        <span style={{ ...mono, fontSize: 13 }}><b style={{ color: 'var(--text-primary)' }}>CONSTRUIR</b> · CODEX / CLAUDE CODE</span>
        <span style={{ ...mono, fontSize: 13 }}><b style={{ color: 'var(--text-primary)' }}>CONTRASTAR</b> · GROK / TEAM OF EXPERTS</span>
        <span style={{ ...mono, fontSize: 13, color: 'var(--decision-soft)' }}><b style={{ color: 'var(--text-primary)' }}>ORQUESTAR</b> · n8n / AGENTFLOW</span>
      </div>
    </ClipShell>
  )
}

const OPERATING_LAYERS = [
  ['DATOS CONECTADOS', 'fuentes, estado y permisos'],
  ['AGENTES ESPECIALIZADOS', 'objetivos y herramientas limitadas'],
  ['LOOPS OPERATIVOS', 'acción, gate humano y evidencia'],
  ['DECISIÓN CONTINUA', 'prioridad, aprendizaje y trazabilidad'],
] as const

// 12 s · la empresa tradicional se convierte en un sistema operativo inteligente.
export function AiNativeClip() {
  const frame = useCurrentFrame()
  const dissolve = stage(frame, 24, 92)
  const backbone = stage(frame, 78, 224)
  const layers = OPERATING_LAYERS.map((_, index) => stage(frame, 112 + index * 32, 148 + index * 32))
  const close = stage(frame, 274, 338)

  return (
    <ClipShell>
      <header style={{ ...fadeSlide(frame, 8, 18), position: 'absolute', left: 86, top: 70 }}>
        <p style={{ ...mono, color: 'var(--decision-soft)' }}>FILM 05 · EMPRESA AI NATIVE</p>
        <h1 style={{ ...headline, marginTop: 18 }}>La empresa no usa IA.<br /><span style={{ color: 'var(--decision-soft)' }}>Opera con IA.</span></h1>
      </header>

      <div style={{ position: 'absolute', left: 86, top: 396, width: 430, display: 'grid', gap: 16, opacity: 1 - dissolve * 0.78, transform: `translateX(${dissolve * -52}px)` }}>
        {['PROCESO MANUAL', 'DATOS DISPERSOS', 'APROBACIÓN TARDÍA'].map((label, index) => (
          <div key={label} style={{ ...panel, padding: '24px 26px', borderColor: index === 2 ? 'var(--risk)' : 'var(--border)' }}>
            <span style={{ ...mono, fontSize: 13, color: index === 2 ? 'var(--risk)' : 'var(--text-secondary)' }}>{label}</span>
          </div>
        ))}
      </div>

      <svg viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} fill="none">
        <path d="M 520 620 C 650 620 670 620 790 620" pathLength={1} style={{ stroke: 'var(--signal-bright)', strokeWidth: 3, strokeDasharray: 1, strokeDashoffset: 1 - backbone, filter: 'drop-shadow(0 0 10px var(--glow))' }} />
        <path d="M 1510 620 C 1620 620 1650 620 1770 620" pathLength={1} style={{ stroke: 'var(--decision)', strokeWidth: 3, strokeDasharray: 1, strokeDashoffset: 1 - stage(frame, 226, 302), filter: 'drop-shadow(0 0 10px color-mix(in oklch, var(--decision) 50%, transparent))' }} />
        <path d="M 1770 620 C 1770 874 1260 920 910 860 C 674 820 624 712 790 650" pathLength={1} style={{ stroke: 'var(--evidence)', strokeWidth: 2, strokeDasharray: '0.012 0.012', strokeDashoffset: 1 - close, opacity: close }} />
      </svg>

      <div style={{ position: 'absolute', left: 790, top: 332, width: 720, display: 'grid', gap: 14 }}>
        {OPERATING_LAYERS.map(([name, detail], index) => (
          <div key={name} style={{ ...panel, padding: '22px 26px', display: 'grid', gridTemplateColumns: '230px 1fr', alignItems: 'center', gap: 24, opacity: layers[index], transform: `translateX(${(1 - layers[index]) * 46}px)`, borderColor: index === 2 ? 'var(--decision)' : index === 3 ? 'var(--evidence)' : 'var(--border-strong)' }}>
            <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.11em', color: index === 2 ? 'var(--decision-soft)' : index === 3 ? 'var(--evidence)' : 'var(--signal-bright)' }}>{name}</strong>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-primary)' }}>{detail}</span>
          </div>
        ))}
      </div>

      <div style={{ ...panel, position: 'absolute', right: 86, top: 512, width: 250, padding: '28px 26px', opacity: close, transform: `scale(${0.92 + close * 0.08})`, borderColor: 'var(--decision)', textAlign: 'center' }}>
        <span style={{ ...mono, color: 'var(--decision-soft)', fontSize: 13 }}>OPERACIÓN</span>
        <strong style={{ display: 'block', marginTop: 14, fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text-primary)' }}>decide · actúa · aprende</strong>
      </div>

      <p style={{ ...fadeSlide(frame, 322, 18), position: 'absolute', left: 86, bottom: 78, margin: 0, fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--text-primary)' }}>
        AI First cambia herramientas. <span style={{ color: 'var(--decision-soft)' }}>AI Native rediseña la operación.</span>
      </p>
    </ClipShell>
  )
}
