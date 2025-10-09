# ARCHITECTURE

**Date:** 2025-10-08
**Version:** 0.1.0
**Framework:** Next.js 15.5.2

---

## Overview

sidebar-app is a Next.js 15 personal productivity dashboard designed as a single-developer tool. The architecture leverages modern React patterns with server components, app router, and client-side state management to create a fast, type-safe, and maintainable application.

## System Topology

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                            │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    React 19 UI Layer                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │ │
│  │  │  Dashboard   │  │  AI Tools    │  │  Git Commands    │  │ │
│  │  │   Pages      │  │   Pages      │  │    Pages         │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │         Shared Components (shadcn/ui + Custom)         │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   State Management Layer                    │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │ │
│  │  │   Zustand    │  │  TanStack    │  │  React Context   │  │ │
│  │  │   Stores     │  │   Query      │  │   (Auth/Theme)   │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    PWA Service Worker                       │ │
│  │         (Offline Support, Cache Management)                 │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NEXT.JS 15 SERVER                           │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    App Router (RSC)                         │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │ │
│  │  │   Layouts    │  │   Pages      │  │   Middleware     │  │ │
│  │  │  (Nested)    │  │  (Routes)    │  │  (Auth Guard)    │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    API Routes (Future)                      │ │
│  │         Currently: Direct Client → Supabase                 │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ REST API
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         SUPABASE                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ PostgreSQL   │  │    Auth      │  │     Realtime         │  │
│  │   Database   │  │   Service    │  │   (WebSocket)        │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Architecture Layers

### 1. Presentation Layer (Client)

**Location:** `src/app/`, `src/components/`

The UI layer is built with React 19 and follows the server component pattern where possible:

- **Server Components:** Default rendering strategy for static content and layouts
- **Client Components:** Interactive features marked with `'use client'` directive
- **Routing:** Next.js App Router with file-based routing and nested layouts
- **Styling:** Tailwind CSS 4 with utility-first approach

**Key Patterns:**

- Component composition using shadcn/ui primitives
- Responsive design with mobile-first approach (PWA optimized)
- Server-side rendering for initial page loads
- Client-side navigation for instant page transitions

### 2. State Management Layer

**Location:** `src/stores/`, `src/providers/`, `src/lib/auth-context.tsx`

Multi-layered state management strategy:

#### Zustand Store (`use-app-store.ts`)

```typescript
// Global client state with localStorage persistence
- View preferences (grid/list)
- Sidebar state (open/collapsed)
- Custom dashboard cards
- Copy button tracking (session-only)
```

**Persistence Strategy:**

- Version-based migrations (current: v1)
- Selective persistence (excludes session state)
- localStorage key: `app-storage`

#### TanStack Query (`QueryProvider.tsx`)

```typescript
// Server state management (future API integration)
- 5-minute stale time
- 3 retry attempts
- Automatic refetch on window focus
```

#### React Context

- **AuthContext:** User authentication state and methods
- **ThemeProvider:** Dark/light mode with system preference

### 3. Business Logic Layer

**Location:** `src/lib/`, `src/hooks/`

#### Libraries (`src/lib/`)

- **card-actions.ts:** Card action definitions and handlers
- **icon-utils.ts:** Lucide icon component resolution
- **auth-context.tsx:** Authentication logic wrapper
- **supabase.ts:** Supabase client configuration

#### Custom Hooks (`src/hooks/`)

- **use-view-preference.ts:** Grid/list view toggle
- **use-long-press.ts:** Touch gesture handling
- **use-mobile.ts:** Mobile viewport detection

### 4. Data Layer

**Location:** `src/lib/supabase.ts`, Supabase Cloud

#### Supabase Integration

```typescript
// Client configuration
- Auto refresh tokens
- Persistent sessions
- Session URL detection
- Realtime events (10/second throttle)
```

**Current Schema:**

- Users table (via Supabase Auth)
- Custom cards (future: migrate from localStorage to Supabase)

**Data Flow:**

1. Client authenticates via Supabase Auth
2. Session stored in browser
3. Protected routes check auth state
4. Custom cards stored in localStorage (Zustand)
5. Future: Sync custom cards to Supabase database

## Technology Stack

### Core Framework

| Technology | Version | Purpose                              |
| ---------- | ------- | ------------------------------------ |
| Next.js    | 15.5.2  | React framework with app router      |
| React      | 19.1.0  | UI library with concurrent features  |
| TypeScript | 5.x     | Type safety and developer experience |

### UI & Styling

| Technology    | Version | Purpose                           |
| ------------- | ------- | --------------------------------- |
| Tailwind CSS  | 4.x     | Utility-first CSS framework       |
| shadcn/ui     | Latest  | Radix UI primitives with Tailwind |
| Framer Motion | 12.x    | Animation library                 |
| Lucide React  | Latest  | Icon library                      |
| next-themes   | 0.4.6   | Dark mode support                 |

### State & Data

| Technology      | Version | Purpose                      |
| --------------- | ------- | ---------------------------- |
| Zustand         | 5.0.8   | Lightweight state management |
| TanStack Query  | 5.86.0  | Server state management      |
| React Hook Form | 7.62.0  | Form handling                |
| Zod             | 4.1.5   | Schema validation            |

### Backend & Services

| Technology | Version | Purpose                     |
| ---------- | ------- | --------------------------- |
| Supabase   | Latest  | Authentication and database |
| next-pwa   | 5.6.0   | Progressive Web App support |

### Development Tools

| Technology  | Version | Purpose            |
| ----------- | ------- | ------------------ |
| ESLint      | 9.x     | Code linting       |
| Prettier    | 3.6.2   | Code formatting    |
| Husky       | 9.1.7   | Git hooks          |
| lint-staged | 16.1.6  | Pre-commit linting |

## Design Decisions

### 1. Server vs Client Components

**Decision:** Default to server components, use client components only when necessary

**Rationale:**

- Reduced JavaScript bundle size
- Faster initial page loads
- Better SEO (though not a priority for personal tool)
- Clear separation between static and interactive content

**Client Component Triggers:**

- Event handlers (onClick, onSubmit)
- Browser APIs (localStorage, navigator)
- React hooks (useState, useEffect)
- Context consumers

### 2. Zustand for Global State

**Decision:** Use Zustand instead of Redux or other state libraries

**Rationale:**

- Minimal boilerplate
- TypeScript-first API
- Built-in persistence middleware
- No provider wrapping required
- Perfect for single-user app scale

### 3. Direct Supabase Client Calls

**Decision:** Client directly calls Supabase API (no Next.js API routes)

**Rationale:**

- Simplified architecture for single-user app
- Supabase RLS provides security
- Reduced latency (no proxy hop)
- Easier to maintain
- Can migrate to API routes later if needed

### 4. File-Based Routing

**Decision:** Use Next.js App Router (app directory)

**Rationale:**

- Server components by default
- Nested layouts reduce duplication
- Loading/error states co-located
- Route groups for organization
- Future-proof (recommended by Next.js)

### 5. PWA Configuration

**Decision:** Enable PWA with service worker caching

**Rationale:**

- Installable desktop/mobile app
- Offline support for static assets
- Network-first strategy for Supabase
- Better mobile UX
- No app store dependencies

### 6. Security Headers

**Decision:** Strict security headers in `next.config.ts`

**Rationale:**

- MIME type protection (X-Content-Type-Options)
- Referrer policy control
- HTTPS enforcement (HSTS)
- CSP to prevent XSS
- Permissions policy to disable unused features

## Data Flow

### Authentication Flow

```
1. User visits app
   ↓
2. Middleware checks auth (currently disabled, using client-side)
   ↓
3. Layout checks AuthContext.user
   ↓
4. If not authenticated → redirect to /auth
   ↓
5. User signs in via Supabase Auth
   ↓
6. Session stored in browser
   ↓
7. AuthContext updates → re-render protected routes
   ↓
8. User accesses dashboard
```

### Custom Card Management Flow

```
1. User clicks "Add Card" button
   ↓
2. CardFormModal opens (client component)
   ↓
3. Form validates with Zod schema
   ↓
4. Submit → useAppStore.addCustomCard()
   ↓
5. Zustand updates state + localStorage
   ↓
6. Dashboard re-renders with new card
   ↓
7. Long-press card → ActionModal
   ↓
8. Edit/Delete actions → update/delete in store
```

### View Preference Flow

```
1. User clicks ViewToggle (Grid/List icon)
   ↓
2. useViewPreference hook updates Zustand
   ↓
3. Store persists to localStorage
   ↓
4. Dashboard page re-renders with new view
   ↓
5. Cards render as grid or list layout
```

## Module Boundaries

### `/app` - Routing & Pages

- **Responsibility:** Route definitions, page components, layouts
- **Dependencies:** Components, hooks, stores
- **Exports:** Page components (default exports)

### `/components` - UI Components

- **Responsibility:** Reusable UI components, both server and client
- **Dependencies:** UI library (Radix), Tailwind, icons
- **Exports:** Named component exports

Subdirectories:

- `ui/` - shadcn/ui primitives
- `cards/` - Card components
- `dashboard/` - Dashboard-specific components
- `navigation/` - Navigation components
- `auth/` - Authentication forms
- `modals/` - Modal dialogs
- `buttons/` - Button components
- `inputs/` - Input components
- `collapsibles/` - Collapsible containers
- `skeletons/` - Loading skeletons
- `layout/` - Layout components
- `debug/` - Debug utilities

### `/stores` - State Management

- **Responsibility:** Zustand stores for global state
- **Dependencies:** Zustand, uuid
- **Exports:** Store hooks and types

### `/lib` - Business Logic

- **Responsibility:** Utility functions, API clients, helpers
- **Dependencies:** External services (Supabase), utilities
- **Exports:** Functions and configured clients

### `/hooks` - Custom Hooks

- **Responsibility:** Reusable React hooks
- **Dependencies:** React, stores
- **Exports:** Custom hook functions

### `/types` - TypeScript Types

- **Responsibility:** Type definitions and interfaces
- **Dependencies:** None
- **Exports:** Type definitions

### `/providers` - Context Providers

- **Responsibility:** React context provider components
- **Dependencies:** React, TanStack Query
- **Exports:** Provider components

## Security Considerations

### Authentication

- Supabase Auth handles session management
- Auto-refresh tokens prevent session expiry
- Persistent sessions across browser restarts
- Client-side auth checks in layout components

### Authorization

- Single-user application (no complex permissions)
- Row-level security (RLS) in Supabase (future)
- Client validates ownership (future multi-user)

### Data Protection

- HTTPS enforcement via HSTS
- CSP prevents XSS attacks
- No sensitive data in localStorage (only preferences)
- Supabase credentials in environment variables

### PWA Security

- Service worker limited to caching
- No sensitive data cached
- Network-first for API calls
- Offline fallback for static assets only

## Performance Optimizations

### Build Time

- Turbopack for faster builds
- Incremental TypeScript compilation
- Code splitting by route

### Runtime

- Server components reduce client JS
- Image optimization (Next.js Image)
- Font optimization (next/font)
- Dynamic imports for modals

### Caching

- Service worker caches static assets
- TanStack Query caches server data (5min stale time)
- Supabase CDN for auth assets
- Browser cache with appropriate headers

### Bundle Size

- Tree shaking for unused Lucide icons
- Minimal dependencies
- No heavy libraries (jQuery, Lodash, etc.)
- Tailwind purges unused CSS

## Deployment Architecture

### Development

```
Local Machine (Windows)
  ↓
Next.js Dev Server (port 3010)
  ↓
Hot Module Replacement
  ↓
Browser (localhost:3010)
```

### Production

```
Vercel Platform
  ↓
Edge Network (Global CDN)
  ↓
Next.js Production Build
  ↓
User Browser + PWA
```

**Future Considerations:**

- Database migrations via Supabase CLI
- Environment variable management per environment
- Preview deployments for testing
- Analytics integration (privacy-focused)

## Scalability Considerations

As a single-user application, scalability is not a primary concern. However, the architecture supports future enhancements:

### Current Limits

- Single user (no multi-tenancy)
- localStorage limit (~5-10MB)
- No real-time collaboration
- Client-side only state

### Future Enhancements

- Migrate custom cards to Supabase database
- Real-time sync across devices
- Server-side rendering for dynamic content
- API routes for complex operations
- Database indexing for performance

---

## AI Development Context

This architecture is designed for AI-assisted development with the following principles:

### Type Safety First

- Strict TypeScript mode enabled
- Zod schemas for runtime validation
- Explicit type exports from all modules

### Clear Separation of Concerns

- Server components in `/app`
- Client components marked explicitly
- Business logic in `/lib`
- State in `/stores`

### Convention Over Configuration

- File-based routing
- Import aliases (`@/*`)
- Consistent naming patterns
- Predictable folder structure

### Development Workflow

```
1. Identify component needs → Check shadcn/ui first
2. Need global state → Use Zustand store
3. Need server data → Use TanStack Query
4. Need form → Use React Hook Form + Zod
5. Need styling → Use Tailwind utilities
```

**Key Patterns to Follow:**

- Server components by default
- Client components only when needed
- Zustand for client state
- Context for cross-cutting concerns
- Direct Supabase calls (no API routes yet)

---

**🤖 Generated with AI assistance using the docs-mcp POWER framework template**

**Last Updated:** 2025-10-08
**Architecture Version:** 0.1.0
**Next Review:** When adding new major features or architectural changes
