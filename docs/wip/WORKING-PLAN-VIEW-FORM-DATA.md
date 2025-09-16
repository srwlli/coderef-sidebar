# Plan: Create Projects Table View Page

## Current State Analysis

- Projects page at `/projects` shows hardcoded project cards
- Supabase client is set up but not used for data fetching
- No table UI components exist yet
- We have 14 projects in database with missing link fields (git, supabase, local_link, deployed_link)

## Implementation Plan

### 1. Add ShadCN Table Component

- Install/add the table component from ShadCN UI
- This provides proper styling and structure for data tables

### 2. Create Projects Data Hook

- Create `useProjects` hook to fetch data from Supabase
- Handle loading states and error handling
- Type the response with ProjectData interface

### 3. Create Projects Table Component

- Build reusable ProjectsTable component
- Display all project fields including status indicators for missing fields
- Add sorting capabilities
- Include action buttons (edit, view, etc.)

### 4. Create New Projects Table Page

- Add new route `/projects/table` or update existing `/projects` page
- Implement data fetching and display
- Add navigation between card view and table view

### 5. Enhanced Features

- Add filtering capabilities (show only missing fields)
- Add bulk edit functionality for missing fields
- Include export functionality
- Add refresh/reload capability

## Files to Create/Modify

- `src/components/ui/table.tsx` (ShadCN table component)
- `src/hooks/useProjects.ts` (data fetching hook)
- `src/components/projects/ProjectsTable.tsx` (table component)
- `src/app/(app)/projects/table/page.tsx` (new table view page)
- Update navigation to include table view option

This will provide a comprehensive view of all projects with their missing field information, making it easy to identify and update incomplete records.
