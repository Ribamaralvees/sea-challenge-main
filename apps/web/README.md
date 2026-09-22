# @sea/web — Front-end

Front-end do desafio da SEA Tecnologia: interface de gerenciamento de funcionários, pixel-perfect a partir do protótipo Figma.

> React 18 · TypeScript · Vite · Redux Toolkit · React Hook Form + Zod · React Router · Axios · Tailwind CSS

O back-end que serve os dados é o workspace `@sea/api`. Para subir os dois juntos, use `npm run dev` na raiz do monorepo.

---

## Rodar apenas o front

A partir da raiz do monorepo:

```bash
npm run dev:web      # Vite em http://localhost:5173
```

A URL da API é configurável via `VITE_API_URL` (padrão `http://localhost:3001`, veja `.env.example`).

Testes (Vitest + Testing Library):

```bash
npm run test -w @sea/web           # roda a suíte
npm run test:watch -w @sea/web     # modo watch
npm run test:coverage -w @sea/web  # com cobertura
```

---

## Estrutura

```
src/
├── assets/
├── components/
│   ├── common/         # StepFooter
│   ├── comingSoon/     # ComingSoon
│   ├── employee/       # EmployeeList, EmployeeCard, FilterBar, EmployeeForm,
│   │                   # EpiActivityField, HealthCertificateField
│   ├── icons/          # ícones SVG
│   ├── info/           # InfoPanel
│   ├── layout/         # MainLayout, Sidebar, Decorations
│   ├── stepper/        # StepperBar, StepItem
│   ├── toast/          # ToastProvider (Context + useToast)
│   ├── ui/             # Button, Toggle, Badge, TextField, SelectField,
│   │                   # RadioGroup, Checkbox, FieldShell, Modal
│   └── ErrorBoundary.tsx
├── constants/
├── hooks/              # redux (tipado), useClickOutside
├── pages/              # EmployeesStepPage, ComingSoonStepPage, ComingSoonMenuPage
├── routes/             # AppRoutes
├── schemas/            # employeeSchema (Zod)
├── services/           # api.ts (Axios, com interceptor de erro)
├── store/              # slices + selectors (Redux Toolkit)
├── styles/             # globals.css (design tokens)
├── test/               # setup.ts (Vitest + Testing Library)
├── types/
└── utils/              # cn, máscara de CPF

*.test.ts(x) ficam colocados junto do código que testam, não numa pasta separada.
```

---

## Decisões de arquitetura

**Tailwind no lugar de uma biblioteca de componentes.** O desafio recomendava Ant Design, mas para um requisito pixel-perfect preferi Tailwind. Bibliotecas prontas embutem paddings, raios e comportamentos próprios que precisariam ser sobrescritos para casar com o Figma. Com Tailwind + tokens centralizados, os primitivos reproduzem o protótipo fielmente e seguem reutilizáveis.

**Sistema de cores centralizado.** Todas as cores vivem em CSS Variables (`:root` em `globals.css`), consumidas pelo tema do Tailwind. Nenhum componente repete valor de cor. Os tokens são canais RGB, o que habilita os modificadores de opacidade do Tailwind via `rgb(var(--token) / <alpha-value>)`.

**Redux apenas para estado global real.** `isFormOpen` e `editingEmployee` ficam no slice porque vários componentes reagem a eles; o estado dos campos do formulário fica no React Hook Form. Selectors memoizados isolam a derivação de dados (lista visível, contagem de ativos, etapa atual).

**Roteamento reflete a UI.** Cada etapa tem sua própria URL (`/step/1`, `/step/2`…); o índice atual é sincronizado a partir da URL, evitando dessincronização.

**Formulário com React Hook Form + Zod.** Schema único validado via `zodResolver`, com regras condicionais no `superRefine` (o nº do CA só é exigido quando o trabalhador usa EPI). `useFieldArray` aninhado reproduz o protótipo: cada atividade é um card e cada EPI é uma linha com seus botões.

**Serviço de API separado do Redux.** Os thunks chamam `employeeService`/`stepService` em vez de usar Axios diretamente, isolando a camada de rede dos slices.

**Toast próprio em vez de biblioteca.** Context + Tailwind (`components/toast/ToastProvider.tsx`), sem dependência nova, reaproveitando os mesmos tokens de cor do resto da UI. Um interceptor no Axios (`services/api.ts`) normaliza a mensagem de erro (`error.response.data.message`) para que o toast mostre o texto real da API, não o genérico do Axios.

**`ErrorBoundary` no shell.** Em `main.tsx`, envolve `<App />` por dentro do `ToastProvider` (não o contrário) — assim, se a árvore da aplicação quebrar, o container de notificações continua montado. Mostra um fallback com botão de recarregar em vez de tela branca.
