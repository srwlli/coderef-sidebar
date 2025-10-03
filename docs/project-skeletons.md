# Project Skeletons

## Overview

Documentation for skeleton loading implementation in the projects page to improve loading experience and visual feedback.

## Current State Analysis

### Existing Implementation

- **Loading State**: Simple spinner in `ProjectsList.tsx:60-66`
- **Generic Skeleton**: `CardSkeleton.tsx` provides basic card structure
- **Route Loading**: `loading.tsx` shows 4 static card skeletons
- **Base Components**: Duplicate skeleton components in `/skeletons/` and `/ui/`

### Current Loading Flow

1. User navigates to projects page
2. Route-level `loading.tsx` shows 4 generic card skeletons
3. `ProjectsList` component loads with spinner during data fetch
4. Actual project cards render when data arrives

## Improvement Plan

### 1. Project-Specific Skeleton Component

**Goal**: Replace generic spinner with project card-specific skeleton

**Implementation**: `ProjectCardSkeleton.tsx`

```tsx
// Skeleton matching actual project card structure
- Header skeleton (title + action buttons)
- Description skeleton (2-3 lines with varying widths)
- Tags skeleton (badge-shaped elements)
- Metadata skeleton (date + user info)
```

### 2. Responsive Grid Layout

**Goal**: Match actual project grid layout during loading

**Features**:

- Responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Dynamic skeleton count based on screen size
- Consistent spacing and alignment

### 3. Enhanced Visual Effects

**Goal**: More natural loading animation

**Features**:

- Staggered animation delays between skeleton cards
- Varying skeleton widths for realistic content variety
- Smooth transition from skeleton to actual content

### 4. Component Cleanup

**Goal**: Remove duplicate skeleton implementations

**Actions**:

- Consolidate `/skeletons/Skeleton.tsx` and `/ui/skeleton.tsx`
- Standardize on single base skeleton component
- Update all imports to use unified skeleton

## Implementation Priority

1. **Create ProjectCardSkeleton** - Match exact project card structure
2. **Update ProjectsList** - Replace spinner with grid of card skeletons
3. **Add Responsive Logic** - Show appropriate skeleton count per screen size
4. **Enhance Animations** - Add staggered delays and smooth transitions
5. **Clean Up Duplicates** - Remove duplicate skeleton components

## Benefits

- **Better UX**: Users see expected layout structure immediately
- **Visual Continuity**: Smooth transition from loading to loaded state
- **Performance Perception**: Perceived faster loading through progressive disclosure
- **Accessibility**: Maintains layout structure for screen readers

## Files to Modify

- `src/components/projects/ProjectsList.tsx` - Replace spinner with skeleton grid
- `src/components/skeletons/ProjectCardSkeleton.tsx` - New component (to create)
- `src/app/(app)/loading.tsx` - Update to use new project skeleton
- `src/components/skeletons/` - Cleanup duplicate components

## Related Components

- `ProjectsList.tsx:118` - Grid layout reference
- `CardSkeleton.tsx` - Current generic skeleton
- `Skeleton.tsx` - Base skeleton component
