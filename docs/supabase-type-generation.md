# Auto-Generate Database Types from Supabase

## Overview

Instead of manually maintaining TypeScript types for database tables, Supabase CLI can automatically generate them from your database schema.

## Setup

### Install Supabase CLI

```bash
npm install -g supabase
```

### Login to Supabase

```bash
supabase login
```

### Link to Project

```bash
supabase link --project-ref <your-project-ref>
```

Find your project ref in Supabase Dashboard → Settings → General → Reference ID

## Generate Types

### One-time Generation

```bash
supabase gen types typescript --project-id <your-project-id> > src/types/database.types.ts
```

### Watch Mode (Auto-regenerate on Schema Changes)

```bash
# Not supported directly, but can use nodemon
npm install --save-dev nodemon

# In package.json
{
  "scripts": {
    "db:types": "supabase gen types typescript --project-id <your-project-id> > src/types/database.types.ts",
    "db:types:watch": "nodemon --watch 'supabase/migrations/*.sql' --exec 'npm run db:types'"
  }
}
```

## Generated Types Structure

### Example Output

```typescript
// src/types/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      custom_cards: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          icon_name: string;
          links: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          icon_name: string;
          links: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          icon_name?: string;
          links?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'custom_cards_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
```

## Using Generated Types

### Type-safe Supabase Queries

```typescript
import { Database } from '@/types/database.types';
import { createClient } from '@supabase/supabase-js';

// Create typed client
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Now queries are fully typed
const { data, error } = await supabase
  .from('custom_cards')
  .select('*')
  .eq('user_id', userId);

// data is typed as Database['public']['Tables']['custom_cards']['Row'][]
```

## Integrating with Our Field Mapping

### Option 1: Use Generated Types + Conversion Layer

```typescript
// src/lib/api/field-mapping.ts
import { Database } from '@/types/database.types';

// Extract generated Row type
export type CustomCardRow = Database['public']['Tables']['custom_cards']['Row'];

// Our app type (camelCase)
export interface CustomCard {
  id: string;
  title: string;
  iconName: string; // converted from icon_name
  links: CustomLink[];
  createdAt: string; // converted from created_at
}

// Conversion function
export function dbToApp(row: CustomCardRow): CustomCard {
  return {
    id: row.id,
    title: row.title,
    iconName: row.icon_name,
    links: row.links as CustomLink[], // Cast Json to CustomLink[]
    createdAt: row.created_at,
  };
}
```

### Option 2: Extend Generated Types

```typescript
// src/types/database.types.ts (after generation)

// Keep generated types
export type { Database } from './database.types';

// Add camelCase variants
export interface CustomCard {
  id: string;
  title: string;
  iconName: string;
  links: CustomLink[];
  createdAt: string;
}

export interface CustomLink {
  id: string;
  label: string;
  href: string;
}
```

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/generate-types.yml
name: Generate Supabase Types

on:
  push:
    paths:
      - 'supabase/migrations/**'
  workflow_dispatch:

jobs:
  generate-types:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Supabase CLI
        run: npm install -g supabase

      - name: Generate types
        run: |
          supabase gen types typescript \
            --project-id ${{ secrets.SUPABASE_PROJECT_ID }} \
            > src/types/database.types.ts

      - name: Commit changes
        run: |
          git config --local user.name "GitHub Actions"
          git config --local user.email "actions@github.com"
          git add src/types/database.types.ts
          git commit -m "chore: regenerate database types" || echo "No changes"
          git push
```

## Benefits of Auto-Generated Types

1. **Always in sync**: Types match actual database schema
2. **Catch schema changes early**: TypeScript errors if schema changes
3. **Less manual work**: No need to manually update types
4. **Type-safe queries**: Full autocomplete and type checking
5. **Documentation**: Generated types serve as schema documentation

## Workflow

### When to Regenerate Types

```bash
# After creating a new migration
supabase migration new add_custom_cards_table
# Edit the migration SQL file
supabase db push
npm run db:types  # Regenerate types
```

### Development Workflow

```
1. Create migration file
   └─> supabase migration new <name>

2. Write SQL in migration file
   └─> supabase/migrations/xxx_<name>.sql

3. Push to database
   └─> supabase db push

4. Generate types
   └─> npm run db:types

5. Use types in code
   └─> import { Database } from '@/types/database.types'
```

## Handling JSONB Fields

Generated types use `Json` for JSONB columns:

```typescript
// Generated
Row: {
  links: Json; // Not specific enough
}

// Our fix
export interface CustomCardRow {
  id: string;
  user_id: string;
  title: string;
  icon_name: string;
  links: CustomLink[]; // Override Json with specific type
  created_at: string;
  updated_at: string;
}
```

### Type Assertion in Queries

```typescript
const { data } = await supabase.from('custom_cards').select('*').single();

// data.links is Json, need to assert
const links = data.links as CustomLink[];
```

## Keeping Both Approaches

We can use **both** generated types and manual field mapping:

```typescript
// Use generated types as source of truth for DB schema
import { Database } from '@/types/database.types';

// Manual types for app layer
import { CustomCard, CustomLink } from '@/stores/use-app-store';

// Conversion layer
type DbRow = Database['public']['Tables']['custom_cards']['Row'];

export function dbToApp(row: DbRow): CustomCard {
  return {
    id: row.id,
    title: row.title,
    iconName: row.icon_name,
    links: row.links as CustomLink[],
    createdAt: row.created_at,
  };
}
```

## Recommendation

**Use auto-generated types for database layer**, keep manual types for app layer:

```
Database Layer (snake_case)
  ↓ [Generated Types]
Database['public']['Tables']['custom_cards']['Row']
  ↓ [Field Mapping Layer]
App Layer (camelCase)
  ↓ [Manual Types]
CustomCard
```

This gives us:

- ✅ Type safety at DB boundary (auto-generated)
- ✅ Clean app types (manually maintained)
- ✅ Conversion layer catches mismatches

## NPM Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "db:types": "supabase gen types typescript --project-id <your-project-id> > src/types/database.types.ts",
    "db:migrate": "supabase db push && npm run db:types",
    "db:reset": "supabase db reset && npm run db:types"
  }
}
```

## See Also

- [Supabase Type Generation Docs](https://supabase.com/docs/guides/api/generating-types)
- `docs/field-name-mapping.md` - Our field mapping layer
- `src/types/database.types.ts` - Generated types (after running command)
