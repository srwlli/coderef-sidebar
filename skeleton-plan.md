# Skeleton Implementation Plan

Following your organized component structure:

## 1. Add shadcn skeleton component

- Run: `npx shadcn@latest add skeleton`
- This creates `components/ui/skeleton.tsx`

## 2. Organize skeleton into new structure

- Create `src/components/skeletons/` folder
- Move skeleton component: `Skeleton.tsx`
- Create `index.ts` for re-exports

## 3. Create skeleton variants for your app

- `CardSkeleton.tsx` - matches your card layout
- `ButtonSkeleton.tsx` - matches button dimensions
- Custom skeletons as needed

## 4. Update structure

```
src/components/
├── buttons/
├── cards/
└── skeletons/
    ├── Skeleton.tsx      # Base skeleton
    ├── CardSkeleton.tsx  # Card-specific
    ├── ButtonSkeleton.tsx # Button-specific
    └── index.ts          # Re-exports
```

## 5. Implement loading states

- Add skeleton usage in pages during data loading
- Use conditional rendering: `{isLoading ? <CardSkeleton /> : <Card />}`

This follows your variant-based organization pattern.
