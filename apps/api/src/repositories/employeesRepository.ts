import { prisma } from '../db/prisma'
import type { Employee, NewEmployee } from '../types'

const SELECT = {
  id: true,
  name: true,
  cpf: true,
  rg: true,
  birthDate: true,
  gender: true,
  role: true,
  active: true,
  epiActivities: true,
  healthCertificate: true,
} as const

const toEmployee = (row: {
  id: string
  name: string
  cpf: string
  rg: string
  birthDate: string
  gender: Employee['gender']
  role: string
  active: boolean
  epiActivities: unknown
  healthCertificate: string | null
}): Employee => ({
  ...row,
  epiActivities: row.epiActivities as Employee['epiActivities'],
})

export async function listEmployees(): Promise<Employee[]> {
  const rows = await prisma.employee.findMany({
    select: SELECT,
    orderBy: { createdAt: 'desc' },
  })
  return rows.map(toEmployee)
}

export async function createEmployee(data: NewEmployee): Promise<Employee> {
  const row = await prisma.employee.create({ data, select: SELECT })
  return toEmployee(row)
}

export async function updateEmployee(
  id: string,
  data: NewEmployee,
): Promise<Employee | null> {
  try {
    const row = await prisma.employee.update({ where: { id }, data, select: SELECT })
    return toEmployee(row)
  } catch {
    return null
  }
}

export async function deleteEmployee(id: string): Promise<boolean> {
  try {
    await prisma.employee.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}
