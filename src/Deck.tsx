import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { SlideDef } from './types'

function readInitialSlide(total: number) {
  const value = Number(new URLSearchParams(window.location.search).get('slide'))
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.min(total - 1, value - 1))
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

export default function Deck({ slides }: { slides: SlideDef[] }) {
  const [current, setCurrent] = useState(() => readInitialSlide(slides.length))
  const [overview, setOverview] = useState(false)
  const [notes, setNotes] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const slide = slides[current]
  const progress = ((current + 1) / slides.length) * 100
  const sourceText = useMemo(() => slide.sources.join(' · '), [slide.sources])

  const go = useCallback((index: number) => {
    setCurrent(Math.max(0, Math.min(slides.length - 1, index)))
  }, [slides.length])
  const next = useCallback(() => go(current + 1), [current, go])
  const previous = useCallback(() => go(current - 1), [current, go])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    params.set('slide', String(current + 1))
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`)
  }, [current])

  useEffect(() => {
    if (!notes) return
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [notes])

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.()
    else await document.exitFullscreen?.()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.matches('button, input, textarea, select')) {
        if (event.key === 'Escape') target.blur()
        return
      }

      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault()
        next()
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        previous()
      } else if (event.key === 'Home') {
        event.preventDefault()
        go(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        go(slides.length - 1)
      } else if (event.key.toLowerCase() === 'o') {
        setOverview((value) => !value)
      } else if (event.key.toLowerCase() === 'n') {
        setNotes((value) => !value)
      } else if (event.key.toLowerCase() === 'f') {
        void toggleFullscreen()
      } else if (event.key === 'Escape') {
        setOverview(false)
        setNotes(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [go, next, previous, slides.length, toggleFullscreen])

  return (
    <main
      className="deck-shell"
      onTouchStart={(event) => {
        const touch = event.touches[0]
        touchStart.current = { x: touch.clientX, y: touch.clientY }
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current
        const touch = event.changedTouches[0]
        touchStart.current = null
        if (!start) return
        const deltaX = touch.clientX - start.x
        const deltaY = touch.clientY - start.y
        if (Math.abs(deltaX) > 52 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX < 0) next()
          else previous()
        }
      }}
    >
      <div className="ambient-grid" aria-hidden="true" />
      <header className="deck-header">
        <img src="./assets/gen-logo-white.png" alt="GEN+" />
        <p>AGENTES IA × VISIÓN COMPUTACIONAL</p>
        <span className="slide-counter">{String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
      </header>

      <section className="deck-stage" aria-live="polite">
        <article className="scene scene-enter" data-slide-id={slide.id} key={slide.id}>
          {slide.render()}
        </article>
      </section>

      <footer className="deck-footer">
        <p>{slide.eyebrow}</p>
        <span className="footer-source">{sourceText}</span>
        <nav aria-label="Controles de presentación">
          <button type="button" onClick={previous} disabled={current === 0} aria-label="Escena anterior">←</button>
          <button type="button" onClick={() => setOverview(true)} aria-label="Abrir overview">O</button>
          <button type="button" onClick={() => setNotes(true)} aria-label="Abrir notas del presentador">N</button>
          <button type="button" onClick={() => void toggleFullscreen()} aria-label="Activar pantalla completa">F</button>
          <button type="button" onClick={next} disabled={current === slides.length - 1} aria-label="Escena siguiente">→</button>
        </nav>
      </footer>
      <div className="progress-track" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>

      {overview ? (
        <div className="overlay overview-overlay" role="dialog" aria-modal="true" aria-label="Overview de la presentación">
          <div className="overlay-head"><p>MAPA DE LA PONENCIA</p><button type="button" onClick={() => setOverview(false)} aria-label="Cerrar overview">×</button></div>
          <div className="overview-grid">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === current ? 'current' : ''}
                onClick={() => { go(index); setOverview(false) }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <b>{item.eyebrow}</b>
                <p>{item.title}</p>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {notes ? (
        <aside className="overlay notes-overlay" role="dialog" aria-modal="true" aria-label="Notas del presentador">
          <div className="overlay-head">
            <p>NOTAS · {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</p>
            <div className="notes-actions"><span className="timer">{formatTime(seconds)}</span><button type="button" onClick={() => setSeconds(0)}>Reiniciar</button><button type="button" onClick={() => setNotes(false)} aria-label="Cerrar notas">×</button></div>
          </div>
          <div className="notes-copy">
            <small>{slide.eyebrow}</small>
            <h2>{slide.title}</h2>
            <p>{slide.notes}</p>
            <span>Fuentes: {sourceText}</span>
          </div>
        </aside>
      ) : null}
    </main>
  )
}
