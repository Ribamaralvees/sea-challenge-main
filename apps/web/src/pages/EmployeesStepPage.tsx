import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setCurrentIndex } from '@/store/slices/stepsSlice'
import { selectIsFormOpen } from '@/store/selectors/employeesSelectors'
import { MainLayout } from '@/components/layout/MainLayout'
import { CloudDecoration } from '@/components/layout/Decorations'
import { StepperBar } from '@/components/stepper/StepperBar'
import { InfoPanel } from '@/components/info/InfoPanel'
import { StepFooter } from '@/components/common/StepFooter'
import { EmployeeList } from '@/components/employee/EmployeeList'
import { EmployeeForm } from '@/components/employee/EmployeeForm'

export function EmployeesStepPage() {
  const dispatch = useAppDispatch()
  const { stepNumber } = useParams()
  const isFormOpen = useAppSelector(selectIsFormOpen)

  useEffect(() => {
    const index = Number(stepNumber ?? '1') - 1
    dispatch(setCurrentIndex(Number.isNaN(index) ? 0 : index))
  }, [dispatch, stepNumber])

  return (
    <MainLayout decoration={<CloudDecoration />}>
      <StepperBar />

      <div className="grid flex-1 grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <InfoPanel />
        {isFormOpen ? <EmployeeForm /> : <EmployeeList />}
      </div>

      <StepFooter />
    </MainLayout>
  )
}
