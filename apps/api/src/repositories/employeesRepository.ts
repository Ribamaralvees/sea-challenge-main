import { pool } from '../db/pool'
import type { Employee, NewEmployee } from '../types'

interface EmployeeRow {
  id: string
  name: string
  cpf: string
  rg: string
  birth_date: string
  gender: Employee['gender']
  role: string
  active: boolean
  epi_activities: Employee['epiActivities']
  health_certificate: string | null
}

function toEmployee(row: EmployeeRow): Employee {
  return {
    id: row.id,
    name: row.name,
    cpf: row.cpf,
    rg: row.rg,
    birthDate: row.birth_date,
    gender: row.gender,
    role: row.role,
    active: row.active,
    epiActivities: row.epi_activities,
    healthCertificate: row.health_certificate,
  }
}

const COLUMNS =
  'id, name, cpf, rg, birth_date, gender, role, active, epi_activities, health_certificate'

export async function listEmployees(): Promise<Employee[]> {
  const { rows } = await pool.query<EmployeeRow>(
    `SELECT ${COLUMNS} FROM employees ORDER BY created_at DESC`,
  )
  return rows.map(toEmployee)
}

export async function createEmployee(data: NewEmployee): Promise<Employee> {
  const { rows } = await pool.query<EmployeeRow>(
    `INSERT INTO employees
       (name, cpf, rg, birth_date, gender, role, active, epi_activities, health_certificate)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING ${COLUMNS}`,
    [
      data.name,
      data.cpf,
      data.rg,
      data.birthDate,
      data.gender,
      data.role,
      data.active,
      JSON.stringify(data.epiActivities),
      data.healthCertificate,
    ],
  )
  return toEmployee(rows[0])
}

export async function updateEmployee(
  id: string,
  data: NewEmployee,
): Promise<Employee | null> {
  const { rows } = await pool.query<EmployeeRow>(
    `UPDATE employees SET
       name = $1, cpf = $2, rg = $3, birth_date = $4, gender = $5,
       role = $6, active = $7, epi_activities = $8, health_certificate = $9
     WHERE id = $10
     RETURNING ${COLUMNS}`,
    [
      data.name,
      data.cpf,
      data.rg,
      data.birthDate,
      data.gender,
      data.role,
      data.active,
      JSON.stringify(data.epiActivities),
      data.healthCertificate,
      id,
    ],
  )
  return rows[0] ? toEmployee(rows[0]) : null
}

export async function deleteEmployee(id: string): Promise<boolean> {
  const result = await pool.query('DELETE FROM employees WHERE id = $1', [id])
  return (result.rowCount ?? 0) > 0
}
