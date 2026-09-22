# @sea/api — Back-end

API REST do desafio, em Node + Express + TypeScript, com persistência em **PostgreSQL** acessada via **Prisma** (client tipado, schema e migrations versionadas em `prisma/`). Payloads são validados com **Zod** (schemas compartilhados em `@sea/shared`).

## Banco de dados (Docker + Prisma)

O banco roda em container. A partir da raiz do monorepo:

```bash
npm run db:up       # sobe o PostgreSQL (porta 5432)
npm run db:reset    # recria o volume do zero + aplica migrations + roda o seed
npm run db:down     # para o container
```

Ou, neste workspace, com o banco já no ar:

```bash
npm run db:migrate  # aplica as migrations pendentes (prisma migrate dev)
npm run db:seed     # popula com o seed (4 funcionários e 9 etapas)
npm run db:studio   # abre o Prisma Studio para inspecionar os dados
```

> O schema fica em `prisma/schema.prisma`; toda alteração gera uma nova migration versionada em `prisma/migrations` (comitada no git). O client é gerado automaticamente no `postinstall`.

## Rodar a API

A partir da raiz:

```bash
npm run dev:api     # tsx watch, porta 3001
```

Ou neste workspace:

```bash
npm run dev         # desenvolvimento (tsx watch)
npm run build       # compila para dist/
npm start           # executa o build (node dist/index.js)
```

Configuração por variáveis de ambiente (veja `.env.example`):

| Variável       | Padrão                                            | Descrição                       |
| -------------- | ------------------------------------------------- | ------------------------------- |
| `DATABASE_URL` | `postgres://sea:sea@localhost:5432/sea_challenge` | String de conexão do PostgreSQL |
| `PORT`         | `3001`                                            | Porta da API                    |
| `CORS_ORIGIN`  | `http://localhost:5173`                           | Origem permitida pelo CORS      |

As variáveis são validadas com Zod em `src/env.ts` — a API não sobe se algo estiver inválido.

## Endpoints

| Método | Rota             | Corpo                   | Resposta                |
| ------ | ---------------- | ----------------------- | ----------------------- |
| GET    | `/employees`     | —                       | `Employee[]`            |
| POST   | `/employees`     | `Employee` sem `id`     | `Employee` criado (201) |
| PUT    | `/employees/:id` | `Employee`              | `Employee` atualizado   |
| DELETE | `/employees/:id` | —                       | `204 No Content`        |
| GET    | `/steps`         | —                       | `Step[]`                |
| PATCH  | `/steps/:id`     | `{ "completed": true }` | `Step` atualizado       |

Payloads inválidos retornam `400` com o detalhamento dos campos (via Zod). Rotas/ids inexistentes retornam `404`. Erros inesperados são tratados por um middleware central e retornam `500`.

## Estrutura

```
prisma/
├── schema.prisma                 # modelos + datasource
├── migrations/                   # migrations versionadas (git)
└── seed.ts                       # popula o banco (4 funcionários, 9 etapas)

src/
├── app.ts                        # app Express (sem listen) — usado nos testes
├── index.ts                      # bootstrap: listen + shutdown
├── env.ts                        # variáveis de ambiente validadas com Zod
├── errors.ts                     # AppError / NotFoundError / ValidationError
├── db/prisma.ts                  # instância do PrismaClient
├── middlewares/validate.ts       # middleware de validação de body com Zod
├── repositories/                 # acesso a dados via Prisma
│   ├── employeesRepository.ts
│   └── stepsRepository.ts
├── routes/                       # rotas Express
│   ├── employees.ts
│   └── steps.ts
├── utils/asyncHandler.ts         # wrapper para handlers assíncronos
├── types.ts                      # re-exporta os tipos de @sea/shared
└── __tests__/                    # testes de rota (Vitest + supertest)
```

## Modelagem

`employees` usa colunas tipadas e `epi_activities` como **JSON** — os EPIs por atividade são sempre lidos/gravados junto do funcionário, então um documento JSON é mais simples e direto que normalizar em tabelas extras. `steps` é uma tabela própria com ordenação por `position`.
