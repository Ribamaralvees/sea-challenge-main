import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
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
  asyncHandler(async (req, res) => {
    res.status(201).json(await createEmployee(req.body))
  }),
)

employeesRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const updated = await updateEmployee(req.params.id, req.body)
    if (!updated) {
      res.status(404).json({ message: 'Funcionário não encontrado' })
      return
    }
    res.json(updated)
  }),
)

employeesRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const removed = await deleteEmployee(req.params.id)
    if (!removed) {
      res.status(404).json({ message: 'Funcionário não encontrado' })
      return
    }
    res.status(204).send()
  }),
)
