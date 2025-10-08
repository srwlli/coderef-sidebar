# Multiple Links Feature - Implementation Plan

## Overview

Allow custom dashboard cards to have multiple quick action links, similar to default cards like Vercel (which has "Dashboard" + "Deployments").

**Current State:** Custom cards have a single `href` field
**Goal:** Custom cards can have 1-5 action links
**Effort:** ~1.5 hours
**Priority:** ⭐⭐⭐ (High impact, medium effort)

---

## Approach: Links Array (Recommended)

Most flexible approach - each custom card stores an array of link objects.

### Benefits

- User can add 1-5 links per card
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
  createdAt: number;
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
  links: CustomLink[]; // Array of 1-5 links
  iconName: string;
  createdAt: number;
}
```

---

## Implementation Steps

### 1. Update CustomCard Type (5 min)

**File:** `src/stores/use-app-store.ts`

```tsx
export interface CustomLink {
  id: string;
  label: string;
  href: string;
}

export interface CustomCard {
  id: string;
  title: string;
  links: CustomLink[];  // Changed from href: string
  iconName: string;
  createdAt: number;
}

// Update store methods
addCustomCard: (card: Omit<CustomCard, 'id' | 'createdAt'>) => {
  const newCard: CustomCard = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    ...card,
  };
  set((state) => ({
    customCards: [newCard, ...state.customCards],
  }));
},
```

### 2. Migration Strategy (10 min)

**File:** `src/stores/use-app-store.ts`

Add migration logic to convert existing cards with single `href` to new format:

```tsx
const migrateCustomCards = (cards: any[]): CustomCard[] => {
  return cards.map((card) => {
    // If card has old format (single href), migrate to links array
    if ('href' in card && !('links' in card)) {
      return {
        ...card,
        links: [
          {
            id: crypto.randomUUID(),
            label: 'Open',
            href: card.href,
          },
        ],
      };
    }
    return card;
  });
};

// Apply migration when loading from localStorage
const storedCards = JSON.parse(localStorage.getItem('custom-cards') || '[]');
const migratedCards = migrateCustomCards(storedCards);
```

### 3. Update CardFormModal (30 min)

**File:** `src/components/dashboard/CardFormModal.tsx`

Add UI to manage multiple links:

```tsx
interface FormData {
  title: string;
  links: CustomLink[]; // Changed from href: string
  iconName: string;
}

// New state for managing links
const [links, setLinks] = useState<CustomLink[]>(
  initialData?.links || [{ id: crypto.randomUUID(), label: '', href: '' }]
);

// Add link button
const handleAddLink = () => {
  if (links.length >= 5) {
    toast.error('Maximum 5 links per card');
    return;
  }
  setLinks([...links, { id: crypto.randomUUID(), label: '', href: '' }]);
};

// Remove link button
const handleRemoveLink = (id: string) => {
  if (links.length === 1) {
    toast.error('Card must have at least 1 link');
    return;
  }
  setLinks(links.filter((link) => link.id !== id));
};

// Update link
const handleLinkChange = (
  id: string,
  field: 'label' | 'href',
  value: string
) => {
  setLinks(
    links.map((link) => (link.id === id ? { ...link, [field]: value } : link))
  );
};
```

**Form UI:**

```tsx
<div className="space-y-4">
  <Label>Quick Actions (1-5 links)</Label>
  {links.map((link, index) => (
    <div key={link.id} className="flex items-start gap-2">
      <div className="flex-1 space-y-2">
        <Input
          placeholder="Label (e.g., Dashboard, Deployments)"
          value={link.label}
          onChange={(e) => handleLinkChange(link.id, 'label', e.target.value)}
          maxLength={30}
        />
        <Input
          placeholder="https://example.com or /internal-path"
          value={link.href}
          onChange={(e) => handleLinkChange(link.id, 'href', e.target.value)}
        />
      </div>
      {links.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleRemoveLink(link.id)}
          className="mt-1"
        >
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </div>
  ))}
  {links.length < 5 && (
    <Button variant="outline" size="sm" onClick={handleAddLink}>
      <Plus className="mr-2 h-4 w-4" />
      Add Link
    </Button>
  )}
</div>
```

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

When clicking a card (not long-press), open first link by default:

```tsx
onClick: () => {
  if (card.links.length > 0) {
    const firstLink = card.links[0];
    if (firstLink.href.startsWith('http')) {
      window.open(firstLink.href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(firstLink.href);
    }
  }
},
```

### 6. Update Dashboard (5 min)

**File:** `src/app/(app)/dashboard/page.tsx`

Update form submit handler to use links instead of href:

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

### Link Validation

- **Minimum:** 1 link required per card
- **Maximum:** 5 links per card
- **Label:** 1-30 characters, required
- **Href:** Must start with http://, https://, or / (internal path), required

### Form Validation

```tsx
const validateLinks = (links: CustomLink[]): string | null => {
  if (links.length === 0) return 'Add at least 1 link';
  if (links.length > 5) return 'Maximum 5 links allowed';

  for (const link of links) {
    if (!link.label.trim()) return 'All links must have a label';
    if (link.label.length > 30) return 'Label must be 30 characters or less';
    if (!link.href.trim()) return 'All links must have a URL';
    if (!link.href.match(/^(https?:\/\/|\/)/)) {
      return 'URL must start with http://, https://, or /';
    }
  }

  return null;
};
```

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

| File                                          | Changes                                                 | Effort |
| --------------------------------------------- | ------------------------------------------------------- | ------ |
| `src/stores/use-app-store.ts`                 | Add CustomLink type, update CustomCard, migration logic | 15 min |
| `src/components/dashboard/CardFormModal.tsx`  | Multi-link form UI, add/remove link handlers            | 30 min |
| `src/lib/card-actions.ts`                     | Generate actions from links array                       | 15 min |
| `src/components/dashboard/CustomCardItem.tsx` | Update click handler for first link                     | 10 min |
| `src/app/(app)/dashboard/page.tsx`            | Update form submit handler                              | 5 min  |

**Total:** ~1.5 hours

---

## Success Criteria

- ✅ Existing cards with single href migrate automatically to links array
- ✅ Users can add 1-5 links per custom card
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
      "createdAt": 1234567890
    }
  ]
}
```

No additional migration needed - just upload the localStorage JSON to Supabase Storage.
