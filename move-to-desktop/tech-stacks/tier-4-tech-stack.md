---
title: Tier 4 Tech Stack Overview
version: 1.0.0
date: 2025‑09‑13
status: FINAL
authors:
  - name: lloyd
classification: INTERNAL
tags: [tier4, modern, architecture, web, mobile, stack]
---

# Tier 4 Tech Stack (Modern / Production-Ready)

This document outlines **Tier 4 (T4)** architectures for **web** and **mobile** applications following the Lloyd framework. These stacks are designed for production-readiness, a balance of performance and developer experience, and modern deployment practices.

---

## 🌐 Tier 4 — Web Architectures

### 1. Astro + React Islands + Tailwind

- **Use Case**: Content-heavy sites (docs, blogs, marketing)
- **Rendering**: SSG + Partial Hydration (Islands)
- **Styling**: Tailwind
- **Routing**: File-based (Astro Pages)
- **Data**: Markdown, CMS, or REST API
- **Deployment**: Vercel, Netlify

### 2. Next.js Pages Router + REST API

- **Use Case**: Admin panels, dashboards, light SPAs
- **Rendering**: SSR/SSG/ISR (selective)
- **API**: REST via `/api` routes
- **ORM**: Prisma or TypeORM
- **Styling**: Tailwind or Styled Components
- **Deployment**: Vercel

### 3. Nuxt 3 + Pinia + REST

- **Use Case**: Vue-centric business apps
- **Rendering**: SSR + Static + SPA
- **State**: Pinia
- **API**: REST/GraphQL
- **Styling**: Tailwind or WindiCSS
- **Deployment**: Netlify, Cloudflare

---

## 📱 Tier 4 — Mobile Architectures

### 1. Expo (React Native) + REST

- **Use Case**: General mobile apps
- **State**: Zustand or Context
- **API**: REST or GraphQL (Apollo)
- **UI Kit**: NativeBase / Tamagui / custom
- **Deployment**: EAS Build + App Store/Play Store

### 2. Flutter + Firebase

- **Use Case**: MVPs, startups, multi-platform UIs
- **Backend**: Firebase Auth, Firestore, Cloud Functions
- **State**: Riverpod or Bloc
- **Deployment**: Play Store, App Store

### 3. Capacitor + Vue (Quasar/Nuxt)

- **Use Case**: Hybrid apps with web+native UI
- **UI**: Vue + Quasar
- **API**: REST or local storage
- **Native Access**: Capacitor plugins
- **Deployment**: iOS/Android and PWA from one codebase

---

## Summary

Tier 4 stacks provide the best of both **modern DX** and **production-readiness**, ideal for teams that want performance, maintainability, and mainstream support.

These are ideal for:

- SaaS dashboards
- B2C mobile apps
- CMS-powered marketing sites
- MVPs with mobile-first UX

---

## Revision History

| Version | Date       | Description               | Author |
| ------- | ---------- | ------------------------- | ------ |
| 1.0.0   | 2025‑09‑13 | Initial stack definitions | Lloyd  |
