---
title: Capacitor + SvelteKit Full Stack Architecture (T5)
version: 1.0.0
date: 2025‑09‑13
status: FINAL
authors:
  - name: lloyd
classification: INTERNAL
tags:
  [capacitor, sveltekit, mobile, full-stack, tier5, hybrid, edge, architecture]
---

# Capacitor + SvelteKit Full Stack Architecture (Tier 5 – Elite Hybrid Mobile)

## Purpose

Defines a hybrid‑mobile architecture using **SvelteKit** for UI and backend endpoints, wrapped into native containers using **Capacitor**, suitable for building performant offline‑friendly mobile apps with web-first DX.

---

## Stack Overview (Latest Versions as of September 2025)

| Layer            | Technology                                           | Version     | Docs / Source Links                                                    |
| ---------------- | ---------------------------------------------------- | ----------- | ---------------------------------------------------------------------- |
| UI Framework     | [SvelteKit](https://kit.svelte.dev/)                 | **2.39.1**  | [SvelteKit Docs](https://kit.svelte.dev/docs)                          |
| Compiler         | [Svelte](https://svelte.dev/)                        | **5.38.10** | [Svelte Docs](https://svelte.dev/docs)                                 |
| Hybrid Shell     | [Capacitor](https://capacitorjs.com/)                | **5.4.1**   | [Capacitor Docs](https://capacitorjs.com/docs)                         |
| Styling          | [Tailwind CSS](https://tailwindcss.com/)             | **4.1.13**  | [Tailwind Docs](https://tailwindcss.com/docs)                          |
| State Management | Svelte Stores / Signals                              | Built-in    | [Svelte Stores](https://svelte.dev/docs#run-time-svelte-store)         |
| API Layer        | SvelteKit Endpoints / REST / GraphQL / Supabase Edge | N/A         | [SvelteKit Endpoints](https://kit.svelte.dev/docs/routing#endpoints)   |
| ORM / DB         | [Drizzle ORM](https://orm.drizzle.team/)             | **0.44.5**  | [npm drizzle-orm](https://www.npmjs.com/package/drizzle-orm)           |
| Validation       | [Zod](https://zod.dev/)                              | **4.1.8**   | [Zod Docs](https://zod.dev/)                                           |
| Auth             | Supabase Auth / OAuth / Custom                       | N/A         | [Supabase Auth Docs](https://supabase.com/docs/guides/auth)            |
| Testing          | [Vitest](https://vitest.dev/)                        | **3.2.4**   | [Vitest Docs](https://vitest.dev/guide/)                               |
| E2E Testing      | [Playwright](https://playwright.dev/)                | **1.55.0**  | [Playwright Docs](https://playwright.dev/docs)                         |
| Deployment       | Android / iOS via Capacitor + Play Store / App Store | N/A         | [Capacitor Deployment](https://capacitorjs.com/docs/guides/publishing) |

---

## Folder Structure Suggestion

```txt
/capacitor-sveltekit-app
├── src/
│   ├── routes/             # SvelteKit endpoints and screens
│   ├── components/         # Shared UI components
│   ├── lib/                # Utilities and helpers
│   ├── db/                 # Drizzle schemas + clients
│   └── styles/             # Tailwind and globals
├── capacitor/              # Native shell config (Android/iOS)
│   └── android/ios/        # Platform folders
├── static/                 # Static assets
├── svelte.config.js        # SvelteKit configuration
├── drizzle.config.ts       # ORM configuration
├── .env                    # Environment variables
└── tests/                  # Vitest and Playwright specs
```

---

## Key Advantages

- ✅ Hybrid native + web deployment via Capacitor
- ✅ Uses SvelteKit for backend & frontend in one repo
- ✅ Edge-compatible via adapters (Netlify/Vercel/Cloudflare)
- ✅ Great offline performance with static + dynamic rendering
- ✅ Full TypeScript coverage with Zod, Drizzle, and Signals

---

## Compliance Tier

- **Lloyd Tier**: T5 (Elite Hybrid)
- **Focus Areas**: Hybrid portability, Type Safety, Edge APIs, Minimal Overhead
- **Verified**: All core stack pieces are current

---

## Against Lloyd T5 Spec Table

| Spec Requirement            | Meets? | Notes                                        |
| --------------------------- | ------ | -------------------------------------------- |
| Hybrid Mobile Support       | ✅     | Via Capacitor + Android/iOS wrappers         |
| Web + Native App Deployable | ✅     | PWA + native with one codebase               |
| Edge or Local APIs          | ✅     | SvelteKit endpoints, Netlify/Vercel adapters |
| State Management            | ✅     | Stores / Signals / minimal overhead          |
| Validation & TS Safety      | ✅     | Zod + full TypeScript usage                  |
| Testing Support             | ✅     | Vitest for unit, Playwright for E2E          |

---

## Revision History

| Version | Date       | Description                             | Author |
| ------- | ---------- | --------------------------------------- | ------ |
| 1.0.0   | 2025‑09‑13 | Initial Capacitor + SvelteKit Spec (T5) | Lloyd  |
