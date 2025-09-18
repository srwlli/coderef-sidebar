# Noted Form Discovery Report

## Form Component Inventory

| Component | Purpose | Location | Integration |
|-----------|---------|----------|-------------|
| **FormGenerator** | Generic form builder with Zod validation | `src/components/forms/FormGenerator.tsx` | Uses schema-driven approach |
| **ProjectForm** | Project creation/editing form | `src/components/forms/ProjectForm.tsx` | Supabase insert/update via `projects` table |
| **Field Components** | Reusable form fields | `src/components/forms/fields/` | TextField, TextAreaField, TagField, BaseField |

## Existing Supabase Integration Points

| Integration Point | Purpose | Location |
|-------------------|---------|----------|
| **Supabase Client** | Database connection & auth | `src/lib/supabase.ts` | Environment-based configuration |
| **Project Schema** | Form field definitions | `src/lib/forms/projectSchema.ts` | Schema for `projects` table |
| **Form Types** | TypeScript definitions | `src/lib/forms/formTypes.ts` | Interface definitions and validation |
| **Auth Context** | User authentication | `src/lib/auth-context` | Used in ProjectForm for user_id |

## Current Database Schema (Projects Table)

| Field | Type | Required | Auto-Generated |
|-------|------|----------|----------------|
| `id` | number | ✓ | ✓ (primary key) |
| `user_id` | string | ✓ | ✓ (from auth) |
| `username` | string | ✓ | - |
| `project_name` | string | ✓ | - |
| `description` | string | - | - |
| `notes` | string | - | - |
| `tags` | string[] | - | - |
| `git` | string | - | - |
| `supabase` | string | - | - |
| `local_link` | string | - | - |
| `deployed_link` | string | - | - |
| `created_at` | timestamp | ✓ | ✓ |
| `updated_at` | timestamp | ✓ | ✓ |

## Recommended Implementation for "Noted" Form

### 1. Create Noted Schema
**Location**: `src/lib/forms/notedSchema.ts`

```typescript
export const notedFormSchema: FormSchema = {
  title: 'Create New Note',
  description: 'Add a new note with title and description.',
  table: 'noted',
  submitText: 'Save Note',
  resetText: 'Clear Form',
  successMessage: 'Note saved successfully!',
  autoFields: {
    user_id: true,
    created_at: true,
    updated_at: true,
  },
  fields: [
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      placeholder: 'Enter note title',
      maxLength: 255,
      autoFocus: true,
    },
    {
      key: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      placeholder: 'Enter note description...',
      rows: 6,
      maxLength: 2000,
    },
  ],
};
```

### 2. Create NotedForm Component
**Location**: `src/components/forms/NotedForm.tsx`

Follow ProjectForm pattern:
- Import FormGenerator, schema, Supabase client
- Handle form submission with user authentication
- Insert into `noted` table
- Include success/error toast notifications

### 3. Required Database Schema (Noted Table)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | SERIAL PRIMARY KEY | ✓ | Auto-increment |
| `user_id` | UUID | ✓ | Foreign key to auth.users |
| `title` | TEXT | ✓ | Max 255 characters |
| `description` | TEXT | ✓ | Max 2000 characters |
| `created_at` | TIMESTAMPTZ | ✓ | Default NOW() |
| `updated_at` | TIMESTAMPTZ | ✓ | Default NOW() |

### 4. SQL Migration Required

```sql
CREATE TABLE noted (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (LENGTH(title) <= 255),
  description TEXT NOT NULL CHECK (LENGTH(description) <= 2000),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE noted ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notes" ON noted
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes" ON noted
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes" ON noted
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes" ON noted
  FOR DELETE USING (auth.uid() = user_id);
```

### 5. Integration Flow

1. **Form Render**: NotedForm → FormGenerator → TextField/TextAreaField
2. **Validation**: Zod schema validation on client-side
3. **Submission**: Form data → Supabase insert → `noted` table
4. **Authentication**: User ID automatically added from auth context
5. **Feedback**: Toast notification for success/error states

## Dependencies to Update

| File | Update Required | Purpose |
|------|----------------|---------|
| **Route/Page** | Add page for noted form | Display form in app |
| **Navigation** | Add link to noted form | User access point |
| **Types** | Add NotedData interface | TypeScript support |
| **Hooks** | Optional: useNoted hook | CRUD operations |

## Next Steps

1. Create `noted` table in Supabase with RLS policies
2. Implement `notedSchema.ts` with form configuration
3. Create `NotedForm.tsx` component following ProjectForm pattern
4. Add NotedData interface to `formTypes.ts`
5. Create page/route to display the form
6. Test form submission and database integration