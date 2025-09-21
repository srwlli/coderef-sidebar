# API Reference

**[Date]**: 2025-09-20
**[Version]**: 0.1.0

## Overview

The Sidebar App API leverages Supabase as the primary backend service, providing a comprehensive interface for authentication, data management, and real-time functionality. As referenced in `{{readme_summary}}`, the application serves as a multi-purpose dashboard with modular architecture. The API design follows the patterns described in `{{architecture_summary}}`, implementing a client-side integration model with direct Supabase client interactions.

## Architecture Pattern

Unlike traditional REST APIs, this application uses Supabase's client-side SDK pattern, where the frontend directly communicates with Supabase services through auto-generated, type-safe client libraries. This approach provides:

- **Direct Database Access**: Type-safe queries with automatic TypeScript generation
- **Real-time Subscriptions**: WebSocket connections for live data updates
- **Row-Level Security**: Database-enforced authorization policies
- **Optimistic Updates**: Client-side state management with server reconciliation

## Authentication

### Authentication Endpoints

All authentication is handled through Supabase Auth service integration.

#### Sign In

**Endpoint**: Supabase Auth (`signInWithPassword`)
**Method**: Client SDK
**Description**: Authenticate user with email and password

```typescript
// Client SDK Usage
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure_password',
});
```

**Request Schema**:

```typescript
interface SignInRequest {
  email: string; // Valid email address
  password: string; // Minimum 6 characters
}
```

**Response Schema**:

```typescript
interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    display_name?: string;
    avatar_url?: string;
  };
  created_at: string;
  updated_at: string;
}
```

**Example Response**:

```json
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "user_metadata": {
      "full_name": "John Doe",
      "display_name": "John"
    },
    "created_at": "2025-09-18T10:00:00Z",
    "updated_at": "2025-09-18T10:00:00Z"
  },
  "session": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "v1.MR5twH7hKpDxCnlBtqWXMg...",
    "expires_in": 3600,
    "token_type": "bearer"
  }
}
```

#### Sign Up

**Endpoint**: Supabase Auth (`signUp`)
**Method**: Client SDK

```typescript
// Client SDK Usage
const { data, error } = await supabase.auth.signUp({
  email: 'newuser@example.com',
  password: 'secure_password',
  options: {
    data: {
      display_name: 'New User',
      full_name: 'New User',
    },
  },
});
```

#### Sign Out

**Endpoint**: Supabase Auth (`signOut`)
**Method**: Client SDK

```typescript
// Client SDK Usage
const { error } = await supabase.auth.signOut();
```

#### Password Reset

**Endpoint**: Supabase Auth (`resetPasswordForEmail`)
**Method**: Client SDK

```typescript
// Client SDK Usage
const { error } = await supabase.auth.resetPasswordForEmail('user@example.com');
```

### Authentication Headers

All database operations automatically include authentication headers when using the Supabase client:

```typescript
// Automatic header injection
Authorization: Bearer<jwt_token>;
```

### Session Management

Sessions are automatically managed by the Supabase client with:

- **Auto-refresh**: Tokens automatically refreshed before expiration
- **Persistent storage**: Sessions stored in localStorage/sessionStorage
- **Real-time updates**: Auth state changes broadcasted to all clients

## Data Endpoints

### Notes Management

The primary data interface revolves around the Notes (Noted) system, implemented through the custom noted-module package.

#### Fetch Notes

**Table**: `noted`
**Method**: `SELECT`
**Authentication**: Required
**Authorization**: Row-Level Security (user_id = auth.uid())

```typescript
// Client SDK Usage
const { data, error } = await supabase
  .from('noted')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });
```

**cURL Equivalent**:

```bash
curl -X GET \
  'https://your-project.supabase.co/rest/v1/noted?user_id=eq.user_id&order=created_at.desc' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'apikey: YOUR_ANON_KEY'
```

**Response Schema**:

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

interface LinkObject {
  url: string;
  title?: string;
  description?: string;
}

interface ImageObject {
  url: string;
  alt?: string;
  caption?: string;
  filename?: string;
  size?: number;
  type?: string;
}
```

**Example Response**:

```json
[
  {
    "id": 1,
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Project Planning Notes",
    "description": "Initial planning and architecture decisions for the new feature.",
    "project_name": "sidebar-app",
    "tags": ["planning", "architecture", "frontend"],
    "links": [
      {
        "url": "https://github.com/example/repo",
        "title": "Project Repository",
        "description": "Main codebase"
      }
    ],
    "images": [],
    "screenshots": [],
    "created_at": "2025-09-18T10:30:00Z",
    "updated_at": "2025-09-18T10:30:00Z"
  }
]
```

#### Create Note

**Table**: `noted`
**Method**: `INSERT`
**Authentication**: Required

```typescript
// Client SDK Usage
const { data, error } = await supabase
  .from('noted')
  .insert({
    title: 'New Note',
    description: 'Note content...',
    tags: ['tag1', 'tag2'],
    links: [],
    images: [],
    screenshots: [],
  })
  .select();
```

**Request Schema**:

```typescript
interface CreateNoteRequest {
  title: string; // Required, max 255 chars
  description: string; // Required, max 10000 chars
  project_name?: string; // Optional
  tags: string[]; // Array of strings
  links: LinkObject[]; // Array of link objects
  images: ImageObject[]; // Array of image objects
  screenshots: ImageObject[]; // Array of image objects
}
```

**Validation Rules**:

- `title`: Required, 1-255 characters
- `description`: Required, 1-10000 characters
- `tags`: Array, each tag max 50 characters
- `links`: Array, each URL must be valid format
- `images`/`screenshots`: Array, each URL must be valid format

#### Update Note

**Table**: `noted`
**Method**: `UPDATE`
**Authentication**: Required
**Authorization**: User can only update their own notes

```typescript
// Client SDK Usage
const { data, error } = await supabase
  .from('noted')
  .update({
    title: 'Updated Title',
    description: 'Updated content...',
  })
  .eq('id', noteId)
  .eq('user_id', user.id)
  .select();
```

#### Delete Note

**Table**: `noted`
**Method**: `DELETE`
**Authentication**: Required
**Authorization**: User can only delete their own notes

```typescript
// Client SDK Usage
const { error } = await supabase
  .from('noted')
  .delete()
  .eq('id', noteId)
  .eq('user_id', user.id);
```

### Real-time Subscriptions

**Endpoint**: WebSocket Connection
**Authentication**: JWT token in connection headers

```typescript
// Subscribe to note changes
const subscription = supabase
  .channel('noted_changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'noted',
      filter: `user_id=eq.${user.id}`,
    },
    (payload) => {
      console.log('Note changed:', payload);
      // Handle real-time updates
    }
  )
  .subscribe();
```

**Supported Events**:

- `INSERT`: New note created
- `UPDATE`: Note modified
- `DELETE`: Note removed

## Error Handling

### Standard Error Response

All errors follow a consistent format:

```typescript
interface APIError {
  error: {
    message: string;
    details?: string;
    hint?: string;
    code?: string;
  };
}
```

### Common Error Codes

| HTTP Status | Code       | Description                 | Example                         |
| ----------- | ---------- | --------------------------- | ------------------------------- |
| 400         | `22001`    | String data too long        | Title exceeds 255 characters    |
| 401         | `PGRST301` | JWT token invalid/expired   | Authentication required         |
| 403         | `42501`    | Insufficient privileges     | Cannot access other user's data |
| 404         | `PGRST116` | Resource not found          | Note with ID does not exist     |
| 409         | `23505`    | Unique constraint violation | Duplicate record attempt        |
| 422         | `23514`    | Check constraint violation  | Invalid field value             |
| 500         | `XX000`    | Internal server error       | Database connection failed      |

### Error Response Examples

**Authentication Error**:

```json
{
  "error": {
    "message": "JWT expired",
    "code": "PGRST301"
  }
}
```

**Validation Error**:

```json
{
  "error": {
    "message": "new row for relation \"noted\" violates check constraint \"title_length\"",
    "details": "Failing row contains (title with more than 255 characters...)",
    "hint": "Title must be between 1 and 255 characters",
    "code": "23514"
  }
}
```

**Authorization Error**:

```json
{
  "error": {
    "message": "new row violates row-level security policy for table \"noted\"",
    "code": "42501"
  }
}
```

## Rate Limiting

### Supabase Built-in Limits

| Operation                 | Limit          | Window      | Description                |
| ------------------------- | -------------- | ----------- | -------------------------- |
| **Authentication**        | 30 requests    | 1 hour      | Sign in/up attempts per IP |
| **Database Queries**      | 200 requests   | 1 minute    | Per authenticated user     |
| **Real-time Connections** | 100 concurrent | Per project | WebSocket connections      |
| **Storage Uploads**       | 100 MB         | Per file    | File size limit            |

### Rate Limit Headers

```http
X-RateLimit-Limit: 200
X-RateLimit-Remaining: 195
X-RateLimit-Reset: 1695040800
X-RateLimit-Type: requests_per_minute
```

### Rate Limit Error Response

```json
{
  "error": {
    "message": "API rate limit exceeded",
    "code": "PGRST_RATE_LIMIT",
    "details": "200 requests per minute exceeded"
  }
}
```

## Pagination

### Database Pagination

Supabase provides built-in pagination through `range()` method:

```typescript
// Fetch notes with pagination
const pageSize = 20;
const page = 1;
const start = (page - 1) * pageSize;
const end = start + pageSize - 1;

const { data, error, count } = await supabase
  .from('noted')
  .select('*', { count: 'exact' })
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })
  .range(start, end);
```

### Pagination Response

```typescript
interface PaginatedResponse<T> {
  data: T[];
  count: number | null;
  error: APIError | null;
}
```

### Pagination Headers

```http
Content-Range: 0-19/45
Accept-Ranges: items
```

### Cursor-based Pagination

For real-time data and large datasets:

```typescript
// Cursor-based pagination using timestamps
const { data, error } = await supabase
  .from('noted')
  .select('*')
  .eq('user_id', user.id)
  .lt('created_at', lastCreatedAt)
  .order('created_at', { ascending: false })
  .limit(20);
```

## Security Considerations

### Row-Level Security (RLS)

All tables implement RLS policies:

```sql
-- Example RLS policy for noted table
CREATE POLICY "Users can view own notes" ON noted
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes" ON noted
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
```

### Data Validation

Client-side validation using Zod schemas:

```typescript
const noteSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(10000),
  tags: z.array(z.string().max(50)).default([]),
  links: z.array(linkSchema).default([]),
  images: z.array(imageSchema).default([]),
});
```

### Security Headers

Applied via Next.js configuration:

```http
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval'...
```

## SDK Integration Examples

### React Hook Integration

```typescript
// Custom hook for notes management
export function useNotes({ supabaseClient, user }: UseNotesProps) {
  const [notes, setNotes] = useState<DbNoted[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      const { data, error } = await supabaseClient
        .from('noted')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [supabaseClient, user]);

  return { notes, loading, error, fetchNotes };
}
```

### Form Integration

```typescript
// React Hook Form with Zod validation
const form = useForm<NotedData>({
  resolver: zodResolver(noteSchema),
  defaultValues: {
    title: '',
    description: '',
    tags: [],
    links: [],
    images: [],
  },
});

const onSubmit = async (data: NotedData) => {
  const { error } = await supabase.from('noted').insert(data);

  if (error) {
    toast({
      title: 'Error',
      description: error.message,
      type: 'error',
    });
  } else {
    toast({
      title: 'Success',
      description: 'Note saved successfully!',
      type: 'success',
    });
  }
};
```

## Performance Optimization

### Caching Strategy

TanStack Query for intelligent caching:

```typescript
const {
  data: notes,
  isLoading,
  error,
} = useQuery({
  queryKey: ['notes', user.id],
  queryFn: () => fetchNotes(),
  staleTime: 5 * 60 * 1000, // 5 minutes
  retry: 3,
});
```

### Optimistic Updates

```typescript
const mutation = useMutation({
  mutationFn: createNote,
  onMutate: async (newNote) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['notes']);

    // Snapshot previous value
    const previousNotes = queryClient.getQueryData(['notes']);

    // Optimistically update to new value
    queryClient.setQueryData(['notes'], (old) => [...old, newNote]);

    return { previousNotes };
  },
  onError: (err, newNote, context) => {
    // Rollback on error
    queryClient.setQueryData(['notes'], context.previousNotes);
  },
});
```

---

## Frontend Integration

### Header System API

**Purpose**: Standardized header components across application pages with consistent data integration
**Implementation**: Client-side React components with dynamic content from API responses

#### Header Data Endpoints

**Badge Content Sources**:

| Page             | Badge Data Source | API Query                                                    | Example Response            |
| ---------------- | ----------------- | ------------------------------------------------------------ | --------------------------- |
| Projects         | Project count     | `supabase.from('projects').select('id', { count: 'exact' })` | `{ count: 7 }`              |
| AI Tools         | Tool count        | Static array length calculation                              | `{ count: 14 }`             |
| AI Tools Prompts | Chain count       | Static array length calculation                              | `{ count: 2 }`              |
| Dashboard        | Section count     | Static configuration count                                   | `{ count: 7 }`              |
| Forms            | Status            | Static "Coming Soon" indicator                               | `{ status: "Coming Soon" }` |

#### Header Component API

```typescript
interface HeaderProps {
  icon: LucideIcon;
  title: string;
  badge?: {
    content: string | number;
    variant: 'default' | 'secondary' | 'outline';
  };
  actions?: React.ReactNode;
}

// Usage example
<PageHeader
  icon={FolderOpen}
  title="Projects"
  badge={{ content: `${projects.length} projects`, variant: "outline" }}
  actions={<Button onClick={onCreateProject}>New Project</Button>}
/>
```

#### Real-time Badge Updates

```typescript
// Projects page - real-time count updates
const { data: projects } = useQuery({
  queryKey: ['projects', user.id],
  queryFn: () => supabase.from('projects').select('*'),
  refetchOnWindowFocus: true,
});

// Badge automatically reflects current count
const badgeContent = `${projects?.length || 0} projects`;
```

## AI-Focused Footer

This API documentation was generated using the POWER framework for comprehensive technical interface reference. The structure follows modern API documentation patterns optimized for both human developers and AI system integration, providing clear schemas, error handling patterns, authentication flows, and practical integration examples for efficient system understanding and implementation. Updated to include the frontend header system integration patterns and data sources.

**Framework**: POWER
**Purpose**: Technical interface reference
**Generated**: 2025-09-20
**Store As**: api_summary
