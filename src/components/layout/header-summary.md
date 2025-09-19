# Header Behavior Summary

## Overview

The Header component (`Header.tsx`) provides different behaviors based on the current page/route using Next.js navigation hooks.

## Current Header Behaviors

### 1. Default State (All pages except `/noted`)

- **Display**: Shows "coderef" branding (blue "code" + black/white "ref")
- **Navigation**: Only displays SidebarTrigger
- **Actions**: No tab controls or page-specific buttons

### 2. Noted Page (`/noted`)

- **Display**: Shows "noted" text in foreground color
- **Navigation**: SidebarTrigger + tab controls
- **Tab System**:
  - **Create Tab** (`?tab=create` or default)
    - Button: Plus icon + "Create Note" text
    - Variant: `default` (highlighted)
    - Action: Sets URL parameter to `tab=create`
  - **List Tab** (`?tab=list`)
    - Button: List icon + "My Notes" text
    - Variant: `default` (highlighted)
    - Action: Sets URL parameter to `tab=list`
- **Responsive**: Button text hidden on small screens (`hidden sm:inline`)

## Route Detection Logic

- Uses `usePathname()` to detect current route
- `isNotedPage = pathname === '/noted'`
- Uses `useSearchParams()` to read current tab
- Defaults to 'create' tab if no tab parameter exists

## Tab Management

- **State**: Controlled via URL search parameters
- **Persistence**: Tab state persists across page reloads
- **Navigation**: Uses `router.push()` to update URL with new tab parameter
- **Default**: Always defaults to 'create' tab on noted page

## Styling & Layout

- **Background**: Semi-transparent with backdrop blur effect
- **Position**: Sticky header (`sticky top-0 z-50`)
- **Height**: Fixed 12 units (`h-12`)
- **Border**: Bottom border for visual separation
- **Responsive**: Adapts button text visibility based on screen size

## Identified Gaps

### Notes View/Edit Page Behavior

- **Current**: No specific header behavior for individual note viewing/editing
- **Missing**:
  - Back navigation to notes list
  - Edit/Save mode indicators
  - Note-specific actions (delete, share, etc.)
  - Breadcrumb navigation showing note title

### Form Pages

- **Current**: Uses default coderef branding
- **Potential Enhancement**: Could show form-specific context or progress

### Settings Page

- **Current**: Uses default coderef branding
- **Status**: Appropriate as-is for settings context

## Technical Implementation

- **File**: `src/components/layout/Header.tsx`
- **Framework**: Next.js 15 with client-side navigation
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React (Plus, List icons)
- **State Management**: URL-based state via search parameters
