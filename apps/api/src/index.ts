import cors from 'cors'
import express, { type ErrorRequestHandler } from 'express'
import { employeesRouter } from './routes/employees'
import { stepsRouter } from './routes/steps'

const app = express()
const PORT = Number(process.env.PORT ?? 3001)

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ name: 'SEA Challenge API', status: 'ok' })
})

app.use('/employees', employeesRouter)
app.use('/steps', stepsRouter)

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: 'Erro interno do servidor' })
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`)
})
