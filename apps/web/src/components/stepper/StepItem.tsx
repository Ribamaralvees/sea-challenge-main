import { useNavigate } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { BuildingIcon } from '@/components/icons'

interface StepItemProps {
  label: string

  position: number
  isCurrent: boolean
  isActive: boolean
  isCompleted: boolean
}

export function StepItem({
  label,
  position,
  isCurrent,
  isActive,
  isCompleted,
}: StepItemProps) {
  const navigate = useNavigate()
  const highlighted = isCurrent || isActive

  return (
    <button
      type="button"
      onClick={() => navigate(`/step/${position}`)}
      aria-current={isCurrent ? 'step' : undefined}
      aria-label={`${label}${isCompleted ? ' (concluído)' : ''}`}
      className="flex shrink-0 flex-col items-center gap-2 focus:outline-none"
    >
      <span
        className={cn(
          'flex h-[52px] w-[52px] items-center justify-center rounded-2xl transition-colors',
          highlighted ? 'bg-primary' : 'bg-step-inactive',
          isCurrent && 'ring-2 ring-outline',
        )}
      >
        <BuildingIcon
          className={cn(
            'h-[26px] w-[26px]',
            highlighted ? 'text-content-inverse' : 'text-step-icon',
          )}
        />
      </span>

      <span className="flex flex-col items-center leading-tight">
        <span
          className={cn(
            'text-xs font-semibold',
            highlighted ? 'text-primary' : 'text-step-icon',
          )}
        >
          {label}
        </span>
        {isCompleted && (
          <span className="text-[11px] font-bold text-outline">Concluído</span>
        )}
      </span>
    </button>
  )
}
