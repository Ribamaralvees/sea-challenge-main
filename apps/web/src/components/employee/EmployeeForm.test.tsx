import { describe, expect, it, vi, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Employee } from '@/types'
import { employeeService } from '@/services/api'
import employeesReducer from '@/store/slices/employeesSlice'
import stepsReducer from '@/store/slices/stepsSlice'
import { EmployeeForm } from './EmployeeForm'

vi.mock('@/services/api', () => ({
  employeeService: { getAll: vi.fn(), create: vi.fn(), update: vi.fn(), remove: vi.fn() },
  stepService: { getAll: vi.fn(), setCompleted: vi.fn() },
}))

const created: Employee = {
  id: '11111111-1111-1111-1111-111111111111',
  name: 'Daniel Alves da Silva',
  cpf: '000.111.222-33',
  rg: '12.345.678-9',
  birthDate: '1990-03-15',
  gender: 'feminino',
  role: 'Cargo 1',
  active: true,
  epiActivities: [],
  healthCertificate: null,
}

const renderForm = () => {
  const store = configureStore({
    reducer: { employees: employeesReducer, steps: stepsReducer },
  })
  render(
    <Provider store={store}>
      <EmployeeForm />
    </Provider>,
  )
  return store
}

const fillRequiredFields = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText('Nome'), 'Daniel Alves da Silva')
  await user.type(screen.getByLabelText('CPF'), '00011122233')
  await user.type(screen.getByLabelText('RG'), '12.345.678-9')
  fireEvent.change(screen.getByLabelText('Data de Nascimento'), {
    target: { value: '1990-03-15' },
  })
  await user.selectOptions(screen.getByLabelText('Cargo'), 'Cargo 1')
}

beforeEach(() => {
  vi.resetAllMocks()
})

describe('EmployeeForm', () => {
  it('bloqueia o submit e mostra os erros quando o form está vazio', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(await screen.findByText(/informe o nome completo/i)).toBeInTheDocument()
    expect(screen.getByText(/cpf inválido/i)).toBeInTheDocument()
    expect(employeeService.create).not.toHaveBeenCalled()
  })

  it('aplica a máscara de CPF enquanto o usuário digita', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.type(screen.getByLabelText('CPF'), '00011122233')

    expect(screen.getByLabelText('CPF')).toHaveValue('000.111.222-33')
  })

  it('exige uma atividade de EPI quando "não usa EPI" está desmarcado', async () => {
    const user = userEvent.setup()
    renderForm()
    await fillRequiredFields(user)

    await user.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(await screen.findByText('Informe o número do CA')).toBeInTheDocument()
    expect(employeeService.create).not.toHaveBeenCalled()
  })

  it('envia o payload sem EPI quando "não usa EPI" está marcado', async () => {
    const user = userEvent.setup()
    vi.mocked(employeeService.create).mockResolvedValue(created)
    renderForm()
    await fillRequiredFields(user)

    await user.click(screen.getByLabelText(/não usa EPI/i))
    await user.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(employeeService.create).toHaveBeenCalledWith({
      name: 'Daniel Alves da Silva',
      cpf: '000.111.222-33',
      rg: '12.345.678-9',
      birthDate: '1990-03-15',
      gender: 'feminino',
      role: 'Cargo 1',
      active: true,
      epiActivities: [],
      healthCertificate: null,
    })
  })

  it('esconde os campos de EPI quando "não usa EPI" está marcado', async () => {
    const user = userEvent.setup()
    renderForm()

    expect(
      screen.getByRole('button', { name: /adicionar outra atividade/i }),
    ).toBeInTheDocument()
    await user.click(screen.getByLabelText(/não usa EPI/i))
    expect(
      screen.queryByRole('button', { name: /adicionar outra atividade/i }),
    ).not.toBeInTheDocument()
  })
})
