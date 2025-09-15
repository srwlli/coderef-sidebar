# Working Database Plan - Projects Table

## Overview

Comprehensive plan for implementing a PROJECTS table to store user-specific project data with expanded fields for description, notes, and tags.

## Core Requirements

- **Table**: PROJECTS
- **Primary Fields**: project_name, description, notes, tags
- **Access Control**: User-scoped (only creator can access)
- **Database**: Supabase (already configured)
- **ID System**: 4-digit random numbers (1000-9999)

## Expanded Schema (v2)

```sql
CREATE TABLE projects (
  id INTEGER DEFAULT (1000 + floor(random() * 9000)) PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  description TEXT,
  notes TEXT,
  tags TEXT[], -- Array of tag strings
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Field Specifications

| Field          | Type      | Required | Purpose                               |
| -------------- | --------- | -------- | ------------------------------------- |
| `id`           | INTEGER   | Yes      | Unique 4-digit identifier (1000-9999) |
| `user_id`      | UUID      | Yes      | Foreign key to auth.users             |
| `project_name` | TEXT      | Yes      | Display name for the project          |
| `description`  | TEXT      | No       | Longer project description/summary    |
| `notes`        | TEXT      | No       | Free-form notes and comments          |
| `tags`         | TEXT[]    | No       | Array of categorization tags          |
| `created_at`   | TIMESTAMP | Auto     | Record creation time                  |
| `updated_at`   | TIMESTAMP | Auto     | Last modification time                |

## Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Users can only access their own projects
CREATE POLICY "Users can access own projects" ON projects
  FOR ALL USING (auth.uid() = user_id);

-- Optional: Separate policies for different operations
CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);
```

## Indexes (Performance Optimization)

```sql
-- Index on user_id for faster user-specific queries
CREATE INDEX idx_projects_user_id ON projects(user_id);

-- Index on project_name for search functionality
CREATE INDEX idx_projects_name ON projects(project_name);

-- GIN index for tag array searches
CREATE INDEX idx_projects_tags ON projects USING GIN(tags);
```

## API Endpoints (Future Implementation)

```typescript
// Basic CRUD operations
GET    /api/projects          // List user's projects
POST   /api/projects          // Create new project
GET    /api/projects/:id      // Get specific project
PUT    /api/projects/:id      // Update project
DELETE /api/projects/:id      // Delete project

// Search and filtering
GET    /api/projects?search=  // Search by name/description
GET    /api/projects?tags=    // Filter by tags
```

## Database Functions (Future Enhancements)

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Future Considerations

### Phase 1 (MVP)

- [ ] Basic table creation
- [ ] RLS policies
- [ ] Simple CRUD API
- [ ] Basic UI for project management

### Phase 2 (Enhanced Features)

- [ ] Tag management system
- [ ] Search functionality
- [ ] Project templates
- [ ] Export/import capabilities

### Phase 3 (Advanced Features)

- [ ] Project sharing/collaboration
- [ ] Project categories/folders
- [ ] Advanced filtering
- [ ] Project statistics/analytics
- [ ] Integration with existing project pages

## Integration Points

### Current System Integration

- Link with existing project pages in `/projects/`
- User authentication via Supabase Auth
- Potential integration with existing project data

### UI Components Needed

- Project listing/grid view
- Project creation form
- Project edit form
- Tag management interface
- Search/filter components

## Data Migration Strategy

```sql
-- If migrating from existing data
-- INSERT INTO projects (user_id, project_name, description)
-- SELECT user_id, name, description FROM legacy_projects;
```

## Validation Rules

```typescript
// Client-side validation schema (Zod)
const ProjectSchema = z.object({
  project_name: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  notes: z.string().max(5000).optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
});
```

## Security Considerations

- RLS ensures user data isolation
- Input validation on all fields
- Rate limiting on API endpoints
- Audit logging for project modifications

---

_This is a working document - continue refining as requirements evolve._
