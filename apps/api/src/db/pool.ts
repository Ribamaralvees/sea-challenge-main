import { Pool } from 'pg'

const connectionString =
  process.env.DATABASE_URL ?? 'postgres://sea:sea@localhost:5432/sea_challenge'

export const pool = new Pool({ connectionString })
