---
title: Tier 3 Tech Stack Reference Sheet
version: 1.0.0
date: 2025‑09‑13
status: FINAL
authors:
  - name: lloyd
classification: INTERNAL
tags: [tier3, standard, reference, stack, architecture, web, mobile]
---

# Tier 3 Tech Stack (Standard / Mainstream)

This document defines a reference guide for **Tier 3 (T3)** architectural stacks under the Lloyd framework. These stacks reflect **mature**, widely adopted technologies ideal for teams needing **stability**, **maintainability**, and **ecosystem support**.

---

## 🌐 Tier 3 — Web Architectures

### 1. React + Vite + Express API

- **Use Case**: SPAs, dashboards, portals
- **Rendering**: Client-side rendering (CSR)
- **API**: REST (Express.js)
- **ORM**: Prisma / Sequelize / TypeORM
- **State**: Redux / Zustand / Context API
- **Styling**: SCSS, Tailwind, Material UI
- **Deployment**: Docker, Railway, Heroku, VPS

### 2. Vue 3 + Vite + Node.js REST API

- **Use Case**: Admin panels, internal tools
- **Rendering**: CSR
- **API**: REST or GraphQL
- **State**: Pinia / Vuex
- **Styling**: Vuetify, Tailwind, BootstrapVue
- **Deployment**: Render, Railway, traditional servers

### 3. Angular + NestJS

- **Use Case**: Enterprise-scale internal apps
- **Rendering**: CSR + optional SSR (Angular Universal)
- **API**: REST + OpenAPI support (NestJS)
- **State**: NgRx / RxJS
- **Styling**: Angular Material, SCSS
- **Deployment**: Docker, Kubernetes, VPS, enterprise infra

---

## 📱 Tier 3 — Mobile Architectures

### 1. React Native CLI + Express Backend

- **Use Case**: Standard mobile apps
- **API**: REST or GraphQL
- **State**: Redux, Zustand
- **UI Kit**: React Native Paper, NativeBase
- **Deployment**: Fastlane + App Store / Play Store

### 2. Ionic + Angular

- **Use Case**: Hybrid apps (web + native)
- **UI**: Angular + Ionic components
- **State**: NgRx / services
- **Deployment**: Capacitor → App Stores or Web

### 3. Native Android (Kotlin) + Firebase

- **Use Case**: Platform-first native apps
- **Backend**: Firebase (Firestore, Auth, Functions)
- **State**: ViewModel + LiveData
- **Deployment**: Google Play Store

---

## ✅ Why Choose Tier 3?

- 🏗 **Mature Ecosystem**: Long-standing community and tool support
- 📦 **Broad Talent Pool**: Easy to hire and scale dev teams
- ⚙️ **Standard DevOps**: Supports Docker, CI/CD, VPS hosting
- 🔁 **Incrementally Upgradeable**: Easy to modernize or refactor

---

## 📌 When to Use Tier 3

Use T3 when:

- You're building **internal tools** or **admin UIs**
- You want to avoid bleeding-edge tech debt
- The **performance profile** doesn’t demand edge/SSR
- You need **predictable deployments** and **stable libraries**

---

## Revision History

| Version | Date       | Description                    | Author |
| ------- | ---------- | ------------------------------ | ------ |
| 1.0.0   | 2025‑09‑13 | Initial Tier 3 reference sheet | Lloyd  |
