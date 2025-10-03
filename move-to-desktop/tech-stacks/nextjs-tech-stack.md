---
title: Next.js Full Stack Architecture (T5)
version: 1.1.0
date: 2025-09-12
status: FINAL
authors:
  - name: lloyd
classification: INTERNAL
tags:
  [nextjs, full-stack, tier5, trpc, prisma, architecture, deployment, versions]
---

# Next.js Full Stack Architecture (Tier 5 – Elite)

## Purpose

This document defines a production-grade full-stack architecture using **Next.js App Router**, compliant with **Lloyd Tier 5** specifications. It includes core stack choices, deployment model, file structure, and up-to-date version references with documentation links.

---

## Stack Overview (Latest Versions as of September 2025)

| Layer            | Technology                                                                                 | Version    | Docs / Source                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------ | ---------- | ----------------------------------------------------------------------------- |
| Frontend         | [Next.js](https://nextjs.org/docs)                                                         | **15.5.3** | [Release Notes](https://github.com/vercel/next.js/releases/tag/v15.5.3)       |
| Styling          | [Tailwind CSS](https://tailwindcss.com/docs)                                               | **4.1.13** | [Releases](https://github.com/tailwindlabs/tailwindcss/releases)              |
| State Management | [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)                       | **4.5.0**  | [Releases](https://github.com/pmndrs/zustand/releases)                        |
| Remote State     | [TanStack Query](https://tanstack.com/query/latest)                                        | **5.34.2** | [Releases](https://github.com/TanStack/query/releases)                        |
| API Layer        | [tRPC](https://trpc.io/docs)                                                               | **11.5.1** | [Releases](https://github.com/trpc/trpc/releases)                             |
| Validation       | [Zod](https://zod.dev)                                                                     | **4.1.8**  | [Releases](https://github.com/colinhacks/zod/releases)                        |
| ORM              | [Prisma](https://www.prisma.io/docs)                                                       | **6.16.1** | [Releases](https://github.com/prisma/prisma/releases)                         |
| Database         | PostgreSQL                                                                                 | N/A        | [PostgreSQL Docs](https://www.postgresql.org/docs/)                           |
| Type System      | TypeScript                                                                                 | **5.4.3**  | [Docs](https://www.typescriptlang.org/docs/)                                  |
| Testing          | [Vitest](https://vitest.dev)                                                               | **1.6.3**  | [Releases](https://github.com/vitest-dev/vitest/releases)                     |
| UI Testing       | [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)           | **14.2.1** | [Releases](https://github.com/testing-library/react-testing-library/releases) |
| E2E Testing      | [Playwright](https://playwright.dev/docs/intro)                                            | **1.44.0** | [Releases](https://github.com/microsoft/playwright/releases)                  |
| Deployment       | [Vercel](https://vercel.com/docs) / [Cloudflare](https://developers.cloudflare.com/pages/) | N/A        | Cloud-hosted Edge/CDN                                                         |
| Containerization | [Docker](https://docs.docker.com/)                                                         | **24.0+**  | [Releases](https://docs.docker.com/engine/release-notes/)                     |

---

## Folder Structure

```txt
/tier5-app
├── app/                    # App Router-based pages & layouts
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page (Server Component)
│   ├── api/                # Route handlers (tRPC optional)
│   └── users/              # Example dynamic route (/users/:id)
├── components/             # Reusable UI components
│   ├── ui/                 # Atoms & primitives (e.g., Button, Card)
│   └── features/           # Contextual UI (e.g., UserProfile)
├── lib/                    # Utility functions & typed clients
│   └── trpc/               # tRPC client & hooks
├── server/                 # Server-only logic
│   ├── db/                 # Prisma schema & client
│   └── api/                # tRPC routers, procedures
├── config/                 # App configuration (env, constants)
├── public/                 # Static assets (images, favicon, etc.)
├── styles/                 # Global styles & Tailwind config
├── tests/                  # Unit + integration tests
└── Dockerfile              # Optional: Docker multi-stage build
```

---

## API Layer: tRPC Example

```ts
// server/api/router.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../db/client';

const t = initTRPC.create();

export const appRouter = t.router({
  users: t.router({
    getById: t.procedure
      .input(z.string())
      .query(({ input }) => prisma.user.findUnique({ where: { id: input } })),
  }),
});

export type AppRouter = typeof appRouter;
```

---

## Dockerfile (Edge-Ready)

```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Key Advantages

- ✅ End-to-end type safety (tRPC + Prisma + TypeScript)
- ✅ Streaming SSR with React Server Components
- ✅ Edge-ready with zero-config deployment on Vercel
- ✅ Modular codebase separation (client/server/shared)
- ✅ Full testing pipeline (unit, integration, E2E)

---

## Compliance Tier

- **Lloyd Tier**: T5 (Elite)
- **Focus**: Performance, DX, Deployment Readiness
- **Verified**: Type-safe, Edge-Optimized, Modular, Tested

---

## Revision History

| Version | Date       | Description                      | Author |
| ------- | ---------- | -------------------------------- | ------ |
| 1.0.0   | 2025-09-12 | Initial architecture draft       | Lloyd  |
| 1.1.0   | 2025-09-12 | Added real-time version research | Lloyd  |
