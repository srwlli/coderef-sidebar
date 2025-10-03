# Sidebar App

**[Project Name]**: Sidebar App - Multi-Purpose Application Dashboard
**[Date]**: 2025-09-20
**[Version]**: 0.1.0
**[Maintainer]**: sidebar-app-team

## Overview

Sidebar App is a modern Next.js 15.5 application built with React 19, featuring a modular architecture for creating dynamic dashboards with authentication support and productivity tooling. The application leverages Supabase for backend services and focuses on unified project and workflow management experiences.

### Key Features

- **Authentication System**: Secure user authentication with Supabase
- **Consistent Header System**: Unified header pattern across all pages with contextual stats and action areas
- **Modular Dashboard**: Extensible dashboard with multiple tool integrations
- **AI Tools Integration**: Built-in AI tools for productivity with organized navigation
- **Project Management**: Comprehensive project tracking capabilities with count displays
- **Git Commands Helper**: Integrated git command assistance
- **Future-Ready Design**: Headers designed to accommodate additional tools and functionality
- **Dark Theme Support**: Next-themes integration for appearance customization

## Prerequisites

Before installation, ensure you have:

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- Supabase account with project credentials
- Git for version control

## Quickstart

### Installation

1. Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd sidebar-app
npm install
```

**Sample Output:**

```
added 842 packages, and audited 843 packages in 32s
found 0 vulnerabilities
```

2. Configure environment variables:

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

3. Start the development server:

```bash
npm run dev
```

**Sample Output:**

```
▲ Next.js 15.5.2 (Turbo)
- Local: http://localhost:3002
- Ready in 1.2s
```

## Usage Examples

### Running the Application

**Development Mode:**

```bash
npm run dev
# Opens at http://localhost:3002 with Turbopack enabled
```

**Production Build:**

```bash
npm run build
npm start
```

### Common Commands

| Command           | Description                | Output Example                   |
| ----------------- | -------------------------- | -------------------------------- |
| `npm run lint`    | Run ESLint checks          | `✔ No ESLint errors found`      |
| `npm run build`   | Build for production       | `✓ Compiled successfully`        |
| `npm run dev`     | Start development server   | `Ready on http://localhost:3002` |
| `npm run prepare` | Setup git hooks with Husky | `husky - Git hooks installed`    |

## Project Structure

```
sidebar-app/
├── src/
│   ├── app/             # Next.js app directory
│   │   ├── (app)/       # Authenticated routes with consistent headers
│   │   │   ├── dashboard/     # Main dashboard with header stats
│   │   │   ├── ai-tools/      # AI tools with tool count badges
│   │   │   │   └── prompts/   # Prompt chains with chain count
│   │   │   ├── projects/      # Projects with dynamic count display
│   │   │   ├── forms/         # Forms with status indicators
│   │   │   └── settings/      # User preferences
│   │   └── auth/        # Authentication pages
│   ├── components/      # Shared components
│   │   ├── layout/      # Header system with Badge integration
│   │   ├── projects/    # Project components with count displays
│   │   └── ui/          # UI components including Badge
│   └── lib/            # Utility functions
├── packages/
├── public/             # Static assets
└── .next/              # Build output
```

## Troubleshooting

### Common Issues and Resolutions

**Issue: Supabase connection fails**

```bash
Error: Invalid Supabase credentials
```

**Resolution Decision Tree:**

1. Check `.env.local` exists → If no, copy from `.env.example`
2. Verify `NEXT_PUBLIC_SUPABASE_URL` is set → Update with your project URL
3. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set → Update with your anon key
4. Restart the development server → `npm run dev`

**Issue: Port 3002 already in use**

```bash
Error: Port 3002 is already in use
```

**Resolution:**

```bash
# Option 1: Kill the process using port 3002
lsof -i :3002
kill -9 <PID>

# Option 2: Use a different port
next dev --turbopack -p 3003
```

## Dependencies

### Core Technologies

- **Next.js 15.5.2**: React framework with Turbopack support
- **React 19.1.0**: UI library
- **TypeScript 5.x**: Type-safe development
- **Tailwind CSS 4.x**: Utility-first CSS framework

### Key Libraries

- **Supabase**: Backend as a Service (Auth, Database, Storage)
- **React Query**: Data fetching and caching
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **Zustand**: State management
- **Framer Motion**: Animation library

### Development Tools

- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **lint-staged**: Pre-commit linting

## Configuration Files

| File                 | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `next.config.ts`     | Next.js configuration with security headers |
| `tsconfig.json`      | TypeScript compiler options                 |
| `tailwind.config.js` | Tailwind CSS customization                  |
| `eslint.config.mjs`  | ESLint rules configuration                  |
| `components.json`    | Component library configuration             |

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test thoroughly
3. Run linting and build: `npm run lint && npm run build`
4. Commit changes: `git commit -m "feat: add your feature"`
5. Push and create pull request

---

## AI-Focused Footer

This README was generated using the POWER framework for comprehensive project documentation. The structure follows discovery patterns optimized for both human developers and AI assistants, providing clear command sequences, decision trees, and troubleshooting patterns for efficient project onboarding and maintenance.

**Framework**: POWER
**Purpose**: Discovery entry document
**Generated**: 2025-09-20
**Store As**: readme_summary
