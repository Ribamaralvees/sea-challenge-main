export interface Epi {
  name: string
  ca: string
}

export interface EpiActivity {
  activity: string
  epis: Epi[]
}

export type Gender = 'masculino' | 'feminino'

export interface Employee {
  id: string
  name: string
  cpf: string
  rg: string
  birthDate: string
  gender: Gender
  role: string
  active: boolean
  epiActivities: EpiActivity[]
  healthCertificate: string | null
}

export type NewEmployee = Omit<Employee, 'id'>

export interface Step {
  id: string
  label: string
  completed: boolean
}

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
