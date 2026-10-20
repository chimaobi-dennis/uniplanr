# Roadmap

Migration of Uniplanr from Laravel to Next.js + TypeScript. Each phase has a tracking issue. Details and rationale: [UPGRADE_PLAN.md](UPGRADE_PLAN.md).

- [x] **Phase 0** – repo hygiene, new Next.js + TS scaffold, Vercel deploy
- [x] **Phase 1a** – Prisma schema, env validation, DB client, CI
- [ ] **Phase 1b** – connect Supabase, first migration, Auth.js (credentials + Google), roles, base layout, tests
- [ ] **Phase 2** – public site: home, programs catalog (server-side filters/pagination), program detail, destinations, blog, forum, legal, SEO
- [ ] **Phase 3** – student core: onboarding/profile, program matching + credits, wishlist, applications, documents (upload, versions, sharing, AI writing, PDF)
- [ ] **Phase 4** – payments and email: Stripe checkout/webhooks, subscriptions, receipts, Brevo transactional emails
- [ ] **Phase 5** – admin and AI tooling: users, programs/universities, email templates, program extraction jobs, UniAI chatbot (streaming, rate limits)
- [ ] **Phase 6** – cutover: data migration, URL redirects, DNS, decommission legacy

## Product upgrades after parity

Instant search/filters and program comparison · multi-country catalog · application tracker with deadline reminders · UniAI v2 with tool calling · Core Web Vitals and accessibility pass · observability (Sentry, analytics) · i18n.
