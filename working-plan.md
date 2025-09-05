# Collapsible Icon Sidebar Plan

Adjusted for current structure with landing page and `/app` route group.

## 1. Install and Setup

- Run: `npx shadcn@latest add sidebar`
- Add required CSS variables to globals.css
- Install icons: `npm install lucide-react` (if not already installed)

## 2. Current Route Structure

```
src/app/
├── page.tsx              # Landing page (no sidebar)
├── layout.tsx           # Root layout (no sidebar)
└── (app)/               # Route group for authenticated pages
    ├── layout.tsx       # App layout WITH sidebar
    ├── loading.tsx      # Loading for app pages
    ├── dashboard/       # Former home page
    ├── settings/
    ├── prompts/
    ├── git-commands/
    └── nextjs-setup/
```

## 3. Sidebar Structure

```
SidebarProvider (wraps (app) layout only)
└── Sidebar (collapsible)
    └── SidebarContent
        └── SidebarGroup
            └── SidebarMenu
                ├── Dashboard (Home icon)
                ├── Next.js Setup (Settings icon)
                ├── Git Commands (GitBranch icon)
                ├── Settings (Cog icon)
                └── Prompts (MessageSquare icon)
```

## 4. Implementation Steps

- Create `src/app/(app)/layout.tsx` with SidebarProvider
- Sidebar only appears in `/app/*` routes, NOT on landing page
- Create sidebar navigation with icon + text for expanded state
- Icons only for collapsed state
- Use Next.js Link components for navigation
- Configure collapsible behavior with icon-only mode

## 5. Icon Mapping & Routes

- Dashboard: `Home` icon → `/dashboard`
- Next.js Setup: `Settings` icon → `/nextjs-setup`
- Git Commands: `GitBranch` icon → `/git-commands`
- Settings: `Cog` icon → `/settings`
- Prompts: `MessageSquare` icon → `/prompts`

## 6. Update Pages

- Fix navigation links in dashboard page (currently broken)
- Remove navigation cards from dashboard page eventually
- Focus each page on its actual content
- Sidebar becomes primary navigation for app section

Result: Landing page stays clean, authenticated app section gets collapsible sidebar with icons.
