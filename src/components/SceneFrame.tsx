import type { ReactNode } from 'react'
import { Reveal } from '../motion/MotionContext'

export function SceneFrame({
  eyebrow,
  title,
  lead,
  action,
  children,
  className = '',
}: {
  eyebrow: string
  title: ReactNode
  lead?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`frame ${className}`.trim()}>
      <Reveal as="header" order={0} className="frame-head">
        <div className="frame-kicker-row">
          <p className="eyebrow">{eyebrow}</p>
          {action ? <div className="frame-action">{action}</div> : null}
        </div>
        <h2>{title}</h2>
        {lead ? <p className="lead">{lead}</p> : null}
      </Reveal>
      <div className="frame-body">{children}</div>
    </div>
  )
}
