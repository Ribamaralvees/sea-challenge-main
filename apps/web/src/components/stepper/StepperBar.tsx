import { useAppSelector } from '@/hooks/redux'
import { selectSteps, selectCurrentIndex } from '@/store/selectors/stepsSelectors'
import { selectIsFormOpen } from '@/store/selectors/employeesSelectors'
import { StepItem } from './StepItem'

export function StepperBar() {
  const steps = useAppSelector(selectSteps)
  const currentIndex = useAppSelector(selectCurrentIndex)
  const isFormOpen = useAppSelector(selectIsFormOpen)

  const hasProgress =
    currentIndex > 0 || isFormOpen || steps.some((step) => step.completed)

  return (
    <section
      aria-label="Etapas do processo"
      className="rounded-panel bg-surface px-6 py-6 shadow-card"
    >
      <div className="flex items-start overflow-x-auto scroll-soft px-1 py-1">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-1 items-start last:flex-none">
            <StepItem
              label={step.label}
              position={index + 1}
              isCurrent={index === currentIndex}
              isActive={hasProgress}
              isCompleted={step.completed}
            />
            {index < steps.length - 1 && (
              <span className="stepper-connector mt-[26px] min-w-[24px]" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
