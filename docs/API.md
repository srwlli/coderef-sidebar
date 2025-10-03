# API Integration Guide

**Application Type**: Next.js 15.5.2 with App Router
**Backend**: Supabase (PostgreSQL with Auth)
**Architecture**: Client-side rendered with Supabase integration
**Last Updated**: 2025-10-03

---

## Overview

The Sidebar App uses **client-side Supabase integration** rather than traditional REST API endpoints. All data operations and authentication go through Supabase's built-in APIs with Row Level Security (RLS) for data protection.

### Architecture Pattern

```
Frontend (Next.js Client) ↔ Supabase Client ↔ Supabase Backend
```

### Key Characteristics

- ✅ No custom API endpoints exposed
- ✅ All data operations through Supabase client
- ✅ Row Level Security (RLS) implemented
- ✅ Comprehensive security headers configured
- ✅ Client-side route protection via AuthProvider
- ⚠️ Middleware authentication disabled (client-side only)

---

## Authentication

Supabase Auth handles all authentication with email/password sessions. The `AuthProvider` wraps the app, providing `useAuth()` for components. RLS policies ensure authenticated users only access their own records.

### Auth Configuration

```typescript
createSupabaseClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
```

### Common Auth Operations

**Location**: `src/lib/auth-context.tsx`

```typescript
// Using the auth context
const { user, signIn, signOut, loading } = useAuth();

// Sign In
await signIn({ email, password });
// Internally calls:
await supabase.auth.signInWithPassword({ email, password });

// Sign Up
await supabase.auth.signUp({
  email,
  password,
  options: { data: { display_name: username } },
});

// Sign Out
await signOut();
// Internally calls:
await supabase.auth.signOut();

// Password Reset
await supabase.auth.resetPasswordForEmail(email);
```

### Session Management

- ✅ Automatic session refresh
- ✅ Session persistence across browser sessions
- ✅ Session detection in URL (for magic links)
- ✅ Client-side route protection

### Route Protection

**Current Implementation**: Client-side only through AuthProvider context

**Location**: `src/middleware.ts` (currently disabled)

```typescript
export async function middleware() {
  // IMPORTANT: Disabled to prevent conflicts with client-side navigation
  // Using client-side auth protection instead
  return NextResponse.next();
}
```

---

## Database Operations

### Projects API

**Table**: `projects`
**Operations**: `select`, `insert`, `update`, `delete`
**Security**: RLS ties rows to `user_id`

#### Fetch Projects

```typescript
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });
```

#### Insert Project

**Location**: `src/components/forms/ProjectForm.tsx`

```typescript
const { data: insertedData, error } = await supabase
  .from('projects')
  .insert([
    {
      user_id: user.id,
      project_name,
      description,
      tags,
    },
  ])
  .select()
  .single();
```

#### Update Project

```typescript
const { error: updateError } = await supabase
  .from('projects')
  .update({
    description,
    notes,
    updated_at: new Date().toISOString(),
  })
  .eq('id', projectId)
  .eq('user_id', user.id);
```

#### Delete Project

```typescript
const { error } = await supabase
  .from('projects')
  .delete()
  .eq('id', projectId)
  .eq('user_id', user.id);
```

### Row Level Security (RLS) Policies

**Location**: `docs/supabase/database-setup.sql`

```sql
-- Users can only see their own projects
CREATE POLICY "Users can only see their own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own projects
CREATE POLICY "Users can only insert their own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own projects
CREATE POLICY "Users can only update their own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only delete their own projects
CREATE POLICY "Users can only delete their own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);
```

---

## Realtime Subscriptions (Optional)

Realtime channels can be enabled to reflect project updates instantly.

```typescript
const channel = supabase.channel('projects_changes');

channel.on(
  'postgres_changes',
  {
    event: '*',
    schema: 'public',
    table: 'projects',
  },
  (payload) => {
    // Refresh local cache here
    console.log('Change received!', payload);
  }
);

channel.subscribe();

// Cleanup
return () => {
  supabase.removeChannel(channel);
};
```

---

## Security Configuration

### HTTP Security Headers

**Location**: `next.config.ts`

```typescript
// Prevent MIME type sniffing attacks
'X-Content-Type-Options': 'nosniff',

// Control referrer information
'Referrer-Policy': 'origin-when-cross-origin',

// Disable unnecessary browser features
'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',

// Force HTTPS connections
'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',

// Content Security Policy
'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; ..."
```

### Database Security

**Features**:

- ✅ Row Level Security enabled on all tables
- ✅ Foreign key constraints
- ✅ User-based data isolation
- ✅ Automatic user ID assignment
- ✅ Cascade delete on user removal

### Environment Variables

**Required for Supabase Integration**:

```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**Location**: `.env.local`

---

## Performance & Optimization

### Database Performance

**Indexes Implemented**:

```sql
-- Indexes for query performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

-- Automatic timestamp updates
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Client-Side Performance

**Patterns Implemented**:

- ✅ React Query integration for caching
- ✅ Component-level loading states
- ✅ Optimistic updates with error handling
- ✅ Form validation with Zod

### Scalability Considerations

**Current Limitations**:

- Client-side only operations may not scale for high-volume usage
- No caching layer between client and Supabase
- No rate limiting implemented
- Single table architecture may require optimization for complex queries

---

## Error Handling

### Best Practices

```typescript
try {
  const { data, error } = await supabase.from('projects').insert(projectData);

  if (error) {
    // Surface Supabase errors with toast notifications
    toast.error(`Failed to create project: ${error.message}`);
    console.error('Supabase error:', error);
    return;
  }

  // Success handling
  toast.success('Project created successfully');
  return data;
} catch (err) {
  // Catch unexpected errors
  console.error('Unexpected error:', err);
  toast.error('An unexpected error occurred');
}
```

### Common Error Types

- **Authentication Errors**: Invalid credentials, expired sessions
- **RLS Violations**: Attempting to access another user's data
- **Constraint Violations**: Missing required fields, invalid foreign keys
- **Network Errors**: Connection timeouts, offline mode

---

## Integration Guide

### Adding New Supabase Operations

1. **Create Database Schema** (if new table needed)
2. **Enable RLS** on the table
3. **Create RLS Policies** for user isolation
4. **Add Supabase Client Calls** in components/hooks
5. **Handle Errors** with toast notifications
6. **Validate Data** using Zod schemas

### Example: Adding a New Table

```sql
-- 1. Create table
CREATE TABLE new_table (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
CREATE POLICY "Users can only see their own records" ON new_table
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own records" ON new_table
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

```typescript
// 4. Use in component
const { data, error } = await supabase
  .from('new_table')
  .select('*')
  .eq('user_id', user.id);
```

### Testing Supabase Integration

```typescript
describe('Project API', () => {
  it('should create project with proper user association', async () => {
    const result = await supabase
      .from('projects')
      .insert(testProjectData)
      .select();

    expect(result.data[0].user_id).toBe(testUserId);
  });

  it('should prevent access to other users projects', async () => {
    const result = await supabase
      .from('projects')
      .select('*')
      .eq('id', otherUserProjectId);

    expect(result.data).toHaveLength(0); // RLS blocks access
  });
});
```

---

## Security Recommendations

### Immediate Actions

#### 1. Implement Server-Side Auth Verification (Future)

Currently using client-side only. For sensitive operations, consider:

```typescript
// Add to middleware.ts
export async function middleware(request: NextRequest) {
  const { supabase } = createServerClient(request);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && request.nextUrl.pathname.startsWith('/(app)')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}
```

#### 2. Add Rate Limiting (Future)

```typescript
const rateLimiter = new Map();

const checkRateLimit = (userId: string, limit: number = 10) => {
  const now = Date.now();
  const userRequests = rateLimiter.get(userId) || [];
  const recentRequests = userRequests.filter((time) => now - time < 60000);

  if (recentRequests.length >= limit) {
    throw new Error('Rate limit exceeded');
  }

  rateLimiter.set(userId, [...recentRequests, now]);
};
```

#### 3. Tighten Content Security Policy

Remove `'unsafe-eval'` and `'unsafe-inline'` for production deployments.

### Security Strengths

- ✅ Comprehensive HTTP security headers
- ✅ Row Level Security implementation
- ✅ User data isolation
- ✅ Proper foreign key constraints
- ✅ HTTPS enforcement
- ✅ Session management best practices

---

## Legacy & Deprecated

### Removed Modules

- **Noted Module**: Endpoints that previously interacted with the `noted` table have been removed
- **Forms Module**: Custom form abstraction layer removed (now using direct Supabase calls)

### Migration Notes

If historical data is required from removed modules, handle it through one-off exports. The application no longer performs CRUD operations on legacy tables.

---

## Technical Specifications

**Framework**: Next.js 15.5.2 with App Router
**Authentication**: Supabase Auth
**Database**: Supabase (PostgreSQL)
**Styling**: Tailwind CSS with shadcn/ui
**Form Handling**: React Hook Form + Zod
**State Management**: React Query + Zustand
**Security**: Row Level Security + HTTP Headers

### Key Dependencies

- `@supabase/supabase-js@2.57.4`
- `@supabase/ssr@0.7.0`
- `@tanstack/react-query@5.86.0`
- `zod@4.1.5`

### File Locations

- **Supabase Client**: `src/lib/supabase.ts`
- **Auth Context**: `src/lib/auth-context.tsx`
- **Database Schema**: `docs/supabase/complete-setup.sql`
- **Security Config**: `next.config.ts`
- **Environment**: `.env.local`

---

## Monitoring & Maintenance

### Recommended Monitoring

1. **Supabase Dashboard**: Monitor database performance and usage
2. **Error Tracking**: Implement Sentry or similar for client-side errors
3. **Performance Monitoring**: Track client-side performance metrics
4. **Security Monitoring**: Monitor for authentication anomalies

### Maintenance Tasks

1. **Regular Security Reviews**: Review RLS policies and permissions
2. **Credential Rotation**: Rotate Supabase credentials periodically
3. **Database Optimization**: Monitor query performance and optimize indexes
4. **Dependency Updates**: Keep Next.js and Supabase client updated

---

## Quick Reference

### Essential Commands

```typescript
// Authentication
await supabase.auth.signInWithPassword({ email, password });
await supabase.auth.signOut();

// CRUD Operations
await supabase.from('table').select('*');
await supabase.from('table').insert(data);
await supabase.from('table').update(data).eq('id', id);
await supabase.from('table').delete().eq('id', id);

// Context Hook
const { user, signIn, signOut, loading } = useAuth();
```

### Common Patterns

- Always check for `error` in Supabase responses
- Use `.eq('user_id', user.id)` for user isolation
- Surface errors with toast notifications
- Log unexpected errors during development
- Use optimistic updates cautiously with proper error handling
