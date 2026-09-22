import axios, { type AxiosError } from 'axios'
import type { Employee, NewEmployee, Step } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export interface ApiErrorBody {
  message?: string
}

// Normaliza o erro para a mensagem que a API manda (ex.: "Payload inválido"),
// em vez do texto genérico do Axios ("Request failed with status code 400").
export function normalizeApiError(error: AxiosError<ApiErrorBody>): Promise<never> {
  const message = error.response?.data?.message ?? error.message
  return Promise.reject(new Error(message))
}

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

httpClient.interceptors.response.use((response) => response, normalizeApiError)

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    const { data } = await httpClient.get<Employee[]>('/employees')
    return data
  },
  create: async (employee: NewEmployee): Promise<Employee> => {
    const { data } = await httpClient.post<Employee>('/employees', employee)
    return data
  },
  update: async (employee: Employee): Promise<Employee> => {
    const { data } = await httpClient.put<Employee>(`/employees/${employee.id}`, employee)
    return data
  },
  remove: async (id: string): Promise<void> => {
    await httpClient.delete(`/employees/${id}`)
  },
}

export const stepService = {
  getAll: async (): Promise<Step[]> => {
    const { data } = await httpClient.get<Step[]>('/steps')
    return data
  },
  setCompleted: async (id: string, completed: boolean): Promise<Step> => {
    const { data } = await httpClient.patch<Step>(`/steps/${id}`, { completed })
    return data
  },
}
