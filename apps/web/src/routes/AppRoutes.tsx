import { Navigate, Route, Routes } from 'react-router-dom'
import { EmployeesStepPage } from '@/pages/EmployeesStepPage'
import { ComingSoonStepPage } from '@/pages/ComingSoonStepPage'
import { ComingSoonMenuPage } from '@/pages/ComingSoonMenuPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/step/1" replace />} />
      <Route path="/step/1" element={<EmployeesStepPage />} />
      <Route path="/step/:stepNumber" element={<ComingSoonStepPage />} />
      <Route path="/menu/:section" element={<ComingSoonMenuPage />} />
      <Route path="*" element={<Navigate to="/step/1" replace />} />
    </Routes>
  )
}
