import { Router } from 'express'
import { updateStepSchema } from '@sea/shared'
import { asyncHandler } from '../utils/asyncHandler'
import { validateBody } from '../middlewares/validate'
import { NotFoundError } from '../errors'
import { listSteps, setStepCompleted } from '../repositories/stepsRepository'

export const stepsRouter = Router()

stepsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    res.json(await listSteps())
  }),
)

stepsRouter.patch(
  '/:id',
  validateBody(updateStepSchema),
  asyncHandler(async (req, res) => {
    const updated = await setStepCompleted(req.params.id, req.body.completed)
    if (!updated) throw new NotFoundError('Etapa não encontrada')
    res.json(updated)
  }),
)
