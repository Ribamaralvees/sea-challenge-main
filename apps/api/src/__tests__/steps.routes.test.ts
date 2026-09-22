import { describe, expect, it, vi, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../app'
import { listSteps, setStepCompleted } from '../repositories/stepsRepository'

vi.mock('../repositories/stepsRepository', () => ({
  listSteps: vi.fn(),
  setStepCompleted: vi.fn(),
}))

const step = { id: '1', label: 'Item 1', completed: false }

beforeEach(() => {
  vi.resetAllMocks()
})

describe('GET /steps', () => {
  it('devolve as etapas', async () => {
    vi.mocked(listSteps).mockResolvedValue([step])
    const res = await request(app).get('/steps')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([step])
  })
})

describe('PATCH /steps/:id', () => {
  it('rejeita "false" como string (regressão do bug do Boolean())', async () => {
    const res = await request(app).patch('/steps/1').send({ completed: 'false' })
    expect(res.status).toBe(400)
    expect(setStepCompleted).not.toHaveBeenCalled()
  })

  it('aceita booleano e repassa o valor exato', async () => {
    vi.mocked(setStepCompleted).mockResolvedValue({ ...step, completed: true })
    const res = await request(app).patch('/steps/1').send({ completed: true })
    expect(res.status).toBe(200)
    expect(setStepCompleted).toHaveBeenCalledWith('1', true)
  })

  it('devolve 404 para etapa inexistente', async () => {
    vi.mocked(setStepCompleted).mockResolvedValue(null)
    const res = await request(app).patch('/steps/99').send({ completed: true })
    expect(res.status).toBe(404)
  })
})
