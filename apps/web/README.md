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

A URL da API é configurável via `VITE_API_URL` (padrão `http://localhost:3001`).

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
│   └── ui/             # Button, Toggle, Badge, TextField, SelectField,
│                       # RadioGroup, Checkbox, FieldShell, Modal
├── constants/
├── hooks/              # redux (tipado), useClickOutside
├── pages/              # EmployeesStepPage, ComingSoonStepPage, ComingSoonMenuPage
├── routes/             # AppRoutes
├── schemas/            # employeeSchema (Zod)
├── services/           # api.ts (Axios)
├── store/              # slices + selectors (Redux Toolkit)
├── styles/             # globals.css (design tokens)
├── types/
└── utils/              # cn, máscara de CPF
```

---

## Decisões de arquitetura

**Tailwind no lugar de uma biblioteca de componentes.** O desafio recomendava Ant Design, mas para um requisito pixel-perfect preferi Tailwind. Bibliotecas prontas embutem paddings, raios e comportamentos próprios que precisariam ser sobrescritos para casar com o Figma. Com Tailwind + tokens centralizados, os primitivos reproduzem o protótipo fielmente e seguem reutilizáveis.

**Sistema de cores centralizado.** Todas as cores vivem em CSS Variables (`:root` em `globals.css`), consumidas pelo tema do Tailwind. Nenhum componente repete valor de cor. Os tokens são canais RGB, o que habilita os modificadores de opacidade do Tailwind via `rgb(var(--token) / <alpha-value>)`.

**Redux apenas para estado global real.** `isFormOpen` e `editingEmployee` ficam no slice porque vários componentes reagem a eles; o estado dos campos do formulário fica no React Hook Form. Selectors memoizados isolam a derivação de dados (lista visível, contagem de ativos, etapa atual).

**Roteamento reflete a UI.** Cada etapa tem sua própria URL (`/step/1`, `/step/2`…); o índice atual é sincronizado a partir da URL, evitando dessincronização.

**Formulário com React Hook Form + Zod.** Schema único validado via `zodResolver`, com regras condicionais no `superRefine` (o nº do CA só é exigido quando o trabalhador usa EPI). `useFieldArray` aninhado reproduz o protótipo: cada atividade é um card e cada EPI é uma linha com seus botões.

**Serviço de API separado do Redux.** Os thunks chamam `employeeService`/`stepService` em vez de usar Axios diretamente, isolando a camada de rede dos slices.
