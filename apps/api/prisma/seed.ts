import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

const now = Date.now()
const secondsAgo = (n: number) => new Date(now - n * 1000)

async function main() {
  await prisma.employee.deleteMany()
  await prisma.step.deleteMany()

  await prisma.employee.createMany({
    data: [
      {
        name: 'Daniel Alves da Silva',
        cpf: '000.000.000-99',
        rg: '12.345.678-9',
        birthDate: '1990-03-15',
        gender: 'masculino',
        role: 'Cargo 1',
        active: true,
        epiActivities: [
          {
            activity: 'Atividade 1',
            epis: [{ name: 'Calçado de segurança', ca: '9356' }],
          },
        ],
        healthCertificate: null,
        createdAt: secondsAgo(1),
      },
      {
        name: 'Giselle Torres Lopes',
        cpf: '000.000.000-88',
        rg: '23.456.789-0',
        birthDate: '1988-07-22',
        gender: 'feminino',
        role: 'Cargo 2',
        active: false,
        epiActivities: [],
        healthCertificate: null,
        createdAt: secondsAgo(2),
      },
      {
        name: 'Ana Bispo dos Santos',
        cpf: '000.000.000-99',
        rg: '34.567.890-1',
        birthDate: '1995-11-02',
        gender: 'feminino',
        role: 'Cargo 1',
        active: false,
        epiActivities: [],
        healthCertificate: null,
        createdAt: secondsAgo(3),
      },
      {
        name: 'Regina Elisa Souza',
        cpf: '000.000.000-99',
        rg: '45.678.901-2',
        birthDate: '1992-01-30',
        gender: 'feminino',
        role: 'Cargo 3',
        active: true,
        epiActivities: [],
        healthCertificate: null,
        createdAt: secondsAgo(4),
      },
    ],
  })

  await prisma.step.createMany({
    data: Array.from({ length: 9 }, (_, index) => ({
      id: String(index + 1),
      label: `Item ${index + 1}`,
      position: index + 1,
      completed: false,
    })),
  })
}

main()
  .then(() => console.log('Seed concluído'))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
