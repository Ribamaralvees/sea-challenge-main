import { INFO_PANEL_TEXT } from '@/constants'

function AvatarSilhouette() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 150"
      className="h-auto w-40 text-content-muted/70"
      fill="currentColor"
    >
      <circle cx="80" cy="50" r="40" />
      <path d="M16 150a64 64 0 0 1 128 0Z" />
    </svg>
  )
}

export function InfoPanel() {
  return (
    <aside className="rounded-panel bg-surface p-6 shadow-card">
      <p className="text-sm leading-relaxed text-content">{INFO_PANEL_TEXT}</p>
      <div className="mt-6">
        <AvatarSilhouette />
      </div>
    </aside>
  )
}
