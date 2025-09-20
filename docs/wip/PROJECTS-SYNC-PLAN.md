# Plan: Migrate Projects to Noted's Simple Sync Pattern

## Analysis Summary

Noted module uses a **simple, reliable sync pattern** while Projects uses **overengineered React Query + realtime** that creates complexity and failure points.

## Current State Comparison

### Noted Module (Simple & Working)

**File**: `packages/noted-module/src/hooks/useNotes.ts`

- **Simple useState** for data management (~20 lines)
- **Manual refresh** after operations (`refreshNotes()`)
- **Local state updates** for immediate UI feedback
- **Direct Supabase calls** with clear error handling
- **No abstraction layers** to fail

```tsx
// Noted pattern - simple and reliable
const [notes, setNotes] = useState<DbNoted[]>([]);
const handleNoteSuccess = () => {
  refreshNotes(); // Simple refetch
  setViewMode('list');
};
```

### Projects Module (Complex & Problematic)

**File**: `src/hooks/useProjects.ts`

- **React Query** with complex cache management (~100+ lines)
- **Realtime subscriptions** + polling + query invalidation
- **Mutation hooks** add unnecessary abstraction
- **Multiple sync mechanisms** creating race conditions

```tsx
// Projects pattern - overengineered
const query = useQuery({
  staleTime: 10 * 1000,
  refetchInterval: 30 * 1000,
  // Complex config...
});
// + Realtime channels + broadcasts + double invalidation
```

## Key Problems with Current Projects Approach

1. **Too many sync mechanisms** - Realtime + polling + query invalidation
2. **Race conditions** - Multiple refetches happening simultaneously
3. **Cache complexity** - React Query cache state management issues
4. **Mutation layer failures** - The mutation hooks we just removed were part of this complexity
5. **Debugging nightmare** - Multiple abstraction layers

## Migration Plan

### Phase 1: Create Simple Hook

**New File**: `src/hooks/useProjectsSimple.ts`

- Copy `useNotes.ts` pattern exactly
- Replace 'noted' table with 'projects' table
- Keep same simple state management

### Phase 2: Replace Complex Implementation

**Files to Modify**:

- `src/app/(app)/projects/page.tsx` - Switch to useProjectsSimple
- `src/components/projects/ProjectsTable.tsx` - Use simple refresh pattern
- Remove React Query dependency for projects

### Phase 3: Manual Refresh Pattern

**Implementation**:

- Add `refreshProjects()` calls after create/edit/delete operations
- Remove all mutation hooks (`useUpdateProject`, `useCreateProject`, etc.)
- Use direct Supabase calls like NotedForm pattern

### Phase 4: Optional Enhancements

- Keep realtime as optional enhancement (not core dependency)
- Add local optimistic updates like noted deleteNote pattern

## Benefits of Migration

1. **Immediate reliability** - follows proven working pattern from noted
2. **Easier debugging** - simple state flow, no abstraction layers
3. **Better performance** - no complex query caching overhead
4. **Maintainable code** - clear, understandable flow
5. **Consistent patterns** - same approach across noted and projects

## Implementation Files

### Files to Create:

- `src/hooks/useProjectsSimple.ts` - Based on useNotes pattern

### Files to Modify:

- `src/app/(app)/projects/page.tsx` - Switch hook usage
- `src/components/projects/ProjectsTable.tsx` - Add refresh calls
- `src/components/forms/ProjectForm.tsx` - Already fixed with direct Supabase

### Files to Remove/Simplify:

- `src/hooks/useProjects.ts` - Replace with simple version
- Remove React Query usage for projects (keep for other features if needed)

## Success Criteria

- Projects list updates immediately after create/edit/delete operations
- No silent failures or sync issues
- Simple debugging with clear error messages
- Code maintainability matching noted module quality
