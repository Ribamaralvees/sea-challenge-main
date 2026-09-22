import { PrismaClient } from '../generated/prisma'
import { env } from '../env'

// PrismaClient por padrão lê process.env.DATABASE_URL diretamente, ignorando
// o default que env.ts calcula (o Zod só valida uma cópia local, não escreve
// de volta no process.env). Passar a URL explicitamente garante que a API
// funcione com o mesmo default documentado, mesmo sem um .env presente.
export const prisma = new PrismaClient({ datasourceUrl: env.DATABASE_URL })
