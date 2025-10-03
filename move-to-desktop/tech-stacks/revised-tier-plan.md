---
title: Revised Lloyd Tech Stack Tier System
version: 2.0.0
date: 2025-09-13
status: DRAFT
authors:
  - name: lloyd
classification: INTERNAL
tags:
  [tier-system, architecture, web, mobile, backend, framework-classification]
---

# Revised Lloyd Tech Stack Tier System (v2.0)

## Overview

This document proposes a revised tier system that better reflects the current technology landscape, addressing gaps in the original framework and providing clearer guidance for technology selection.

---

## 🎯 Tier Definitions (Revised)

### **Tier 1 - Foundation / Legacy**

**Theme**: Time-tested, universally supported, minimal risk

- **Characteristics**: Decades of stability, massive talent pool, conservative deployment
- **Risk Profile**: Extremely low
- **Innovation Level**: Conservative
- **Examples**: LAMP stack, WordPress, jQuery, Bootstrap

### **Tier 2 - Reliable / Proven**

**Theme**: Industry standard, mature ecosystems, broad adoption

- **Characteristics**: 5+ years of production use, extensive documentation, established patterns
- **Risk Profile**: Low
- **Innovation Level**: Incremental
- **Examples**: Rails, Django, Laravel, Express.js, React (class components)

### **Tier 3 - Modern Standard**

**Theme**: Current best practices, modern tooling, widespread adoption

- **Characteristics**: Modern build tools, TypeScript support, active development
- **Risk Profile**: Low-Medium
- **Innovation Level**: Evolutionary
- **Examples**: React + Vite, Vue 3, Angular, Node.js APIs

### **Tier 4 - Production Modern**

**Theme**: Cutting-edge but stable, performance-focused, developer experience

- **Characteristics**: Latest stable features, optimized DX, proven in production
- **Risk Profile**: Medium
- **Innovation Level**: Progressive
- **Examples**: Next.js, Nuxt 3, SvelteKit, Remix

### **Tier 5 - Elite / Bleeding Edge**

**Theme**: Experimental, performance-critical, early adopter

- **Characteristics**: Newest paradigms, potential for significant advantages, smaller ecosystems
- **Risk Profile**: Medium-High
- **Innovation Level**: Revolutionary
- **Examples**: Qwik, Fresh, Solid.js, Bun runtime

---

## 🌐 Web Architecture Matrix

### **Tier 1 - Foundation**

| Stack                   | Use Case             | Strengths                | Limitations         |
| ----------------------- | -------------------- | ------------------------ | ------------------- |
| **LAMP (PHP/MySQL)**    | Traditional websites | Universal hosting, cheap | Limited scalability |
| **WordPress + Plugins** | Content sites, blogs | Huge plugin ecosystem    | Security concerns   |
| **jQuery + Bootstrap**  | Simple interactions  | Easy to learn            | Not reactive        |

### **Tier 2 - Reliable**

| Stack                   | Use Case               | Strengths                | Limitations           |
| ----------------------- | ---------------------- | ------------------------ | --------------------- |
| **Ruby on Rails**       | Rapid prototypes, MVPs | Convention over config   | Monolithic            |
| **Django + PostgreSQL** | Data-heavy apps        | Admin interface, ORM     | Python ecosystem only |
| **Laravel + Blade**     | Business applications  | Elegant syntax, features | PHP ecosystem         |
| **Express.js + EJS**    | API servers, SSR       | Lightweight, flexible    | Minimal structure     |

### **Tier 3 - Modern Standard**

| Stack                       | Use Case             | Strengths                  | Limitations          |
| --------------------------- | -------------------- | -------------------------- | -------------------- |
| **React + Vite + REST**     | SPAs, dashboards     | Modern tooling, ecosystem  | Client-side only     |
| **Vue 3 + Composition API** | Interactive UIs      | Gentle learning curve      | Smaller ecosystem    |
| **Angular + TypeScript**    | Enterprise apps      | Full framework, TypeScript | Complex, opinionated |
| **Svelte + Vite**           | Performance-critical | Compiled, small bundles    | Smaller community    |

### **Tier 4 - Production Modern**

| Stack                      | Use Case          | Strengths                     | Limitations        |
| -------------------------- | ----------------- | ----------------------------- | ------------------ |
| **Next.js (Pages Router)** | Full-stack apps   | SSR/SSG, API routes           | Vercel coupling    |
| **Nuxt 3**                 | Vue full-stack    | Auto-imports, modules         | Vue ecosystem only |
| **Remix**                  | Form-heavy apps   | Web standards, nested routing | Smaller community  |
| **SvelteKit**              | Modern full-stack | File-based routing, adapters  | Newer ecosystem    |

### **Tier 5 - Elite**

| Stack                           | Use Case             | Strengths                  | Limitations       |
| ------------------------------- | -------------------- | -------------------------- | ----------------- |
| **Next.js (App Router) + tRPC** | Type-safe full-stack | End-to-end TypeScript      | Complex setup     |
| **Qwik + Qwik City**            | Ultra-fast loading   | Resumability, O(1) loading | Limited ecosystem |
| **Fresh (Deno)**                | Edge-first apps      | TypeScript native, islands | New runtime       |
| **Solid.js + SolidStart**       | Reactive performance | Fine-grained reactivity    | Very new          |

---

## 📱 Mobile Architecture Matrix

### **Tier 1 - Foundation**

| Stack                      | Use Case           | Strengths             | Limitations        |
| -------------------------- | ------------------ | --------------------- | ------------------ |
| **Native iOS (UIKit)**     | iOS-first apps     | Platform optimization | iOS only           |
| **Native Android (Views)** | Android-first apps | Platform features     | Android only       |
| **Cordova/PhoneGap**       | Basic hybrid apps  | Web technologies      | Performance issues |

### **Tier 2 - Reliable**

| Stack                | Use Case              | Strengths                  | Limitations         |
| -------------------- | --------------------- | -------------------------- | ------------------- |
| **React Native CLI** | Cross-platform native | Code sharing, performance  | Bridge overhead     |
| **Flutter + Dart**   | Custom UI apps        | Widget system, performance | Dart learning curve |
| **Ionic + Angular**  | Hybrid web apps       | Web skills, components     | WebView limitations |
| **Xamarin**          | Enterprise mobile     | C# ecosystem, native       | Microsoft ecosystem |

### **Tier 3 - Modern Standard**

| Stack                          | Use Case                 | Strengths                  | Limitations            |
| ------------------------------ | ------------------------ | -------------------------- | ---------------------- |
| **Expo (Managed)**             | Rapid mobile development | Easy deployment, OTA       | Expo limitations       |
| **Flutter + Firebase**         | MVP mobile apps          | Backend included, fast dev | Firebase lock-in       |
| **React Native + Expo (Bare)** | Custom native features   | Flexibility + convenience  | More complex setup     |
| **Capacitor + Ionic**          | Progressive web apps     | One codebase, web+mobile   | Performance trade-offs |

### **Tier 4 - Production Modern**

| Stack                     | Use Case                | Strengths                    | Limitations       |
| ------------------------- | ----------------------- | ---------------------------- | ----------------- |
| **Expo + EAS Build**      | Professional RN apps    | Modern tooling, CI/CD        | Expo ecosystem    |
| **Flutter + Riverpod**    | State-heavy apps        | Reactive state, performance  | Dart ecosystem    |
| **Capacitor + Vue/React** | Hybrid with native feel | Modern web + native APIs     | Bridge complexity |
| **Tauri + Web Tech**      | Desktop-mobile apps     | Rust performance, small size | Desktop focus     |

### **Tier 5 - Elite**

| Stack                     | Use Case             | Strengths                  | Limitations      |
| ------------------------- | -------------------- | -------------------------- | ---------------- |
| **Flutter + Dart Frog**   | Full-stack Dart      | Single language, type-safe | Dart everywhere  |
| **Capacitor + SvelteKit** | Hybrid performance   | Compiled UI, universal     | Svelte ecosystem |
| **React Native + tRPC**   | Type-safe mobile-web | Shared API types           | Complex setup    |
| **Native + KMM**          | Kotlin multiplatform | Shared business logic      | Kotlin focus     |

---

## 🔧 Backend & Infrastructure Tiers

### **Tier 1 - Foundation**

- Traditional hosting (cPanel, FTP)
- Apache/Nginx + PHP
- MySQL/PostgreSQL on VPS
- Basic CDN (Cloudflare)

### **Tier 2 - Reliable**

- AWS EC2/RDS, DigitalOcean
- Docker containers
- Load balancers
- Redis caching
- Traditional CI/CD

### **Tier 3 - Modern Standard**

- Kubernetes orchestration
- Microservices architecture
- API gateways
- Monitoring (DataDog, New Relic)
- Infrastructure as Code

### **Tier 4 - Production Modern**

- Serverless functions
- Edge computing (Cloudflare Workers)
- JAMstack deployment
- Advanced observability
- GitOps workflows

### **Tier 5 - Elite**

- Edge-first architecture
- Real-time everything
- AI/ML integration
- WebAssembly workloads
- Experimental runtimes (Deno, Bun)

---

## 🎯 Selection Criteria by Tier

### **Choose Tier 1 when:**

- Budget is extremely constrained
- Team has limited technical skills
- Requirements are very simple
- Long-term maintenance by non-technical users

### **Choose Tier 2 when:**

- Building proven, well-understood applications
- Team prefers established patterns
- Risk tolerance is very low
- Need extensive third-party integrations

### **Choose Tier 3 when:**

- Building modern applications with standard requirements
- Team is comfortable with current best practices
- Balance of innovation and stability
- Medium-term maintenance expected

### **Choose Tier 4 when:**

- Performance and developer experience are priorities
- Team can handle some complexity
- Building competitive applications
- Long-term strategic applications

### **Choose Tier 5 when:**

- Performance is absolutely critical
- Team enjoys cutting-edge technology
- Building innovative, differentiated products
- Can accept some ecosystem immaturity

---

## 📊 Migration Paths

### **Tier 1 → Tier 2**

- jQuery → Vue.js/Alpine.js
- PHP includes → Laravel/Symfony
- MySQL queries → ORM

### **Tier 2 → Tier 3**

- Rails → Rails 7 with Hotwire
- Express → Express + TypeScript
- jQuery → React/Vue

### **Tier 3 → Tier 4**

- React SPA → Next.js/Remix
- Vue 3 → Nuxt 3
- Node API → tRPC/GraphQL

### **Tier 4 → Tier 5**

- Next.js Pages → App Router
- REST APIs → tRPC/GraphQL
- Traditional deployment → Edge

---

## 🚧 Missing Categories (To Add)

### **Backend-as-a-Service**

- Firebase (Tier 3)
- Supabase (Tier 4)
- AWS Amplify (Tier 3)
- PlanetScale (Tier 4)

### **CMS & Headless**

- WordPress (Tier 1)
- Strapi (Tier 3)
- Sanity (Tier 4)
- Contentful (Tier 4)

### **Desktop Applications**

- Electron (Tier 2)
- Tauri (Tier 4)
- Flutter Desktop (Tier 3)
- Progressive Web Apps (Tier 3)

### **Micro-frontend**

- Module Federation (Tier 4)
- Single-spa (Tier 3)
- Bit (Tier 4)

---

## 🔄 Revision Notes

### **Key Changes from v1.0:**

1. **Added Tier 1** for legacy/foundation technologies
2. **Rebalanced criteria** to better reflect current landscape
3. **Added backend infrastructure** considerations
4. **Included migration paths** between tiers
5. **Expanded mobile coverage** with more nuanced options
6. **Added missing categories** (BaaS, CMS, Desktop)

### **Next Steps:**

1. Validate tier assignments with real-world usage data
2. Add specific version requirements and compatibility matrices
3. Create decision trees for tier selection
4. Add cost analysis for each tier
5. Include team size and skill level recommendations

---

## Revision History

| Version | Date       | Description                   | Author |
| ------- | ---------- | ----------------------------- | ------ |
| 2.0.0   | 2025-09-13 | Complete tier system revision | Lloyd  |
| 1.0.0   | 2025-09-13 | Original tier system          | Lloyd  |
