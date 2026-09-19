import { cn } from '@/utils/cn'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  onLabel: string
  offLabel: string
  ariaLabel: string
}

const Knob = () => (
  <span className="h-[18px] w-[18px] shrink-0 rounded-full bg-primary shadow-sm" />
)

const Label = ({ text }: { text: string }) => (
  <span className="select-none px-2 text-[11px] font-semibold text-content-secondary">
    {text}
  </span>
)

export function Toggle({ checked, onChange, onLabel, offLabel, ariaLabel }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={cn(
        'inline-flex h-6 items-center rounded-pill bg-step-inactive px-[3px] transition-colors',
      )}
    >
      {checked ? (
        <>
          <Label text={onLabel} />
          <Knob />
        </>
      ) : (
        <>
          <Knob />
          <Label text={offLabel} />
        </>
      )}
    </button>
  )
}
