import { z } from 'zod'
import { CPF_PATTERN, genderSchema } from '@sea/shared'

// Schema de EPI do FORMULÁRIO: `ca` fica sem `min(1)` de propósito — a mensagem por
// linha vem do superRefine abaixo, que aponta o path exato do campo na UI.
const formEpiActivitySchema = z.object({
  activity: z.string().min(1, 'Selecione a atividade'),
  epis: z.array(
    z.object({
      name: z.string().min(1, 'Selecione o EPI'),
      ca: z.string(),
    }),
  ),
})

export const employeeSchema = z
  .object({
    active: z.boolean(),
    name: z.string().min(3, 'Informe o nome completo (mín. 3 caracteres)'),
    gender: genderSchema,
    cpf: z.string().regex(CPF_PATTERN, 'CPF inválido (000.000.000-00)'),
    birthDate: z.string().min(1, 'Informe a data de nascimento'),
    rg: z.string().min(1, 'Informe o RG'),
    role: z.string().min(1, 'Selecione o cargo'),
    noEpi: z.boolean(),
    epiActivities: z.array(formEpiActivitySchema),
    healthCertificate: z.string().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.noEpi) return

    if (data.epiActivities.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['epiActivities'],
        message: 'Adicione ao menos uma atividade ou marque "não usa EPI"',
      })
      return
    }

    data.epiActivities.forEach((activity, activityIndex) => {
      activity.epis.forEach((epi, epiIndex) => {
        if (!epi.ca.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['epiActivities', activityIndex, 'epis', epiIndex, 'ca'],
            message: 'Informe o número do CA',
          })
        }
      })
    })
  })

export type EmployeeFormValues = z.infer<typeof employeeSchema>
