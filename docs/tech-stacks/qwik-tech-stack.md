---
title: Qwik Full Stack Architecture (T5)
version: 1.1.0
date: 2025-09-12
status: FINAL
authors:
  - name: lloyd
classification: INTERNAL
tags:
  [
    qwik,
    full-stack,
    tier5,
    resumability,
    edge,
    performance,
    deployment,
    architecture,
  ]
---

# Qwik Full Stack Architecture (Tier 5 – Elite)

## Purpose

This document defines a production-grade full-stack architecture using **Qwik Framework**, compliant with **Lloyd Tier 5** specifications. It emphasizes performance, edge-resume rendering, modularity, and type safety, with the latest version references and docs.

---

## Stack Overview (Latest Versions as of September 2025)

| Layer            | Technology                                                   | Version    | Docs / Source                                                                                                  |
| ---------------- | ------------------------------------------------------------ | ---------- | -------------------------------------------------------------------------------------------------------------- |
| Frontend         | [Qwik](https://qwik.dev/docs)                                | **1.16.0** | [npm](https://www.npmjs.com/package/@builder.io/qwik) • [Releases](https://github.com/BuilderIO/qwik/releases) |
| Styling          | [Tailwind CSS](https://tailwindcss.com/docs)                 | **4.1.13** | [npm](https://www.npmjs.com/package/tailwindcss)                                                               |
| State Management | [Qwik Signals](https://qwik.dev/docs/signal/)                | Built-in   | Built into Qwik                                                                                                |
| API Layer        | [Qwik City Endpoints](https://qwik.dev/docs/endpoints/)      | Built-in   | Qwik file-based endpoints                                                                                      |
| Validation       | [Zod](https://zod.dev)                                       | **4.1.8**  | [npm](https://www.npmjs.com/package/zod)                                                                       |
| ORM              | [Drizzle ORM](https://orm.drizzle.team/docs/overview)        | **0.44.5** | [npm](https://www.npmjs.com/package/drizzle-orm)                                                               |
| Database         | PostgreSQL                                                   | N/A        | [PostgreSQL Docs](https://www.postgresql.org/docs/)                                                            |
| Type System      | TypeScript                                                   | TBD        | [Docs](https://www.typescriptlang.org/docs/)                                                                   |
| Testing          | [Vitest](https://vitest.dev)                                 | TBD        | [Releases](https://github.com/vitest-dev/vitest/releases)                                                      |
| UI Testing       | [Testing Library](https://testing-library.com/docs/)         | TBD        | [Releases](https://github.com/testing-library/react-testing-library/releases)                                  |
| E2E Testing      | [Playwright](https://playwright.dev/docs/intro)              | TBD        | [Releases](https://github.com/microsoft/playwright/releases)                                                   |
| Deployment       | [Cloudflare Pages](https://developers.cloudflare.com/pages/) | N/A        | Edge-deployed & CDN native                                                                                     |
| Containerization | [Docker](https://docs.docker.com/)                           | **24.0+**  | [Releases](https://docs.docker.com/engine/release-notes/)                                                      |

---

## Folder Structure

```txt
/qwik-app
├── src/
│   ├── components/          # Qwik components (resumable by default)
│   ├── routes/              # File-based routing with endpoints
│   ├── lib/                 # Utilities and helpers
│   ├── db/                  # Drizzle schema & client
│   └── styles/              # Tailwind & global styles
├── public/                  # Static assets
├── drizzle.config.ts        # ORM config
├── qwik.config.ts           # Qwik app config
└── Dockerfile               # Optional container build
```

---

## API Layer Example (Qwik Endpoint)

```ts
// src/routes/api/user.tsx
import { z } from 'zod';
import { drizzleClient } from '~/db/client';
import { routeLoader$ } from '@builder.io/qwik-city';

export const useUser = routeLoader$(async ({ query }) => {
  const id = z.string().parse(query.get('id'));
  return drizzleClient.query.users.findFirst({ where: { id } });
});
```

---

## Dockerfile (Optional Build)

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server/entry.js"]
```

---

## Key Advantages

- ✅ Near-zero JavaScript shipped by default (resumability)
- ✅ File-based routing with endpoint handlers (API + UI in one)
- ✅ Excellent edge performance with CDN-native deployment
- ✅ Simple state model using Signals
- ✅ Type-safe ORM and Zod integration

---

## Compliance Tier

- **Lloyd Tier**: T5 (Elite)
- **Focus**: Performance, Edge-native rendering, Minimal JS, DX
- **Verified**: Resumable architecture, Edge-Optimized, Type-Safe

---

## Revision History

| Version | Date       | Description                    | Author |
| ------- | ---------- | ------------------------------ | ------ |
| 1.0.0   | 2025-09-12 | Initial architecture draft     | Lloyd  |
| 1.1.0   | 2025-09-12 | Added latest verified versions | Lloyd  |
