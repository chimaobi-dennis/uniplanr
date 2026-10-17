# Uniplanr — Product Upgrade & TypeScript Migration Plan

## 1. What exists today

**Production (uniplanr.com):** Laravel 11 + Livewire 3 + Jetstream/Blade, MySQL, Stripe (Cashier) + Remita, Brevo email, OpenAI (GPT + "UniAI" chatbot), Google OAuth, JWT/Sanctum API, DomPDF, Excel import. Served from a PHP host (`.htaccess`, `index.php` in root).

**Product surface (from the live site + routes):**
- Public: home, programs catalog (857 Swedish programs, filters, grid/list), study destinations, scholarships, blog, forum (Q&A, votes, tags, badges), university partnerships, legal pages, UniAI chatbot widget, cookie banner.
- Student: onboarding/profile, AI program matching (tiered, credit-gated), application start/continue/manage, document manager + versions + sharing + folders, AI document writing (SOP/CV/resume wizard), mock interview, visa info, notifications, wishlist, payments/subscriptions/receipts.
- Admin: users, programs/universities CRUD, applications, email queue/templates/settings, promotion tasks, scraper/AI program extraction & enrichment, file manager, site settings.

**Code size:** ~90 migrations, ~60 models, ~180 API routes, ~330 web routes, ~4k lines of services (Chatbot 1.3k, EmailTrigger 0.8k, Brevo 0.6k, AIMatching 0.5k), ~4k lines of Blade in `front/`.

**Already TypeScript (reusable):**
- `resources/js/react-dashboard/` — 117 `.tsx` + 21 `.ts` files: the whole student/admin dashboard (shadcn/Radix, react-query, zod). Talks to Laravel via `/api/v1/*` and `/api/admin/*`.
- `uniplanr-program-explorer-main/` — a Vite + React + TS + shadcn program-explorer prototype.

**Junk / leftovers (do not migrate):** `NEXT/`, `nest/`, `uniplan/`, `nextstep/`, `pay/`, `payment/`, `site/`, `package-lock1.json`, `*_backup.blade.php`, `ChatBotServiceBU.php`, ~25 loose `*.md` guides, `chatbot_diagnostic.php`, `extract_programs.php`, `test_extraction.php`, `storage/credentialsEdeh-test.jpg`.

## 2. Findings that must be fixed regardless of the migration

| # | Issue | Severity |
|---|-------|----------|
| 1 | **Live site has debug mode on.** `https://uniplanr.com/pages/study-destinations` renders a full stack trace including source and request headers/cookies (`Attempt to read property "country_id" on null`, `FrontController.php:414`). Set `APP_DEBUG=false` on the server now. Local `.env` also has `APP_ENV=local`, `APP_DEBUG=true`. | High |
| 2 | **Nothing is committed.** The repo has one commit (`.gitignore`); everything else is untracked. The current `.gitignore` would let `storage/logs` (71 MB), `public/` (229 MB incl. uploads), zips, and `storage/credentialsEdeh-test.jpg` be pushed. A first `git add .` would be a mess. | High |
| 3 | Public test endpoints in `routes/web.php`: `/api/test-db` runs `SHOW TABLES` and returns the DB name and error messages unauthenticated. | High |
| 4 | Local `.env` holds real DB/mail/AWS credentials. It is gitignored (good), but once the new repo is public/shared **rotate** DB, mail, AWS, Stripe, Brevo and OpenAI keys as a precaution, since `.env` has lived alongside zips and docs in a folder that gets copied around. | Medium |
| 5 | Auth is split across session, Sanctum and JWT; `/api/v1/admin/...` routes take `{adminId}`/`{userId}` in the URL (IDOR risk — authorization should come from the session, not the path). Needs an audit. | Medium |
| 6 | Study-destination page 500s for unknown destination (null deref) and forum home still has lorem ipsum copy. | Low |

## 3. Key constraint: Vercel cannot run Laravel

Vercel runs Node/Edge/Python/Go/Ruby functions. PHP/Laravel (Livewire, queues, scheduler, local disk, MySQL socket) is not a supported runtime. So "push to GitHub and deploy on Vercel" means **re-platforming the backend**, not just converting the front end. The pragmatic path:

**Target stack**
- **Next.js (App Router) + TypeScript (strict)** — one repo, SSR/ISR for SEO pages (programs, blog, destinations), server actions / route handlers for the API.
- **UI:** Tailwind + shadcn/ui (the dashboard and explorer prototype already use it → components port directly).
- **DB:** keep the relational model. Prisma (or Drizzle) introspected from the existing MySQL schema. Hosting: Neon/Supabase Postgres (Vercel Marketplace) with a one-off data migration, *or* keep MySQL on a managed host (PlanetScale/TiDB/Aiven) to cut migration risk. Recommend Postgres.
- **Auth:** Auth.js (or Better Auth) with credentials + Google; existing bcrypt hashes (`$2y$`) verify with `bcryptjs`, so users keep passwords. Email verification and 2FA re-implemented.
- **Files:** Vercel Blob or S3 (AWS creds already exist) — replaces local `storage/app/public` and `public/uploads`.
- **Queues / scheduler:** Inngest or Upstash QStash + Vercel Cron (replaces `jobs` table, email queue, scheduler).
- **Payments:** Stripe Node SDK + webhooks; Remita via REST. Subscriptions move from Cashier tables to direct Stripe objects.
- **Email:** Brevo Node SDK (templates/triggers port from `BrevoService` / `EmailTriggerService`).
- **AI:** Vercel AI SDK / OpenAI SDK; port `GPTService`, `AIMatchingService`, `ChatbotService`, program extraction. Streaming chat for UniAI.
- **PDF:** `@react-pdf/renderer` or Playwright-free HTML→PDF (receipts, resumes). **Excel:** `exceljs`.
- **Quality:** ESLint, Vitest + Playwright, Zod validation at every boundary, GitHub Actions CI, Sentry.

## 4. Migration strategy: strangler, not big-bang

Build the new app in a clean directory (`uniplanr-web/`) and a **new GitHub repo**; leave Laravel running on its host until each slice is replaced. Put Vercel in front using rewrites per path, so traffic moves route by route and rollback is a config change.

**Phase 0 — Safety & repo hygiene (½–1 day)**
1. Set `APP_DEBUG=false` on production; remove `/api/test*` routes. 
2. Rotate secrets as above.
3. Move the legacy Laravel app into `legacy/` (or a private `uniplanr-laravel` repo) with a proper `.gitignore` (logs, uploads, zips, vendor, node_modules, `.env*`, `.DS_Store`). Delete/archive the junk list in §1.
4. Snapshot prod DB + uploads (backups before anything else).

**Phase 1 — Foundation (≈1 week)**
- Scaffold Next.js 15 + TS strict + Tailwind + shadcn; Prisma schema from `database/migrations` (generate ERD, drop dead tables).
- Staging DB on Neon, data-import script (mysqldump → transform → load) rehearsed repeatedly.
- Auth, session, roles (`student`, `admin`), middleware, env validation (`@t3-oss/env` + zod), CI, Vercel project + preview deploys.

**Phase 2 — Public site (≈1–2 weeks, first thing users see; best SEO win)**
- Home, programs catalog with server-side filters/pagination (fix perf: currently N+1 rating queries), program detail, study destinations (fix null bug), blog (categories/tags, MDX or DB), forum, legal, partners, sitemap/robots/OG metadata, cookie consent.
- Port the `program-explorer` prototype into the catalog.
- Cut over via Vercel rewrites once parity is checked.

**Phase 3 — Student core (≈3–4 weeks)**
- Onboarding & profile, matching engine (port `AIMatchingService` tiers + credits with unit tests against Laravel outputs for a golden set of profiles), wishlist, application flow, notifications.
- Documents: upload, folders, versions, sharing, AI writing, resume wizard, PDF export. Move existing dashboard `.tsx` over with its API client rewritten to server actions/route handlers; keep react-query where it helps.

**Phase 4 — Payments & email (≈1–2 weeks)** 
- Stripe checkout + webhook, Remita, subscription plans, credits, receipts. Test mode end-to-end before touching live keys; keep live payments on Laravel until verified.
- Brevo transactional + trigger emails, email queue UI.

**Phase 5 — Admin & AI tooling (≈2 weeks)**
- Users, programs/universities, applications, email templates/settings, promotion tasks, site settings, file manager, scraper/AI extraction (long-running → background job, not a request).
- UniAI chatbot with knowledge base, streaming, rate limiting.

**Phase 6 — Cutover & decommission (≈1 week)**
- Final data sync with a short write-freeze, DNS to Vercel, redirects for every old URL (preserve `/pages/...`, `/blog/{slug}`, `/forum/...` for SEO), monitor, keep Laravel read-only for 2–4 weeks, then retire.

Rough total: **10–14 weeks** for one developer to full parity; Phases 0–2 alone (hardened, faster public site on Vercel) in ~3 weeks.

## 5. Product upgrades to fold in (after parity, or alongside where cheap)

1. **Program search that converts:** instant search/filters (country, field, tuition, deadline, language requirement), save/compare, shareable URLs; full-text via Postgres FTS or Typesense. 
2. **Multi-country catalog:** site copy says 100+ countries but the catalog is Sweden only — schema is ready (`countries`, `study_destinations`); data and scrapers aren't.
3. **Application tracker:** per-program checklist, deadline reminders (email + push), Kanban status, document readiness score.
4. **UniAI v2:** streaming, citations to catalog data, tool-calling (search programs, check eligibility, draft SOP), conversation memory, guardrails and cost caps tied to credits.
5. **Onboarding:** shorter first run, instant "top 5 matches" before sign-up to lift activation.
6. **Trust & growth:** real testimonials/stories, university logos, structured data (JSON-LD for programs), blog/SEO templates, referral/promotion-task rewards.
7. **Performance & a11y:** Core Web Vitals budget, image optimization (`public/` has ~170 MB of images), WCAG AA pass, mobile-first checkout.
8. **Observability:** Sentry, PostHog (replaces ad-hoc `PagePerformance`/`EmailAnalytics` tables), audit log for admin actions.
9. **i18n:** next-intl scaffolding (students from 100+ countries).

## 6. Risks & mitigations

- **Behavior drift in matching/credits/payments** → golden-file tests comparing Laravel and TS outputs; run both in shadow mode.
- **Data migration errors** → scripted, idempotent, rehearsed on staging; row-count and checksum reports.
- **SEO loss** → 301 map for all old URLs, keep sitemap, compare indexed pages weekly.
- **Vercel limits** (function duration, upload size, no persistent disk) → Blob/S3 direct uploads, background jobs for scraping/AI.
- **Livewire-only features** (forum voting, modals) → rebuild as client components + server actions.
- **Scope creep** → parity first, upgrades behind feature flags.

## 7. Decisions needed before Phase 1

1. Full Next.js rewrite (recommended) vs. keeping Laravel as a separate API host and only moving the front end to Vercel.
2. Database: Neon Postgres (recommended) vs. staying on MySQL.
3. New GitHub repo name/visibility, and whether legacy Laravel goes in a private repo.
4. Are Remita (Nigeria) payments still needed alongside Stripe?
5. Production access: DB dump, uploads archive, server env vars (for accurate data migration and rotating keys).
