# Noted Module - Standalone Package

## Overview

This is the noted-module package - a reusable, framework-agnostic React component library for note-taking and form generation. This package contains the core business logic and can be used across different React applications.

## What's Inside This Package

This package contains the **actual notes functionality**:

### Core Components

- **`NotesDashboard`** - Complete notes management interface
- **`NotedForm`** - Note creation/editing form
- **`FormGenerator`** - Dynamic form generation component
- **`NotesList`** - Notes list view
- **`NoteView`** - Single note display

### Field Components

- **`TextField`** - Text input with validation
- **`TextAreaField`** - Multi-line text input
- **`TagField`** - Tag input with suggestions
- **`LinksField`** - URL management with metadata
- **`ImagesField`** - Image upload and management
- **`ProjectSelectField`** - Project selection dropdown

### Hooks

- **`useNotes`** - Data fetching and management

### Types & Schemas

- **`NotedData`** - Core note data structure
- **`DbNoted`** - Database note structure
- **`FieldConfig`** - Form field configuration
- **`FormSchema`** - Complete form schema

## Package Structure

```
packages/noted-module/
├── src/
│   ├── index.ts              # Public API exports
│   ├── components/           # React components
│   │   ├── NotedForm.tsx    # Note creation interface
│   │   ├── NotesDashboard.tsx # Main dashboard
│   │   ├── NotesList.tsx    # List view
│   │   ├── NoteView.tsx     # Detail view
│   │   ├── FormGenerator.tsx # Dynamic form generator
│   │   ├── fields/          # Form field components
│   │   └── ui/              # Base UI components
│   ├── hooks/
│   │   └── useNotes.ts      # Data management hook
│   ├── lib/
│   │   ├── forms/           # Form schemas & validation
│   │   ├── types/           # TypeScript definitions
│   │   └── utils.ts         # Utility functions
├── dist/                    # Built package output
├── package.json            # Package configuration
└── tsconfig.json           # TypeScript config
```

## Design Principles

### 1. **Dependency Injection**

All external dependencies are injected as props:

```typescript
<NotesDashboard
  supabaseClient={supabase}    // Database client
  user={user}                  // User data
  toast={toast}                // Notification system
/>
```

### 2. **Framework Agnostic**

- No direct imports of app-specific libraries
- Works with any React framework (Next.js, Vite, CRA, Remix)
- No assumptions about routing or state management

### 3. **Minimal Dependencies**

- Only essential peer dependencies
- Consumer provides authentication, database, and notifications
- No coupling to specific UI libraries

### 4. **Type Safety**

- Full TypeScript coverage
- Exported types for integration
- Zod validation schemas

## Integration Requirements

To use this package, the consuming application must provide:

### Required Props

```typescript
interface RequiredIntegration {
  supabaseClient: SupabaseClient; // Database connection
  user: SupabaseUser; // Authenticated user
  toast: ToastFunction; // Notification handler
}

type ToastFunction = (config: {
  title: string;
  description: string;
  type: 'success' | 'error' | 'info';
}) => void;
```

### Database Schema

The consuming app must have these tables:

- `noted` table (see `/database/noted-schema.sql`)
- Supabase storage bucket: `noted-files`
- Row Level Security policies enabled

### Styling

- Requires Tailwind CSS for styling
- Consumer can override with custom classes
- Dark mode support via Tailwind

## What This Package Does NOT Include

### App-Specific Concerns

- Authentication logic
- Route handling
- URL parameter management
- App-specific error boundaries
- Analytics tracking

### Framework-Specific Features

- Next.js routing
- Remix loaders
- React Router integration
- Server-side rendering setup

### Infrastructure

- Database configuration
- Supabase client setup
- Environment variable management
- Build configuration

## 1. Publish to NPM (Recommended)

### Publish the Module

```bash
# In packages/noted-module
npm run build
npm publish

# Or publish to GitHub packages
npm publish --registry=https://npm.pkg.github.com
```

### Update package.json for Publishing

```json
{
  "name": "@yourorg/noted-module",
  "version": "1.0.0",
  "description": "A production-ready noted form module with Supabase integration",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourorg/noted-module.git"
  },
  "homepage": "https://github.com/yourorg/noted-module#readme"
}
```

## 2. Use in Different React Applications

### A. In a Vite React App

```typescript
// Install the module
npm install @yourorg/noted-module

// App.tsx
import { NotesDashboard } from '@yourorg/noted-module';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('your-url', 'your-key');

function App() {
  const [user, setUser] = useState(null);

  const toast = (config) => {
    // Your toast implementation (react-hot-toast, etc.)
    alert(`${config.title}: ${config.description}`);
  };

  return (
    <div>
      <h1>My Vite App</h1>
      <NotesDashboard
        supabaseClient={supabase}
        user={user}
        toast={toast}
        initialTab="create"
      />
    </div>
  );
}
```

### B. In a CRA (Create React App)

```typescript
// src/NotesPage.tsx
import React from 'react';
import { NotesDashboard, FormGenerator } from '@yourorg/noted-module';
import { useAuth } from './hooks/useAuth';
import { useToast } from './hooks/useToast';
import { supabase } from './lib/supabase';

export function NotesPage() {
  const { user } = useAuth();
  const toast = useToast();

  return (
    <div className="container mx-auto p-4">
      <NotesDashboard
        supabaseClient={supabase}
        user={user}
        toast={toast}
      />
    </div>
  );
}
```

### C. In a Remix App

```typescript
// app/routes/notes.tsx
import { NotesDashboard } from '@yourorg/noted-module';
import { useLoaderData } from '@remix-run/react';
import { supabase } from '~/lib/supabase';

export default function NotesRoute() {
  const { user } = useLoaderData();

  const toast = ({ title, description, type }) => {
    // Remix toast implementation
    console.log(`${type}: ${title} - ${description}`);
  };

  return (
    <main>
      <NotesDashboard
        supabaseClient={supabase}
        user={user}
        toast={toast}
        className="min-h-screen"
      />
    </main>
  );
}
```

### D. In a React Native App (if you expand support)

```typescript
// NotesScreen.tsx
import { FormGenerator } from '@yourorg/noted-module/native';
import { supabase } from './lib/supabase';

export function NotesScreen() {
  const toast = (config) => {
    Alert.alert(config.title, config.description);
  };

  return (
    <View style={{ flex: 1 }}>
      <FormGenerator
        schema={noteSchema}
        onSubmit={handleSubmit}
        // Native-specific props
      />
    </View>
  );
}
```

## 3. Use Individual Components

```typescript
// Use just the FormGenerator for custom forms
import { FormGenerator } from '@yourorg/noted-module';

const contactSchema = {
  title: 'Contact Form',
  table: 'contacts',
  fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { key: 'message', label: 'Message', type: 'textarea', required: true },
  ],
};

function ContactPage() {
  return (
    <FormGenerator
      schema={contactSchema}
      onSubmit={async (data) => {
        await fetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      }}
    />
  );
}

// Use individual field components
import { TextField, TagField, LinksField } from '@yourorg/noted-module/components';

function CustomForm() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);

  return (
    <form>
      <TextField
        config={{ key: 'title', label: 'Title', type: 'text' }}
        value={title}
        onChange={setTitle}
      />
      <TagField
        config={{ key: 'tags', label: 'Tags', type: 'tags' }}
        value={tags}
        onChange={setTags}
      />
    </form>
  );
}
```

## 4. Customization and Extension Patterns

### A. Theme Customization

```typescript
// Custom theme
import { NotesDashboard } from '@yourorg/noted-module';

function ThemedNotes() {
  return (
    <div className="dark"> {/* Apply your theme */}
      <NotesDashboard
        supabaseClient={supabase}
        user={user}
        toast={toast}
        className="bg-gray-900 text-white" // Custom styling
      />
    </div>
  );
}
```

### B. Custom Field Types

```typescript
// Extend with custom field types
import { FormGenerator } from '@yourorg/noted-module';

const customSchema = {
  title: 'Extended Form',
  table: 'custom_notes',
  fields: [
    { key: 'title', type: 'text' },
    {
      key: 'priority',
      type: 'select',
      options: [
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ],
    },
    { key: 'due_date', type: 'date' },
    { key: 'attachments', type: 'images' },
  ],
};
```

### C. Custom Toast Integration

```typescript
// With react-hot-toast
import toast from 'react-hot-toast';

const customToast = ({ title, description, type }) => {
  if (type === 'success') {
    toast.success(`${title}: ${description}`);
  } else if (type === 'error') {
    toast.error(`${title}: ${description}`);
  }
};

// With chakra-ui
import { useToast } from '@chakra-ui/react';

function ChakraApp() {
  const chakraToast = useToast();

  const customToast = ({ title, description, type }) => {
    chakraToast({
      title,
      description,
      status: type,
      duration: 5000,
      isClosable: true,
    });
  };

  return <NotesDashboard toast={customToast} {...props} />;
}
```

## 5. Different Database Backends

```typescript
// With Firebase instead of Supabase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Create a Supabase-compatible wrapper
const firebaseToSupabaseAdapter = {
  from: (table) => ({
    select: () => ({ /* Firebase implementation */ }),
    insert: (data) => ({ /* Firebase implementation */ }),
    // ... other methods
  }),
};

<NotesDashboard
  supabaseClient={firebaseToSupabaseAdapter}
  user={user}
  toast={toast}
/>
```

## 6. Monorepo/Workspace Usage

```typescript
// In a different workspace project
// packages/admin-app/src/NotesManager.tsx

import { NotesDashboard, useNotes } from '@yourorg/noted-module';

function AdminNotesManager() {
  const { notes, loading } = useNotes({ supabaseClient, user: adminUser });

  return (
    <div>
      <h1>Admin Notes Management</h1>
      <p>Managing {notes.length} notes</p>
      <NotesDashboard
        supabaseClient={supabaseClient}
        user={adminUser}
        toast={adminToast}
        // Admin-specific configuration
        initialTab="list"
      />
    </div>
  );
}
```

## 7. Custom Integrations

```typescript
// Integrate with your CMS
import { FormGenerator } from '@yourorg/noted-module';

const cmsSchema = {
  title: 'CMS Content',
  table: 'cms_content',
  fields: [
    { key: 'title', type: 'text' },
    { key: 'slug', type: 'text' },
    { key: 'content', type: 'textarea', rows: 20 },
    { key: 'tags', type: 'tags' },
    { key: 'featured_image', type: 'images', maxFiles: 1 },
  ],
};

function CMSEditor() {
  return (
    <FormGenerator
      schema={cmsSchema}
      onSubmit={async (data) => {
        // Save to your CMS backend
        await cms.content.create(data);
      }}
    />
  );
}
```

## Why the Current Architecture is Correct

### 1. **Separation of Concerns**

```typescript
// ✅ GOOD: App handles integration, module handles business logic
// App Layer (noted/page.tsx)
const supabaseUser: SupabaseUser = convertUser(user); // App-specific conversion
return <NotesDashboard supabaseClient={supabase} user={supabaseUser} />

// Module Layer (NotesDashboard)
export function NotesDashboard({ supabaseClient, user, toast }) {
  // Pure business logic, no app coupling
}
```

### 2. **Reusability**

- The noted-module can be published to npm and used in other apps
- Moving the page into the module would tie it to this specific app's routing structure
- Other apps might use different routing (React Router, reach/router, etc.)

### 3. **Dependency Management**

```json
// ✅ Module stays lean with peer dependencies
"peerDependencies": {
  "react": "^18.0.0",
  "next": "^14.0.0",
  "@supabase/supabase-js": "^2.0.0"
}
```

### 4. **Testing & Development**

- Module can be tested in isolation
- Module can be developed independently
- App can mock/stub the module dependencies easily

## Key Design Principle

The key to reusability is that your noted-module is designed with **dependency injection** - it accepts `supabaseClient`, `user`, and `toast` as props rather than importing them directly. This makes it framework-agnostic and highly reusable across different React applications, database backends, and UI libraries.

## Recommended Architecture

**Keep the current architecture:**

1. **App** = Integration + Configuration + Authentication + Routing
2. **Module** = Business Logic + Reusable Components + Pure Functions

This follows good software design principles and makes the module truly reusable while keeping app-specific concerns in the app layer.
