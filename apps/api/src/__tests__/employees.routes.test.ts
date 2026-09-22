import { describe, expect, it, vi, beforeEach } from 'vitest'
import request from 'supertest'
import type { Employee } from '../types'
import { app } from '../app'
import {
  listEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../repositories/employeesRepository'

vi.mock('../repositories/employeesRepository', () => ({
  listEmployees: vi.fn(),
  createEmployee: vi.fn(),
  updateEmployee: vi.fn(),
  deleteEmployee: vi.fn(),
}))

const employee: Employee = {
  id: '11111111-1111-1111-1111-111111111111',
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

const { id: _id, ...validPayload } = employee

beforeEach(() => {
  vi.resetAllMocks()
})

describe('GET /employees', () => {
  it('devolve a lista', async () => {
    vi.mocked(listEmployees).mockResolvedValue([employee])
    const res = await request(app).get('/employees')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([employee])
  })
})

describe('POST /employees', () => {
  it('devolve 400 para body vazio', async () => {
    const res = await request(app).post('/employees').send({})
    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Payload inválido')
    expect(createEmployee).not.toHaveBeenCalled()
  })

  it('devolve 400 e aponta o campo quando o CPF é inválido', async () => {
    const res = await request(app)
      .post('/employees')
      .send({ ...validPayload, cpf: '123' })
    expect(res.status).toBe(400)
    expect(res.body.issues.fieldErrors.cpf).toBeDefined()
  })

  it('devolve 400 quando o gênero não é do enum', async () => {
    const res = await request(app)
      .post('/employees')
      .send({ ...validPayload, gender: 'outro' })
    expect(res.status).toBe(400)
  })

  it('devolve 400 quando um EPI vem sem CA', async () => {
    const res = await request(app)
      .post('/employees')
      .send({
        ...validPayload,
        epiActivities: [
          { activity: 'Atividade 1', epis: [{ name: 'Capacete', ca: '' }] },
        ],
      })
    expect(res.status).toBe(400)
  })

  it('devolve 201 e o funcionário criado para payload válido', async () => {
    vi.mocked(createEmployee).mockResolvedValue(employee)
    const res = await request(app).post('/employees').send(validPayload)
    expect(res.status).toBe(201)
    expect(res.body).toEqual(employee)
    expect(createEmployee).toHaveBeenCalledWith(validPayload)
  })
})

describe('PUT /employees/:id', () => {
  it('devolve 404 quando o funcionário não existe', async () => {
    vi.mocked(updateEmployee).mockResolvedValue(null)
    const res = await request(app).put(`/employees/${employee.id}`).send(validPayload)
    expect(res.status).toBe(404)
    expect(res.body.message).toBe('Funcionário não encontrado')
  })

  it('devolve 200 com o funcionário atualizado', async () => {
    vi.mocked(updateEmployee).mockResolvedValue(employee)
    const res = await request(app).put(`/employees/${employee.id}`).send(validPayload)
    expect(res.status).toBe(200)
  })
})

describe('DELETE /employees/:id', () => {
  it('devolve 204 quando remove', async () => {
    vi.mocked(deleteEmployee).mockResolvedValue(true)
    const res = await request(app).delete(`/employees/${employee.id}`)
    expect(res.status).toBe(204)
  })

  it('devolve 404 quando não existe', async () => {
    vi.mocked(deleteEmployee).mockResolvedValue(false)
    const res = await request(app).delete(`/employees/${employee.id}`)
    expect(res.status).toBe(404)
  })
})
