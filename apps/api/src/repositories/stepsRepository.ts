import { prisma } from '../db/prisma'
import type { Step } from '../types'

const SELECT = { id: true, label: true, completed: true } as const

export async function listSteps(): Promise<Step[]> {
  return prisma.step.findMany({ select: SELECT, orderBy: { position: 'asc' } })
}

export async function setStepCompleted(
  id: string,
  completed: boolean,
): Promise<Step | null> {
  try {
    return await prisma.step.update({
      where: { id },
      data: { completed },
      select: SELECT,
    })
  } catch {
    return null
  }
}
