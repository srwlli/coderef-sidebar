# System Architecture

**[Date]**: 2025-09-20
**[Version]**: 0.1.0

## Overview

The Sidebar App architecture implements a modern, modular design pattern based on the project overview from `{{readme_summary}}`. This document provides a comprehensive view of the system topology, module boundaries, technology stack decisions, and data flow patterns that enable the multi-purpose dashboard functionality.

## System Topology

```
┌─────────────────────────────────────────────────────────────────┐
│                          Browser Layer                          │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 15.5 App Router (React 19.1)                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │   Auth Routes   │ │  Public Routes  │ │  Protected (app)│   │
│  │   /auth/*       │ │      /          │ │     /(app)/*    │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                      Provider Layer                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │  AuthProvider   │ │ QueryProvider   │ │ ThemeProvider   │   │
│  │   (Supabase)    │ │ (TanStack Query)│ │ (next-themes)   │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                      Component Layer                            │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │  Layout System  │ │  Core Features  │ │  Workflow Tools │   │
│  │ Header/Sidebar  │ │ AI/Git/Projects │ │  (Package)      │   │
│  │ Badge System    │ │ Count Displays  │ │                 │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                       Service Layer                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │   Supabase      │ │  State Mgmt     │ │  Form Handling  │   │
│  │ Auth/DB/Storage │ │ Zustand/Context │ │ React Hook Form │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Module Boundaries

### 1. Core Application (`src/app/`)

```
src/app/
├── layout.tsx              # Root layout with providers
├── page.tsx               # Landing/redirect logic
├── globals.css            # Global styles
├── auth/                  # Authentication pages
│   ├── page.tsx          # Auth form container
│   └── components/       # Auth-specific components
└── (app)/                # Protected route group
    ├── layout.tsx        # Authenticated layout with sidebar
    ├── dashboard/        # Main dashboard
    ├── projects/        # Project portfolio
    ├── ai-tools/        # AI utilities
    ├── git-commands/    # Git helpers
    ├── forms/           # Form playground
    ├── tech-stacks/     # Technology documentation
    └── settings/        # User preferences
```

**Boundary Rules:**

- **Route Isolation**: Each feature module is self-contained within its directory
- **Layout Hierarchy**: Root → Auth → Protected layouts provide cascading context
- **Access Control**: `(app)` group enforces authentication boundary

### 2. Shared Infrastructure (`src/`)

```
src/
├── components/               # Reusable UI components
│   ├── auth/                # Authentication forms
│   ├── layout/              # Layout components (Header, Sidebar)
│   ├── ui/                  # UI primitives (Badge, Button, Card)
│   ├── projects/            # Project components with count displays
│   ├── forms/               # Form utilities
│   ├── buttons/             # Button variants
│   ├── cards/               # Card components
│   └── modals/              # Modal dialogs
├── lib/                     # Core utilities
│   ├── auth-context.tsx     # Authentication state
│   ├── supabase.ts          # Database client
│   └── utils.ts             # Helper functions
├── providers/               # React context providers
│   └── QueryProvider.tsx    # TanStack Query setup
├── hooks/                   # Custom React hooks
├── types/                   # Global type definitions
└── styles/                  # Shared styling
```

## Technology Stack Decisions

### Frontend Architecture

| Technology       | Version | Rationale                                                                            |
| ---------------- | ------- | ------------------------------------------------------------------------------------ |
| **Next.js**      | 15.5.2  | App Router for file-based routing, Turbopack for fast builds, built-in optimizations |
| **React**        | 19.1.0  | Latest stable with concurrent features, server components support                    |
| **TypeScript**   | 5.x     | Type safety, better developer experience, compile-time error detection               |
| **Tailwind CSS** | 4.x     | Utility-first styling, excellent tree-shaking, design system consistency             |

**Design Rationale:**

- **Performance**: Turbopack reduces build times by 700% compared to Webpack
- **Developer Experience**: App Router simplifies routing, layouts, and data fetching
- **Type Safety**: Full TypeScript coverage prevents runtime errors
- **Styling Efficiency**: Tailwind's utility classes enable rapid UI development

### State Management Strategy

| Layer               | Technology      | Use Case                                                 |
| ------------------- | --------------- | -------------------------------------------------------- |
| **Server State**    | TanStack Query  | API data caching, background updates, optimistic updates |
| **Global State**    | Zustand         | Cross-component state (themes, user preferences)         |
| **Component State** | React Context   | Feature-specific state (auth, form data)                 |
| **Form State**      | React Hook Form | Form validation, field management, submission handling   |

**Design Rationale:**

- **Separation of Concerns**: Different state types use appropriate tools
- **Performance**: TanStack Query eliminates unnecessary re-fetches
- **Simplicity**: Zustand provides minimal boilerplate for global state
- **Form Optimization**: React Hook Form reduces re-renders during form interaction

### Backend Integration

| Service            | Technology            | Rationale                                                 |
| ------------------ | --------------------- | --------------------------------------------------------- |
| **Authentication** | Supabase Auth         | Built-in OAuth, email/password, session management        |
| **Database**       | PostgreSQL (Supabase) | ACID compliance, complex queries, real-time subscriptions |
| **Storage**        | Supabase Storage      | Integrated file uploads, CDN distribution                 |
| **API**            | Supabase Client       | Type-safe database queries, real-time updates             |

**Design Rationale:**

- **Rapid Development**: Supabase provides full backend without infrastructure management
- **Type Safety**: Auto-generated TypeScript types from database schema
- **Real-time Features**: Built-in subscriptions for collaborative features
- **Security**: Row-level security policies at database level

## Data Flow Patterns

### Authentication Flow

```
User Input → AuthProvider → Supabase Auth → Session State → Route Protection
     ↓              ↓              ↓              ↓              ↓
Login Form → signIn() → JWT Token → useAuth Hook → Layout Guard
```

**Flow Explanation:**

1. **User Input**: Credentials entered in auth form
2. **AuthProvider**: Manages authentication state and methods
3. **Supabase Auth**: Handles credential verification and session creation
4. **Session State**: User state stored in React context
5. **Route Protection**: Layout components check auth state before rendering

### Form Processing Pipeline

```
User Input → Validation → Processing → Persistence → Feedback
     ↓           ↓           ↓           ↓           ↓
Form Data → Zod Schema → Transform → Supabase → Toast/Redirect
```

**Validation Strategy:**

- **Client-side**: Zod schemas for immediate feedback
- **Type Safety**: Generated TypeScript types from schemas
- **Server-side**: Database constraints and RLS policies
- **Error Handling**: Centralized error boundaries and toast notifications

### Component Communication Patterns

1. **Parent-Child**: Props and callbacks for direct relationships
2. **Sibling Components**: Shared state via nearest common ancestor
3. **Cross-Feature**: Context providers for global state
4. **External Integrations**: Dependency injection pattern for optional feature packages
5. **Header System**: Consistent layout pattern with Badge integration for contextual information

### Header Architecture Pattern

```typescript
// Consistent header structure across all pages
<div className="flex items-center justify-between border-b p-4">
  <div className="flex items-center gap-3">
    <Icon className="h-6 w-6" />
    <h1 className="text-2xl font-bold">Page Title</h1>
    <Badge variant="outline">contextual stats</Badge>
  </div>
  <div className="flex items-center gap-2">
    {/* Action buttons and future tools */}
  </div>
</div>
```

**Design Benefits:**

- **Visual Consistency**: Uniform layout across all major pages
- **Contextual Information**: Dynamic stats provide immediate page context
- **Extensibility**: Action area reserved for future functionality
- **Responsive Design**: Flex layouts adapt to different screen sizes

### Security Architecture

```
Browser Security Headers → Route Guards → RLS Policies → Data Validation
         ↓                     ↓              ↓              ↓
next.config.ts → Layout Auth → Supabase → Zod Schemas
```

**Security Layers:**

- **Transport**: HTTPS enforcement, security headers
- **Authentication**: JWT tokens, session management
- **Authorization**: Row-level security in database
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Content Security Policy, input sanitization

## Performance Optimizations

### Build Optimization

- **Turbopack**: 700% faster builds compared to Webpack
- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js automatic image optimization

### Runtime Optimization

- **React Query**: Intelligent caching and background updates
- **Memoization**: Strategic use of useMemo and useCallback
- **Lazy Loading**: Route-based code splitting
- **Bundle Analysis**: Regular bundle size monitoring

### Database Optimization

- **Indexing**: Strategic database indexes for query performance
- **Connection Pooling**: Supabase handles connection management
- **Real-time Subscriptions**: Efficient change detection
- **Pagination**: Server-side pagination for large datasets

## Deployment Strategy

### Development Environment

```bash
npm run dev           # Local development with Turbopack
npm run lint          # Code quality checks
npm run typecheck     # TypeScript validation
npm run build         # Production build verification
```

### Production Pipeline

1. **Build**: Next.js production build with optimizations
2. **Testing**: Automated lint and type checking
3. **Security**: Dependency vulnerability scanning
4. **Deployment**: Static site generation where applicable

---

## AI-Focused Footer

This architecture document was generated using the POWER framework for comprehensive system design documentation. The structure follows enterprise architecture patterns optimized for both human developers and AI system analysis, providing clear module boundaries, dependency graphs, and rationale for design decisions to enable efficient system understanding and maintenance.

**Framework**: POWER
**Purpose**: System design reference
**Generated**: 2025-09-20
**Store As**: architecture_summary
