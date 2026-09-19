import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/redux'
import { setCurrentIndex } from '@/store/slices/stepsSlice'
import { MainLayout } from '@/components/layout/MainLayout'
import { CrossDecoration } from '@/components/layout/Decorations'
import { StepperBar } from '@/components/stepper/StepperBar'
import { ComingSoon } from '@/components/comingSoon/ComingSoon'
import { StepFooter } from '@/components/common/StepFooter'

export function ComingSoonStepPage() {
  const dispatch = useAppDispatch()
  const { stepNumber } = useParams()

  useEffect(() => {
    const index = Number(stepNumber ?? '1') - 1
    dispatch(setCurrentIndex(Number.isNaN(index) ? 0 : index))
  }, [dispatch, stepNumber])

  return (
    <MainLayout decoration={<CrossDecoration />}>
      <StepperBar />
      <ComingSoon />
      <StepFooter />
    </MainLayout>
  )
}
