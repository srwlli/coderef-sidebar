# API Integration Guide

This guide captures the current Supabase interactions that power the Sidebar App after retiring the notes module.

## Authentication

- Supabase Auth handles email/password sessions.
- `AuthProvider` wraps the app, providing `useAuth()` for components.
- RLS policies ensure authenticated users only access their own records.

### Common Auth Helpers

```typescript
const { user, signIn, signOut, loading } = useAuth();

await signIn({ email, password });
await signOut();
```

## Projects API

- **Table**: `projects`
- **Operations**: `select`, `insert`, `update`, `delete`
- **Security**: RLS ties rows to `user_id`

### Fetch Projects

```typescript
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });
```

### Insert or Update

```typescript
// Insert
const { error } = await supabase.from('projects').insert({
  user_id: user.id,
  project_name,
  description,
  tags,
});

// Update
const { error: updateError } = await supabase
  .from('projects')
  .update({ description, notes })
  .eq('id', projectId)
  .eq('user_id', user.id);
```

### Delete

```typescript
const { error } = await supabase
  .from('projects')
  .delete()
  .eq('id', projectId)
  .eq('user_id', user.id);
```

## Realtime Streams (Optional)

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
  }
);

channel.subscribe();
```

## Legacy Endpoints

- Endpoints that previously interacted with the `noted` table have been removed.
- If historical data is required, handle it through one-off exports; the application no longer performs CRUD operations on the legacy table.

## Error Handling Tips

- Surface Supabase errors with toast notifications for user feedback.
- Log unexpected errors to the console during development to assist debugging.
- Wrap API calls in try/catch blocks and provide optimistic UI updates cautiously.
