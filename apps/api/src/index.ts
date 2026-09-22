import { app } from './app'
import { env } from './env'
import { prisma } from './db/prisma'

const server = app.listen(env.PORT, () => {
  console.log(`API rodando em http://localhost:${env.PORT}`)
})

const shutdown = async () => {
  server.close()
  await prisma.$disconnect()
  process.exit(0)
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
