import { z } from 'zod'

export const CPF_PATTERN = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

export const epiSchema = z.object({
  name: z.string().min(1, 'Selecione o EPI'),
  ca: z.string().min(1, 'Informe o número do CA'),
})

export const epiActivitySchema = z.object({
  activity: z.string().min(1, 'Selecione a atividade'),
  epis: z.array(epiSchema),
})

export const genderSchema = z.enum(['masculino', 'feminino'], {
  errorMap: () => ({ message: 'Selecione o sexo' }),
})

export const newEmployeeSchema = z.object({
  name: z.string().min(3, 'Informe o nome completo (mín. 3 caracteres)'),
  cpf: z.string().regex(CPF_PATTERN, 'CPF inválido (000.000.000-00)'),
  rg: z.string().min(1, 'Informe o RG'),
  birthDate: z.string().regex(ISO_DATE_PATTERN, 'Data de nascimento inválida'),
  gender: genderSchema,
  role: z.string().min(1, 'Selecione o cargo'),
  active: z.boolean(),
  epiActivities: z.array(epiActivitySchema),
  healthCertificate: z.string().nullable(),
})

export const employeeSchema = newEmployeeSchema.extend({
  id: z.string().uuid(),
})

export type Epi = z.infer<typeof epiSchema>
export type EpiActivity = z.infer<typeof epiActivitySchema>
export type Gender = z.infer<typeof genderSchema>
export type NewEmployee = z.infer<typeof newEmployeeSchema>
export type Employee = z.infer<typeof employeeSchema>
