import { useEffect, useRef, useState } from 'react'
import { SceneFrame } from '../components/SceneFrame'
import { Reveal, useMotion } from '../motion/MotionContext'

const OPERATIONS = [
  { key: 'clasifica', label: 'CLASIFICA', question: '¿Qué está ocurriendo?', output: 'avance físico · desvío frente al plan' },
  { key: 'detecta', label: 'DETECTA', question: '¿Dónde está cada objeto?', output: 'EPP · maquinaria · riesgos de seguridad' },
  { key: 'segmenta', label: 'SEGMENTA', question: '¿Qué área pertenece a cada clase?', output: 'superficies · zonas de trabajo' },
  { key: 'sigue', label: 'SIGUE', question: '¿Cómo cambia en el tiempo?', output: 'inactividad · permanencia · flujo' },
] as const

function Viewfinder({ active }: { active: number }) {
  const mode = OPERATIONS[active].key
  return (
    <svg className="vision-viewfinder" viewBox="0 0 640 360" fill="none" aria-hidden="true">
      {/* marco y retícula */}
      <rect x="4" y="4" width="632" height="352" rx="10" className="vf-frame" />
      <line x1="4" y1="120" x2="636" y2="120" className="vf-grid" />
      <line x1="4" y1="240" x2="636" y2="240" className="vf-grid" />
      <line x1="213" y1="4" x2="213" y2="356" className="vf-grid" />
      <line x1="426" y1="4" x2="426" y2="356" className="vf-grid" />
      {/* escena estilizada: losa, persona, mixer */}
      <polygon points="60,300 300,300 340,240 120,240" className={`vf-area ${mode === 'segmenta' ? 'is-active' : ''}`} />
      <g className="vf-person">
        <circle cx="392" cy="196" r="10" />
        <rect x="382" y="210" width="20" height="42" rx="6" />
      </g>
      <g className="vf-machine">
        <rect x="470" y="228" width="104" height="42" rx="6" />
        <circle cx="496" cy="278" r="12" />
        <circle cx="548" cy="278" r="12" />
        <circle cx="522" cy="238" r="20" className="vf-drum" />
      </g>
      {/* overlays por operación */}
      {mode === 'clasifica' ? (
        <g className="vf-overlay">
          <rect x="14" y="14" width="612" height="310" rx="8" className="vf-class-frame" />
          <rect x="24" y="24" width="238" height="30" rx="6" className="vf-tag-bg" />
          <text x="36" y="44" className="vf-tag">ESCENA: VACIADO EN CURSO</text>
        </g>
      ) : null}
      {mode === 'detecta' ? (
        <g className="vf-overlay">
          <rect x="372" y="178" width="42" height="80" className="vf-bbox" />
          <text x="372" y="172" className="vf-tag">PERSONA</text>
          <rect x="462" y="212" width="122" height="84" className="vf-bbox" />
          <text x="462" y="206" className="vf-tag">MIXER</text>
        </g>
      ) : null}
      {mode === 'segmenta' ? (
        <g className="vf-overlay">
          <text x="140" y="228" className="vf-tag">ÁREA: LOSA FRESCA</text>
        </g>
      ) : null}
      {mode === 'sigue' ? (
        <g className="vf-overlay">
          <path d="M180 120 C 260 150, 320 170, 388 196" className="vf-trail" />
          {[
            [180, 120, 't-3'],
            [258, 149, 't-2'],
            [322, 171, 't-1'],
            [388, 196, 't'],
          ].map(([x, y, t]) => (
            <g key={String(t)}>
              <circle cx={Number(x)} cy={Number(y)} r="5" className="vf-trail-dot" />
              <text x={Number(x) + 9} y={Number(y) - 8} className="vf-tag vf-tag-soft">{t}</text>
            </g>
          ))}
        </g>
      ) : null}
      {/* HUD */}
      <text x="18" y="344" className="vf-hud">CAM-02 · ZONA B · REPRESENTACIÓN CONCEPTUAL</text>
    </svg>
  )
}

export function VisionGrammar() {
  const motion = useMotion()
  const [manual, setManual] = useState<number | null>(null)
  const [auto, setAuto] = useState(0)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (motion.isRender || manual !== null) return
    timer.current = window.setInterval(() => setAuto((value) => (value + 1) % OPERATIONS.length), 3200)
    return () => { if (timer.current) window.clearInterval(timer.current) }
  }, [motion.isRender, manual])

  const active = motion.isRender
    ? Math.min(OPERATIONS.length - 1, Math.floor(motion.progress * OPERATIONS.length))
    : manual ?? auto

  return (
    <SceneFrame
      eyebrow="ACTO III · VISIÓN COMPUTACIONAL"
      title="La obra empieza a verse a sí misma."
      lead="EPP, avance físico, maquinaria, riesgos, inactividad y evidencia fotográfica automática: todos los casos nacen de cuatro operaciones sobre el mismo encuadre."
      className="vision-scene"
    >
      <div className="vision-grammar">
        <Reveal order={1} className="vision-screen">
          <Viewfinder active={active} />
        </Reveal>
        <div className="vision-ops" role="tablist" aria-label="Operaciones de visión computacional">
          {OPERATIONS.map((operation, index) => (
            <Reveal
              key={operation.key}
              as="button"
              order={index + 2}
              className={`vision-op ${index === active ? 'is-active' : ''}`}
              role="tab"
              aria-selected={index === active}
              type="button"
              onClick={() => setManual(index)}
            >
              <strong>{operation.label}</strong>
              <p>{operation.question}</p>
              <span>{operation.output}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </SceneFrame>
  )
}
