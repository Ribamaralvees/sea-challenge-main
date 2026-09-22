import { describe, expect, it } from 'vitest'
import { employeeSchema, type EmployeeFormValues } from './employeeSchema'

const base: EmployeeFormValues = {
  active: true,
  name: 'Daniel Alves da Silva',
  gender: 'masculino',
  cpf: '000.111.222-33',
  birthDate: '1990-03-15',
  rg: '12.345.678-9',
  role: 'Cargo 1',
  noEpi: false,
  epiActivities: [
    { activity: 'Atividade 1', epis: [{ name: 'Calçado de segurança', ca: '9356' }] },
  ],
  healthCertificate: null,
}

const issuePaths = (values: unknown) => {
  const result = employeeSchema.safeParse(values)
  return result.success ? [] : result.error.issues.map((issue) => issue.path.join('.'))
}

describe('employeeSchema', () => {
  it('aceita um funcionário válido com EPI', () => {
    expect(employeeSchema.safeParse(base).success).toBe(true)
  })

  it('rejeita nome com menos de 3 caracteres', () => {
    expect(issuePaths({ ...base, name: 'Jo' })).toContain('name')
  })

  it('rejeita CPF fora do padrão 000.000.000-00', () => {
    expect(issuePaths({ ...base, cpf: '00011122233' })).toContain('cpf')
  })

  it('exige ao menos uma atividade quando noEpi é false', () => {
    expect(issuePaths({ ...base, epiActivities: [] })).toContain('epiActivities')
  })

  it('dispensa atividades quando noEpi é true', () => {
    expect(
      employeeSchema.safeParse({ ...base, noEpi: true, epiActivities: [] }).success,
    ).toBe(true)
  })

  it('aponta o CA vazio no caminho exato do campo', () => {
    const values = {
      ...base,
      epiActivities: [
        { activity: 'Atividade 1', epis: [{ name: 'Capacete', ca: '  ' }] },
      ],
    }
    expect(issuePaths(values)).toContain('epiActivities.0.epis.0.ca')
  })

  it('não valida CA quando noEpi é true', () => {
    const values = {
      ...base,
      noEpi: true,
      epiActivities: [{ activity: 'Atividade 1', epis: [{ name: 'Capacete', ca: '' }] }],
    }
    expect(employeeSchema.safeParse(values).success).toBe(true)
  })
})
