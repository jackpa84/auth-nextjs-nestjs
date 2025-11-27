# AUTH NextJs NestJs

Descrição
-------

Projeto exemplo de autenticação completo com frontend em Next.js e backend em NestJS, usando PostgreSQL e Prisma para persistência. Inclui autenticação via JWT, refresh tokens e rota protegida de dashboard.

**Arquitetura**
- Frontend: Next.js (app router)
- Backend: NestJS (API REST)
- Banco: PostgreSQL (via Docker)
- ORM: Prisma
- Orquestração local: `docker-compose`

**Tecnologias**
- Next.js
- React
- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Docker / Docker Compose

Pré-requisitos
--------------

- Docker & Docker Compose (recomendado)
- Node.js (para desenvolvimento local sem docker)
- pnpm / npm / yarn (conforme preferência)

Execução (rápida) usando Docker Compose
-------------------------------------

1. Subir containers (backend, frontend e Postgres):

```bash
docker-compose up --build
```

2. Acesse:
- Frontend: http:
- Backend (API): http:

Configuração local (desenvolvimento)
-----------------------------------

Backend

```bash
cd backend
npm install
# modo dev
npm run start:dev
```

Frontend

```bash
cd frontend
npm install
# modo dev (Next.js)
npm run dev
```

Variáveis de ambiente principais
-------------------------------

As variáveis mais relevantes (também definidas no `docker-compose.yml`):

- Backend
  - `DATABASE_URL` — string de conexão do Postgres (ex.: `postgresql:
  - `JWT_SECRET` — chave secreta para assinar tokens JWT
  - `PORT` — porta do backend (ex.: `3001`)
  - `FRONTEND_URL` — URL do frontend (ex.: `http:

- Frontend
  - `NEXT_PUBLIC_API_URL` — URL base da API (ex.: `http:

Banco de dados e Prisma
-----------------------

O projeto usa Prisma como ORM. Com o banco rodando (por exemplo via `docker-compose`) execute no diretório `backend`:

```bash
cd backend
npx prisma migrate deploy   # aplicar migrações em produção
npx prisma migrate dev      # em desenvolvimento
node prisma/seed.js         # ou `ts-node prisma/seed.ts` se houver seed
```

Testes
------

Backend usa Jest (ver `backend/package.json`). Para rodar testes:

```bash
cd backend
npm run test
```

Estrutura do repositório (resumo)
---------------------------------

- `backend/` — código NestJS, Prisma, migrations e scripts
- `frontend/` — aplicação Next.js, componentes, hooks e páginas
- `docker-compose.yml` — orquestração local (postgres, backend, frontend)

Dashboard
---------

A aplicação inclui uma página de `Dashboard` protegida que mostra estatísticas, atividade recente e um gráfico em tempo real. A página está implementada em `frontend/app/dashboard/page.tsx` e usa os seguintes componentes e hooks:

- `RequireAuth` — wrapper que garante que a rota seja acessível apenas por usuários autenticados.
- `useAuth` — hook que provê informações do usuário e ação de logout.
- `StatsCards` — conjunto de cards com métricas.
- `RealTimeChart` — componente de gráfico em tempo real.
- `RecentActivity` — lista de atividade recente.
- `Button` — componente de UI para ações (ex.: logout).

Trecho do código da página `Dashboard` (arquivo `frontend/app/dashboard/page.tsx`):


Observações:
- A página utiliza Tailwind CSS para estilização e componentes reutilizáveis em `frontend/components/`.
- A autenticação é verificada pelo wrapper `RequireAuth`; o hook `useAuth` fornece `user` e `logout`.

Contribuindo
------------

1. Abra uma issue descrevendo a melhoria/bug.
2. Faça um fork, crie uma branch com um nome descritivo.
3. Abra um pull request explicando a mudança.

Licença
-------

Este projeto está disponível sob a Licença MIT. Consulte o arquivo `LICENSE` na raiz do repositório para o texto completo da licença.

SPDX: `MIT`
