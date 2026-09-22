import { describe, expect, it } from 'vitest'
import type { Employee } from '@/types'
import type { RootState } from '@/store'
import { selectActiveCount, selectVisibleEmployees } from './employeesSelectors'

const employee = (id: string, active: boolean): Employee => ({
  id,
  name: `Funcionário ${id}`,
  cpf: '000.111.222-33',
  rg: '12.345.678-9',
  birthDate: '1990-03-15',
  gender: 'masculino',
  role: 'Cargo 1',
  active,
  epiActivities: [],
  healthCertificate: null,
})

const stateWith = (showActiveOnly: boolean): RootState =>
  ({
    employees: {
      items: [employee('a', true), employee('b', false), employee('c', true)],
      loading: false,
      error: null,
      isFormOpen: false,
      editingEmployee: null,
      showActiveOnly,
    },
    steps: { items: [], currentIndex: 0, loading: false, error: null },
  }) as RootState

describe('selectVisibleEmployees', () => {
  it('devolve todos quando o filtro está desligado', () => {
    expect(selectVisibleEmployees(stateWith(false))).toHaveLength(3)
  })

  it('devolve só os ativos quando o filtro está ligado', () => {
    const visible = selectVisibleEmployees(stateWith(true))
    expect(visible.map((item) => item.id)).toEqual(['a', 'c'])
  })

  it('memoiza: mesma referência para o mesmo state', () => {
    const state = stateWith(true)
    expect(selectVisibleEmployees(state)).toBe(selectVisibleEmployees(state))
  })
})

describe('selectActiveCount', () => {
  it('conta apenas os ativos', () => {
    expect(selectActiveCount(stateWith(false))).toBe(2)
  })
})
