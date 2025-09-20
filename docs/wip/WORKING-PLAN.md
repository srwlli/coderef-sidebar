# Project Working Plan

## ✅ COMPLETED: Move Breadcrumbs to Header (Excluding Noted Module)

### Implementation Summary

- **Status**: ✅ Complete
- **Scope**: Main application pages only (excluded `/noted` routes)
- **Result**: Space-efficient header with integrated breadcrumbs

### Changes Made

1. **Header Component** (`src/components/layout/Header.tsx`):
   - Added conditional breadcrumb integration for non-noted pages
   - Layout: `[Mobile Trigger] [Breadcrumbs] [flex-grow] [coderef title]`
   - Preserved noted module's tab functionality

2. **Breadcrumb Component** (`src/components/navigation/Breadcrumb.tsx`):
   - Added `inline` prop for header integration
   - Smaller icons (h-3 w-3) and simplified styling for inline usage

3. **Layout Component** (`src/app/(app)/layout.tsx`):
   - Removed standalone breadcrumb rendering
   - Simplified main content structure

---

## 🔧 CURRENT ISSUE: Non-Functional Sticky Header

### Problem Analysis

**Issue**: Header has `sticky top-0 z-50` CSS but doesn't stick during scroll.

**Root Cause Found**: Layout structure prevents sticky positioning from working.

### Current Layout Structure (Broken):

```tsx
<div className="flex min-h-screen w-full">
  {' '}
  // No scroll context
  <Sidebar>...</Sidebar>
  <main className="flex flex-1 flex-col">
    {' '}
    // No scroll context
    <Header /> // Sticky fails here
    <div className="flex-1 overflow-x-hidden">
      {' '}
      // Scroll happens here (too deep)
      {content}
    </div>
  </main>
</div>
```

### Why Sticky Fails:

1. **Parent containers don't scroll** - `min-h-screen` creates full-height containers
2. **Scrollable content nested too deep** - Header can't establish proper scroll context
3. **Flex layout interference** - Multiple flex containers break sticky positioning

### Proper Fix Required:

**Need to restructure layout so header is in same scroll context as content:**

```tsx
<div className="flex min-h-screen w-full">
  <Sidebar>...</Sidebar>
  <main className="flex h-screen flex-1 flex-col overflow-hidden">
    <Header /> // Sticky works here
    <div className="flex-1 overflow-y-auto">
      {' '}
      // Creates proper scroll context
      {content}
    </div>
  </main>
</div>
```

### Implementation Files Needed:

- `src/app/(app)/layout.tsx` - Restructure main container scroll context

---

## 🔧 COMPLETED: Sidebar Divider Fix

### Problem

- Sidebar divider was incomplete, missing ~25% from left side
- Caused by `mx-2` horizontal margins in `SidebarSeparator`

### Solution Applied

- **File**: `src/components/layout/sidebar.tsx:395`
- **Change**: `mx-2` → `mr-2` (removed left margin)
- **Result**: Full-width divider above Settings

---

## 📋 Pending Tasks

1. **Fix sticky header layout structure** (Critical)
2. **Implement comprehensive git branch commands** (From git-commands-plan.md)
3. **Test mobile header behavior** (After sticky fix)
