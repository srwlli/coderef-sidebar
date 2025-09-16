# Plan: Create Projects Table View Page

## Current State Analysis (Updated from API Scan)

### Architecture Findings

- **Client-side Supabase integration**: No custom API routes, direct client operations
- **Existing patterns**: React Query + Zustand state management already implemented
- **RLS security**: Row Level Security properly configured for user data isolation
- **Performance optimizations**: Database indexes already in place for user_id and created_at

### Data Status

- Projects page at `/projects` shows hardcoded project cards
- Supabase client is configured at `src/lib/supabase/client.ts`
- Form system already uses React Hook Form + Zod validation
- 14 projects in database with missing link fields (git, supabase, local_link, deployed_link)
- ProjectData interface exists in `src/lib/forms/formTypes.ts`

### Security Considerations

- RLS ensures users only see their own projects
- Client-side authentication through AuthProvider context
- No server-side middleware protection (disabled in middleware.ts)

## Implementation Plan (Enhanced)

### 1. Add ShadCN Table Component

- Install/add table component from ShadCN UI
- Leverage existing Tailwind CSS + shadcn/ui setup
- Ensure accessibility compliance with existing patterns

### 2. Create Projects Data Hook with React Query

- **Leverage existing patterns**: Use React Query (already in package.json)
- Create `useProjects` hook following existing Supabase client pattern
- Implement with proper TypeScript using existing ProjectData interface
- Add RLS-aware queries (user_id filtering handled automatically)
- Include optimistic updates for better UX

```typescript
// Pattern from API scan findings
const { data: projects, error } = useQuery({
  queryKey: ['projects', user?.id],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
  enabled: !!user?.id,
});
```

### 3. Create Projects Table Component

- Build reusable ProjectsTable component following existing component patterns
- **Missing field indicators**: Visual badges for null/empty git, supabase, local_link, deployed_link
- **Sorting**: Leverage database indexes (created_at, user_id already indexed)
- **Actions**: Edit/view buttons using existing form system
- **Performance**: Use React Query caching to minimize database calls

### 4. Create Table View with URL Strategy

- **Route strategy**: Use `/projects?view=table` instead of separate route
- Maintain existing `/projects` page structure
- Add view toggle component (cards ↔ table)
- **State persistence**: Remember user's view preference in localStorage

### 5. Enhanced Features with Security Awareness

- **Filtering**: Client-side filtering (data already limited by RLS)
- **Bulk operations**:
  - Rate limiting (as recommended in API scan)
  - Batch updates using Supabase batch operations
  - Optimistic updates with rollback on error
- **Export**: Client-side CSV generation (no server routes needed)
- **Real-time updates**: Consider Supabase real-time subscriptions

### 6. Address Security Recommendations

- **Client-side rate limiting**: Implement for bulk operations
- **Input validation**: Use existing Zod schemas for any edit operations
- **Error handling**: Proper error boundaries and user feedback
- **Audit logging**: Track bulk operations for security

## Files to Create/Modify (Updated)

### New Files

- `src/components/ui/table.tsx` (ShadCN table component)
- `src/hooks/useProjects.ts` (React Query + Supabase hook)
- `src/components/projects/ProjectsTable.tsx` (table component)
- `src/components/projects/ViewToggle.tsx` (cards/table toggle)
- `src/components/projects/BulkActions.tsx` (bulk edit functionality)

### Modified Files

- `src/app/(app)/projects/page.tsx` (add table view support)
- `src/lib/forms/formTypes.ts` (extend ProjectData if needed)
- Update navigation components for view toggle

### Optional Enhancements

- `src/lib/rate-limiter.ts` (client-side rate limiting utility)
- `src/hooks/useProjectsBulk.ts` (bulk operations hook)

## Technical Implementation Notes

### Database Queries (Optimized)

```sql
-- Already optimized with existing indexes
SELECT * FROM projects
WHERE user_id = auth.uid()
ORDER BY created_at DESC;

-- For missing field filtering
SELECT * FROM projects
WHERE user_id = auth.uid()
AND (git IS NULL OR supabase IS NULL OR local_link IS NULL OR deployed_link IS NULL);
```

### Performance Considerations

- **React Query caching**: Reduce database calls
- **Virtual scrolling**: If >100 projects (future enhancement)
- **Pagination**: Server-side if needed (Supabase supports LIMIT/OFFSET)
- **Batch operations**: Use Supabase's bulk update capabilities

### Security Integration

- **RLS compliance**: All queries automatically filtered by user_id
- **Input sanitization**: Use existing Zod schemas
- **Rate limiting**: Implement for bulk operations as recommended in API scan
- **Error boundaries**: Prevent sensitive data leakage

This enhanced plan leverages the existing architecture, addresses security recommendations from the API scan, and provides a scalable foundation for the projects table view while maintaining the application's client-side Supabase integration pattern.
