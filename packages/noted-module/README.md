# Noted Form Module

A **truly standalone** React component for creating rich note-taking forms with Supabase integration. Features inline dropdowns for secondary fields, notepad-style description editing, and full form validation.

🚀 **Ready to publish to npm** - No dependencies on specific projects or frameworks beyond React/Next.js.

## Features

- 🗒️ **Notepad-style interface** - Large description field with clean, minimal design
- 🎯 **Inline actions bar** - Secondary fields accessible via dropdown buttons with icons
- 📝 **Rich content support** - Links, tags, images, screenshots, and project association
- ✅ **Form validation** - Zod-based validation with real-time error feedback
- 🔄 **Supabase integration** - Built-in support for database operations
- 🎨 **Customizable** - Supports custom schemas and styling
- 📱 **Responsive** - Works on all screen sizes
- 🔧 **Self-contained** - All UI components included, no external dependencies on specific design systems

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

```tsx
import { NotedForm } from 'noted-form-module';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Your toast function (can use any toast library)
const toast = ({ title, description, type }) => {
  console.log(`${type}: ${title} - ${description}`);
  // Replace with your toast implementation
};

function NotesPage() {
  const user = { id: 'your-user-id' }; // From your auth system

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <NotedForm
          supabaseClient={supabase}
          user={user}
          toast={toast}
          onSuccess={(data) => {
            console.log('Note saved:', data);
          }}
        />
      </div>
    </div>
  );
}
```

## Components

### NotedForm

The main form component with all noted functionality.

```tsx
<NotedForm
  supabaseClient={supabase}
  user={user}
  toast={toast}
  onSuccess={(data) => console.log('Success:', data)}
  onCancel={() => console.log('Cancelled')}
  mode="create" // or "edit"
  initialData={existingNote} // for edit mode
  className="custom-class"
/>
```

### FormGenerator

Generic form generator that can be used with custom schemas.

```tsx
import { FormGenerator, notedFormSchema } from 'noted-form-module';

<FormGenerator
  schema={notedFormSchema}
  onSubmit={handleSubmit}
  supabaseClient={supabase}
  user={user}
/>
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

### Custom Field Components

All field components are exported for custom usage:

```tsx
import {
  TextField,
  TextAreaField,
  TagField,
  LinksField
} from 'noted-form-module/components';
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
  LinkObject
} from 'noted-form-module';
```

## License

MIT

## Contributing

This package is part of a monorepo workspace. See the main repository for contribution guidelines.