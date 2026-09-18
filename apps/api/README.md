# @sea/api — Back-end

API REST do desafio, em Node + Express + TypeScript, com persistência em **PostgreSQL** (acessado via `pg`, com consultas parametrizadas e pool de conexões).

## Banco de dados (Docker)

O banco roda em container. A partir da raiz do monorepo:

```bash
npm run db:up       # sobe o PostgreSQL (porta 5432)
npm run db:reset    # recria do zero (apaga o volume e roda o seed)
npm run db:down     # para o container
```

Na primeira subida, o Docker executa `db/init.sql`, que cria as tabelas (`employees`, `steps`) e insere o seed (4 funcionários e 9 etapas).

> O `init.sql` só roda quando o volume está vazio. Se você alterar o schema/seed, rode `npm run db:reset` para aplicar.

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

| Variável | Padrão | Descrição |
|---|---|---|
| `DATABASE_URL` | `postgres://sea:sea@localhost:5432/sea_challenge` | String de conexão do PostgreSQL |
| `PORT` | `3001` | Porta da API |

## Endpoints

| Método | Rota | Corpo | Resposta |
|---|---|---|---|
| GET | `/employees` | — | `Employee[]` |
| POST | `/employees` | `Employee` sem `id` | `Employee` criado (201) |
| PUT | `/employees/:id` | `Employee` | `Employee` atualizado |
| DELETE | `/employees/:id` | — | `204 No Content` |
| GET | `/steps` | — | `Step[]` |
| PATCH | `/steps/:id` | `{ "completed": true }` | `Step` atualizado |

Rotas inexistentes retornam `404`. Erros inesperados são tratados por um middleware central e retornam `500`.

## Estrutura

```
src/
├── db/pool.ts                    # pool de conexões (pg)
├── repositories/                 # acesso a dados (SQL parametrizado)
│   ├── employeesRepository.ts
│   └── stepsRepository.ts
├── routes/                       # rotas Express
│   ├── employees.ts
│   └── steps.ts
├── utils/asyncHandler.ts         # wrapper para handlers assíncronos
├── types.ts
└── index.ts                      # bootstrap do servidor

db/init.sql                       # schema + seed (executado pelo Docker)
```

## Modelagem

`employees` usa colunas tipadas e `epi_activities` como **JSONB** — os EPIs por atividade são sempre lidos/gravados junto do funcionário, então um documento JSONB é mais simples e direto que normalizar em tabelas extras. `steps` é uma tabela própria com ordenação por `position`.
