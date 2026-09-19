import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/redux'
import { fetchEmployees } from '@/store/slices/employeesSlice'
import { fetchSteps } from '@/store/slices/stepsSlice'
import { AppRoutes } from '@/routes/AppRoutes'

export function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchEmployees())
    dispatch(fetchSteps())
  }, [dispatch])

  return <AppRoutes />
}
