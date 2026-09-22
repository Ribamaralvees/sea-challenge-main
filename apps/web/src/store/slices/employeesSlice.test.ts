import { describe, expect, it, vi, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import type { Employee } from '@/types'
import { employeeService } from '@/services/api'
import reducer, {
  closeForm,
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  openEditForm,
  toggleActiveOnly,
  updateEmployee,
} from './employeesSlice'

vi.mock('@/services/api', () => ({
  employeeService: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

const employee: Employee = {
  id: 'a',
  name: 'Daniel Alves da Silva',
  cpf: '000.111.222-33',
  rg: '12.345.678-9',
  birthDate: '1990-03-15',
  gender: 'masculino',
  role: 'Cargo 1',
  active: true,
  epiActivities: [],
  healthCertificate: null,
}

const makeStore = () => configureStore({ reducer: { employees: reducer } })

beforeEach(() => {
  vi.resetAllMocks()
})

describe('reducers síncronos', () => {
  it('openEditForm abre o form com o funcionário selecionado', () => {
    const store = makeStore()
    store.dispatch(openEditForm(employee))
    expect(store.getState().employees.isFormOpen).toBe(true)
    expect(store.getState().employees.editingEmployee).toEqual(employee)
  })

  it('closeForm limpa o funcionário em edição', () => {
    const store = makeStore()
    store.dispatch(openEditForm(employee))
    store.dispatch(closeForm())
    expect(store.getState().employees.isFormOpen).toBe(false)
    expect(store.getState().employees.editingEmployee).toBeNull()
  })

  it('toggleActiveOnly alterna o filtro', () => {
    const store = makeStore()
    store.dispatch(toggleActiveOnly())
    expect(store.getState().employees.showActiveOnly).toBe(true)
  })
})

describe('fetchEmployees', () => {
  it('preenche items em caso de sucesso', async () => {
    vi.mocked(employeeService.getAll).mockResolvedValue([employee])
    const store = makeStore()
    await store.dispatch(fetchEmployees())
    expect(store.getState().employees.items).toEqual([employee])
    expect(store.getState().employees.loading).toBe(false)
  })

  it('preenche error em caso de falha', async () => {
    vi.mocked(employeeService.getAll).mockRejectedValue(new Error('Falha de rede'))
    const store = makeStore()
    await store.dispatch(fetchEmployees())
    expect(store.getState().employees.error).toBe('Falha de rede')
  })
})

describe('createEmployee', () => {
  it('insere no topo da lista e fecha o form', async () => {
    vi.mocked(employeeService.create).mockResolvedValue(employee)
    const store = makeStore()
    const { id: _id, ...payload } = employee
    await store.dispatch(createEmployee(payload))
    expect(store.getState().employees.items[0]).toEqual(employee)
    expect(store.getState().employees.isFormOpen).toBe(false)
  })

  it('preenche error em caso de falha', async () => {
    vi.mocked(employeeService.create).mockRejectedValue(new Error('CPF inválido'))
    const store = makeStore()
    const { id: _id, ...payload } = employee
    await store.dispatch(createEmployee(payload))
    expect(store.getState().employees.error).toBe('CPF inválido')
    expect(store.getState().employees.items).toHaveLength(0)
  })
})

describe('updateEmployee', () => {
  it('preenche error em caso de falha', async () => {
    vi.mocked(employeeService.update).mockRejectedValue(
      new Error('Funcionário não encontrado'),
    )
    const store = makeStore()
    await store.dispatch(updateEmployee(employee))
    expect(store.getState().employees.error).toBe('Funcionário não encontrado')
  })
})

describe('deleteEmployee', () => {
  it('remove o funcionário da lista', async () => {
    vi.mocked(employeeService.getAll).mockResolvedValue([employee])
    vi.mocked(employeeService.remove).mockResolvedValue(undefined)
    const store = makeStore()
    await store.dispatch(fetchEmployees())
    await store.dispatch(deleteEmployee('a'))
    expect(store.getState().employees.items).toHaveLength(0)
  })

  it('preenche error em caso de falha e mantém a lista', async () => {
    vi.mocked(employeeService.getAll).mockResolvedValue([employee])
    vi.mocked(employeeService.remove).mockRejectedValue(new Error('Falha de rede'))
    const store = makeStore()
    await store.dispatch(fetchEmployees())
    await store.dispatch(deleteEmployee('a'))
    expect(store.getState().employees.error).toBe('Falha de rede')
    expect(store.getState().employees.items).toHaveLength(1)
  })
})
