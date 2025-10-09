# SCHEMA

**Date:** 2025-10-08
**Schema Version:** 0.1.0

---

## Overview

sidebar-app uses TypeScript for strict type safety throughout the application. Data schemas are defined using TypeScript interfaces and Zod for runtime validation. The application currently stores data in localStorage via Zustand, with plans to migrate to Supabase PostgreSQL database.

## Type System Architecture

```
TypeScript Types (Compile-time)
    ↓
Zod Schemas (Runtime Validation)
    ↓
Zustand Store (State Management)
    ↓
localStorage (Persistence)
    ↓
Future: Supabase PostgreSQL (Database)
```

## Core Type Definitions

### Authentication Types

**Location:** `src/types/auth.d.ts`

#### User

```typescript
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}
```

**Field Descriptions:**

- `id` - Supabase user UUID (primary key)
- `email` - User email address (unique, required)
- `full_name` - Display name (optional, from user_metadata)
- `avatar_url` - Profile picture URL (optional, from user_metadata)

**Source:** Supabase Auth user object

#### AuthState

```typescript
export interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
```

**Field Descriptions:**

- `user` - Current authenticated user or null
- `loading` - Auth state loading indicator
- `signIn` - Sign in with email/password
- `signUp` - Create new account
- `signOut` - End session
- `resetPassword` - Send password reset email

**Usage:**

```typescript
import { useAuth } from '@/lib/auth-context';

const { user, loading, signIn } = useAuth();

if (loading) return <Spinner />;
if (!user) return <LoginForm />;
```

### Zustand Store Types

**Location:** `src/stores/use-app-store.ts`

#### CustomLink

```typescript
export interface CustomLink {
  id: string;
  label: string;
  href: string;
}
```

**Field Descriptions:**

- `id` - Unique identifier (UUID v4)
- `label` - Display text for link (1-30 chars)
- `href` - URL or internal path (http/https or /)

**Validation (Zod):**

```typescript
const customLinkSchema = z.object({
  id: z.string(),
  label: z.string().min(1).max(30),
  href: z
    .string()
    .refine((val) => val.startsWith('/') || /^https?:\/\//.test(val), {
      message: 'Must be valid URL or path starting with /',
    }),
});
```

**Example:**

```typescript
{
  id: "550e8400-e29b-41d4-a716-446655440000",
  label: "Dashboard",
  href: "https://app.example.com/dashboard"
}
```

#### CustomCard

```typescript
export interface CustomCard {
  id: string;
  title: string;
  links: CustomLink[];
  iconName: string;
  createdAt: string;
}
```

**Field Descriptions:**

- `id` - Unique card identifier (UUID v4)
- `title` - Card title (1-50 chars)
- `links` - Array of quick action links (1-16 items)
- `iconName` - Lucide icon name (see CURATED_ICONS)
- `createdAt` - ISO 8601 timestamp

**Validation (Zod):**

```typescript
const cardFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title too long'),
  links: z
    .array(customLinkSchema)
    .min(1, 'At least 1 link required')
    .max(16, 'Maximum 16 links allowed'),
  iconName: z.string().min(1, 'Icon is required'),
});
```

**Example:**

```typescript
{
  id: "card-uuid-123",
  title: "My Project",
  links: [
    {
      id: "link-uuid-1",
      label: "Dashboard",
      href: "https://myproject.com/dashboard"
    },
    {
      id: "link-uuid-2",
      label: "Docs",
      href: "https://myproject.com/docs"
    }
  ],
  iconName: "Rocket",
  createdAt: "2025-10-08T12:00:00.000Z"
}
```

#### AppStore

```typescript
export interface AppStore {
  // Copy button tracking (global state for "last copied" indicator)
  lastCopiedId: string | null;
  setLastCopied: (id: string) => void;
  clearLastCopied: () => void;

  // View preference (grid vs list)
  view: 'grid' | 'list';
  setView: (view: 'grid' | 'list') => void;

  // Sidebar state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Custom dashboard cards
  customCards: CustomCard[];
  addCustomCard: (card: Omit<CustomCard, 'id' | 'createdAt'>) => void;
  updateCustomCard: (
    id: string,
    updates: Partial<Omit<CustomCard, 'id' | 'createdAt'>>
  ) => void;
  deleteCustomCard: (id: string) => void;
}
```

**State Partitioning:**

- **Session-only:** `lastCopiedId` (not persisted)
- **Persisted:** `view`, `sidebarOpen`, `customCards`

**Persistence Configuration:**

```typescript
{
  name: 'app-storage',           // localStorage key
  version: 1,                     // Schema version
  partialize: (state) => ({
    view: state.view,
    sidebarOpen: state.sidebarOpen,
    customCards: state.customCards,
    // lastCopiedId excluded (session-only)
  }),
}
```

### Component Props Types

#### CardAction

**Location:** `src/lib/card-actions.ts`

```typescript
export interface CardAction {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}
```

**Field Descriptions:**

- `icon` - Lucide React icon component
- `label` - Action button text
- `onClick` - Click handler function
- `disabled` - Disable button (optional)
- `destructive` - Red/danger styling (optional)

**Example:**

```typescript
const actions: CardAction[] = [
  {
    icon: ExternalLink,
    label: 'Open',
    onClick: () => window.open(url),
  },
  {
    icon: Trash,
    label: 'Delete',
    onClick: () => deleteCard(),
    destructive: true,
  },
];
```

#### ActionModalProps

**Location:** `src/components/modals/action-modal.tsx`

```typescript
export interface ActionModalProps {
  visible: boolean;
  onClose: () => void;
  cardTitle: string;
  cardIcon: LucideIcon;
  actions: CardAction[];
}
```

#### CardFormData

**Location:** `src/components/dashboard/CardFormModal.tsx`

```typescript
type CardFormData = z.infer<typeof cardFormSchema>;

// Expands to:
interface CardFormData {
  title: string;
  links: {
    id: string;
    label: string;
    href: string;
  }[];
  iconName: string;
}
```

**Zod Schema:**

```typescript
const cardFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title too long'),
  links: z
    .array(
      z.object({
        id: z.string(),
        label: z.string().min(1, 'Label required').max(30, 'Max 30 characters'),
        href: z.string().refine(
          (val) => {
            if (val.startsWith('/')) return true;
            try {
              const url = new URL(val);
              return ['http:', 'https:'].includes(url.protocol);
            } catch {
              return false;
            }
          },
          { message: 'Must be valid http/https URL or path starting with /' }
        ),
      })
    )
    .min(1, 'At least 1 link required')
    .max(16, 'Maximum 16 links allowed'),
  iconName: z.string().min(1, 'Icon is required'),
});
```

**Validation Errors:**

```typescript
{
  title: { message: 'Title is required' },
  links: [
    { label: { message: 'Label required' } },
    { href: { message: 'Must be valid http/https URL or path starting with /' } }
  ],
  iconName: { message: 'Icon is required' }
}
```

## Icon System

### Curated Icon Names

**Location:** `src/lib/icon-utils.ts`

```typescript
export const CURATED_ICONS = [
  'Github',
  'Chrome',
  'Globe',
  'Mail',
  'Calendar',
  'Database',
  'Folder',
  'File',
  'Code',
  'Terminal',
  'Settings',
  'User',
  'Users',
  'Home',
  'Search',
  'Bell',
  'Heart',
  'Star',
  'Bookmark',
  'Link',
  'ExternalLink',
  'Download',
  'Upload',
  'Share',
  'Copy',
  'Trash',
  'Edit',
  'Plus',
  'Minus',
  'Check',
  'X',
  'ChevronRight',
  'ArrowRight',
  'Zap',
  'Sparkles',
  'Rocket',
  'Package',
  'Box',
  'ShoppingCart',
  'CreditCard',
  'DollarSign',
  'TrendingUp',
  'BarChart',
  'PieChart',
  'Activity',
  'Cpu',
  'HardDrive',
  'Cloud',
  'Server',
  'Smartphone',
] as const;

export type CuratedIconName = (typeof CURATED_ICONS)[number];
```

**Type Safety:**

- `as const` - Creates tuple type for exact string literals
- `CuratedIconName` - Union type of all icon names
- Runtime validation via `getIconComponent()`

**Icon Resolution:**

```typescript
export function getIconComponent(iconName: string): LucideIcon {
  const IconsMap = Icons as Record<string, unknown>;
  const Icon = IconsMap[iconName] as LucideIcon | undefined;
  return Icon || Icons.Link; // Fallback to Link icon
}
```

**Usage:**

```typescript
const Icon = getIconComponent('Rocket');
<Icon className="h-6 w-6" />
```

## State Migrations

### Zustand Persistence Migration

**Version 0 → Version 1:** Single `href` to `links` array

```typescript
migrate: (persistedState: unknown, version: number): AppStore | undefined => {
  if (version === 0 && persistedState && typeof persistedState === 'object') {
    try {
      const state = persistedState as Record<string, unknown>;
      const cards = Array.isArray(state.customCards) ? state.customCards : [];

      return {
        ...state,
        customCards: cards.map((card: unknown) => {
          if (card && typeof card === 'object') {
            const cardObj = card as Record<string, unknown>;
            // Convert old format to new format
            if ('href' in cardObj && !('links' in cardObj)) {
              return {
                ...cardObj,
                links: [
                  {
                    id: uuidv4(),
                    label: 'Open',
                    href: cardObj.href,
                  },
                ],
              };
            }
          }
          return card;
        }),
      } as AppStore;
    } catch (error) {
      console.error('Custom card migration failed:', error);
      return {
        ...(persistedState as unknown as AppStore),
        customCards: [],
      };
    }
  }
  return persistedState as AppStore | undefined;
};
```

**Migration Flow:**

1. Check version number (0 = old schema)
2. Iterate over `customCards` array
3. Find cards with `href` property (old format)
4. Convert to `links` array with single link
5. Fallback: Reset customCards on migration failure

## Future Database Schema (Supabase)

### Planned Tables

#### `custom_cards` Table

```sql
CREATE TABLE custom_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (char_length(title) <= 50),
  icon_name TEXT NOT NULL,
  links JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_custom_cards_user_id ON custom_cards(user_id);
CREATE INDEX idx_custom_cards_created_at ON custom_cards(created_at DESC);

-- Row-level security policies
ALTER TABLE custom_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cards"
  ON custom_cards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cards"
  ON custom_cards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cards"
  ON custom_cards FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cards"
  ON custom_cards FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_custom_cards_updated_at
  BEFORE UPDATE ON custom_cards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Column Descriptions:**

- `id` - Primary key (UUID v4)
- `user_id` - Foreign key to auth.users (cascade delete)
- `title` - Card title (max 50 chars, NOT NULL)
- `icon_name` - Lucide icon name (NOT NULL)
- `links` - JSONB array of link objects
- `created_at` - Timestamp (auto-set on insert)
- `updated_at` - Timestamp (auto-updated on change)

**JSONB `links` Structure:**

```json
[
  {
    "id": "uuid",
    "label": "Dashboard",
    "href": "https://example.com"
  },
  {
    "id": "uuid",
    "label": "Docs",
    "href": "/docs"
  }
]
```

**Constraints:**

- Title max length: 50 characters
- Links array: 1-16 items (enforced at application layer)
- User ID required (foreign key constraint)
- Row-level security enforced

#### `user_preferences` Table (Future)

```sql
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  view_preference TEXT DEFAULT 'grid' CHECK (view_preference IN ('grid', 'list')),
  sidebar_open BOOLEAN DEFAULT true,
  theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policies
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**Column Descriptions:**

- `user_id` - Primary key, foreign key to auth.users
- `view_preference` - 'grid' or 'list'
- `sidebar_open` - Boolean for sidebar state
- `theme` - 'light', 'dark', or 'system'
- `updated_at` - Last modification timestamp

### TypeScript Types for Supabase

```typescript
// Generated from Supabase schema
export interface Database {
  public: {
    Tables: {
      custom_cards: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          icon_name: string;
          links: CustomLink[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          icon_name: string;
          links: CustomLink[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          icon_name?: string;
          links?: CustomLink[];
          created_at?: string;
          updated_at?: string;
        };
      };
      user_preferences: {
        Row: {
          user_id: string;
          view_preference: 'grid' | 'list';
          sidebar_open: boolean;
          theme: 'light' | 'dark' | 'system';
          updated_at: string;
        };
        Insert: {
          user_id: string;
          view_preference?: 'grid' | 'list';
          sidebar_open?: boolean;
          theme?: 'light' | 'dark' | 'system';
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          view_preference?: 'grid' | 'list';
          sidebar_open?: boolean;
          theme?: 'light' | 'dark' | 'system';
          updated_at?: string;
        };
      };
    };
  };
}
```

**Usage with Supabase Client:**

```typescript
import { Database } from '@/types/supabase';

const supabase = createClient<Database>(url, key);

// Type-safe queries
const { data, error } = await supabase
  .from('custom_cards')
  .select('*')
  .returns<Database['public']['Tables']['custom_cards']['Row'][]>();
```

## Validation Schemas (Zod)

### Card Form Validation

**Location:** `src/components/dashboard/CardFormModal.tsx`

```typescript
import { z } from 'zod';

// Link validation
const customLinkSchema = z.object({
  id: z.string(),
  label: z.string().min(1, 'Label required').max(30, 'Max 30 characters'),
  href: z.string().refine(
    (val) => {
      // Allow internal paths starting with /
      if (val.startsWith('/')) return true;
      // For external URLs, validate http/https only
      try {
        const url = new URL(val);
        return ['http:', 'https:'].includes(url.protocol);
      } catch {
        return false;
      }
    },
    { message: 'Must be valid http/https URL or path starting with /' }
  ),
});

// Card validation
const cardFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title too long'),
  links: z
    .array(customLinkSchema)
    .min(1, 'At least 1 link required')
    .max(16, 'Maximum 16 links allowed'),
  iconName: z.string().min(1, 'Icon is required'),
});

type CardFormData = z.infer<typeof cardFormSchema>;
```

**Error Messages:**

- Title: "Title is required" | "Title too long"
- Links (array): "At least 1 link required" | "Maximum 16 links allowed"
- Link label: "Label required" | "Max 30 characters"
- Link href: "Must be valid http/https URL or path starting with /"
- Icon: "Icon is required"

### Auth Form Validation (Future)

```typescript
// Sign in schema
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Sign up schema
const signUpSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/[a-z]/, 'Password must contain a lowercase letter')
      .regex(/[0-9]/, 'Password must contain a number'),
    confirmPassword: z.string(),
    fullName: z.string().min(1, 'Name is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
```

## Data Relationships

### Current (localStorage)

```
User (Supabase Auth)
  ↓ (session)
AppStore (Zustand)
  ├── view: 'grid' | 'list'
  ├── sidebarOpen: boolean
  └── customCards: CustomCard[]
        ├── id: string
        ├── title: string
        ├── iconName: string
        ├── createdAt: string
        └── links: CustomLink[]
              ├── id: string
              ├── label: string
              └── href: string
```

### Future (Supabase Database)

```
auth.users (Supabase Auth)
  │
  ├── id (UUID) ──────────────┐
  │                            │
  └── email                    │
                               │
                               ↓ (foreign key)
                    custom_cards
                      ├── id (UUID, primary key)
                      ├── user_id (UUID, foreign key)
                      ├── title (TEXT)
                      ├── icon_name (TEXT)
                      ├── links (JSONB)
                      ├── created_at (TIMESTAMPTZ)
                      └── updated_at (TIMESTAMPTZ)

                               │
                               │
                               ↓ (foreign key)
                    user_preferences
                      ├── user_id (UUID, primary key)
                      ├── view_preference (TEXT)
                      ├── sidebar_open (BOOLEAN)
                      ├── theme (TEXT)
                      └── updated_at (TIMESTAMPTZ)
```

**Cascade Behavior:**

- Delete user → Delete all custom_cards (CASCADE)
- Delete user → Delete user_preferences (CASCADE)

## Type Utilities

### Type Inference from Zod

```typescript
// Define schema
const schema = z.object({ name: z.string() });

// Infer TypeScript type
type FormData = z.infer<typeof schema>;
// Equivalent to: { name: string }
```

### Omit Utility Types

```typescript
// Omit id and createdAt when creating new card
type NewCustomCard = Omit<CustomCard, 'id' | 'createdAt'>;

// Partial updates (all fields optional except id)
type CardUpdate = Partial<Omit<CustomCard, 'id' | 'createdAt'>>;
```

### Component Props Extensions

```typescript
// Extend native HTML props
interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'default' | 'destructive';
}

// Extend with custom props
interface CardProps extends React.ComponentProps<'div'> {
  onLongPress?: () => void;
}
```

## Runtime Type Checking

### Zod Parse

```typescript
import { z } from 'zod';

const schema = z.object({
  title: z.string(),
});

// Parse with error
try {
  const data = schema.parse(input); // Throws if invalid
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error(error.errors);
  }
}

// Safe parse (no throw)
const result = schema.safeParse(input);
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error.errors);
}
```

### Type Guards

```typescript
// User type guard
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' && obj !== null && 'id' in obj && 'email' in obj
  );
}

// CustomCard type guard
function isCustomCard(obj: unknown): obj is CustomCard {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'links' in obj &&
    Array.isArray((obj as CustomCard).links)
  );
}
```

## Data Constraints Summary

### Custom Cards

| Field     | Type     | Min | Max | Required | Default        |
| --------- | -------- | --- | --- | -------- | -------------- |
| id        | UUID     | -   | -   | ✅       | Auto-generated |
| title     | string   | 1   | 50  | ✅       | -              |
| iconName  | string   | 1   | -   | ✅       | 'Link'         |
| links     | array    | 1   | 16  | ✅       | []             |
| createdAt | ISO 8601 | -   | -   | ✅       | Auto-generated |

### Custom Links

| Field | Type   | Min | Max | Required | Format       |
| ----- | ------ | --- | --- | -------- | ------------ |
| id    | UUID   | -   | -   | ✅       | UUID v4      |
| label | string | 1   | 30  | ✅       | Plain text   |
| href  | string | 1   | -   | ✅       | URL or /path |

### User Preferences

| Field       | Type    | Values                    | Required | Default  |
| ----------- | ------- | ------------------------- | -------- | -------- |
| view        | enum    | 'grid', 'list'            | ✅       | 'grid'   |
| sidebarOpen | boolean | true, false               | ✅       | true     |
| theme       | enum    | 'light', 'dark', 'system' | ❌       | 'system' |

---

## AI Development Context

### Type Safety Principles

1. **TypeScript Strict Mode:** All types must be explicit
2. **Zod for Runtime Validation:** Don't trust external data
3. **Type Inference:** Use `z.infer<>` for form types
4. **No `any` Types:** Use `unknown` and type guards instead

### Schema Evolution Patterns

**Adding New Fields:**

```typescript
// 1. Update TypeScript interface
interface CustomCard {
  // ... existing fields
  newField?: string; // Optional for backward compatibility
}

// 2. Update Zod schema
const schema = z.object({
  // ... existing fields
  newField: z.string().optional(),
});

// 3. Update migration if needed
migrate: (state, version) => {
  if (version < 2) {
    return {
      ...state,
      customCards: state.customCards.map((card) => ({
        ...card,
        newField: 'default value',
      })),
    };
  }
};
```

**Removing Fields:**

```typescript
// 1. Make field optional first (deploy)
interface CustomCard {
  oldField?: string; // Deprecated
}

// 2. Update code to not use field

// 3. Remove from interface (next deploy)
// 4. Add cleanup migration
```

### Validation Error Handling

```typescript
// In forms
const { errors } = formState;

// Display errors
{errors.title && (
  <p className="text-red-500 text-sm">
    {errors.title.message}
  </p>
)}

// ARIA for accessibility
<Input
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && (
  <p id="email-error" className="text-red-500 text-sm">
    {errors.email.message}
  </p>
)}
```

---

**🤖 Generated with AI assistance using the docs-mcp POWER framework template**

**Last Updated:** 2025-10-08
**Schema Version:** 0.1.0
**Next Review:** When migrating to Supabase database or adding new data models
