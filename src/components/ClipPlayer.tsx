import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useMotion } from '../motion/MotionContext'

// Reproductor de clips conceptuales: activación manual, silencio por defecto,
// poster antes del play y fallback estático si el archivo no está disponible.
// Nunca bloquea la navegación: es una capa opcional del presentador.
export function ClipPlayer({ src, poster, label }: { src: string; poster: string; label: string }) {
  const motion = useMotion()
  const [state, setState] = useState<'closed' | 'open' | 'failed'>('closed')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (state === 'closed') return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setState('closed')
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [state])

  if (motion.isRender) return null

  if (state === 'closed') {
    return (
      <button type="button" className="clip-trigger" onClick={() => setState('open')}>
        <i aria-hidden="true">▶</i> {label}
      </button>
    )
  }

  return createPortal((
    <div className="clip-stage" role="dialog" aria-modal="true" aria-label={label}>
      <div className="clip-head">
        <span>{label} · representación conceptual</span>
        <button type="button" autoFocus onClick={() => setState('closed')} aria-label="Cerrar clip">×</button>
      </div>
      {state === 'failed' ? (
        <div className="clip-fallback">
          <img src={poster} alt="" onError={(event) => { event.currentTarget.style.display = 'none' }} />
          <p>Clip no disponible en esta copia. La escena continúa sin video.</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          controls
          preload="none"
          autoPlay
          loop
          onError={() => setState('failed')}
          aria-label={`${label} (video conceptual sin audio)`}
        />
      )}
    </div>
  ), document.body)
}
