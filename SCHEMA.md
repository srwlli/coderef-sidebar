# Data Schema Reference

**[Date]**: 2025-09-18
**[Schema Version]**: 1.0.0

## Overview

The Sidebar App data schema provides comprehensive data structures for a multi-purpose dashboard application as described in `{{readme_summary}}`. Built on PostgreSQL with Supabase integration following the architecture patterns outlined in `{{architecture_summary}}`, the schema supports authentication, note management, project tracking, and file storage. API interactions detailed in `{{api_summary}}` and component integrations referenced in `{{components_summary}}` rely on these foundational data structures.

## Schema Architecture

The data layer consists of three primary domains:

- **Authentication Domain**: User identity and session management
- **Application Domain**: Core business entities (notes, projects)
- **Storage Domain**: File and media management

```
┌─────────────────────────────────────────────────────────────────┐
│                     Authentication Domain                       │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │   auth.users    │ │  auth.sessions  │ │auth.user_metadata│   │
│  │   (Supabase)    │ │   (Supabase)    │ │   (Supabase)     │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                     Application Domain                          │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │      noted      │ │     projects    │ │   (future)      │   │
│  │   Core notes    │ │  Project data   │ │  Extensions     │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                      Storage Domain                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │storage.objects  │ │storage.buckets  │ │   File Policies │   │
│  │   File data     │ │  Bucket config  │ │   Access rules  │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Core Tables

### Notes Table (`noted`)

**Purpose**: Central repository for user notes with rich content support
**Location**: `database/noted-schema.sql`

```sql
CREATE TABLE noted (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (LENGTH(title) <= 255 AND LENGTH(title) > 0),
  description TEXT NOT NULL CHECK (LENGTH(description) <= 2000 AND LENGTH(description) > 0),
  project_name TEXT CHECK (project_name IS NULL OR LENGTH(project_name) <= 255),
  tags TEXT[] DEFAULT '{}',
  links JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  screenshots JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Field Specifications**:

| Field          | Type        | Constraints                           | Description                  |
| -------------- | ----------- | ------------------------------------- | ---------------------------- |
| `id`           | SERIAL      | PRIMARY KEY, AUTO_INCREMENT           | Unique identifier            |
| `user_id`      | UUID        | FOREIGN KEY, NOT NULL, CASCADE DELETE | Reference to auth.users      |
| `title`        | TEXT        | NOT NULL, LENGTH(1-255)               | Note title with validation   |
| `description`  | TEXT        | NOT NULL, LENGTH(1-2000)              | Note content body            |
| `project_name` | TEXT        | OPTIONAL, LENGTH(≤255)                | Associated project reference |
| `tags`         | TEXT[]      | DEFAULT '{}'                          | Array of searchable tags     |
| `links`        | JSONB       | DEFAULT '[]'                          | Structured link objects      |
| `images`       | JSONB       | DEFAULT '[]'                          | Image metadata objects       |
| `screenshots`  | JSONB       | DEFAULT '[]'                          | Screenshot metadata objects  |
| `created_at`   | TIMESTAMPTZ | DEFAULT NOW()                         | Creation timestamp           |
| `updated_at`   | TIMESTAMPTZ | DEFAULT NOW(), AUTO-UPDATE            | Modification timestamp       |

**TypeScript Interface**:

```typescript
interface DbNoted {
  id: number;
  user_id: string;
  title: string;
  description: string;
  project_name?: string;
  tags: string[];
  links: LinkObject[];
  images: ImageObject[];
  screenshots: ImageObject[];
  created_at: string;
  updated_at: string;
}

interface NotedData
  extends Omit<DbNoted, 'id' | 'user_id' | 'created_at' | 'updated_at'> {
  // Client-side data structure without database metadata
}
```

**JSON Schema Validation**:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255,
      "description": "Note title"
    },
    "description": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000,
      "description": "Note content"
    },
    "project_name": {
      "type": ["string", "null"],
      "maxLength": 255,
      "description": "Optional project association"
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string",
        "maxLength": 50
      },
      "maxItems": 20,
      "uniqueItems": true
    },
    "links": {
      "type": "array",
      "items": { "$ref": "#/definitions/LinkObject" },
      "maxItems": 10
    },
    "images": {
      "type": "array",
      "items": { "$ref": "#/definitions/ImageObject" },
      "maxItems": 10
    }
  },
  "required": ["title", "description"],
  "additionalProperties": false
}
```

**Validation Error Examples**:

```json
{
  "error": "validation_failed",
  "details": {
    "title": "Title must be between 1 and 255 characters",
    "description": "Description cannot be empty",
    "tags": "Maximum 20 tags allowed",
    "links": "Invalid URL format in links[0].url"
  }
}
```

### Projects Table (`projects`)

**Purpose**: User project portfolio and metadata management
**Location**: `docs/supabase/complete-setup.sql`

```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) NOT NULL,
  project_name VARCHAR(255) NOT NULL,
  description TEXT,
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Field Specifications**:

| Field          | Type         | Constraints           | Description                 |
| -------------- | ------------ | --------------------- | --------------------------- |
| `id`           | SERIAL       | PRIMARY KEY           | Unique identifier           |
| `user_id`      | UUID         | FOREIGN KEY, NOT NULL | Reference to auth.users     |
| `username`     | VARCHAR(50)  | NOT NULL              | User display name           |
| `project_name` | VARCHAR(255) | NOT NULL              | Project title               |
| `description`  | TEXT         | OPTIONAL              | Project description         |
| `notes`        | TEXT         | OPTIONAL              | Project notes and details   |
| `tags`         | TEXT[]       | DEFAULT '{}'          | Project categorization tags |
| `created_at`   | TIMESTAMPTZ  | DEFAULT NOW()         | Creation timestamp          |
| `updated_at`   | TIMESTAMPTZ  | DEFAULT NOW()         | Last update timestamp       |

**TypeScript Interface**:

```typescript
interface Project {
  id: number;
  user_id: string;
  username: string;
  project_name: string;
  description?: string;
  notes?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

interface CreateProjectRequest {
  project_name: string;
  description?: string;
  notes?: string;
  tags?: string[];
}
```

## JSONB Schema Definitions

### LinkObject Schema

**Purpose**: Structured link storage with metadata
**Used in**: `noted.links` field

```typescript
interface LinkObject {
  url: string; // Valid URL (required)
  title?: string; // Display title (optional)
  description?: string; // Link description (optional)
}
```

**JSON Schema**:

```json
{
  "definitions": {
    "LinkObject": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "format": "uri",
          "description": "Valid HTTP/HTTPS URL"
        },
        "title": {
          "type": "string",
          "maxLength": 255,
          "description": "Display title for the link"
        },
        "description": {
          "type": "string",
          "maxLength": 500,
          "description": "Optional description"
        }
      },
      "required": ["url"],
      "additionalProperties": false
    }
  }
}
```

**Example JSONB Data**:

```json
[
  {
    "url": "https://github.com/example/repo",
    "title": "Project Repository",
    "description": "Main codebase for the application"
  },
  {
    "url": "https://docs.example.com",
    "title": "Documentation",
    "description": "API documentation and guides"
  }
]
```

**Validation Errors**:

```json
{
  "error": "invalid_link_format",
  "details": {
    "field": "links[0].url",
    "message": "Please enter a valid URL",
    "received": "not-a-url",
    "expected": "Valid HTTP/HTTPS URL"
  }
}
```

### ImageObject Schema

**Purpose**: Image and file metadata with storage references
**Used in**: `noted.images`, `noted.screenshots` fields

```typescript
interface ImageObject {
  url: string; // Storage URL (required)
  alt?: string; // Accessibility text
  caption?: string; // User caption
  filename?: string; // Original filename
  size?: number; // File size in bytes
  type?: string; // MIME type
}
```

**JSON Schema**:

```json
{
  "definitions": {
    "ImageObject": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "format": "uri",
          "description": "Storage URL for the image"
        },
        "alt": {
          "type": "string",
          "maxLength": 255,
          "description": "Alt text for accessibility"
        },
        "caption": {
          "type": "string",
          "maxLength": 500,
          "description": "User-provided caption"
        },
        "filename": {
          "type": "string",
          "maxLength": 255,
          "description": "Original filename"
        },
        "size": {
          "type": "integer",
          "minimum": 0,
          "maximum": 5242880,
          "description": "File size in bytes (max 5MB)"
        },
        "type": {
          "type": "string",
          "enum": ["image/jpeg", "image/png", "image/webp", "image/gif"],
          "description": "MIME type"
        }
      },
      "required": ["url"],
      "additionalProperties": false
    }
  }
}
```

**Example JSONB Data**:

```json
[
  {
    "url": "https://storage.supabase.co/v1/object/public/noted-files/user-id/image1.jpg",
    "alt": "Screenshot of dashboard",
    "caption": "Updated dashboard design with new navigation",
    "filename": "dashboard-screenshot.jpg",
    "size": 1024000,
    "type": "image/jpeg"
  }
]
```

## Field Configuration Schema

### FieldConfig Types

**Purpose**: Dynamic form field configuration for the noted-module
**Source**: `packages/noted-module/src/lib/types/index.ts`

```typescript
type FieldType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'url'
  | 'tags'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'links'
  | 'images'
  | 'project-select';

interface BaseFieldConfig {
  key: string; // Unique field identifier
  label: string; // Display label
  type: FieldType; // Field type
  required?: boolean; // Validation requirement
  placeholder?: string; // Input placeholder
  description?: string; // Help text
  disabled?: boolean; // Input state
  autoFocus?: boolean; // Focus behavior
}
```

**Extended Field Configurations**:

```typescript
// Text field with length constraints
interface TextFieldConfig extends BaseFieldConfig {
  type: 'text' | 'email' | 'url';
  maxLength?: number; // Character limit
  minLength?: number; // Minimum length
  pattern?: string; // Regex validation
}

// Textarea with row configuration
interface TextAreaFieldConfig extends BaseFieldConfig {
  type: 'textarea';
  rows?: number; // Display rows
  maxLength?: number; // Character limit
  minLength?: number; // Minimum length
}

// Tags with quantity limits
interface TagsFieldConfig extends BaseFieldConfig {
  type: 'tags';
  maxTags?: number; // Maximum tags
  allowCustomTags?: boolean; // Custom tag creation
  suggestions?: string[]; // Predefined options
}

// Links with validation
interface LinksFieldConfig extends BaseFieldConfig {
  type: 'links';
  maxLinks?: number; // Maximum links
  allowTitleEdit?: boolean; // Title editing
  allowDescriptionEdit?: boolean; // Description editing
}

// Images with file constraints
interface ImagesFieldConfig extends BaseFieldConfig {
  type: 'images';
  maxFiles?: number; // File quantity limit
  maxFileSize?: number; // Size limit in bytes
  allowedTypes?: string[]; // MIME type restrictions
  allowCaptions?: boolean; // Caption support
}
```

**Form Schema Structure**:

```typescript
interface FormSchema {
  title: string; // Form title
  description?: string; // Form description
  fields: FieldConfig[]; // Field configurations
  submitText?: string; // Submit button text
  resetText?: string; // Reset button text
  successMessage?: string; // Success feedback
  table: string; // Target table name
  autoFields?: {
    // Auto-generated fields
    user_id?: boolean; // Add user context
    created_at?: boolean; // Add timestamp
    updated_at?: boolean; // Add update timestamp
  };
}
```

## Database Relationships

### Entity Relationship Diagram

```
┌─────────────────┐
│   auth.users    │
│                 │
│  id (UUID)      │◄─────────────────────┐
│  email          │                      │
│  created_at     │                      │
│  ...metadata    │                      │
└─────────────────┘                      │
                                         │
                              ┌──────────┴──────────┐
                              │                     │
                              │ FOREIGN KEY         │
                              │ ON DELETE CASCADE   │
                              │                     │
┌─────────────────┐          │          ┌─────────────────┐
│     noted       │          │          │    projects     │
│                 │          │          │                 │
│  id (SERIAL)    │          │          │  id (SERIAL)    │
│  user_id (UUID) │──────────┘          │  user_id (UUID) │
│  title          │                     │  project_name   │
│  description    │                     │  description    │
│  project_name   │ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ │  username       │
│  tags[]         │     (soft ref)      │  tags[]         │
│  links (JSONB)  │                     │  notes          │
│  images (JSONB) │                     │  created_at     │
│  screenshots    │                     │  updated_at     │
│  created_at     │                     └─────────────────┘
│  updated_at     │
└─────────────────┘

        │
        │ References files in
        │
        ▼
┌─────────────────┐
│ storage.objects │
│                 │
│  id             │
│  bucket_id      │
│  name           │
│  owner          │ (matches user_id)
│  metadata       │
│  created_at     │
└─────────────────┘
```

**Relationship Details**:

1. **User → Notes (1:N)**
   - Foreign Key: `noted.user_id` → `auth.users.id`
   - Cascade: DELETE CASCADE
   - Security: Row Level Security enforces user ownership

2. **User → Projects (1:N)**
   - Foreign Key: `projects.user_id` → `auth.users.id`
   - Cascade: DELETE CASCADE
   - Security: Row Level Security enforces user ownership

3. **Notes ↔ Projects (Soft Reference)**
   - Reference: `noted.project_name` matches `projects.project_name`
   - Type: Soft reference (no foreign key constraint)
   - Purpose: Flexible project association

4. **Notes → Storage (1:N)**
   - Reference: JSONB fields contain storage URLs
   - Security: Storage policies match user ownership
   - Structure: `/user_id/filename` path pattern

## Constraints and Validation

### Database Constraints

**Primary Key Constraints**:

```sql
-- Auto-incrementing primary keys
ALTER TABLE noted ADD CONSTRAINT noted_pkey PRIMARY KEY (id);
ALTER TABLE projects ADD CONSTRAINT projects_pkey PRIMARY KEY (id);
```

**Foreign Key Constraints**:

```sql
-- User references with cascade delete
ALTER TABLE noted ADD CONSTRAINT noted_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE projects ADD CONSTRAINT projects_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
```

**Check Constraints**:

```sql
-- String length validations
ALTER TABLE noted ADD CONSTRAINT noted_title_length
  CHECK (LENGTH(title) <= 255 AND LENGTH(title) > 0);

ALTER TABLE noted ADD CONSTRAINT noted_description_length
  CHECK (LENGTH(description) <= 2000 AND LENGTH(description) > 0);

ALTER TABLE noted ADD CONSTRAINT noted_project_name_length
  CHECK (project_name IS NULL OR LENGTH(project_name) <= 255);

-- Project constraints
ALTER TABLE projects ADD CONSTRAINT projects_username_length
  CHECK (LENGTH(username) <= 50 AND LENGTH(username) > 0);

ALTER TABLE projects ADD CONSTRAINT projects_name_length
  CHECK (LENGTH(project_name) <= 255 AND LENGTH(project_name) > 0);
```

**JSONB Validation Functions**:

```sql
-- Validate link objects structure
CREATE OR REPLACE FUNCTION validate_links(links JSONB)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if all elements have required url field
  RETURN (
    SELECT bool_and(
      (link->>'url') IS NOT NULL AND
      (link->>'url') ~ '^https?://'
    )
    FROM jsonb_array_elements(links) AS link
  );
END;
$$ LANGUAGE plpgsql;

-- Validate image objects structure
CREATE OR REPLACE FUNCTION validate_images(images JSONB)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT bool_and(
      (image->>'url') IS NOT NULL AND
      (image->>'url') ~ '^https?://' AND
      COALESCE((image->>'size')::INTEGER, 0) <= 5242880
    )
    FROM jsonb_array_elements(images) AS image
  );
END;
$$ LANGUAGE plpgsql;
```

### TypeScript/Zod Validation

**Client-side Validation Schema**:

```typescript
import { z } from 'zod';

// Link validation schema
const linkSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
  title: z.string().max(255).optional(),
  description: z.string().max(500).optional(),
});

// Image validation schema
const imageSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
  alt: z.string().max(255).optional(),
  caption: z.string().max(500).optional(),
  filename: z.string().max(255).optional(),
  size: z.number().int().min(0).max(5242880).optional(),
  type: z
    .enum(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
    .optional(),
});

// Complete note validation schema
const noteSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be 255 characters or less'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(2000, 'Description must be 2000 characters or less'),
  project_name: z
    .string()
    .max(255, 'Project name must be 255 characters or less')
    .optional()
    .or(z.literal('')),
  tags: z
    .array(z.string().max(50))
    .max(20, 'Maximum 20 tags allowed')
    .default([]),
  links: z.array(linkSchema).max(10, 'Maximum 10 links allowed').default([]),
  images: z.array(imageSchema).max(10, 'Maximum 10 images allowed').default([]),
  screenshots: z
    .array(imageSchema)
    .max(10, 'Maximum 10 screenshots allowed')
    .default([]),
});
```

**Validation Error Response Schema**:

```typescript
interface ValidationError {
  success: false;
  errors: Record<string, string>;
}

// Example validation error
const validationError: ValidationError = {
  success: false,
  errors: {
    title: 'Title must be between 1 and 255 characters',
    description: 'Description is required',
    'links.0.url': 'Please enter a valid URL',
    tags: 'Maximum 20 tags allowed',
  },
};
```

## Row Level Security (RLS)

### Security Policies

**Notes Table Policies**:

```sql
-- Users can only access their own notes
CREATE POLICY "Users can view own notes" ON noted
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes" ON noted
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes" ON noted
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes" ON noted
  FOR DELETE USING (auth.uid() = user_id);
```

**Projects Table Policies**:

```sql
-- Users can only access their own projects
CREATE POLICY "Users can only see their own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only update their own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can only delete their own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);
```

**Storage Policies**:

```sql
-- File access policies with user isolation
CREATE POLICY "Users can upload own files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'noted-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'noted-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'noted-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

### Security Context

**Authentication Context Access**:

```sql
-- Current user ID in policies
auth.uid() -- Returns UUID of authenticated user

-- Usage in queries (automatic via RLS)
SELECT * FROM noted; -- Only returns user's notes
INSERT INTO noted (title, description) VALUES ('Test', 'Content'); -- Auto-adds user_id
```

**Storage Path Security**:

```
Storage Path Pattern: /bucket/user_id/filename
Example: /noted-files/123e4567-e89b-12d3-a456-426614174000/image.jpg

Policy Check: storage.foldername(name)[1] = auth.uid()::text
Result: Only user's files are accessible
```

## Performance Indexes

### Optimized Query Indexes

**Notes Table Indexes**:

```sql
-- Primary access patterns
CREATE INDEX idx_noted_user_id ON noted(user_id);
CREATE INDEX idx_noted_created_at ON noted(created_at DESC);
CREATE INDEX idx_noted_project_name ON noted(project_name) WHERE project_name IS NOT NULL;

-- Search and filtering
CREATE INDEX idx_noted_tags ON noted USING GIN(tags);
CREATE INDEX idx_noted_title_search ON noted USING GIN(to_tsvector('english', title));
CREATE INDEX idx_noted_description_search ON noted USING GIN(to_tsvector('english', description));

-- JSONB field indexes
CREATE INDEX idx_noted_links ON noted USING GIN(links);
CREATE INDEX idx_noted_images ON noted USING GIN(images);
```

**Projects Table Indexes**:

```sql
-- Primary access patterns
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_name ON projects(project_name);

-- Search indexes
CREATE INDEX idx_projects_tags ON projects USING GIN(tags);
CREATE INDEX idx_projects_search ON projects USING GIN(to_tsvector('english', project_name || ' ' || COALESCE(description, '')));
```

**Query Performance Examples**:

```sql
-- Fast user notes retrieval (uses idx_noted_user_id + idx_noted_created_at)
SELECT * FROM noted
WHERE user_id = auth.uid()
ORDER BY created_at DESC
LIMIT 20;

-- Efficient tag search (uses idx_noted_tags)
SELECT * FROM noted
WHERE user_id = auth.uid()
AND tags @> ARRAY['frontend'];

-- Project-filtered notes (uses idx_noted_project_name)
SELECT * FROM noted
WHERE user_id = auth.uid()
AND project_name = 'sidebar-app';
```

## Database Functions and Triggers

### Automated Timestamp Updates

```sql
-- Generic timestamp update function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to noted table
CREATE TRIGGER update_noted_updated_at_trigger
  BEFORE UPDATE ON noted
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply to projects table
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Data Validation Functions

```sql
-- JSONB array length validation
CREATE OR REPLACE FUNCTION validate_array_length(
  arr JSONB,
  max_length INTEGER
) RETURNS BOOLEAN AS $$
BEGIN
  RETURN jsonb_array_length(arr) <= max_length;
END;
$$ LANGUAGE plpgsql;

-- Tag validation with length limits
CREATE OR REPLACE FUNCTION validate_tags(tags TEXT[])
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    array_length(tags, 1) IS NULL OR
    (array_length(tags, 1) <= 20 AND
     NOT EXISTS (
       SELECT 1 FROM unnest(tags) AS tag
       WHERE LENGTH(tag) > 50 OR LENGTH(tag) = 0
     ))
  );
END;
$$ LANGUAGE plpgsql;

-- Apply validation triggers
CREATE TRIGGER validate_noted_tags_trigger
  BEFORE INSERT OR UPDATE ON noted
  FOR EACH ROW
  WHEN (NOT validate_tags(NEW.tags))
  EXECUTE FUNCTION reject_invalid_data();
```

## Migration Patterns

### Schema Evolution Strategy

**Version 1.0.0 → 1.1.0 Example**:

```sql
-- Add new optional fields
ALTER TABLE noted ADD COLUMN IF NOT EXISTS priority INTEGER DEFAULT 0;
ALTER TABLE noted ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';

-- Add validation constraints
ALTER TABLE noted ADD CONSTRAINT noted_priority_range
  CHECK (priority >= 0 AND priority <= 5);

ALTER TABLE noted ADD CONSTRAINT noted_status_values
  CHECK (status IN ('active', 'archived', 'deleted'));

-- Update indexes
CREATE INDEX IF NOT EXISTS idx_noted_status ON noted(status)
  WHERE status != 'deleted';

-- Backward compatibility maintained
```

**TypeScript Interface Updates**:

```typescript
// Version 1.1.0 - Backward compatible
interface DbNoted {
  id: number;
  user_id: string;
  title: string;
  description: string;
  project_name?: string;
  tags: string[];
  links: LinkObject[];
  images: ImageObject[];
  screenshots: ImageObject[];
  // New fields with defaults
  priority?: number; // Default: 0
  status?: 'active' | 'archived' | 'deleted'; // Default: 'active'
  created_at: string;
  updated_at: string;
}
```

---

## AI-Focused Footer

This schema documentation was generated using the POWER framework for comprehensive data structure reference. The structure follows modern database design patterns optimized for both human developers and AI system analysis, providing clear entity relationships, validation rules, security policies, and practical examples for efficient data layer understanding and implementation.

**Framework**: POWER
**Purpose**: Data schema reference
**Generated**: 2025-09-18
**Store As**: schema_summary
