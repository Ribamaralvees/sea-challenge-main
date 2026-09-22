import { Router } from 'express'
import { newEmployeeSchema } from '@sea/shared'
import { asyncHandler } from '../utils/asyncHandler'
import { validateBody } from '../middlewares/validate'
import { NotFoundError } from '../errors'
import {
  createEmployee,
  deleteEmployee,
  listEmployees,
  updateEmployee,
} from '../repositories/employeesRepository'

export const employeesRouter = Router()

employeesRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    res.json(await listEmployees())
  }),
)

employeesRouter.post(
  '/',
  validateBody(newEmployeeSchema),
  asyncHandler(async (req, res) => {
    res.status(201).json(await createEmployee(req.body))
  }),
)

employeesRouter.put(
  '/:id',
  validateBody(newEmployeeSchema),
  asyncHandler(async (req, res) => {
    const updated = await updateEmployee(req.params.id, req.body)
    if (!updated) throw new NotFoundError('Funcionário não encontrado')
    res.json(updated)
  }),
)

employeesRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const removed = await deleteEmployee(req.params.id)
    if (!removed) throw new NotFoundError('Funcionário não encontrado')
    res.status(204).send()
  }),
)
