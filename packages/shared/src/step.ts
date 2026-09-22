import { z } from 'zod'

export const stepSchema = z.object({
  id: z.string(),
  label: z.string(),
  completed: z.boolean(),
})

export const updateStepSchema = z.object({
  completed: z.boolean(),
})

export type Step = z.infer<typeof stepSchema>
export type UpdateStep = z.infer<typeof updateStepSchema>
