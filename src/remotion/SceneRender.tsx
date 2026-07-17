import { useCurrentFrame, useVideoConfig } from 'remotion'
import type { SceneContract } from '../content/types'
import { MotionProvider } from '../motion/MotionContext'
import { assetUrl } from '../components/assetUrl'

// Shell determinista: reproduce la identidad del deck (fondo, grilla, header)
// sin controles interactivos. mode-render apaga CSS animations/transitions:
// todo el tiempo lo gobierna el frame de Remotion.
export function SceneRender({ scene, index, total }: { scene: SceneContract; index: number; total: number }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const progress = ((index + Math.min(1, frame / scene.durationInFrames)) / total) * 100
  return (
    <MotionProvider value={{ mode: 'render', frame, fps, durationInFrames: scene.durationInFrames }}>
      <div className="deck-shell mode-render render-shell">
        <div className="ambient-grid" aria-hidden="true" />
        <header className="deck-header">
          <img src={assetUrl('assets/gen-logo-white.png')} alt="GEN+" />
          <p>AGENTES IA × VISIÓN COMPUTACIONAL</p>
          <span className="slide-counter">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        </header>
        <section className="deck-stage">
          <article className="scene" data-slide-id={scene.id}>
            {scene.render()}
          </article>
        </section>
        <div className="progress-track render-progress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
      </div>
    </MotionProvider>
  )
}
