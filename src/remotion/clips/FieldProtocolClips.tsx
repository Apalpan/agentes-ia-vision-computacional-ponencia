import type { CSSProperties, ReactNode } from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { ClipShell, fadeSlide } from './ClipShell'

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const

function progress(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], clamp)
}

function ProtocolHeader({ frame, code, children }: { frame: number; code: string; children: ReactNode }) {
  return (
    <div style={{ ...fadeSlide(frame, 6, 16), position: 'absolute', left: 96, right: 96, top: 78 }}>
      <p style={monoLabel}>{code} · PROTOCOLO DE CAMPO</p>
      <h1 style={clipTitle}>{children}</h1>
    </div>
  )
}

const monoLabel: CSSProperties = {
  margin: 0,
  fontFamily: 'var(--font-mono)',
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: '0.18em',
  color: 'var(--signal-bright)',
}

const clipTitle: CSSProperties = {
  margin: '18px 0 0',
  maxWidth: 1200,
  fontFamily: 'var(--font-display)',
  fontSize: 62,
  fontWeight: 570,
  lineHeight: 1,
  letterSpacing: '-0.04em',
  color: 'var(--text-primary)',
}

const fieldCard: CSSProperties = {
  border: '1px solid var(--border-strong)',
  borderRadius: 18,
  background: 'color-mix(in oklch, var(--background-deep) 88%, var(--surface))',
  boxShadow: '0 30px 80px -48px rgba(0,0,0,.9)',
}

// 7 s: radio de obra → orden operativa → tool call verificable.
export function VoiceProtocolClip() {
  const frame = useCurrentFrame()
  const wave = progress(frame, 30, 82)
  const order = progress(frame, 76, 108)
  const route = progress(frame, 118, 160)
  const tool = progress(frame, 148, 184)

  return (
    <ClipShell>
      <ProtocolHeader frame={frame} code="CANAL 06">La voz no es magia. Es una interfaz de operación.</ProtocolHeader>

      <section style={{ ...fieldCard, position: 'absolute', left: 96, top: 330, width: 590, height: 360, padding: 32 }}>
        <p style={{ ...monoLabel, color: 'var(--perception)', fontSize: 15 }}>RADIO · CANAL SST</p>
        <svg viewBox="0 0 520 150" style={{ width: '100%', marginTop: 46 }} fill="none">
          <path d="M4 78 C32 78 35 36 62 36 S94 122 122 122 S153 54 184 54 S213 98 246 98 S275 28 306 28 S338 126 368 126 S401 62 430 62 S461 78 516 78" pathLength={1} style={{ stroke: 'var(--perception)', strokeWidth: 4, strokeLinecap: 'round', strokeDasharray: 1, strokeDashoffset: 1 - wave, filter: 'drop-shadow(0 0 10px color-mix(in oklch, var(--perception) 50%, transparent))' }} />
          <line x1="4" y1="78" x2="516" y2="78" style={{ stroke: 'var(--border)', strokeWidth: 1 }} />
        </svg>
        <p style={{ ...fadeSlide(frame, 42, 18), margin: '28px 0 0', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: 18 }}>Señal humana · breve · contextual</p>
      </section>

      <div style={{ ...fieldCard, position: 'absolute', left: 735, top: 390, width: 520, padding: '30px 34px', opacity: order, transform: `translateX(${(1 - order) * -70}px)` }}>
        <p style={{ ...monoLabel, fontSize: 15, color: 'var(--decision-soft)' }}>ORDEN OPERATIVA</p>
        <p style={{ margin: '20px 0 0', fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 560, lineHeight: 1.12, color: 'var(--text-primary)' }}>“Revisar zona B · condición de EPP.”</p>
      </div>

      <div style={{ position: 'absolute', left: 1268, top: 536, width: 100, height: 2, background: 'var(--border)' }}>
        <i style={{ display: 'block', width: `${route * 100}%`, height: '100%', background: 'var(--decision)', boxShadow: '0 0 18px color-mix(in oklch, var(--decision) 50%, transparent)' }} />
      </div>

      <div style={{ ...fieldCard, position: 'absolute', right: 96, top: 340, width: 470, padding: '30px 34px', borderColor: 'var(--decision)', opacity: tool, transform: `translateX(${(1 - tool) * 60}px)` }}>
        <p style={{ ...monoLabel, fontSize: 15, color: 'var(--decision-soft)' }}>TOOL CALL · PREPARADO</p>
        <pre style={{ margin: '20px 0 0', fontFamily: 'var(--font-mono)', fontSize: 20, lineHeight: 1.65, color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>{`acción: inspeccionar_zona\nzona: B\ncriterio: EPP\ngate: responsable SST`}</pre>
      </div>

      <p style={{ ...fadeSlide(frame, 182, 18), position: 'absolute', left: 96, bottom: 108, margin: 0, fontFamily: 'var(--font-display)', fontSize: 42, color: 'var(--text-primary)' }}>La conversación termina. <span style={{ color: 'var(--decision-soft)' }}>El flujo verificable comienza.</span></p>
    </ClipShell>
  )
}

// 7 s: frame → zona → caja edge → ficha de evento.
export function EdgeLocalProtocolClip() {
  const frame = useCurrentFrame()
  const zone = progress(frame, 34, 68)
  const down = progress(frame, 70, 112)
  const across = progress(frame, 118, 158)
  const event = progress(frame, 145, 182)

  return (
    <ClipShell>
      <ProtocolHeader frame={frame} code="NODO 05">El evento nace en el poste. No en la nube.</ProtocolHeader>

      <div style={{ ...fieldCard, position: 'absolute', left: 96, top: 310, width: 650, height: 390, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, color-mix(in oklch, var(--surface-raised) 40%, transparent), transparent)' }} />
        <svg viewBox="0 0 650 390" style={{ position: 'relative', width: '100%', height: '100%' }} fill="none">
          <path d="M42 330 L170 220 L270 270 L392 154 L610 258" style={{ stroke: 'var(--border-strong)', strokeWidth: 2 }} />
          <path d="M108 310 V108 H338 V312 M338 160 H560 V312" style={{ stroke: 'var(--border)', strokeWidth: 2 }} />
          <rect x="374" y="120" width="188" height="190" rx="6" pathLength={1} style={{ stroke: 'var(--perception)', strokeWidth: 3, strokeDasharray: 1, strokeDashoffset: 1 - zone, fill: `color-mix(in oklch, var(--perception) ${Math.round(zone * 8)}%, transparent)` }} />
          <text x="386" y="108" style={{ fill: 'var(--perception)', fontFamily: 'var(--font-mono)', fontSize: 15, opacity: zone }}>ZONA B · CAM-03</text>
          <circle cx="470" cy="218" r="16" style={{ stroke: 'var(--text-secondary)' }} />
          <rect x="454" y="238" width="32" height="62" rx="8" style={{ stroke: 'var(--text-secondary)' }} />
        </svg>
      </div>

      <div style={{ position: 'absolute', left: 414, top: 700, width: 2, height: 86, background: 'var(--border)' }}>
        <i style={{ display: 'block', width: '100%', height: `${down * 100}%`, background: 'var(--perception)', boxShadow: '0 0 16px color-mix(in oklch, var(--perception) 50%, transparent)' }} />
      </div>

      <div style={{ ...fieldCard, position: 'absolute', left: 250, top: 786, width: 330, padding: '22px 26px', borderColor: 'var(--perception)' }}>
        <p style={{ ...monoLabel, fontSize: 14, color: 'var(--perception)' }}>EDGE · LOCAL</p>
        <strong style={{ display: 'block', marginTop: 12, fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--text-primary)' }}>filtra · infiere · conserva buffer</strong>
      </div>

      <div style={{ position: 'absolute', left: 580, top: 848, width: 360, height: 2, background: 'var(--border)' }}>
        <i style={{ display: 'block', width: `${across * 100}%`, height: '100%', background: 'var(--signal-bright)', boxShadow: '0 0 18px var(--glow)' }} />
      </div>

      <div style={{ ...fieldCard, position: 'absolute', right: 96, top: 332, width: 720, padding: '32px 38px', borderColor: 'var(--signal-bright)', opacity: event, transform: `translateX(${(1 - event) * -90}px)` }}>
        <p style={{ ...monoLabel, fontSize: 15 }}>FICHA DE EVENTO · ESTRUCTURADA</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginTop: 28 }}>
          {['tipo · presencia en zona', 'zona · B', 'cámara · CAM-03', 'hora · registrada', 'confianza · requiere calibración', 'estado · listo para contexto'].map((item) => <span key={item} style={{ padding: '17px 18px', border: '1px solid var(--border)', borderRadius: 12, fontFamily: 'var(--font-mono)', fontSize: 17, color: 'var(--text-primary)' }}>{item}</span>)}
        </div>
        <p style={{ margin: '28px 0 0', fontFamily: 'var(--font-display)', fontSize: 34, color: 'var(--text-primary)' }}>Viaja el <span style={{ color: 'var(--signal-bright)' }}>evento</span>. No el video completo.</p>
      </div>
    </ClipShell>
  )
}

// 7 s: un evento → tres carriles especialistas → respuesta de proceso.
export function MultiAgentProtocolClip() {
  const frame = useCurrentFrame()
  const split = progress(frame, 44, 96)
  const fragments = progress(frame, 88, 136)
  const merge = progress(frame, 142, 182)
  const lanes = [
    ['VISIÓN', 'evento estructurado', 'var(--perception)'],
    ['SEGURIDAD', 'criticidad evaluada', 'var(--decision)'],
    ['EVIDENCIA', 'registro auditable', 'var(--evidence)'],
  ] as const

  return (
    <ClipShell>
      <ProtocolHeader frame={frame} code="SISTEMA 10">No es un cerebro único. Es coordinación entre especialistas.</ProtocolHeader>
      <div style={{ ...fieldCard, position: 'absolute', left: 96, top: 330, width: 300, padding: '28px 30px', borderColor: 'var(--signal-bright)' }}>
        <p style={{ ...monoLabel, fontSize: 14 }}>EVENTO ÚNICO</p>
        <strong style={{ display: 'block', marginTop: 16, fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--text-primary)' }}>presencia · zona B</strong>
      </div>

      <div style={{ position: 'absolute', left: 396, top: 456, width: 214, height: 294 }}>
        <svg viewBox="0 0 214 294" style={{ width: '100%', height: '100%' }} fill="none">
          {[30, 147, 264].map((y) => <path key={y} d={`M0 0 C90 0 80 ${y} 214 ${y}`} pathLength={1} style={{ stroke: 'var(--signal-bright)', strokeWidth: 2, strokeDasharray: 1, strokeDashoffset: 1 - split, opacity: 0.8 }} />)}
        </svg>
      </div>

      <div style={{ position: 'absolute', left: 610, right: 96, top: 374, display: 'grid', gap: 24 }}>
        {lanes.map(([name, output, color], index) => (
          <div key={name} style={{ display: 'grid', gridTemplateColumns: '270px 1fr 360px', alignItems: 'center', gap: 24, opacity: fragments }}>
            <div style={{ ...fieldCard, padding: '20px 24px', borderColor: color }}><p style={{ ...monoLabel, fontSize: 14, color }}>{name}</p><span style={{ display: 'block', marginTop: 8, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 15 }}>objetivo limitado</span></div>
            <div style={{ height: 2, background: 'var(--border)' }}><i style={{ display: 'block', width: `${progress(frame, 96 + index * 8, 142 + index * 8) * 100}%`, height: '100%', background: color }} /></div>
            <div style={{ ...fieldCard, padding: '20px 24px' }}><small style={{ ...monoLabel, fontSize: 12, color: 'var(--text-faint)' }}>SALE</small><strong style={{ display: 'block', marginTop: 8, fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-primary)' }}>{output}</strong></div>
          </div>
        ))}
      </div>

      <div style={{ ...fieldCard, position: 'absolute', left: 610, right: 96, bottom: 98, padding: '22px 30px', borderColor: 'var(--evidence)', opacity: merge, transform: `translateY(${(1 - merge) * 28}px)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
        <p style={{ ...monoLabel, fontSize: 14, color: 'var(--evidence)' }}>RESPUESTA DE PROCESO</p>
        <strong style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--text-primary)' }}>contexto unido · responsable definido · evidencia exigida</strong>
      </div>
    </ClipShell>
  )
}

// 7 s: autonomía hasta el umbral → sello humano → acción registrada.
export function HumanGateProtocolClip() {
  const frame = useCurrentFrame()
  const approach = progress(frame, 28, 90)
  const stamp = progress(frame, 104, 142)
  const continueRail = progress(frame, 150, 182)
  const stampScale = 1.18 - stamp * 0.18

  return (
    <ClipShell>
      <ProtocolHeader frame={frame} code="GATE 11">La autonomía termina donde empieza la responsabilidad.</ProtocolHeader>
      <div style={{ position: 'absolute', left: 150, right: 150, top: 520, height: 4, background: 'var(--border)' }}>
        <i style={{ display: 'block', width: `${approach * 50}%`, height: '100%', background: 'linear-gradient(90deg, var(--signal), var(--evidence))' }} />
        <i style={{ position: 'absolute', left: '50%', top: 0, display: 'block', width: `${continueRail * 50}%`, height: '100%', background: 'linear-gradient(90deg, var(--decision), var(--evidence))' }} />
      </div>
      <div style={{ position: 'absolute', left: 150, top: 450, width: 340 }}>
        <p style={{ ...monoLabel, fontSize: 14, color: 'var(--evidence)' }}>AUTOMÁTICO · REVERSIBLE</p>
        <span style={{ display: 'block', marginTop: 16, fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--text-primary)' }}>observar · clasificar · preparar</span>
      </div>

      <div style={{ position: 'absolute', left: '50%', top: 326, width: 2, height: 390, transform: 'translateX(-50%)', background: 'var(--risk)', boxShadow: '0 0 28px color-mix(in oklch, var(--risk) 46%, transparent)' }} />
      <div style={{ ...fieldCard, position: 'absolute', left: '50%', top: 390, width: 500, padding: '26px 30px', transform: 'translateX(-50%)', borderColor: 'var(--risk)', textAlign: 'center' }}>
        <p style={{ ...monoLabel, fontSize: 14, color: 'var(--risk)' }}>REQUIERE CRITERIO HUMANO</p>
        <strong style={{ display: 'block', marginTop: 12, fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text-primary)' }}>decisión crítica · no delegable</strong>
      </div>

      <div style={{ position: 'absolute', left: '50%', top: 642, width: 360, padding: '22px', border: '5px double var(--decision)', color: 'var(--decision-soft)', fontFamily: 'var(--font-mono)', fontSize: 34, fontWeight: 800, letterSpacing: '0.12em', textAlign: 'center', opacity: stamp, transform: `translateX(-50%) rotate(-7deg) scale(${stampScale})` }}>APROBADO</div>

      <div style={{ position: 'absolute', right: 150, top: 450, width: 360, textAlign: 'right', opacity: continueRail }}>
        <p style={{ ...monoLabel, fontSize: 14, color: 'var(--decision-soft)' }}>ACCIÓN + LOG</p>
        <span style={{ display: 'block', marginTop: 16, fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--text-primary)' }}>intervenir · registrar · cerrar</span>
      </div>

      <p style={{ ...fadeSlide(frame, 178, 16), position: 'absolute', left: 150, bottom: 98, margin: 0, fontFamily: 'var(--font-display)', fontSize: 38, color: 'var(--text-primary)' }}>Más autonomía exige <span style={{ color: 'var(--risk)' }}>más permisos</span>, más logs y mejores gates.</p>
    </ClipShell>
  )
}

// 7 s: un evento crítico → tres fases → loop mínimo listo para operar.
export function PilotProtocolClip() {
  const frame = useCurrentFrame()
  const line = progress(frame, 42, 150)
  const close = progress(frame, 154, 188)
  const phases = [
    ['01', 'DEFINIR', 'evento + decisión'],
    ['02', 'OPERAR', 'responsable + fallback'],
    ['03', 'MEDIR', 'decisiones + evidencia'],
  ] as const

  return (
    <ClipShell>
      <ProtocolHeader frame={frame} code="PILOTO 12">Empieza con un evento que hoy duela.</ProtocolHeader>

      <div style={{ position: 'absolute', left: 180, right: 180, top: 520, height: 3, background: 'var(--border)' }}>
        <i style={{ display: 'block', width: `${line * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--signal), var(--decision), var(--evidence))', boxShadow: '0 0 18px var(--glow)' }} />
      </div>

      <div style={{ position: 'absolute', left: 154, right: 154, top: 334, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
        {phases.map(([number, title, detail], index) => {
          const t = progress(frame, 42 + index * 34, 74 + index * 34)
          const color = index === 0 ? 'var(--signal-bright)' : index === 1 ? 'var(--decision)' : 'var(--evidence)'
          return (
            <div key={title} style={{ ...fieldCard, position: 'relative', minHeight: 300, padding: '34px 36px', borderColor: color, opacity: t, transform: `translateY(${(1 - t) * 34}px)` }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color }}>{number} · FASE</span>
              <h2 style={{ margin: '56px 0 0', fontFamily: 'var(--font-display)', fontSize: 42, color: 'var(--text-primary)' }}>{title}</h2>
              <p style={{ margin: '18px 0 0', fontFamily: 'var(--font-body)', fontSize: 24, lineHeight: 1.4, color: 'var(--text-secondary)' }}>{detail}</p>
              <i style={{ position: 'absolute', left: '50%', bottom: -104, width: 22, height: 22, borderRadius: '50%', transform: 'translateX(-50%)', border: `3px solid ${color}`, background: 'var(--background-deep)', boxShadow: `0 0 22px ${color}` }} />
            </div>
          )
        })}
      </div>

      <div style={{ ...fieldCard, position: 'absolute', left: '50%', bottom: 92, width: 920, padding: '24px 34px', transform: `translateX(-50%) scale(${0.96 + close * 0.04})`, opacity: close, borderColor: 'var(--evidence)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28 }}>
        <p style={{ ...monoLabel, fontSize: 14, color: 'var(--evidence)' }}>LOOP MÍNIMO · LISTO PARA EL LUNES</p>
        <strong style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text-primary)' }}>señal → humano → evidencia</strong>
      </div>
    </ClipShell>
  )
}
