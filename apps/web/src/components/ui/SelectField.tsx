import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'
import { FieldShell } from './FieldShell'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: readonly string[]
  placeholder?: string
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, options, placeholder, id, className, ...rest }, ref) => {
    const select = (
      <select
        ref={ref}
        id={id}
        className={cn(
          'select-field h-11 w-full rounded-md border bg-surface pl-3 pr-9 text-sm text-content-heading outline-none transition-colors',
          error ? 'border-red-400' : 'border-primary/45 focus:border-primary',
          className,
        )}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )

    if (!label) return select
    return (
      <FieldShell label={label} htmlFor={id} error={error}>
        {select}
      </FieldShell>
    )
  },
)
SelectField.displayName = 'SelectField'
