# Multiple Links Feature - Implementation Plan

## Overview

Allow custom dashboard cards to have multiple quick action links, similar to default cards like Vercel (which has "Dashboard" + "Deployments").

**Current State:** Custom cards have a single `href` field
**Goal:** Custom cards can have 1-5 action links
**Effort:** ~2 hours 5 minutes
**Priority:** ⭐⭐⭐ (High impact, medium effort)

---

## Approach: Links Array (Recommended)

Most flexible approach - each custom card stores an array of link objects.

### Benefits

- User can add 1-16 links per card
- Each link has custom label + href
- Matches default card pattern in ActionModal
- Simple migration path from single href

### Data Model Change

**Before (MVP):**

```tsx
interface CustomCard {
  id: string;
  title: string;
  href: string; // Single link only
  iconName: string;
  createdAt: string; // ISO timestamp
}
```

**After (Phase 2):**

```tsx
interface CustomLink {
  id: string;
  label: string;
  href: string;
}

interface CustomCard {
  id: string;
  title: string;
  links: CustomLink[]; // Array of 1-16 links
  iconName: string;
  createdAt: string; // ISO timestamp - unchanged
}
```

---

## Implementation Steps

### 1. Update Types & Add Zustand Migration (25 min)

**File:** `src/stores/use-app-store.ts`

**Step 1a: Add CustomLink interface** (after imports, before CustomCard):

```tsx
export interface CustomLink {
  id: string;
  label: string;
  href: string;
}
```

**Step 1b: Update CustomCard interface**:

```tsx
export interface CustomCard {
  id: string;
  title: string;
  links: CustomLink[]; // Changed from href: string
  iconName: string;
  createdAt: string; // Keep as ISO string (unchanged)
}
```

**Step 1c: Update addCustomCard method** (preserve existing patterns):

```tsx
addCustomCard: (card) => {
  const newCard: CustomCard = {
    ...card,
    id: uuidv4(),  // Use existing uuidv4 import
    createdAt: new Date().toISOString(),  // Keep ISO format
  };
  set({ customCards: [...get().customCards, newCard] });  // Append (don't prepend)
},
```

**Step 1d: Add Zustand persist migration** (update persist config):

```tsx
persist(
  (set, get) => ({
    /* existing store implementation */
  }),
  {
    name: 'app-storage', // Keep existing key
    version: 1, // Bump from 0 to 1 (Zustand defaults to version 0 when not specified)
    migrate: (persistedState: any, version: number) => {
      // Migrate from v0 (single href) to v1 (links array)
      if (version === 0) {
        try {
          return {
            ...persistedState,
            customCards: (persistedState.customCards || []).map((card: any) => {
              // Convert old format to new format
              if ('href' in card && !('links' in card)) {
                return {
                  ...card,
                  links: [
                    {
                      id: uuidv4(),
                      label: 'Open',
                      href: card.href,
                    },
                  ],
                };
              }
              return card;
            }),
          };
        } catch (error) {
          console.error('Custom card migration failed:', error);
          // Fallback: preserve other state, reset custom cards
          return { ...persistedState, customCards: [] };
        }
      }
      return persistedState;
    },
    partialize: (state) => ({
      view: state.view,
      sidebarOpen: state.sidebarOpen,
      customCards: state.customCards,
    }),
  }
);
```

**Why this approach:**

- Uses Zustand's built-in `migrate` function (runs automatically on load)
- Preserves existing patterns: `uuidv4()`, ISO timestamps, append order
- Error handling prevents data loss if migration fails
- No manual localStorage reads needed

### 2. Update Zod Validation Schema (20 min)

**File:** `src/components/dashboard/CardFormModal.tsx`

**Step 2a: Add CustomLink import** (update existing import):

```tsx
import { CustomCard, CustomLink } from '@/stores/use-app-store';
```

**Step 2b: Create CustomLink schema** (before cardFormSchema):

```tsx
const customLinkSchema = z.object({
  id: z.string(),
  label: z.string().min(1, 'Label required').max(30, 'Max 30 characters'),
  href: z.string().refine(
    (val) => {
      // Allow internal paths starting with /
      if (val.startsWith('/')) return true;
      // For external URLs, validate http/https only
      try {
        const url = new URL(val);
        return ['http:', 'https:'].includes(url.protocol);
      } catch {
        return false;
      }
    },
    {
      message: 'Must be valid http/https URL or path starting with /',
    }
  ),
});
```

**Step 2c: Update cardFormSchema**:

```tsx
const cardFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title too long'),
  links: z
    .array(customLinkSchema)
    .min(1, 'At least 1 link required')
    .max(16, 'Maximum 16 links allowed'),
  iconName: z.string().min(1, 'Icon is required'),
});
```

### 3. Update CardFormModal with useFieldArray (35 min)

**File:** `src/components/dashboard/CardFormModal.tsx`

**Step 3a: Add imports** (add to existing import from 'react-hook-form'):

```tsx
import { useForm, useFieldArray } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid'; // Add this import
import { Trash, Plus } from 'lucide-react'; // Add Trash and Plus
```

**Step 3b: Update useForm setup** (replace defaultValues):

```tsx
const {
  register,
  handleSubmit,
  watch,
  setValue,
  reset,
  control, // Add control for useFieldArray
  formState: { errors, isSubmitting },
} = useForm<CardFormData>({
  resolver: zodResolver(cardFormSchema),
  defaultValues: {
    title: initialData?.title || '',
    links: initialData?.links || [{ id: uuidv4(), label: '', href: '' }],
    iconName: initialData?.iconName || 'Link',
  },
});
```

**Step 3c: Add useFieldArray hook** (after useForm):

```tsx
const { fields, append, remove } = useFieldArray({
  control,
  name: 'links',
});
```

**Step 3d: Update reset logic in useEffect**:

```tsx
useEffect(() => {
  if (open) {
    reset({
      title: initialData?.title || '',
      links: initialData?.links || [{ id: uuidv4(), label: '', href: '' }],
      iconName: initialData?.iconName || 'Link',
    });
  }
}, [open, initialData, reset]);
```

**Step 3e: Replace URL field with Links section** (in the form JSX):

```tsx
{
  /* Links Section - replaces single href field */
}
<div className="space-y-4">
  <Label>Quick Actions (1-16 links)</Label>
  {fields.map((field, index) => (
    <div key={field.id} className="flex items-start gap-2">
      <div className="flex-1 space-y-2">
        <Input
          placeholder="Label (e.g., Dashboard)"
          {...register(`links.${index}.label`)}
          aria-invalid={errors.links?.[index]?.label ? 'true' : 'false'}
          aria-label={`Link ${index + 1} label`}
        />
        {errors.links?.[index]?.label && (
          <p className="text-sm text-red-500">
            {errors.links[index]?.label?.message}
          </p>
        )}
        <Input
          placeholder="https://example.com or /path"
          {...register(`links.${index}.href`)}
          aria-invalid={errors.links?.[index]?.href ? 'true' : 'false'}
          aria-label={`Link ${index + 1} URL`}
        />
        {errors.links?.[index]?.href && (
          <p className="text-sm text-red-500">
            {errors.links[index]?.href?.message}
          </p>
        )}
      </div>
      {fields.length > 1 && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => remove(index)}
          className="mt-1"
          aria-label={`Remove link ${index + 1}`}
        >
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </div>
  ))}
  {errors.links && typeof errors.links.message === 'string' && (
    <p className="text-sm text-red-500">{errors.links.message}</p>
  )}
  {fields.length < 5 && (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => append({ id: uuidv4(), label: '', href: '' })}
      aria-label="Add another link"
    >
      <Plus className="mr-2 h-4 w-4" />
      Add Link
    </Button>
  )}
</div>;
```

**Why useFieldArray:**

- Integrates with react-hook-form validation
- Automatic error handling per field
- Proper form state management
- ARIA labels for accessibility

### 4. Update Card Actions (15 min)

**File:** `src/lib/card-actions.ts`

Update `getCardActions` to generate actions from links array:

```tsx
// For custom cards - generate from links array
if (customCard?.id) {
  const linkActions = customCard.links.map((link) => {
    const isExternal = link.href.startsWith('http');
    return {
      icon: isExternal ? ExternalLink : Globe,
      label: link.label,
      onClick: () => {
        if (isExternal) {
          window.open(link.href, '_blank', 'noopener,noreferrer');
        } else {
          // Navigate to internal route
          window.location.href = link.href;
        }
      },
    };
  });

  return [
    ...linkActions,
    { icon: Edit, label: 'Edit', onClick: () => onEdit?.() },
    {
      icon: Trash,
      label: 'Delete',
      onClick: () => onDelete?.(),
      destructive: true,
    },
  ];
}
```

### 5. Update CustomCardItem Click Behavior (10 min)

**File:** `src/components/dashboard/CustomCardItem.tsx`

**Step 5a: Update isExternal logic** (replace line 27):

```tsx
// OLD: const isExternal = card.href.startsWith('http');
// NEW:
const isExternal =
  card.links.length > 0 && card.links[0].href.startsWith('http');
```

**Step 5b: Replace onClick inside useLongPress** (replace lines 33-39):

```tsx
const { style, ...handlers } = useLongPress({
  onLongPress: () => {
    if (onLongPress) onLongPress();
  },
  onClick: () => {
    // Open first link by default
    if (card.links.length > 0) {
      const firstLink = card.links[0];
      if (firstLink.href.startsWith('http')) {
        window.open(firstLink.href, '_blank', 'noopener,noreferrer');
      } else {
        router.push(firstLink.href);
      }
    }
  },
});
```

**Why this approach:**

- Replaces existing onClick in useLongPress hook (lines 33-39 in current file)
- Opens first link on single click (matches current UX)
- Long-press still shows all links in ActionModal

### 6. Update Dashboard (5 min)

**File:** `src/app/(app)/dashboard/page.tsx`

**Step 6a: Add CustomLink import** (update existing import from line 24):

```tsx
import { useAppStore, CustomCard, CustomLink } from '@/stores/use-app-store';
```

**Step 6b: Update handleFormSubmit type** (replace lines 250-265):

```tsx
const handleFormSubmit = (data: {
  title: string;
  links: CustomLink[]; // Changed from href: string
  iconName: string;
}) => {
  if (editingCard) {
    updateCustomCard(editingCard.id, data);
    toast.success('Card updated!');
  } else {
    addCustomCard(data);
    toast.success('Card added!');
  }
  setEditingCard(null);
};
```

---

## Validation Rules

Validation is handled by **Zod schema** (defined in Step 2):

### Link Constraints

- **Minimum:** 1 link required per card (enforced by `z.array().min(1)`)
- **Maximum:** 16 links per card (enforced by `z.array().max(16)`)
- **Label:** 1-30 characters, required (enforced by `z.string().min(1).max(30)`)
- **Href:** Must start with http://, https://, or / for internal paths (enforced by custom `refine()`)

### Validation Flow

1. User enters data in form
2. React Hook Form + Zod validate on submit
3. Errors display inline per field (see Step 3e for error UI)
4. Form submission blocked until all validation passes
5. Valid data passed to `handleFormSubmit` in Dashboard

**Benefits:**

- Type-safe validation with Zod
- Automatic error messages
- No manual validation functions needed
- Integrates seamlessly with react-hook-form

---

## User Experience

### Creating a Card with Multiple Links

1. Click "Add Card" button
2. Enter card title and select icon
3. Add first link (label + href) - required
4. Click "+ Add Link" to add up to 4 more links
5. Click "Create Card"
6. Card appears on dashboard

### Interacting with Multi-Link Cards

**Single Click:**

- Opens first link (default behavior)

**Long Press:**

- Opens ActionModal with all links as separate actions
- Example: Custom "Vercel" card shows:
  - 🔗 Dashboard
  - 🚀 Deployments
  - ✏️ Edit
  - 🗑️ Delete

---

## Example Use Cases

### Example 1: Custom Vercel Card

```json
{
  "title": "Vercel",
  "iconName": "Cloud",
  "links": [
    {
      "id": "uuid-1",
      "label": "Dashboard",
      "href": "https://vercel.com/teamhart"
    },
    {
      "id": "uuid-2",
      "label": "Deployments",
      "href": "https://vercel.com/teamhart/~/deployments"
    },
    {
      "id": "uuid-3",
      "label": "Analytics",
      "href": "https://vercel.com/teamhart/~/analytics"
    }
  ]
}
```

### Example 2: Custom GitHub Card

```json
{
  "title": "My Repos",
  "iconName": "Github",
  "links": [
    {
      "id": "uuid-1",
      "label": "Dashboard",
      "href": "https://github.com/dashboard"
    },
    {
      "id": "uuid-2",
      "label": "Pull Requests",
      "href": "https://github.com/pulls"
    },
    {
      "id": "uuid-3",
      "label": "Issues",
      "href": "https://github.com/issues"
    }
  ]
}
```

---

## Files to Change

| File                                          | Changes                                                   | Effort |
| --------------------------------------------- | --------------------------------------------------------- | ------ |
| `src/stores/use-app-store.ts`                 | Add CustomLink type, update CustomCard, Zustand migration | 25 min |
| `src/components/dashboard/CardFormModal.tsx`  | Zod schema + useFieldArray multi-link form                | 55 min |
| `src/lib/card-actions.ts`                     | Generate actions from links array                         | 15 min |
| `src/components/dashboard/CustomCardItem.tsx` | Update click handler for first link                       | 10 min |
| `src/app/(app)/dashboard/page.tsx`            | Update form submit handler type                           | 5 min  |
| **Testing & Verification**                    | Migration testing, form validation, all flows             | 15 min |

**Total:** ~2 hours 5 minutes (125 minutes)

**Breakdown:**

- Step 1 (25 min): Types (10 min) + Zustand migration (15 min)
- Steps 2+3 (55 min): Zod schema (20 min) + useFieldArray (35 min)
- Steps 4-6 (30 min): Card actions (15 min) + CustomCardItem (10 min) + Dashboard (5 min)
- Testing (15 min): Migration, validation, user flows

---

## Success Criteria

- ✅ Existing cards with single href migrate automatically to links array
- ✅ Users can add 1-16 links per custom card
- ✅ Each link has custom label (1-30 chars) and href
- ✅ Clicking card opens first link
- ✅ Long-press shows all links in ActionModal
- ✅ Form validates link count, labels, and URLs
- ✅ Edit modal pre-fills existing links
- ✅ Delete link button works (minimum 1 link enforced)
- ✅ localStorage persistence works with new format

---

## Follow-Up Features

After this implementation, future enhancements could include:

1. **Link Icons** - Allow custom icon per link (e.g., dashboard icon, rocket for deployments)
2. **Link Reordering** - Drag to reorder links in form
3. **Link Categories** - Group links by category (Primary, Secondary, etc.)
4. **Import Links from URL** - Auto-detect common links from domain (e.g., paste github.com → suggests Dashboard, PRs, Issues)

---

## Migration Path to Supabase

When migrating to Supabase Storage (Phase 2 - Priority #1), the links array will sync seamlessly:

```json
{
  "userId": "user-uuid",
  "customCards": [
    {
      "id": "card-1",
      "title": "Vercel",
      "links": [
        {
          "id": "link-1",
          "label": "Dashboard",
          "href": "https://vercel.com/teamhart"
        },
        {
          "id": "link-2",
          "label": "Deployments",
          "href": "https://vercel.com/teamhart/~/deployments"
        }
      ],
      "iconName": "Cloud",
      "createdAt": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

No additional migration needed - the links array structure works identically in Supabase Storage. Just read from Zustand localStorage and upload the JSON file to `user-data/{userId}.json` bucket.

---

## Implementation Notes & Best Practices

### Architecture Decisions

**1. Zustand Persist Migration (Step 1d)**

- ✅ **Correct:** Uses `version` + `migrate` option in Zustand persist config
- ❌ **Avoid:** Manual localStorage reads or separate migration functions
- **Why:** Zustand's migrate runs automatically on state load, ensuring all users get migrated seamlessly

**2. Timestamp Format (Step 1c)**

- ✅ **Correct:** Keep `createdAt: string` with `new Date().toISOString()`
- ❌ **Avoid:** Changing to `Date.now()` (number type)
- **Why:** Preserves existing type, avoids breaking changes, ISO strings are more readable

**3. UUID Generation (Throughout)**

- ✅ **Correct:** Use existing `uuidv4()` from 'uuid' package
- ❌ **Avoid:** `crypto.randomUUID()` (not imported in codebase)
- **Why:** Consistency with existing imports, avoid adding new dependencies

**4. Card Insertion Order (Step 1c)**

- ✅ **Correct:** Append cards `[...get().customCards, newCard]`
- ❌ **Avoid:** Prepend `[newCard, ...get().customCards]`
- **Why:** Preserves existing UX, new cards appear at end of list

**5. Form Architecture (Steps 2 & 3)**

- ✅ **Correct:** Use Zod schema + react-hook-form's `useFieldArray`
- ❌ **Avoid:** Manual `useState` for links array + separate validation function
- **Why:** Integrates with existing form architecture, automatic validation, type safety

### Accessibility Considerations

**Keyboard Navigation:**

- Tab through link fields (label → href → remove button → next link)
- Enter/Space on "Add Link" and "Remove" buttons
- Form submit with Enter key

**Screen Reader Support:**

- `aria-label` on each input (`Link 1 label`, `Link 1 URL`)
- `aria-invalid` on fields with errors
- Error messages announced when validation fails

**Focus Management:**

- Adding a link focuses the new label field
- Removing a link focuses the previous link or Add button
- Form validation errors focus first invalid field

### Error Handling

**Migration Errors:**

- Try/catch in Zustand migrate function
- Fallback: Reset custom cards to empty array, preserve other state
- Console error logged for debugging

**Form Validation:**

- Zod schema validates on submit
- Inline error messages per field
- Array-level validation for min/max links
- URL validation with custom refine() function

**Runtime Errors:**

- Empty links array: Card doesn't render or shows empty state
- Missing href: Validation prevents submission
- Invalid URL: Zod refine() catches before submission

### Testing Checklist

**Migration Testing:**

- [ ] Existing cards with single `href` migrate to `links` array
- [ ] Cards with no `href` (edge case) don't crash migration
- [ ] Corrupted localStorage data falls back to empty array

**Form Validation:**

- [ ] Can't submit with 0 links
- [ ] Can't add more than 16 links
- [ ] Label validation: empty, 1 char, 30 chars, 31 chars
- [ ] URL validation: http, https, internal path (/), invalid URL

**User Flows:**

- [ ] Create card with 1 link → appears on dashboard
- [ ] Create card with 16 links → all appear in ActionModal (4×4 grid)
- [ ] Edit card → pre-fills existing links correctly
- [ ] Remove link → minimum 1 link enforced
- [ ] Click card → opens first link
- [ ] Long-press card → shows all links in modal

**Edge Cases:**

- [ ] Very long labels (30 chars) display correctly
- [ ] Very long URLs don't break layout
- [ ] Deleting all cards doesn't crash
- [ ] Adding/removing links rapidly doesn't cause race conditions

### Performance Considerations

**Current Scale:**

- 50 custom cards × 16 links = 800 actions to generate
- Negligible performance impact with current implementation
- ActionModal displays 4 actions per row (automatic 4×4 grid for 16 links)

**Link ID Usage:**

- Each CustomLink has an `id` field (UUID) currently only used for React keys in the form
- **Alternative:** Could use array index as key to save bytes in localStorage
- **Current approach rationale:** UUID IDs support future drag-to-reorder feature without index shifts
- **Storage impact:** ~36 bytes per link (UUID length), negligible for 16 links × 50 cards = 29KB total

**Future Optimization (if needed):**

- Memoize `getCardActions` result per card
- Virtualize card list if users create 100+ cards
- Debounce link form inputs to reduce re-renders
- Consider array indices as keys if drag-reorder not planned

### Version History

**v1.0 - Initial Draft (2025-01-15)**

- Basic implementation plan with manual useState and separate validation

**v2.0 - Corrected Implementation (2025-01-15)**

- Fixed: Zustand persist migration approach
- Fixed: Timestamp format (ISO string, not number)
- Fixed: UUID generation (uuidv4, not crypto)
- Fixed: Form architecture (useFieldArray, not useState)
- Fixed: Validation (Zod schema, not manual function)
- Added: Accessibility notes, error handling, testing checklist
- Updated: Time estimate (2h 5min, not 1.5h)
