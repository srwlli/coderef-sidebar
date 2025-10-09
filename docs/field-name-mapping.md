# Field Name Mapping: Database ↔ Application

## Overview

Supabase uses PostgreSQL which follows `snake_case` naming conventions, while our TypeScript application uses `camelCase`. We need a conversion layer to translate between these formats.

## Naming Conventions

### Database (snake_case)

```sql
CREATE TABLE custom_cards (
  id uuid,
  user_id uuid,
  title text,
  icon_name text,
  links jsonb,
  created_at timestamptz,
  updated_at timestamptz
);
```

### Application (camelCase)

```typescript
interface CustomCard {
  id: string;
  userId: string; // ← user_id
  title: string;
  iconName: string; // ← icon_name
  links: CustomLink[];
  createdAt: string; // ← created_at
  updatedAt: string; // ← updated_at
}
```

## Field Mapping Table

| Database (snake_case) | Application (camelCase) | Type               | Notes                               |
| --------------------- | ----------------------- | ------------------ | ----------------------------------- |
| `id`                  | `id`                    | uuid/string        | No conversion needed                |
| `user_id`             | `userId`                | uuid/string        | Only in DB, not in app CustomCard   |
| `title`               | `title`                 | text/string        | No conversion needed                |
| `icon_name`           | `iconName`              | text/string        | **Needs conversion**                |
| `links`               | `links`                 | jsonb/CustomLink[] | No conversion needed (stored as is) |
| `created_at`          | `createdAt`             | timestamptz/string | **Needs conversion**                |
| `updated_at`          | `updatedAt`             | timestamptz/string | **Needs conversion**                |

## Implementation: Conversion Functions

### src/lib/api/field-mapping.ts

```typescript
import { CustomCard } from '@/stores/use-app-store';

/**
 * Database row from Supabase (snake_case)
 */
export interface CustomCardRow {
  id: string;
  user_id: string;
  title: string;
  icon_name: string;
  links: {
    id: string;
    label: string;
    href: string;
  }[];
  created_at: string;
  updated_at: string;
}

/**
 * Insert payload to Supabase (snake_case)
 */
export interface CustomCardInsert {
  user_id: string;
  title: string;
  icon_name: string;
  links: {
    id: string;
    label: string;
    href: string;
  }[];
}

/**
 * Update payload to Supabase (snake_case)
 */
export interface CustomCardUpdate {
  title?: string;
  icon_name?: string;
  links?: {
    id: string;
    label: string;
    href: string;
  }[];
}

/**
 * Convert database row (snake_case) to app model (camelCase)
 */
export function dbToApp(row: CustomCardRow): CustomCard {
  return {
    id: row.id,
    // user_id is NOT included in CustomCard (only used in DB queries)
    title: row.title,
    iconName: row.icon_name,
    links: row.links, // Already correct format
    createdAt: row.created_at,
    // updatedAt is NOT included in CustomCard (internal DB field)
  };
}

/**
 * Convert app model (camelCase) to insert payload (snake_case)
 * Requires user_id from auth context
 */
export function appToInsert(
  card: Omit<CustomCard, 'id' | 'createdAt'>,
  userId: string
): CustomCardInsert {
  return {
    user_id: userId,
    title: card.title,
    icon_name: card.iconName,
    links: card.links, // Already correct format
  };
}

/**
 * Convert app model updates (camelCase) to update payload (snake_case)
 */
export function appToUpdate(
  updates: Partial<Omit<CustomCard, 'id' | 'createdAt'>>
): CustomCardUpdate {
  const payload: CustomCardUpdate = {};

  if (updates.title !== undefined) {
    payload.title = updates.title;
  }

  if (updates.iconName !== undefined) {
    payload.icon_name = updates.iconName;
  }

  if (updates.links !== undefined) {
    payload.links = updates.links;
  }

  return payload;
}

/**
 * Type guard: Check if object is a valid database row
 */
export function isCustomCardRow(obj: unknown): obj is CustomCardRow {
  if (!obj || typeof obj !== 'object') return false;
  const row = obj as Record<string, unknown>;

  return (
    typeof row.id === 'string' &&
    typeof row.user_id === 'string' &&
    typeof row.title === 'string' &&
    typeof row.icon_name === 'string' &&
    Array.isArray(row.links) &&
    typeof row.created_at === 'string' &&
    typeof row.updated_at === 'string'
  );
}
```

## Usage in API Service

### src/lib/api/custom-cards.ts

```typescript
import { supabase } from '@/lib/supabase';
import { CustomCard } from '@/stores/use-app-store';
import {
  CustomCardRow,
  CustomCardInsert,
  CustomCardUpdate,
  dbToApp,
  appToInsert,
  appToUpdate,
} from './field-mapping';

/**
 * Fetch all custom cards for authenticated user
 */
export async function fetchCustomCardsFromSupabase(): Promise<CustomCard[]> {
  if (!supabase) throw new Error('Supabase not configured');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('custom_cards')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  if (error) throw error;

  // Convert all rows from snake_case to camelCase
  return (data as CustomCardRow[]).map(dbToApp);
}

/**
 * Create custom card in Supabase
 */
export async function createCustomCardInSupabase(
  card: Omit<CustomCard, 'id' | 'createdAt'>
): Promise<CustomCard> {
  if (!supabase) throw new Error('Supabase not configured');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Convert app model to insert payload
  const insertPayload = appToInsert(card, user.id);

  const { data, error } = await supabase
    .from('custom_cards')
    .insert(insertPayload)
    .select()
    .single();

  if (error) throw error;

  // Convert returned row to app model
  return dbToApp(data as CustomCardRow);
}

/**
 * Update custom card in Supabase
 */
export async function updateCustomCardInSupabase(
  id: string,
  updates: Partial<Omit<CustomCard, 'id' | 'createdAt'>>
): Promise<CustomCard> {
  if (!supabase) throw new Error('Supabase not configured');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Convert app updates to DB payload
  const updatePayload = appToUpdate(updates);

  const { data, error } = await supabase
    .from('custom_cards')
    .update(updatePayload)
    .eq('id', id)
    .eq('user_id', user.id) // RLS enforcement
    .select()
    .single();

  if (error) throw error;

  // Convert returned row to app model
  return dbToApp(data as CustomCardRow);
}

/**
 * Delete custom card from Supabase
 */
export async function deleteCustomCardFromSupabase(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('custom_cards')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id); // RLS enforcement

  if (error) throw error;
}
```

## Data Flow Examples

### Creating a Card

```
User Input (UI)
  ↓
CustomCard (camelCase)
{
  title: "My Card",
  iconName: "Star",
  links: [...]
}
  ↓
appToInsert() + userId
  ↓
CustomCardInsert (snake_case)
{
  user_id: "abc-123",
  title: "My Card",
  icon_name: "Star",
  links: [...]
}
  ↓
Supabase INSERT
  ↓
CustomCardRow (snake_case)
{
  id: "def-456",
  user_id: "abc-123",
  title: "My Card",
  icon_name: "Star",
  links: [...],
  created_at: "2025-10-08T...",
  updated_at: "2025-10-08T..."
}
  ↓
dbToApp()
  ↓
CustomCard (camelCase)
{
  id: "def-456",
  title: "My Card",
  iconName: "Star",
  links: [...],
  createdAt: "2025-10-08T..."
}
  ↓
Zustand Store
```

### Fetching Cards

```
Supabase SELECT
  ↓
CustomCardRow[] (snake_case)
[
  {
    id: "...",
    user_id: "...",
    icon_name: "...",
    created_at: "...",
    ...
  }
]
  ↓
.map(dbToApp)
  ↓
CustomCard[] (camelCase)
[
  {
    id: "...",
    iconName: "...",
    createdAt: "...",
    ...
  }
]
  ↓
Zustand Store
```

### Updating a Card

```
User Updates (UI)
  ↓
Partial<CustomCard> (camelCase)
{
  iconName: "Rocket"
}
  ↓
appToUpdate()
  ↓
CustomCardUpdate (snake_case)
{
  icon_name: "Rocket"
}
  ↓
Supabase UPDATE
  ↓
CustomCardRow (snake_case)
{
  id: "...",
  icon_name: "Rocket",
  updated_at: "2025-10-08T..." (auto-updated by trigger)
}
  ↓
dbToApp()
  ↓
CustomCard (camelCase)
{
  id: "...",
  iconName: "Rocket",
  createdAt: "..."
}
  ↓
Zustand Store
```

## Type Safety Guarantees

### Compile-Time Checks

```typescript
// ✅ Correct - using camelCase in app
const card: CustomCard = {
  id: '123',
  title: 'Test',
  iconName: 'Star', // camelCase
  links: [],
  createdAt: '2025-10-08',
};

// ❌ TypeScript Error - wrong case
const badCard: CustomCard = {
  id: '123',
  title: 'Test',
  icon_name: 'Star', // Error: Property doesn't exist
  links: [],
  created_at: '2025-10-08', // Error: Property doesn't exist
};

// ✅ Correct - DB row uses snake_case
const dbRow: CustomCardRow = {
  id: '123',
  user_id: 'abc',
  title: 'Test',
  icon_name: 'Star', // snake_case
  links: [],
  created_at: '2025-10-08',
  updated_at: '2025-10-08',
};
```

### Runtime Validation

```typescript
// Validate DB response
const data = await supabase.from('custom_cards').select('*');

if (isCustomCardRow(data[0])) {
  // TypeScript knows this is CustomCardRow
  const card = dbToApp(data[0]); // Safe conversion
} else {
  throw new Error('Invalid data structure from database');
}
```

## Benefits of This Approach

1. **Type Safety**: TypeScript enforces correct field names at compile time
2. **Single Source of Truth**: Conversion logic in one place
3. **Testable**: Pure functions easy to unit test
4. **Maintainable**: Add new fields in one place, conversions update automatically
5. **Clear Boundaries**: DB layer vs App layer separation
6. **Auto-completion**: IDEs suggest correct field names

## Testing

### Unit Tests for Conversion Functions

```typescript
import { describe, it, expect } from 'vitest';
import { dbToApp, appToInsert, appToUpdate } from './field-mapping';

describe('Field Mapping', () => {
  describe('dbToApp', () => {
    it('converts snake_case to camelCase', () => {
      const dbRow = {
        id: '123',
        user_id: 'abc',
        title: 'Test',
        icon_name: 'Star',
        links: [],
        created_at: '2025-10-08T00:00:00Z',
        updated_at: '2025-10-08T00:00:00Z',
      };

      const result = dbToApp(dbRow);

      expect(result).toEqual({
        id: '123',
        title: 'Test',
        iconName: 'Star', // Converted
        links: [],
        createdAt: '2025-10-08T00:00:00Z', // Converted
      });

      // user_id and updated_at not included
      expect(result).not.toHaveProperty('user_id');
      expect(result).not.toHaveProperty('updated_at');
    });
  });

  describe('appToInsert', () => {
    it('converts camelCase to snake_case', () => {
      const appCard = {
        title: 'Test',
        iconName: 'Star',
        links: [],
      };

      const result = appToInsert(appCard, 'user-123');

      expect(result).toEqual({
        user_id: 'user-123', // Added
        title: 'Test',
        icon_name: 'Star', // Converted
        links: [],
      });
    });
  });

  describe('appToUpdate', () => {
    it('converts partial updates', () => {
      const updates = {
        iconName: 'Rocket',
      };

      const result = appToUpdate(updates);

      expect(result).toEqual({
        icon_name: 'Rocket', // Converted
      });

      // Other fields not included
      expect(result).not.toHaveProperty('title');
      expect(result).not.toHaveProperty('links');
    });

    it('handles empty updates', () => {
      const result = appToUpdate({});
      expect(result).toEqual({});
    });
  });
});
```

## Alternative Approaches Considered

### 1. Auto-conversion Library (e.g., humps, camelcase-keys)

**Rejected:** Adds dependency, harder to debug, less type-safe

### 2. Use snake_case in App

**Rejected:** Breaks TypeScript conventions, bad DX

### 3. Supabase with camelCase

**Rejected:** PostgreSQL convention is snake_case, would confuse DBAs

### 4. Manual conversion everywhere

**Rejected:** Error-prone, hard to maintain

## Migration Plan

If we ever add new fields:

1. **Add to Database:**

   ```sql
   ALTER TABLE custom_cards ADD COLUMN new_field text;
   ```

2. **Update CustomCardRow:**

   ```typescript
   export interface CustomCardRow {
     // ...existing fields
     new_field: string;
   }
   ```

3. **Update CustomCard:**

   ```typescript
   export interface CustomCard {
     // ...existing fields
     newField: string;
   }
   ```

4. **Update dbToApp:**

   ```typescript
   export function dbToApp(row: CustomCardRow): CustomCard {
     return {
       // ...existing mappings
       newField: row.new_field,
     };
   }
   ```

5. **Update appToInsert/appToUpdate as needed**

TypeScript will enforce all changes at compile time!

## See Also

- `src/lib/api/field-mapping.ts` - Implementation (to be created)
- `src/lib/api/custom-cards.ts` - Usage (Task 5)
- `src/types/database.ts` - Database types (Task 4)
