import { Reveal, useMotion } from '../motion/MotionContext'
import { ClipPlayer } from '../components/ClipPlayer'
import { assetUrl } from '../components/assetUrl'

export function Closing() {
  const motion = useMotion()
  const ringPhase = motion.phase(6)
  return (
    <div className="closing-scene">
      <div
        className="closing-converge"
        aria-hidden="true"
        style={ringPhase === null ? undefined : ({ '--ring-phase': ringPhase } as never)}
      >
        <svg viewBox="0 0 600 600" fill="none">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              className="cv-ray"
              x1={300 + Math.cos((angle * Math.PI) / 180) * 300}
              y1={300 + Math.sin((angle * Math.PI) / 180) * 300}
              x2={300 + Math.cos((angle * Math.PI) / 180) * 180}
              y2={300 + Math.sin((angle * Math.PI) / 180) * 180}
            />
          ))}
          <circle cx="300" cy="300" r="150" className="cv-ring" pathLength={1} />
          <circle cx="300" cy="300" r="150" className="cv-ring-progress" pathLength={1} />
        </svg>
      </div>
      <div className="closing-copy">
        <Reveal as="p" order={0} className="eyebrow">CIERRE · AI CONSTRUCTION</Reveal>
        <Reveal as="h2" order={1}>
          La ventaja no será usar IA.{' '}
          <em>Será operar con IA.</em>
        </Reveal>
        <Reveal order={2} className="closing-action">
          <span>DISEÑA EL PRIMER LOOP AI NATIVE</span>
          <div className="loop-slots">
            <b>un evento crítico</b>
            <i aria-hidden="true" />
            <b>una decisión</b>
            <i aria-hidden="true" />
            <b>una evidencia</b>
          </div>
        </Reveal>
        <Reveal order={3} className="closing-signature">
          <img src={assetUrl('assets/gen-logo-white.png')} alt="GEN+" />
          <span>Alejandro Palpan</span>
          <span>GEN+ · AI Construction</span>
          <ClipPlayer
            src="./media/clips/closing.mp4"
            poster="./media/posters/closing.png"
            label="Clip de cierre"
          />
        </Reveal>
      </div>
    </div>
  )
}
