import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'
import { FieldShell } from './FieldShell'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, id, className, ...rest }, ref) => (
    <FieldShell label={label} htmlFor={id} error={error}>
      <input
        ref={ref}
        id={id}
        className={cn(
          'h-11 w-full rounded-md border bg-surface px-3 text-sm text-content-heading outline-none transition-colors placeholder:text-content-muted/70',
          error ? 'border-red-400' : 'border-primary/45 focus:border-primary',
          className,
        )}
        {...rest}
      />
    </FieldShell>
  ),
)
TextField.displayName = 'TextField'
