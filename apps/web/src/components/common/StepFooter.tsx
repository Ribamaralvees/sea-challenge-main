import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
  selectCurrentIndex,
  selectCurrentStep,
  selectSteps,
} from '@/store/selectors/stepsSelectors'
import { setStepCompleted } from '@/store/slices/stepsSlice'
import { Button } from '@/components/ui/Button'

export function StepFooter() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const steps = useAppSelector(selectSteps)
  const currentIndex = useAppSelector(selectCurrentIndex)
  const currentStep = useAppSelector(selectCurrentStep)

  const isFirst = currentIndex <= 0
  const isLast = currentIndex >= steps.length - 1

  const handleNext = () => {
    if (currentStep && !currentStep.completed) {
      dispatch(setStepCompleted({ id: currentStep.id, completed: true }))
    }
    navigate(`/step/${currentIndex + 2}`)
  }

  const handlePrev = () => {
    const previousStep = steps[currentIndex - 1]
    if (previousStep?.completed) {
      dispatch(setStepCompleted({ id: previousStep.id, completed: false }))
    }
    navigate(`/step/${currentIndex}`)
  }

  return (
    <footer className="mt-auto flex items-center justify-between pt-4">
      {isFirst ? (
        <span />
      ) : (
        <Button variant="solid" onClick={handlePrev}>
          Passo anterior
        </Button>
      )}

      <Button variant="solid" disabled={isLast} onClick={handleNext}>
        Próximo passo
      </Button>
    </footer>
  )
}
