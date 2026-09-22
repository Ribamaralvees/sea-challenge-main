import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg',
  ...props,
})

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M5 3h14a1 1 0 0 1 1 1v17h-4v-3h-2v3H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2 3v2h2V6H7Zm4 0v2h2V6h-2Zm4 0v2h2V6h-2ZM7 10v2h2v-2H7Zm4 0v2h2v-2h-2Zm4 0v2h2v-2h-2ZM7 14v2h2v-2H7Zm8 0v2h2v-2h-2Z" />
    </svg>
  )
}

export function EditSquareIcon(props: IconProps) {
  return (
    <svg
      {...base(props)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
      <path d="M16.5 4.5a1.8 1.8 0 0 1 2.6 2.6L12 14l-3 1 1-3 6.5-6.5Z" />
    </svg>
  )
}

export function SitemapIcon(props: IconProps) {
  return (
    <svg
      {...base(props)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9.5" y="3" width="5" height="4" rx="1" />
      <rect x="3" y="16" width="5" height="4" rx="1" />
      <rect x="9.5" y="16" width="5" height="4" rx="1" />
      <rect x="16" y="16" width="5" height="4" rx="1" />
      <path d="M12 7v3M5.5 16v-2a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v2M12 11v5" />
    </svg>
  )
}

export function BellDocIcon(props: IconProps) {
  return (
    <svg
      {...base(props)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 17a3 3 0 0 0 6 0" />
      <path d="M6 17h12l-1.4-2A6 6 0 0 1 15 11V9a6 6 0 0 0-9-5" />
      <rect
        x="3.5"
        y="12.5"
        width="6"
        height="7"
        rx="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

export function HistoryIcon(props: IconProps) {
  return (
    <svg
      {...base(props)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 4v4h4" />
      <path d="M12 8v4l3 2" />
    </svg>
  )
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0 1 16 0 1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
    </svg>
  )
}

export function EllipsisIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <circle cx="6" cy="12" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="18" cy="12" r="1.7" />
    </svg>
  )
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg
      {...base(props)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 5l-7 7 7 7" />
    </svg>
  )
}

export function PaperclipIcon(props: IconProps) {
  return (
    <svg
      {...base(props)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5 12.5 20a5 5 0 0 1-7-7l8-8a3.3 3.3 0 0 1 4.7 4.7l-8 8a1.6 1.6 0 0 1-2.3-2.3l7.4-7.4" />
    </svg>
  )
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg
      {...base(props)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </svg>
  )
}

export function AlertCircleIcon(props: IconProps) {
  return (
    <svg
      {...base(props)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg
      {...base(props)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}
