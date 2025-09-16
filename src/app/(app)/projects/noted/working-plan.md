# Plan: Create "Noted" Notepad Project

## Overview

Transform the existing `/projects/noted` page from a mock project template into a fully functional notepad application using the existing forms and database infrastructure.

## Key Features

- **One-form note creation** with rich text input
- **Project association** - notes can link to projects or be standalone
- **Multiple input types**: text, links, lists, comments
- **Database integration** using existing Supabase setup
- **User-specific notes** with RLS security

## Implementation Steps

### 1. Database Schema

Create new `notes` table following existing patterns:

```sql
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT NOT NULL,
  note_type VARCHAR(50) DEFAULT 'text',
  project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. Form Configuration

Create note form schema using existing form system:

- Title (optional)
- Content (required textarea)
- Note Type (select: text, link, list, comment)
- Project Association (optional select from user's projects)
- Tags (existing tags component)

### 3. Component Structure

- **NotesForm**: Main note creation form using FormGenerator
- **NotesList**: Display user's notes with filtering
- **useNotes** hook: CRUD operations following useProjects pattern
- Replace existing mock page with functional notepad interface

### 4. Page Features

- Quick note creation form (always visible)
- Notes list with search/filter by project
- Toggle between "All Notes" and "Project Notes"
- Note editing and deletion capabilities

This leverages all existing infrastructure (Supabase, RLS, FormGenerator, React Query) while creating a focused notepad experience that integrates with the project ecosystem.
