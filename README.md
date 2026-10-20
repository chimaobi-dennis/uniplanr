# Uniplanr

Uniplanr is a study-abroad platform that helps international students find university programs, track applications, prepare documents (SOP, CV, resume) with AI help, and pay for premium services. The live product at [uniplanr.com](https://uniplanr.com) currently covers ~850 Swedish master's programs.

This repository is the **rewrite of the original Laravel/Livewire app into Next.js + TypeScript**, deployed on Vercel. It is an early-stage, work-in-progress migration: the foundation (schema, config, CI) is in place and features are being ported phase by phase. See [ROADMAP.md](ROADMAP.md) and the [open issues](../../issues).

**Who it's for:** prospective international students (applicants) and the small admin team that manages programs, universities and applications.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript (strict), Tailwind CSS
- PostgreSQL on Supabase, accessed with [Prisma](https://www.prisma.io) 7 (`@prisma/adapter-pg`)
- zod-validated environment (`@t3-oss/env-nextjs`)
- Planned: Auth.js, Stripe, Brevo email, OpenAI, Vercel Blob/S3 (see roadmap)
- CI: GitHub Actions (typegen, tsc, eslint, vitest, build); hosting: Vercel

## Getting started

Requires Node 22+ and a PostgreSQL database (a free Supabase project works).

```bash
git clone https://github.com/chimaobi-dennis/uniplanr.git
cd uniplanr
cp .env.example .env.local      # fill in DATABASE_URL, DIRECT_URL, AUTH_SECRET
npm install                     # also runs `prisma generate`
npx prisma migrate dev          # create tables (once migrations exist)
npm run dev                     # http://localhost:3000
```

Useful scripts: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm run db:studio`.

To build without a database or secrets (e.g. in CI): `SKIP_ENV_VALIDATION=1 npm run build`.

## Project layout

```
src/app/         Next.js routes
src/env.ts       validated environment variables
src/lib/db.ts    Prisma client
prisma/          schema (73 models) mapped 1:1 to the legacy table/column names
UPGRADE_PLAN.md  migration strategy and rationale
```

The legacy Laravel app is not part of this repository.

## Data and privacy

No real user data is stored in this repo. Use made-up sample data for development. Never commit `.env*` files; use `.env.example` placeholders.

## License

[MIT](LICENSE) © 2026 Chimaobi Dennis
