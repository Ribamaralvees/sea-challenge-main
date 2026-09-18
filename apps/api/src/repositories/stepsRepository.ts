import { pool } from '../db/pool'
import type { Step } from '../types'

export async function listSteps(): Promise<Step[]> {
  const { rows } = await pool.query<Step>(
    'SELECT id, label, completed FROM steps ORDER BY position ASC',
  )
  return rows
}

export async function setStepCompleted(
  id: string,
  completed: boolean,
): Promise<Step | null> {
  const { rows } = await pool.query<Step>(
    'UPDATE steps SET completed = $1 WHERE id = $2 RETURNING id, label, completed',
    [completed, id],
  )
  return rows[0] ?? null
}
