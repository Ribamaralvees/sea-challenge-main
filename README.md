# SEA Tecnologia — Desafio Frontend React

Monorepo do desafio técnico da SEA Tecnologia: uma interface de gerenciamento de funcionários (pixel-perfect a partir do Figma), uma API REST em Node e um banco PostgreSQL em Docker.

```
sea-challenge/
├── apps/
│   ├── web/   →  front-end React + TypeScript + Vite
│   └── api/   →  back-end Node + Express + TypeScript + PostgreSQL (Prisma)
├── docker-compose.yml   →  banco PostgreSQL
└── package.json         →  workspaces npm + scripts de orquestração
```

---

## Como rodar

**Pré-requisitos:** Node.js 18+ e Docker.

```bash
# 1. Instala as dependências de todos os workspaces
npm install

# 2. Sobe o banco PostgreSQL (cria schema e seed na primeira vez)
npm run db:up

# 3. Sobe API (porta 3001) e front-end (porta 5173) juntos
npm run dev
```

Scripts úteis na raiz:

| Script             | O que faz                                  |
| ------------------ | ------------------------------------------ |
| `npm run db:up`    | Sobe o PostgreSQL em container (Docker)    |
| `npm run db:down`  | Para o container do banco                  |
| `npm run db:reset` | Recria o banco do zero (migrations + seed) |
| `npm run dev`      | Sobe API e web em paralelo                 |
| `npm run dev:web`  | Sobe apenas o front-end                    |
| `npm run dev:api`  | Sobe apenas a API                          |
| `npm run build`    | Builda API e web                           |

O front consome `http://localhost:3001` por padrão (configurável via `VITE_API_URL` em `apps/web`).

---

## apps/web — Front-end

React 18 + TypeScript, Vite, Redux Toolkit, React Hook Form + Zod, React Router e Tailwind CSS.

Destaques:

- **Pixel-perfect** a partir do protótipo, com sistema de cores centralizado em design tokens (fonte única da verdade, sem cores repetidas nos componentes).
- **Redux Toolkit** com `createAsyncThunk`, `createSlice` e selectors memoizados; camada de serviços (Axios) separada dos slices.
- **React Hook Form + Zod** para o formulário, com `useFieldArray` aninhado nos EPIs e validação condicional por schema.
- Stepper com etapas navegáveis por URL, estado de "concluído" persistido e feedback de ações (ex.: modal de exclusão).

Detalhe sobre estilo: o desafio recomendava Ant Design, mas optei por Tailwind para ter controle pixel-perfect. Documentação completa em `apps/web/README.md`.

---

## apps/api — Back-end

Node + Express + TypeScript, com **PostgreSQL** acessado via **Prisma** (client tipado, schema e migrations versionadas em `apps/api/prisma`). O banco roda em Docker (`docker-compose.yml`); o schema é aplicado com `npm run db:migrate -w @sea/api` e populado com `npm run db:seed -w @sea/api` (ou `npm run db:reset` na raiz, que faz os dois).

| Método | Rota             | Descrição                                       |
| ------ | ---------------- | ----------------------------------------------- |
| GET    | `/employees`     | Lista os funcionários                           |
| POST   | `/employees`     | Cria um funcionário (payload validado com Zod)  |
| PUT    | `/employees/:id` | Atualiza um funcionário                         |
| DELETE | `/employees/:id` | Remove um funcionário                           |
| GET    | `/steps`         | Lista as etapas                                 |
| PATCH  | `/steps/:id`     | Atualiza uma etapa (ex.: marcar como concluída) |

A conexão usa a variável `DATABASE_URL` (veja `apps/api/.env.example`). Detalhes em `apps/api/README.md`.

---

## O que evoluiria com mais tempo

- Tratamento de erro mais granular na UI (toasts vindos da API)

---

_Desenvolvido por José Ribamar — [LinkedIn](https://www.linkedin.com/in/jos%C3%A9-ribamar-01a6b6371/) · [GitHub](https://github.com/Ribamaralvees/)_
