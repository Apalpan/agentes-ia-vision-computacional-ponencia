import type { ReactNode } from 'react'

export type SlideDef = {
  id: string
  eyebrow: string
  title: string
  sources: string[]
  notes: string
  render: () => ReactNode
}

