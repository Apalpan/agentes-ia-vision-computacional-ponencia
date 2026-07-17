import { Reveal, useMotion } from '../motion/MotionContext'
import { ClipPlayer } from '../components/ClipPlayer'
import { assetUrl } from '../components/assetUrl'

// Silueta de obra en línea: masas, grúa torre, mástil de cámara y ruta de señal.
// Es el mismo lenguaje visual del OpeningClip para que HTML y video no diverjan.
export function SiteSkyline({ signalPhase }: { signalPhase: number | null }) {
  // Ruta que recorre el pulso de señal desde la cámara hasta el nodo agente.
  const dashOffset = signalPhase === null ? undefined : 1 - signalPhase
  return (
    <svg className="site-skyline" viewBox="0 0 960 560" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      {/* suelo y coordenadas */}
      <line x1="0" y1="520" x2="960" y2="520" className="sk-ground" />
      {[120, 300, 480, 660, 840].map((x) => (
        <line key={x} x1={x} y1="520" x2={x} y2="528" className="sk-tick" />
      ))}
      {/* masa de edificio en obra (izquierda) */}
      <g className="sk-structure">
        <rect x="90" y="300" width="200" height="220" />
        <line x1="90" y1="355" x2="290" y2="355" />
        <line x1="90" y1="410" x2="290" y2="410" />
        <line x1="90" y1="465" x2="290" y2="465" />
        <line x1="156" y1="300" x2="156" y2="520" />
        <line x1="223" y1="300" x2="223" y2="520" />
      </g>
      {/* grúa torre */}
      <g className="sk-structure">
        <line x1="520" y1="520" x2="520" y2="120" />
        <line x1="512" y1="520" x2="512" y2="128" />
        <line x1="512" y1="128" x2="770" y2="128" />
        <line x1="512" y1="120" x2="430" y2="120" />
        <line x1="520" y1="150" x2="700" y2="128" />
        <line x1="512" y1="150" x2="452" y2="128" />
        <line x1="700" y1="128" x2="700" y2="235" />
        <rect x="688" y="235" width="24" height="18" />
      </g>
      {/* masa de edificio derecha */}
      <g className="sk-structure sk-soft">
        <rect x="760" y="360" width="150" height="160" />
        <line x1="760" y1="400" x2="910" y2="400" />
        <line x1="760" y1="440" x2="910" y2="440" />
        <line x1="760" y1="480" x2="910" y2="480" />
      </g>
      {/* mástil de cámara */}
      <g className="sk-camera">
        <line x1="330" y1="520" x2="330" y2="250" />
        <rect x="318" y="228" width="34" height="20" rx="3" />
        <path d="M352 232 L368 226 L368 250 L352 244 Z" />
        <circle cx="330" cy="212" r="5" className="sk-cam-light" />
      </g>
      {/* ruta de la señal: cámara → nodo agente */}
      <path
        className="sk-signal-path"
        d="M352 238 C 470 240, 520 320, 620 330 S 800 330, 852 300"
        pathLength={1}
      />
      <path
        className="sk-signal-progress"
        d="M352 238 C 470 240, 520 320, 620 330 S 800 330, 852 300"
        pathLength={1}
        style={dashOffset === undefined ? undefined : { strokeDashoffset: dashOffset }}
      />
      {/* nodo agente */}
      <g className="sk-agent">
        <rect x="826" y="278" width="76" height="44" rx="10" />
        <text x="864" y="298" textAnchor="middle">AGENTE</text>
        <text x="864" y="312" textAnchor="middle" className="sk-agent-sub">en espera</text>
      </g>
    </svg>
  )
}

export function Cover() {
  const motion = useMotion()
  const signalPhase = motion.phase(4.5)
  return (
    <div className="cover-scene">
      <div className="cover-visual" aria-hidden="true">
        <SiteSkyline signalPhase={signalPhase} />
      </div>
      <div className="cover-copy">
        <Reveal order={0}>
          <img className="cover-logo" src={assetUrl('assets/gen-logo-white.png')} alt="GEN+" />
        </Reveal>
        <Reveal as="p" order={1} className="eyebrow">AI CONSTRUCTION · PONENCIA</Reveal>
        <Reveal as="h1" order={2}>
          Cuando la obra puede <em>ver</em>,<br />el agente puede actuar.
        </Reveal>
        <Reveal as="p" order={3} className="cover-sub">
          Cómo una señal visual activa un sistema que interpreta, decide, escala y conserva evidencia.
        </Reveal>
        <Reveal order={4} className="cover-meta">
          <span>Alejandro Palpan</span>
          <span>GEN+ · AI Construction</span>
          <ClipPlayer
            src="./media/clips/opening.mp4"
            poster="./media/posters/opening.png"
            label="Clip de apertura"
          />
        </Reveal>
      </div>
    </div>
  )
}
