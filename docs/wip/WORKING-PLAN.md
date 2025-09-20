# Project Working Plan

## ✅ COMPLETED: Projects Migration to Noted UX Pattern

### Implementation Summary

- **Status**: ✅ Complete
- **Scope**: Full migration of projects module to match noted module's single-page UX
- **Result**: Consistent, linear navigation flow without modals

### Changes Made

1. **Forms Page Cleanup** (`src/app/(app)/forms/page.tsx`):
   - Removed project form from forms page
   - Added placeholder for future form builder features
   - Simplified to just collapsible container

2. **ProjectForm Cleanup** (`src/components/forms/ProjectForm.tsx`):
   - Removed manual `username` field assignment
   - Now relies on Supabase auto-generation
   - Made `username` optional in TypeScript interface

3. **New Components Created**:
   - **ProjectView** (`src/components/projects/ProjectView.tsx`): Detail view with edit/delete actions
   - **ProjectsList** (`src/components/projects/ProjectsList.tsx`): Grid layout with inline actions
   - **ProjectsDashboard** (`src/components/projects/ProjectsDashboard.tsx`): Main container with view modes

4. **Projects Page Simplified** (`src/app/(app)/projects/page.tsx`):
   - Reduced from ~200 lines to 16 lines
   - Single dashboard component import
   - No more modal/sheet complexity

### UX Pattern Now Matches Noted:

- **View Modes**: `'list' | 'create' | 'view' | 'edit'`
- **Linear Flow**: List → View → Edit → List
- **Success Navigation**: After operations, return to list
- **Manual Refresh**: Simple state management

---

## 🔧 CURRENT ISSUE: Username Auto-Generation

### Problem

- Database expects `username` to be auto-generated
- Currently getting 400 error: "username entry is null"
- Auto-population mechanism not working

### Database Solutions Available

#### Option 1: Trigger (Recommended)

```sql
CREATE OR REPLACE FUNCTION public.set_username()
RETURNS TRIGGER AS $$
BEGIN
  SELECT email INTO NEW.username FROM auth.users WHERE id = NEW.user_id;
  IF NEW.username IS NULL THEN
    NEW.username = 'user_' || NEW.user_id::text;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER set_username_trigger
BEFORE INSERT OR UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.set_username();
```

#### Option 2: Make Nullable

```sql
ALTER TABLE public.projects ALTER COLUMN username DROP NOT NULL;
```

### Action Required

- Apply database fix via Supabase SQL Editor
- No temporary application code fixes

---

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

## ✅ COMPLETED: Sticky Header Fix

### Problem Solved

- Header had `sticky top-0 z-50` CSS but didn't stick during scroll
- Root cause: Layout structure prevented sticky positioning

### Solution Applied

- Restructured layout for proper scroll context
- Changed from `min-h-screen` to `h-screen overflow-hidden` on main
- Added `overflow-y-auto` to content container
- Header now properly sticks at top

---

## ✅ COMPLETED: Remove Coderef Branding

### Changes

- Removed "coderef" text from header
- Cleaner, minimalist header design

---

## ✅ COMPLETED: Project Form Silent Failure Fix

### Problem Solved

- Edit form opened but failed silently when saving
- Root cause: Complex mutation hooks in React Query

### Solution Applied

- Replaced mutation hooks with direct Supabase calls
- Following NotedForm pattern
- Added comprehensive error logging
- Forms now save successfully with proper feedback

---

## 📋 Pending Tasks

1. **Fix username auto-generation in database** (Critical)
2. **Implement comprehensive git branch commands** (From git-commands-plan.md)
3. **Consider further UX improvements** (Optional)

## 📚 Key Learnings

1. **Direct Supabase calls > Mutation hooks** for form submissions
2. **Simple state management > Complex React Query** for data sync
3. **Single-page UX > Modal-based UX** for better user flow
4. **Database triggers** should handle auto-generated fields
