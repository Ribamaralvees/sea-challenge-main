import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
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
  asyncHandler(async (req, res) => {
    const updated = await setStepCompleted(req.params.id, Boolean(req.body.completed))
    if (!updated) {
      res.status(404).json({ message: 'Etapa não encontrada' })
      return
    }
    res.json(updated)
  }),
)
