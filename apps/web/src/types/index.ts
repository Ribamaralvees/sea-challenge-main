export type { Employee, NewEmployee, Epi, EpiActivity, Gender, Step } from '@sea/shared'
import type { Employee, Step } from '@sea/shared'

export interface EmployeesState {
  items: Employee[]
  loading: boolean
  error: string | null
  isFormOpen: boolean
  editingEmployee: Employee | null
  showActiveOnly: boolean
}

export interface StepsState {
  items: Step[]
  currentIndex: number
  loading: boolean
  error: string | null
}
