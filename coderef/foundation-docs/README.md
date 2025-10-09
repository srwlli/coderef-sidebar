# sidebar-app

**Version:** 0.1.0
**Date:** 2025-10-08
**Maintainer:** willh (Solo Developer)

## Overview

sidebar-app is a personal productivity dashboard built with Next.js 15, designed as a single-developer tool for managing and customizing personal workflows. It combines modern web technologies with a focus on technical excellence, developer experience, and feature completeness without business constraints.

This application enables the developer to:

- Customize personal dashboard with various productivity widgets
- Manage custom cards and layouts
- Integrate with external services (Google APIs, Supabase)
- Create a Progressive Web App (PWA) for desktop/mobile use
- Maintain full type safety with TypeScript throughout

## Prerequisites

- **Node.js**: 20.x or higher
- **npm**: 9.x or higher (comes with Node.js)
- **Supabase Account**: For authentication and database (optional for local dev)
- **Google Cloud Console**: For Google APIs integration (optional)

## Installation

### Quick Install

```bash
# Clone repository (if applicable)
cd "C:\Users\willh\Desktop\projects - current-location\sidebar-app"

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Expected output:

```
▲ Next.js 15.5.2
- Local:        http://localhost:3010
- Network:      http://0.0.0.0:3010

✓ Ready in 2.3s
```

### Manual Installation

1. **Navigate to project directory:**

   ```bash
   cd "C:\Users\willh\Desktop\projects - current-location\sidebar-app"
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create `.env.local` file:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run development server:**

   ```bash
   npm run dev
   ```

   Server runs on `http://localhost:3010` (custom port for multi-project development)

5. **Build for production (optional):**
   ```bash
   npm run build
   npm start
   ```

## Available Scripts

| Script    | Command           | Description                                               |
| --------- | ----------------- | --------------------------------------------------------- |
| `dev`     | `npm run dev`     | Start development server on port 3010 with network access |
| `build`   | `npm run build`   | Build production bundle with Turbopack                    |
| `start`   | `npm start`       | Start production server                                   |
| `lint`    | `npm run lint`    | Run ESLint on codebase                                    |
| `prepare` | `npm run prepare` | Install Husky git hooks                                   |

## Project Structure

```
sidebar-app/
├── src/
│   ├── app/              # Next.js 15 app router pages
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Library code and utilities
│   ├── providers/        # React context providers
│   ├── stores/           # Zustand state stores
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── middleware.ts     # Next.js middleware
├── public/               # Static assets
├── supabase/             # Supabase configuration
├── types/                # Global TypeScript types
├── .next/                # Next.js build output
├── node_modules/         # Dependencies
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
└── CLAUDE.md             # Project context for Claude Code
```

## Technology Stack

### Core Framework

- **Next.js 15.5.2** - React framework with app router, server components
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.x** - Full type safety

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Radix UI primitives with Tailwind
- **Framer Motion 12** - Animation library
- **Lucide React** - Icon library
- **next-themes** - Dark mode support

### State Management & Data

- **Zustand 5** - Lightweight state management
- **TanStack Query 5** - Server state management
- **React Hook Form 7** - Form handling
- **Zod 4** - Schema validation

### Backend & Services

- **Supabase** - Authentication and database
- **Google APIs** - External service integration
- **PWA** - Progressive Web App support (next-pwa)

### Development Tools

- **ESLint 9** - Code linting
- **Prettier 3** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

## Usage Examples

### Example 1: Running Development Server

```bash
npm run dev
```

Access at: `http://localhost:3010`

### Example 2: Building for Production

```bash
# Build with Turbopack
npm run build

# Start production server
npm start
```

### Example 3: Linting Code

```bash
# Run linter
npm run lint

# Auto-fix issues (if configured)
npm run lint -- --fix
```

## Troubleshooting

### Issue: Port 3010 already in use

**Error:** `Error: listen EADDRINUSE: address already in use :::3010`

**Resolution:**

1. Kill process using port 3010:

   ```bash
   # Windows
   netstat -ano | findstr :3010
   taskkill /PID <PID> /F

   # Or change port in package.json dev script
   ```

2. Or use alternative port:
   ```bash
   next dev -p 3011
   ```

### Issue: Module not found errors

**Error:** `Module not found: Can't resolve '@/components/...'`

**Resolution:**

1. Verify TypeScript path aliases in `tsconfig.json`:

   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. Restart development server:
   ```bash
   npm run dev
   ```

### Issue: Supabase connection errors

**Error:** `Failed to initialize Supabase client`

**Resolution:**

1. Check `.env.local` has correct Supabase credentials
2. Verify Supabase project is active
3. Check network connectivity to Supabase
4. Review Supabase project settings for API keys

### Issue: Build fails with TypeScript errors

**Error:** `Type error: ...`

**Resolution:**

1. Run TypeScript check:

   ```bash
   npx tsc --noEmit
   ```

2. Fix type errors in reported files
3. Clear build cache:
   ```bash
   rm -rf .next
   npm run build
   ```

### Issue: Husky hooks not running

**Error:** Git hooks not executing

**Resolution:**

1. Reinstall Husky:

   ```bash
   npm run prepare
   ```

2. Verify `.husky/` directory exists
3. Check git config:
   ```bash
   git config core.hooksPath
   ```

## Development Workflow

### Git Hooks (Husky + lint-staged)

- **Pre-commit**: Runs ESLint and Prettier on staged files
- **Commit-msg**: Validates commit message format (if configured)

### Code Quality Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended + Prettier integration
- **Prettier**: Tailwind CSS plugin for class sorting

### Development Philosophy

Per `CLAUDE.md` context:

**This is a single-developer personal tool**

- No business constraints or deadlines
- Focus on technical excellence over speed-to-market
- Freedom to experiment and refactor
- Optimize for developer happiness

**Priorities:**

- ✅ Clean architecture
- ✅ Type safety throughout
- ✅ Performance optimization
- ✅ Code maintainability

**NOT considered:**

- ❌ Multiple users
- ❌ Business timelines
- ❌ User onboarding
- ❌ Market positioning

## Environment Variables

Required environment variables in `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Google APIs (Optional)
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Development (Optional)
NEXT_PUBLIC_DEV_MODE=true
```

## Performance Optimization

### Build Optimization

- **Turbopack**: Fast build times with `--turbopack` flag
- **App Router**: Server components for reduced client JS
- **Code splitting**: Automatic route-based splitting

### Runtime Optimization

- **Server Components**: Default rendering strategy
- **Image Optimization**: Next.js Image component
- **Font Optimization**: next/font for web fonts

## Progressive Web App (PWA)

Configured with `next-pwa` for installable desktop/mobile app:

- **Offline support**: Service worker caching
- **Install prompt**: Add to home screen
- **App-like experience**: Fullscreen mode

## License

Personal project - not licensed for public use

---

**AI Integration Footer**

This Next.js application is designed for AI-assisted development. Key integration patterns:

- **Type-safe codebase**: Full TypeScript with strict mode
- **Component-driven**: Modular architecture for easy modifications
- **Well-documented**: Inline comments and type definitions
- **Testing-friendly**: Separation of concerns and pure functions

For AI assistants working on this project:

1. Review `CLAUDE.md` for project context and development philosophy
2. Maintain TypeScript type safety across all changes
3. Follow existing patterns in similar components
4. Use shadcn/ui components for UI consistency
5. Test changes with `npm run dev` before committing

**Decision Tree for Development:**

```
Need to add feature?
├─ UI Component: Check shadcn/ui components first
├─ State: Use Zustand for global, useState for local
├─ Data fetching: Use TanStack Query for server data
├─ Forms: Use React Hook Form + Zod validation
└─ Styling: Tailwind utility classes + CVA for variants
```

**🤖 This README was generated using the docs-mcp POWER framework template**

---

**Support:** Single-developer project - refer to inline code comments and TypeScript types for documentation.
