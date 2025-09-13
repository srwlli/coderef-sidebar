---
title: Flutter Full Stack Architecture (T5)
version: 1.0.0
date: 2025‑09‑13
status: FINAL
authors:
  - name: lloyd
classification: INTERNAL
tags: [flutter, mobile, full-stack, tier5, dart-frog, supabase, architecture]
---

# Flutter + Dart Frog + Supabase Full Stack Architecture (Tier 5 – Elite)

## Purpose

Defines a high-performance, type-safe architecture for building mobile apps using **Flutter**, **Dart Frog**, and **Supabase** — ideal for complex mobile UI and edge-compatible APIs.

---

## Stack Overview (Latest Versions as of September 2025)

| Layer               | Technology                                                                             | Version    | Docs / Source Links                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------- |
| UI Framework        | [Flutter](https://flutter.dev)                                                         | **3.22.1** | [Flutter Releases](https://docs.flutter.dev/release/whats-new)                                                |
| Language            | [Dart](https://dart.dev)                                                               | **3.4.0**  | [Dart Releases](https://dart.dev/guides/whats-new)                                                            |
| Backend Framework   | [Dart Frog](https://dartfrog.vgv.dev/)                                                 | **1.1.1**  | [Dart Frog GitHub](https://github.com/VeryGoodOpenSource/dart_frog/releases)                                  |
| Edge Storage & Auth | [Supabase](https://supabase.com)                                                       | N/A        | [Supabase Docs](https://supabase.com/docs)                                                                    |
| ORM / SQL Client    | [PostgREST](https://postgrest.org/) via Supabase                                       | N/A        | [PostgREST Docs](https://postgrest.org/en/stable/)                                                            |
| State Management    | [Riverpod](https://riverpod.dev/)                                                      | **3.0.0**  | [Riverpod Docs](https://riverpod.dev/docs/introduction)                                                       |
| Auth                | Supabase Auth / OAuth / JWT                                                            | N/A        | [Supabase Auth Docs](https://supabase.com/docs/guides/auth)                                                   |
| Validation          | Custom Dart Models / `freezed` + `json_serializable`                                   | Latest     | [freezed](https://pub.dev/packages/freezed) • [json_serializable](https://pub.dev/packages/json_serializable) |
| Testing             | [flutter_test](https://api.flutter.dev/flutter/flutter_test/flutter_test-library.html) | Built-in   | Built-in with Flutter SDK                                                                                     |
| E2E Testing         | [integration_test](https://docs.flutter.dev/testing/integration-tests)                 | Latest     | Official E2E solution                                                                                         |
| Deployment          | Play Store / App Store / Firebase / Supabase Functions                                 | N/A        | [Flutter Deployment Docs](https://docs.flutter.dev/deployment)                                                |

---

## Folder Structure Suggestion

```txt
/flutter-app
├── lib/
│   ├── main.dart             # App entry point
│   ├── features/             # Feature modules (screens, state, etc.)
│   ├── shared/               # Common UI components, helpers
│   ├── services/             # Supabase clients, auth, API
│   └── models/               # Data models and validation
├── test/                     # Unit + widget tests
├── integration_test/         # E2E tests
├── pubspec.yaml              # Dependencies and metadata
└── dart_frog/                # API server for local edge testing
```

---

## Key Advantages

- ✅ Full native performance (compiled) for Android & iOS
- ✅ Dart Frog enables local API dev in Dart (or deploy edge APIs)
- ✅ Supabase gives managed Postgres, Auth, and storage
- ✅ Riverpod ensures modular, reactive state mgmt
- ✅ Deep integration with testing, hot reload, CI/CD

---

## Compliance Tier

- **Lloyd Tier**: T5 (Elite)
- **Focus Areas**: Native UX, Edge-Ready APIs, Modular State, Type-Safety
- **Verified**: Latest stable releases (Flutter 3.22.1, Dart 3.4.0, Dart Frog 1.1.1)

---

## Against Lloyd T5 Spec Table

| Spec Requirement         | Meets? | Notes                               |
| ------------------------ | ------ | ----------------------------------- |
| Native Mobile Support    | ✅     | Compiled Android + iOS apps         |
| Edge API Support         | ✅     | Via Dart Frog or Supabase Functions |
| Type Safety + Validation | ✅     | Dart + Freezed + json_serializable  |
| ORM or DB Migrations     | ✅     | Supabase / PostgREST integration    |
| State Management         | ✅     | Riverpod modular pattern            |
| Testing Support          | ✅     | flutter_test + integration_test     |

---

## Revision History

| Version | Date       | Description                          | Author |
| ------- | ---------- | ------------------------------------ | ------ |
| 1.0.0   | 2025‑09‑13 | Initial Flutter T5 Architecture Spec | Lloyd  |
