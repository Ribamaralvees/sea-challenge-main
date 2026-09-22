import { describe, expect, it, vi, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import { stepService } from '@/services/api'
import reducer, { fetchSteps, setCurrentIndex, setStepCompleted } from './stepsSlice'

vi.mock('@/services/api', () => ({
  stepService: {
    getAll: vi.fn(),
    setCompleted: vi.fn(),
  },
}))

const step = { id: '1', label: 'Item 1', completed: false }

const makeStore = () => configureStore({ reducer: { steps: reducer } })

beforeEach(() => {
  vi.resetAllMocks()
})

describe('setCurrentIndex', () => {
  it('atualiza o índice da etapa atual', () => {
    const store = makeStore()
    store.dispatch(setCurrentIndex(3))
    expect(store.getState().steps.currentIndex).toBe(3)
  })
})

describe('fetchSteps', () => {
  it('preenche items em caso de sucesso', async () => {
    vi.mocked(stepService.getAll).mockResolvedValue([step])
    const store = makeStore()
    await store.dispatch(fetchSteps())
    expect(store.getState().steps.items).toEqual([step])
  })

  it('preenche error em caso de falha', async () => {
    vi.mocked(stepService.getAll).mockRejectedValue(new Error('Falha de rede'))
    const store = makeStore()
    await store.dispatch(fetchSteps())
    expect(store.getState().steps.error).toBe('Falha de rede')
  })
})

describe('setStepCompleted', () => {
  it('atualiza a etapa na lista em caso de sucesso', async () => {
    vi.mocked(stepService.getAll).mockResolvedValue([step])
    vi.mocked(stepService.setCompleted).mockResolvedValue({ ...step, completed: true })
    const store = makeStore()
    await store.dispatch(fetchSteps())
    await store.dispatch(setStepCompleted({ id: '1', completed: true }))
    expect(store.getState().steps.items[0].completed).toBe(true)
  })

  it('preenche error em caso de falha', async () => {
    vi.mocked(stepService.setCompleted).mockRejectedValue(
      new Error('Etapa não encontrada'),
    )
    const store = makeStore()
    await store.dispatch(setStepCompleted({ id: '99', completed: true }))
    expect(store.getState().steps.error).toBe('Etapa não encontrada')
  })
})
