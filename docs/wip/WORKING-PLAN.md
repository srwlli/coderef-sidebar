# Plan: Move Breadcrumbs to Header (Excluding Noted Module)

## Scope Definition

- **Apply changes**: Main application pages only
- **Exclude**: `/noted` routes (imported module with own header)
- **Preserve**: Noted module's existing header implementation
- **No size changes**: Keep header at 48px height

## Implementation Approach

### Header Layout Changes

#### For Main App Pages (All except /noted):

```
Current: [Mobile Trigger] [coderef title] [gap]
New:     [Mobile Trigger] [Breadcrumbs] [flex-grow] [coderef title]
```

#### For Noted Module (/noted/\*):

```
No changes - preserve module's own header implementation
```

### Implementation Steps

1. **Modify Header Component**:
   - Add conditional logic for non-noted pages
   - Move title to right side using `ml-auto` or similar
   - Import and render Breadcrumb component inline

2. **Update Layout Component**:
   - Remove standalone Breadcrumb component for non-noted pages
   - Keep breadcrumb rendering for noted pages (module boundary)
   - Pass breadcrumb data to Header component

3. **Breadcrumb Integration**:
   - Modify Breadcrumb component to work inline in header
   - Remove background/border styling (integrates with header)
   - Ensure responsive behavior for breadcrumb text

4. **Conditional Rendering Logic**:
   - `pathname !== '/noted'` for new header layout
   - `pathname === '/noted'` preserves current behavior
   - Module detection and boundary respect

## Key Benefits

- Space efficiency on main app pages
- Respects noted module boundaries
- No header size changes
- Better navigation hierarchy (breadcrumbs prominent)
- Clean separation between app and module UX

## Technical Considerations

### Module Architecture

- **Noted**: External/imported module with its own header logic
- **Coderef**: Main application with standard navigation
- **Integration**: Noted module likely has its own header component/behavior

### Space Allocation (Non-Noted Pages)

- **Mobile trigger**: ~32px
- **Breadcrumbs**: ~200-400px (plenty of space without button competition)
- **Title "coderef"**: ~80px (right-aligned)
- **Total available**: ~375px mobile, ~768px+ desktop (fits comfortably)

### Design Impact

- **Brand visibility**: Title moved from prominent left to secondary right
- **Navigation priority**: Breadcrumbs become primary left element
- **Hierarchy shift**: Navigation-first vs brand-first approach

## Implementation Files

- `src/components/layout/Header.tsx` - Add breadcrumb integration
- `src/app/(app)/layout.tsx` - Remove standalone breadcrumb rendering
- `src/components/navigation/Breadcrumb.tsx` - Modify for inline usage
