import { useCallback, useEffect, useRef, useState } from 'react'
import type { SceneContract } from '../content/types'

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

export default function Deck({ scenes }: { scenes: SceneContract[] }) {
  const [current, setCurrent] = useState(() => readInitialSlide(scenes.length))
  const [overview, setOverview] = useState(false)
  const [notes, setNotes] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const scene = scenes[current]
  const progress = ((current + 1) / scenes.length) * 100

  const go = useCallback((index: number) => {
    setCurrent(Math.max(0, Math.min(scenes.length - 1, index)))
  }, [scenes.length])
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
      if (target?.matches('button, input, textarea, select, video')) {
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
        go(scenes.length - 1)
      } else if (event.key.toLowerCase() === 'o') {
        setOverview((value) => !value)
      } else if (event.key.toLowerCase() === 'n') {
        setNotes((value) => !value)
      } else if (event.key.toLowerCase() === 'f') {
        void toggleFullscreen()
      } else if (event.key.toLowerCase() === 'r') {
        setResetKey((value) => value + 1)
      } else if (event.key === 'Escape') {
        setOverview(false)
        setNotes(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [go, next, previous, scenes.length, toggleFullscreen])

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
        <p>PROBLEMA × SISTEMAS AGENTIC × AI FIRST</p>
        <span className="slide-counter">{String(current + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}</span>
      </header>

      <section className="deck-stage" aria-live="polite">
        <article className="scene scene-enter" data-slide-id={scene.id} key={`${scene.id}-${resetKey}`}>
          {scene.render()}
        </article>
      </section>

      <footer className="deck-footer">
        <p>{scene.eyebrow}</p>
        <nav aria-label="Controles de presentación">
          <button type="button" onClick={previous} disabled={current === 0} aria-label="Escena anterior">←</button>
          <button type="button" onClick={() => setResetKey((value) => value + 1)} aria-label="Reiniciar escena">R</button>
          <button type="button" onClick={() => setOverview(true)} aria-label="Abrir overview">O</button>
          <button type="button" onClick={() => setNotes(true)} aria-label="Abrir notas del presentador">N</button>
          <button type="button" onClick={() => void toggleFullscreen()} aria-label="Activar pantalla completa">F</button>
          <button type="button" onClick={next} disabled={current === scenes.length - 1} aria-label="Escena siguiente">→</button>
        </nav>
      </footer>
      <div className="progress-track" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>

      {overview ? (
        <div className="overlay overview-overlay" role="dialog" aria-modal="true" aria-label="Overview de la presentación">
          <div className="overlay-head"><p>MAPA DE LA PONENCIA</p><button type="button" onClick={() => setOverview(false)} aria-label="Cerrar overview">×</button></div>
          <div className="overview-grid">
            {scenes.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === current ? 'current' : ''}
                onClick={() => { go(index); setOverview(false) }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <b>{item.eyebrow}</b>
                <p>{item.claim}</p>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {notes ? (
        <aside className="overlay notes-overlay" role="dialog" aria-modal="true" aria-label="Notas del presentador">
          <div className="overlay-head">
            <p>NOTAS · {String(current + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}</p>
            <div className="notes-actions"><span className="timer">{formatTime(seconds)}</span><button type="button" onClick={() => setSeconds(0)}>Reiniciar</button><button type="button" onClick={() => setNotes(false)} aria-label="Cerrar notas">×</button></div>
          </div>
          <div className="notes-copy">
            <small>{scene.eyebrow}</small>
            <h2>{scene.claim}</h2>
            <dl className="notes-grid">
              <div><dt>Intención</dt><dd>{scene.notes.intent}</dd></div>
              <div><dt>Apertura</dt><dd>{scene.notes.opening}</dd></div>
              <div><dt>Explicación</dt><dd>{scene.notes.explanation}</dd></div>
              <div><dt>Transición</dt><dd>{scene.notes.transition}</dd></div>
              {scene.notes.warning ? <div className="note-warning"><dt>Advertencia</dt><dd>{scene.notes.warning}</dd></div> : null}
              {scene.notes.cue ? <div className="note-cue"><dt>Cue</dt><dd>{scene.notes.cue}</dd></div> : null}
            </dl>
            <span>Fuentes: {scene.evidence.join(' · ')} — ver public/source-manifest.json</span>
          </div>
        </aside>
      ) : null}
    </main>
  )
}
