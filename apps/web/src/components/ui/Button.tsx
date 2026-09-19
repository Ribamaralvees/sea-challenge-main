import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'outline' | 'solid' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  outline:
    'border border-primary bg-surface text-primary hover:bg-surface-blue/60 disabled:opacity-50',
  solid:
    'border border-primary-light bg-primary-light text-content-inverse hover:bg-primary disabled:cursor-not-allowed disabled:bg-step-inactive disabled:border-step-inactive disabled:text-content-muted',
  ghost:
    'border border-content-muted/30 bg-surface text-content-secondary hover:border-primary hover:text-primary',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'outline', fullWidth, className, type = 'button', ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        variantClasses[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    />
  ),
)
Button.displayName = 'Button'
