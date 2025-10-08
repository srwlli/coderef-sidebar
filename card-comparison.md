# Dashboard Card Property Comparison

## Component Structure Breakdown

### 1. **GridCardItem** (Default Cards)

```tsx
<div className="block" style={style} {...handlers}>
  <Card className="h-24 cursor-pointer py-0 transition-shadow duration-200 hover:shadow-lg">
    <CardHeader className="flex h-full flex-col items-center justify-center p-3 text-center">
      <IconComponent className="mb-1.5 h-6 w-6 flex-shrink-0 sm:mb-2 sm:h-8 sm:w-8" />
      <CardTitle className="text-xs leading-tight sm:text-sm">
        {item.title}
      </CardTitle>
    </CardHeader>
  </Card>
</div>
```

### 2. **CustomCardItem** (User-Created Cards)

```tsx
<div className="block" style={style} {...handlers}>
  <Card className="h-24 cursor-pointer py-0 transition-shadow duration-200 hover:shadow-lg">
    <CardHeader className="flex h-full flex-col items-center justify-center p-3 text-center">
      <Icon className="mb-1.5 h-6 w-6 flex-shrink-0 sm:mb-2 sm:h-8 sm:w-8" />
      <CardTitle className="text-xs leading-tight sm:text-sm">
        {card.title}
      </CardTitle>
    </CardHeader>
  </Card>
</div>
```

### 3. **AddCardButton** (Add New Card Button)

```tsx
<button className="block w-full text-left">
  <Card className="h-24 cursor-pointer border border-dashed border-gray-300 bg-transparent py-0 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-500 dark:hover:bg-blue-950/20">
    <CardHeader className="flex h-full flex-col items-center justify-center p-3 text-center">
      <Plus className="text-muted-foreground mb-1.5 h-6 w-6 flex-shrink-0 sm:mb-2 sm:h-8 sm:w-8" />
      <CardTitle className="text-muted-foreground text-xs leading-tight sm:text-sm">
        Add Card
      </CardTitle>
    </CardHeader>
  </Card>
</button>
```

---

## Key Differences

### Wrapper Element

| Component         | Wrapper        | Classes                  |
| ----------------- | -------------- | ------------------------ |
| GridCardItem      | `<div>`        | `block`                  |
| CustomCardItem    | `<div>`        | `block`                  |
| **AddCardButton** | **`<button>`** | `block w-full text-left` |

**⚠️ ISSUE:** Button elements have **default browser padding** that `<div>` doesn't have!

### Card Component Classes

| Component         | Card Classes                                                                                                                                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GridCardItem      | `h-24 cursor-pointer py-0 transition-shadow duration-200 hover:shadow-lg`                                                                                                                                                      |
| CustomCardItem    | `h-24 cursor-pointer py-0 transition-shadow duration-200 hover:shadow-lg`                                                                                                                                                      |
| **AddCardButton** | `h-24 cursor-pointer border border-dashed border-gray-300 bg-transparent py-0 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-500 dark:hover:bg-blue-950/20` |

**Extra classes in AddCardButton:**

- `border border-dashed border-gray-300` - Explicit dashed border
- `bg-transparent` - Transparent background
- Extended hover states

### Base Card Component Defaults

From `src/components/cards/Card.tsx`:

```tsx
className={cn(
  'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
  className
)}
```

**Default properties:**

- `gap-6` (24px gap between flex children)
- `py-6` (24px padding top/bottom) - **overridden by all three with `py-0`**
- `border` (1px solid border)

---

## Root Cause Analysis

### Problem: Button Default Styling

**Browser default `<button>` styles include:**

- `padding: 2px 6px` (varies by browser)
- `border: 2px outset buttonface` (some browsers)
- `margin: 0`

Even though we set `block w-full text-left`, we're **NOT resetting the default padding/border**.

### Solution

Add these classes to the `<button>` element:

```tsx
className = 'block w-full text-left p-0 border-0';
```

- `p-0` - Resets all padding to 0
- `border-0` - Resets button border to 0 (Card component handles the border)

---

## Recommended Fix

```tsx
<button
  onClick={onClick}
  className="block w-full text-left p-0 border-0"  // ADD: p-0 border-0
  aria-label="Add custom card"
>
```

This will make the button wrapper have zero padding/border, matching the `<div>` wrappers used by GridCardItem and CustomCardItem.
