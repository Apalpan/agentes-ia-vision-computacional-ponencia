import { useEffect, useRef, useState } from 'react'
import { SceneFrame } from '../components/SceneFrame'
import { ClipPlayer } from '../components/ClipPlayer'
import { Reveal, useMotion } from '../motion/MotionContext'

type DemoEvent = {
  id: number
  tipo: string
  zona: string
  camara: string
  hora: string
  confianza: string
}

const EVENT_POOL: Array<[string, string]> = [
  ['presencia_en_zona', 'Z-04 · acceso restringido'],
  ['epp_incompleto', 'Z-02 · frente de vaciado'],
  ['maquinaria_activa', 'Z-07 · patio de maniobras'],
]

const RENDER_EVENTS: DemoEvent[] = [
  { id: 1, tipo: 'presencia_en_zona', zona: 'Z-04 · acceso restringido', camara: 'CAM-02', hora: '10:42:07', confianza: 'demo conceptual' },
  { id: 2, tipo: 'epp_incompleto', zona: 'Z-02 · frente de vaciado', camara: 'CAM-02', hora: '10:43:31', confianza: 'demo conceptual' },
]

export function CameraLab() {
  const motion = useMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [status, setStatus] = useState<'idle' | 'starting' | 'live' | 'denied'>('idle')
  const [events, setEvents] = useState<DemoEvent[]>([])
  const counter = useRef(0)

  useEffect(() => () => streamRef.current?.getTracks().forEach((track) => track.stop()), [])

  const startCamera = async () => {
    if (status === 'starting' || status === 'live') return
    setStatus('starting')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setStatus('live')
    } catch {
      setStatus('denied')
    }
  }

  const emitEvent = () => {
    const [tipo, zona] = EVENT_POOL[counter.current % EVENT_POOL.length]
    counter.current += 1
    const now = new Date()
    const hora = now.toTimeString().slice(0, 8)
    setEvents((current) => [
      { id: counter.current, tipo, zona, camara: 'CAM-02', hora, confianza: 'demo conceptual' },
      ...current,
    ].slice(0, 3))
  }

  const visibleEvents = motion.isRender
    ? RENDER_EVENTS.filter((_, index) => motion.progress > 0.35 + index * 0.3)
    : events

  return (
    <SceneFrame
      eyebrow="ACTO II · DEMO DE PERCEPCIÓN"
      title="La cámara no es el producto. El producto es el evento."
      lead="Cámara local y opcional, sin biometría. Los overlays son conceptuales: lo que importa es el paso de imagen a evento estructurado con zona, hora y contexto."
      className="camlab-scene"
    >
      <div className={`camera-lab status-${status}`}>
        <Reveal order={1} className="camera-screen">
          <video ref={videoRef} muted playsInline aria-label="Vista local de cámara" />
          <div className="camera-fallback" aria-hidden={status === 'live'}>
            <span>CAMERA FEED</span>
            <i /><i /><i />
          </div>
          <div className="scan-line" aria-hidden="true" />
          <div className="detection detection-a"><b>ZONA</b><span>demo</span></div>
          <div className="detection detection-b"><b>OBJETO</b><span>demo</span></div>
          <div className="camera-hud">
            <span>LOCAL</span><span>SIN BIOMETRÍA</span><span>DEMO CONCEPTUAL</span>
          </div>
        </Reveal>
        <Reveal order={2} as="aside" className="event-console">
          <small>CONSOLA DE EVENTOS</small>
          <div className="console-feed" aria-live="polite">
            {visibleEvents.length === 0 ? (
              <p className="console-empty">Sin eventos aún. La imagen sola no decide nada: emite el primero.</p>
            ) : (
              visibleEvents.map((event) => (
                <article key={event.id} className="event-card">
                  <b>{event.tipo}</b>
                  <div>
                    <span>zona <i>{event.zona}</i></span>
                    <span>cámara <i>{event.camara}</i></span>
                    <span>hora <i>{event.hora}</i></span>
                    <span>confianza <i>{event.confianza}</i></span>
                  </div>
                </article>
              ))
            )}
          </div>
          <div className="console-actions">
            <button className="primary-action" type="button" onClick={emitEvent}>
              Emitir evento demo
            </button>
            <button
              className="ghost-action"
              type="button"
              onClick={startCamera}
              disabled={status === 'starting' || status === 'live'}
            >
              {status === 'idle' && 'Activar cámara local'}
              {status === 'starting' && 'Solicitando permiso…'}
              {status === 'live' && 'Cámara activa'}
              {status === 'denied' && 'Reintentar cámara'}
            </button>
          </div>
          {status === 'denied' ? (
            <p className="camera-error" role="status">
              Permiso no disponible. La escena continúa en modo conceptual — puedes usar el clip.
            </p>
          ) : null}
          <ClipPlayer
            src="./media/clips/vision-to-event.mp4"
            poster="./media/posters/vision-to-event.png"
            label="Clip visión → evento"
          />
        </Reveal>
      </div>
    </SceneFrame>
  )
}
