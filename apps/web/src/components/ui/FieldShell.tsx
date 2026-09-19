import type { ReactNode } from 'react'

interface FieldShellProps {
  label: string
  htmlFor?: string
  error?: string
  children: ReactNode
}

export function FieldShell({ label, htmlFor, error, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-content-heading">
        {label}
      </label>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
