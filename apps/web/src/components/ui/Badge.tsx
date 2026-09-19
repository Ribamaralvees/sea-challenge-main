import type { ReactNode } from 'react'

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-pill bg-primary px-3 py-1 text-xs font-normal text-content-inverse">
      {children}
    </span>
  )
}
