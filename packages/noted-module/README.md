# Noted Module

A **complete notes management system** with React components for creating, viewing, and managing notes with Supabase integration. Features a full dashboard interface, mobile optimization, and flexible integration options.

🚀 **Ready to publish to npm** - Truly standalone module that works as an integrated feature or independent application.

## Features

- 🏠 **Complete Dashboard** - Full notes management with tabbed interface
- 📋 **Notes List View** - Browse, search, and manage all your notes
- 👁️ **Individual Note View** - Detailed note display with edit/delete actions
- 🗒️ **Notepad-style form** - Clean, minimal note creation interface
- 🎯 **Inline action buttons** - Direct access to projects, tags, and links via icon buttons
- 📝 **Rich content support** - Links, tags, images, screenshots, and project association
- ✅ **Form validation** - Zod-based validation with real-time error feedback
- 🔄 **Full CRUD operations** - Create, read, update, delete with Supabase
- 📱 **Mobile optimized** - 80vh frozen layout for native app feel
- 🔧 **Flexible integration** - Works integrated or standalone
- 🎨 **Customizable** - Supports custom schemas and styling

## Installation

```bash
npm install noted-form-module
```

### Peer Dependencies

```bash
npm install react react-dom next @supabase/supabase-js react-hook-form @hookform/resolvers zod lucide-react
```

The package includes all necessary UI components (Button, Input, etc.) and utilities internally.

## Quick Start

### Complete Dashboard

```tsx
import { NotesDashboard } from 'noted-module';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function NotesApp() {
  const user = { id: 'your-user-id' }; // From your auth system

  const toast = ({ title, description, type }) => {
    console.log(`${type}: ${title} - ${description}`);
    // Replace with your toast implementation
  };

  return (
    <div className="h-screen">
      <NotesDashboard supabaseClient={supabase} user={user} toast={toast} />
    </div>
  );
}
```

### Form Only

```tsx
import { NotedForm } from 'noted-module';

function CreateNote() {
  return (
    <NotedForm
      supabaseClient={supabase}
      user={user}
      toast={toast}
      onSuccess={(data) => console.log('Note saved:', data)}
    />
  );
}
```

## 🔧 Integration Options

The module is designed to work seamlessly with existing navigation systems or as a completely standalone application.

### Option 1: Integrated Mode (With Existing Navigation)

Perfect for adding notes functionality to existing applications with sidebars, headers, and navigation.

```tsx
// app/(dashboard)/notes/page.tsx - inherits your app layout
export default function NotesPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'create';

  return (
    <div>
      {/* Your existing app layout components remain unchanged */}
      {/* Sidebar, header, breadcrumbs all work normally */}

      <NotesDashboard
        supabaseClient={supabase}
        user={user}
        toast={toast}
        initialTab={currentTab} // Syncs with URL params
        className="your-custom-styling"
      />
    </div>
  );
}
```

**Benefits:**

- ✅ Inherits your existing navigation, sidebar, and header
- ✅ Works with your app's routing and layout system
- ✅ Maintains consistent styling and user experience
- ✅ URL tab management integrates with your app's navigation

### Option 2: Standalone Mode (Clean Slate)

Create a completely independent notes application without any existing navigation.

```tsx
// app/notes/page.tsx - outside route groups for clean interface
export default function StandaloneNotes() {
  return (
    <div className="h-screen">
      {/* No existing navigation - module handles everything */}
      <NotesDashboard supabaseClient={supabase} user={user} toast={toast} />
    </div>
  );
}
```

**Benefits:**

- ✅ Completely clean interface focused only on notes
- ✅ Built-in tab navigation (Create Note / My Notes)
- ✅ Mobile-optimized with 80vh frozen layout
- ✅ No conflicts with existing navigation systems

### Navigation Integration

The module includes intelligent navigation handling:

```tsx
// Your existing header can control the notes dashboard
import { useSearchParams, useRouter } from 'next/navigation';

function YourAppHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'create';

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.push(`/notes?${params.toString()}`);
  };

  return (
    <header>
      {/* Your existing header content */}

      {/* Notes-specific navigation when on notes page */}
      <Button onClick={() => handleTabChange('create')}>Create Note</Button>
      <Button onClick={() => handleTabChange('list')}>My Notes</Button>
    </header>
  );
}
```

### Option 3: Custom Integration

Use individual components for maximum flexibility.

```tsx
import { NotesList, NoteView, useNotes } from 'noted-module';

function CustomNotesInterface() {
  const { notes, loading, error } = useNotes({ supabaseClient, user });

  return (
    <div className="your-custom-layout">
      <NotesList
        notes={notes}
        loading={loading}
        error={error}
        onViewNote={handleViewNote}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
      />
    </div>
  );
}
```

## 📚 Components

### NotesDashboard

Complete dashboard with tabs, CRUD operations, and responsive design.

```tsx
<NotesDashboard
  supabaseClient={supabase}
  user={user}
  toast={toast}
  className="custom-class"
/>
```

### NotedForm

Form component for creating/editing notes.

```tsx
<NotedForm
  supabaseClient={supabase}
  user={user}
  toast={toast}
  onSuccess={(data) => console.log('Success:', data)}
  mode="create" // or "edit"
  initialData={existingNote} // for edit mode
/>
```

### NotesList

List view of all notes with actions.

```tsx
<NotesList
  notes={notes}
  loading={loading}
  error={error}
  onViewNote={handleViewNote}
  onEditNote={handleEditNote}
  onDeleteNote={handleDeleteNote}
/>
```

### NoteView

Individual note display with edit/delete actions.

```tsx
<NoteView
  note={selectedNote}
  onBack={() => setView('list')}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### useNotes Hook

Hook for CRUD operations and state management.

```tsx
const { notes, loading, error, deleteNote, refreshNotes } = useNotes({
  supabaseClient,
  user,
});
```

## Form Schema

The noted form includes these fields:

- **Title** - Text input (required)
- **Description** - Large textarea (required)
- **Project** - Project selection dropdown (optional)
- **Tags** - Tag management with suggestions (optional)
- **Links** - URL-only link management (optional)
- **Images** - Image URL management (optional)
- **Screenshots** - Screenshot URL management (optional)

## Customization

### Custom Schema

```tsx
import { getNotedFormSchema } from 'noted-form-module';

const customSchema = getNotedFormSchema({
  title: 'Custom Note Form',
  description: 'Add your custom note here',
  submitText: 'Save Custom Note',
});
```

## 📱 Mobile Optimization

The module includes responsive design optimized for mobile devices:

- **Mobile**: Fixed 80vh height with frozen scrolling (native app feel)
- **Desktop**: Full scrollable interface
- **Responsive tabs**: Condensed navigation on small screens

```tsx
// The dashboard automatically handles responsive behavior
<NotesDashboard
  supabaseClient={supabase}
  user={user}
  toast={toast}
  // Mobile: 80vh fixed height
  // Desktop: Full scrollable layout
/>
```

### Custom Field Components

All field components are exported for custom usage:

```tsx
import {
  TextField,
  TextAreaField,
  TagField,
  LinksField,
  ImagesField,
  ProjectSelectField,
} from 'noted-module/fields';
```

## Database Setup

### Required Table

Run the SQL script provided in `database-schema.sql` in your Supabase project:

```bash
# Copy the SQL from database-schema.sql and run in Supabase SQL Editor
```

Or run this basic setup:

```sql
CREATE TABLE noted (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  project_name VARCHAR(255),
  tags JSONB DEFAULT '[]'::jsonb,
  links JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  screenshots JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and add policies (see database-schema.sql for complete setup)
ALTER TABLE noted ENABLE ROW LEVEL SECURITY;
```

The complete schema includes:

- ✅ Row Level Security (RLS) policies
- ✅ Indexes for performance
- ✅ Auto-updating timestamps
- ✅ Optional file storage setup

## Toast Integration

The component requires a toast function with this signature:

```tsx
type ToastFunction = (config: {
  title: string;
  description: string;
  type: 'success' | 'error' | 'info';
}) => void;
```

## TypeScript

The module exports comprehensive TypeScript types:

```tsx
import type {
  NotedData,
  DbNoted,
  FormSchema,
  LinkObject,
} from 'noted-form-module';
```

## License

MIT

## Contributing

This package is part of a monorepo workspace. See the main repository for contribution guidelines.
