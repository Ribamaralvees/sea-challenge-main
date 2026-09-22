import { cn } from '@/utils/cn'
import { FieldShell } from './FieldShell'

interface RadioOption {
  label: string
  value: string
}

interface RadioGroupProps {
  label: string
  name: string
  options: RadioOption[]
  value: string | undefined
  onChange: (value: string) => void
  error?: string
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
}: RadioGroupProps) {
  return (
    <FieldShell label={label} error={error}>
      <div className="flex h-11 items-center gap-6">
        {options.map((option) => {
          const checked = value === option.value
          return (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 text-sm text-content-heading"
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  'flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 transition-colors',
                  checked ? 'border-primary' : 'border-content-muted',
                )}
              >
                <span
                  className={cn(
                    'h-2.5 w-2.5 rounded-full bg-primary transition-transform',
                    checked ? 'scale-100' : 'scale-0',
                  )}
                />
              </span>
              {option.label}
            </label>
          )
        })}
      </div>
    </FieldShell>
  )
}
