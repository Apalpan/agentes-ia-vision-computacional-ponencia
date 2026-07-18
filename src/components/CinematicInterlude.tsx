import { useEffect, useRef, useState } from 'react'
import { OffthreadVideo, staticFile } from 'remotion'
import { useMotion } from '../motion/MotionContext'

type CinematicInterludeProps = {
  code: string
  title: string
  statement: string
  src: string
  poster: string
  accent?: 'signal' | 'decision' | 'evidence'
}

const publicAsset = (path: string) => path.replace(/^\.\//, '')

export function CinematicInterlude({
  code,
  title,
  statement,
  src,
  poster,
  accent = 'signal',
}: CinematicInterludeProps) {
  const motion = useMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [manualPlay, setManualPlay] = useState(false)

  useEffect(() => {
    if (motion.isRender) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [motion.isRender])

  useEffect(() => {
    if (motion.isRender || reducedMotion || failed) return
    const video = videoRef.current
    if (!video) return
    void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }, [failed, motion.isRender, reducedMotion, src])

  if (motion.isRender) {
    return (
      <div className={`cinematic-interlude accent-${accent}`} role="img" aria-label={`${code}. ${title}. ${statement}`}>
        <OffthreadVideo
          src={staticFile(publicAsset(src))}
          volume={0}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    )
  }

  const showVideo = !failed && (!reducedMotion || manualPlay)

  const togglePlayback = async () => {
    const video = videoRef.current
    if (!video) {
      setManualPlay(true)
      return
    }
    if (video.paused) {
      setManualPlay(true)
      await video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  const enterFullscreen = async () => {
    await stageRef.current?.requestFullscreen?.()
  }

  return (
    <div ref={stageRef} className={`cinematic-interlude accent-${accent}`} aria-label={`${code}. ${title}. ${statement}`}>
      {showVideo ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          loop
          autoPlay={!reducedMotion}
          preload="auto"
          onCanPlay={(event) => {
            if (!reducedMotion || manualPlay) {
              void event.currentTarget.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
            }
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
          aria-label={`${title}. Video conceptual sin audio.`}
        />
      ) : (
        <img className="cinematic-poster" src={poster} alt="" />
      )}

      <div className="cinematic-controls" aria-label="Controles del video">
        <span>{failed ? 'FALLBACK ESTÁTICO' : reducedMotion && !manualPlay ? 'MOVIMIENTO REDUCIDO' : playing ? 'EN REPRODUCCIÓN' : 'PAUSADO'}</span>
        {!failed ? (
          <button type="button" onClick={() => void togglePlayback()} aria-label={playing ? 'Pausar video' : 'Reproducir video'}>
            {playing ? 'Ⅱ' : '▶'}
          </button>
        ) : null}
        <button type="button" onClick={() => void enterFullscreen()} aria-label="Ver video en pantalla completa">⛶</button>
      </div>
    </div>
  )
}
