import cors from 'cors'
import express, { type ErrorRequestHandler } from 'express'
import { employeesRouter } from './routes/employees'
import { stepsRouter } from './routes/steps'
import { AppError, ValidationError } from './errors'
import { env } from './env'

export const app = express()

app.use(cors({ origin: env.CORS_ORIGIN }))
app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ name: 'SEA Challenge API', status: 'ok' })
})

app.use('/employees', employeesRouter)
app.use('/steps', stepsRouter)

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ValidationError) {
    res.status(err.status).json({ message: err.message, issues: err.issues })
    return
  }
  if (err instanceof AppError) {
    res.status(err.status).json({ message: err.message })
    return
  }
  console.error(err)
  res.status(500).json({ message: 'Erro interno do servidor' })
}

app.use(errorHandler)
