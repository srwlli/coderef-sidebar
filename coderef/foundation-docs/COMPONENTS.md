# COMPONENTS

**Framework:** React 19 + Next.js 15
**Version:** 0.1.0

---

## Overview

sidebar-app uses a component-driven architecture with shadcn/ui as the foundation and custom components built on top. All components are TypeScript-first with full type safety and follow React Server Component patterns where applicable.

## Component Categories

```
src/components/
├── ui/              # shadcn/ui primitives (Radix UI + Tailwind)
├── cards/           # Card components (grid/list views)
├── dashboard/       # Dashboard-specific components
├── navigation/      # Navigation and breadcrumbs
├── auth/            # Authentication forms
├── modals/          # Modal dialogs
├── buttons/         # Button components
├── inputs/          # Input components
├── collapsibles/    # Collapsible containers
├── skeletons/       # Loading skeletons
├── layout/          # Layout components (Header, Sidebar)
└── debug/           # Debug utilities
```

## UI Primitives (shadcn/ui)

### Button

**Location:** `src/components/ui/button.tsx`

Base button component with variants and sizes using CVA (Class Variance Authority).

**Props:**

```typescript
interface ButtonProps extends React.ComponentProps<'button'> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean; // Use Radix Slot for polymorphic component
}
```

**Variants:**

- `default` - Primary button with solid background
- `destructive` - Red/danger button for delete actions
- `outline` - Border button with transparent background
- `secondary` - Secondary button with muted background
- `ghost` - Transparent button, hover only
- `link` - Text link styled as button

**Sizes:**

- `default` - h-9, px-4
- `sm` - h-8, px-3
- `lg` - h-10, px-6
- `icon` - size-9 (square for icons only)

**Usage:**

```tsx
import { Button } from '@/components/ui/button';

// Primary button
<Button>Click me</Button>

// Destructive with icon
<Button variant="destructive" size="sm">
  <Trash className="mr-2 h-4 w-4" />
  Delete
</Button>

// As Link component (polymorphic)
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

**Accessibility:**

- Focus-visible ring (3px)
- Disabled state styling
- ARIA invalid state support
- Icon auto-sizing (`[&_svg]` selectors)

### Input

**Location:** `src/components/ui/input.tsx`

Text input field with mobile optimization and validation states.

**Props:**

```typescript
interface InputProps extends React.ComponentProps<'input'> {
  type?: string;
  className?: string;
}
```

**Features:**

- 16px font-size to prevent iOS zoom
- Touch action optimization
- Auto-complete off by default
- Focus-visible ring
- ARIA invalid state support
- File input styling

**Usage:**

```tsx
import { Input } from '@/components/ui/input';

// Basic text input
<Input placeholder="Enter text" />

// With label and error
<Label htmlFor="email">Email</Label>
<Input
  id="email"
  type="email"
  aria-invalid={hasError ? 'true' : 'false'}
/>
{hasError && <p className="text-sm text-red-500">Error message</p>}
```

**Mobile Considerations:**

- `fontSize: '16px'` prevents iOS zoom on focus
- `touchAction: 'manipulation'` for better touch handling
- `userSelect: 'text'` for proper text selection

### Card

**Location:** `src/components/ui/card.tsx` (shadcn base)
**Extended:** `src/components/cards/Card.tsx`

Flexible card container with composable parts.

**Subcomponents:**

- `Card` - Main container
- `CardHeader` - Header section (title + actions)
- `CardTitle` - Title text
- `CardDescription` - Subtitle/description
- `CardContent` - Main content area
- `CardFooter` - Footer section
- `CardAction` - Action buttons in header

**Props:**

```typescript
interface CardProps extends React.ComponentProps<'div'> {
  onLongPress?: () => void; // Custom prop for mobile
}
```

**Usage:**

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/cards';

<Card>
  <CardHeader>
    <CardTitle>Dashboard</CardTitle>
    <CardDescription>View your overview</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content here</p>
  </CardContent>
</Card>;
```

**Layout System:**

- Uses CSS Grid (`@container/card-header`)
- Auto-rows for flexible height
- Data slots for styling hooks

### Sheet (Drawer)

**Location:** `src/components/ui/sheet.tsx`

Bottom sheet drawer for mobile-first modals.

**Props:**

```typescript
interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left'; // Default: right
}
```

**Subcomponents:**

- `Sheet` - Root component
- `SheetTrigger` - Button to open sheet
- `SheetContent` - Main content container
- `SheetHeader` - Header section
- `SheetTitle` - Title (required for a11y)
- `SheetDescription` - Description
- `SheetFooter` - Footer with actions

**Usage:**

```tsx
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';

<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="bottom">
    <SheetTitle>Edit Card</SheetTitle>
    {/* Form content */}
  </SheetContent>
</Sheet>;
```

**Accessibility:**

- Dialog role with aria-modal
- Required SheetTitle for screen readers
- Keyboard navigation (Escape to close)
- Focus trap when open

### Other UI Primitives

**Label** (`ui/label.tsx`)

```tsx
<Label htmlFor="input-id">Field Label</Label>
```

**Separator** (`ui/separator.tsx`)

```tsx
<Separator orientation="horizontal" />
```

**Tooltip** (`ui/tooltip.tsx`)

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>Tooltip text</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Badge** (`ui/badge.tsx`)

```tsx
<Badge variant="default">New</Badge>
<Badge variant="destructive">Error</Badge>
```

**Dropdown Menu** (`ui/dropdown-menu.tsx`)

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Card Components

### ListCard

**Location:** `src/components/cards/ListCard.tsx`

List view card for dashboard items.

**Props:**

```typescript
interface ListCardProps {
  title: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  onLongPress?: () => void;
}
```

**Features:**

- Long-press support for mobile actions
- External link handling (new tab)
- Internal routing with Next.js router
- Hover shadow effect

**Usage:**

```tsx
import { ListCard } from '@/components/cards/ListCard';
import { Rocket } from 'lucide-react';

<ListCard
  title="Vercel"
  href="https://vercel.com"
  icon={Rocket}
  external
  onLongPress={() => setShowModal(true)}
/>;
```

**Styling:**

- 16px padding (p-4)
- 12px gap
- 5x5 icon size (h-5 w-5)
- Transition shadow on hover

### Card (Grid View)

**Location:** `src/components/cards/Card.tsx`

Reusable card for grid view dashboard items.

**Usage Pattern:**

```tsx
<Card className="h-24 cursor-pointer py-0">
  <CardHeader className="flex h-full flex-col items-center justify-center p-3">
    <IconComponent className="mb-1.5 h-6 w-6" />
    <CardTitle className="text-xs">{title}</CardTitle>
  </CardHeader>
</Card>
```

**Grid Layout:**

- Fixed height (h-24)
- Center-aligned content
- Icon above title
- Compact padding (p-3)

## Dashboard Components

### CustomCardItem

**Location:** `src/components/dashboard/CustomCardItem.tsx`

Renders custom user cards in grid or list view.

**Props:**

```typescript
interface CustomCardItemProps {
  card: CustomCard;
  icon: LucideIcon;
  view: 'grid' | 'list';
  onLongPress: () => void;
}
```

**Features:**

- Adapts to grid/list view
- Long-press for actions
- Multiple link support
- First link as primary action

**Usage:**

```tsx
import { CustomCardItem } from '@/components/dashboard/CustomCardItem';

<CustomCardItem
  card={customCard}
  icon={RocketIcon}
  view="grid"
  onLongPress={() => handleLongPress(customCard)}
/>;
```

### AddCardButton

**Location:** `src/components/dashboard/AddCardButton.tsx`

Button to add new custom cards.

**Props:**

```typescript
interface AddCardButtonProps {
  onClick: () => void;
  view: 'grid' | 'list';
}
```

**Usage:**

```tsx
import { AddCardButton } from '@/components/dashboard/AddCardButton';

<AddCardButton onClick={() => setFormOpen(true)} view="grid" />;
```

**Styling:**

- Dashed border for visual distinction
- Plus icon
- Adapts to grid/list layout

### CardFormModal

**Location:** `src/components/dashboard/CardFormModal.tsx`

Bottom sheet form for creating/editing custom cards.

**Props:**

```typescript
interface CardFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CardFormData) => void;
  initialData?: CustomCard | null;
}
```

**Features:**

- React Hook Form + Zod validation
- Dynamic link fields (1-16 links)
- Icon picker integration
- Add/remove links
- Edit existing cards

**Form Schema:**

```typescript
const cardFormSchema = z.object({
  title: z.string().min(1).max(50),
  links: z
    .array(
      z.object({
        id: z.string(),
        label: z.string().min(1).max(30),
        href: z.string().refine(/* URL validation */),
      })
    )
    .min(1)
    .max(16),
  iconName: z.string().min(1),
});
```

**Usage:**

```tsx
import { CardFormModal } from '@/components/dashboard/CardFormModal';

<CardFormModal
  open={formOpen}
  onClose={() => setFormOpen(false)}
  onSubmit={(data) => addCustomCard(data)}
  initialData={editingCard}
/>;
```

**Validation:**

- Title: 1-50 characters
- Links: 1-16 items
- Link labels: 1-30 characters
- Link URLs: Valid http/https or internal path (/)

### IconPicker

**Location:** `src/components/dashboard/IconPicker.tsx`

Dropdown picker for selecting Lucide icons.

**Props:**

```typescript
interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
}
```

**Features:**

- Curated icon set (30+ common icons)
- Visual preview
- Searchable dropdown
- Categories: General, Development, Social, Actions

**Usage:**

```tsx
import { IconPicker } from '@/components/dashboard/IconPicker';

<IconPicker value={iconName} onChange={(name) => setValue('iconName', name)} />;
```

## Navigation Components

### Breadcrumb

**Location:** `src/components/navigation/Breadcrumb.tsx`

Breadcrumb navigation with route mapping.

**Props:**

```typescript
interface BreadcrumbProps {
  className?: string;
  inline?: boolean; // For header integration
}
```

**Features:**

- Auto-generates from pathname
- Route label mapping
- Home icon for first item
- Active state styling

**Route Mapping:**

```typescript
const routeLabels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/ai-tools/prompts': 'Prompts',
  '/workflows/nextjs-setup': 'Next.js Setup',
  '/git-commands': 'Git Commands',
  '/settings': 'Settings',
};
```

**Usage:**

```tsx
import { Breadcrumb } from '@/components/navigation/Breadcrumb';

// Standalone
<Breadcrumb />

// Inline in header
<Breadcrumb inline className="flex-1" />
```

**Output Example:**

```
🏠 Dashboard > AI Tools > Prompts
```

### BackButton

**Location:** `src/components/navigation/BackButton.tsx`

Back navigation button.

**Props:**

```typescript
interface BackButtonProps {
  fallbackHref?: string;
}
```

**Usage:**

```tsx
import { BackButton } from '@/components/navigation/BackButton';

<BackButton fallbackHref="/dashboard" />;
```

### PageHeader

**Location:** `src/components/navigation/PageHeader.tsx`

Page header with title and actions.

**Props:**

```typescript
interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}
```

**Usage:**

```tsx
import { PageHeader } from '@/components/navigation/PageHeader';

<PageHeader
  title="Settings"
  description="Manage your preferences"
  actions={<Button>Save</Button>}
/>;
```

### BottomTabBar

**Location:** `src/components/navigation/BottomTabBar.tsx`

Bottom navigation bar for mobile (future).

**Props:**

```typescript
interface BottomTabBarProps {
  items: TabItem[];
}
```

## Modal Components

### ActionModal

**Location:** `src/components/modals/action-modal.tsx`

Bottom sheet with card actions (long-press menu).

**Props:**

```typescript
interface ActionModalProps {
  visible: boolean;
  onClose: () => void;
  cardTitle: string;
  cardIcon: LucideIcon;
  actions: CardAction[];
}

interface CardAction {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}
```

**Features:**

- Framer Motion animations
- Portal rendering (createPortal)
- Backdrop blur
- Keyboard shortcuts (Escape to close)
- Body scroll lock
- Action grid (max 4 per row)

**Usage:**

```tsx
import { ActionModal } from '@/components/modals/action-modal';
import { ExternalLink, Edit, Trash } from 'lucide-react';

<ActionModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  cardTitle="My Card"
  cardIcon={RocketIcon}
  actions={[
    {
      icon: ExternalLink,
      label: 'Open',
      onClick: () => window.open(url),
    },
    {
      icon: Edit,
      label: 'Edit',
      onClick: () => setEditMode(true),
    },
    {
      icon: Trash,
      label: 'Delete',
      onClick: () => deleteCard(),
      destructive: true,
    },
  ]}
/>;
```

**Animation:**

- Slide up from bottom (300ms ease-out)
- Backdrop fade (200ms)
- Exit animations on close

## Layout Components

### Header

**Location:** `src/components/layout/Header.tsx`

Main app header with breadcrumbs and view toggle.

**Props:**

```typescript
interface HeaderProps {
  children?: React.ReactNode;
}
```

**Features:**

- Sticky positioning
- Safe area insets (iOS notch)
- Sidebar trigger (mobile)
- Breadcrumb navigation
- View toggle (grid/list)

**Usage:**

```tsx
import Header from '@/components/layout/Header';

// In app layout
<Header />

// With custom actions
<Header>
  <Button>Custom Action</Button>
</Header>
```

**Structure:**

```
┌────────────────────────────────────┐
│ [☰] 🏠 Dashboard > Page  [Grid/List]│
└────────────────────────────────────┘
```

### Sidebar

**Location:** `src/components/layout/sidebar.tsx`

Collapsible sidebar navigation.

**Components:**

- `SidebarProvider` - Context provider
- `Sidebar` - Main container
- `SidebarHeader` - Header with logo
- `SidebarContent` - Scrollable content
- `SidebarFooter` - Footer with settings
- `SidebarMenu` - Menu container
- `SidebarMenuItem` - Menu item
- `SidebarMenuButton` - Button with active state
- `SidebarTrigger` - Toggle button
- `SidebarSeparator` - Visual separator

**Usage:**

```tsx
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/layout/sidebar';

<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild isActive={isActive}>
            <Link href="/dashboard">
              <Home />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>
</SidebarProvider>;
```

**Collapsible States:**

- Desktop: Icon-only collapsed, full expanded
- Mobile: Overlay drawer
- Stored in Zustand (persisted)

### ViewToggle

**Location:** `src/components/layout/ViewToggle.tsx`

Toggle between grid and list view.

**Props:** None (uses Zustand store)

**Usage:**

```tsx
import { ViewToggle } from '@/components/layout/ViewToggle';

<ViewToggle />;
```

**State Management:**

```tsx
// Component reads from Zustand
const [view, setView] = useAppStore((state) => [state.view, state.setView]);
```

## Button Components

### ActiveCopyButton

**Location:** `src/components/buttons/ActiveCopyButton.tsx`

Copy button with active state indicator.

**Props:**

```typescript
interface ActiveCopyButtonProps {
  id: string;
  textToCopy: string;
  label?: string;
}
```

**Features:**

- Copies text to clipboard
- Visual feedback (checkmark)
- Global "last copied" state
- Auto-reset after 2 seconds

**Usage:**

```tsx
import { ActiveCopyButton } from '@/components/buttons/ActiveCopyButton';

<ActiveCopyButton id="cmd-1" textToCopy="git status" label="Copy command" />;
```

**State Flow:**

1. Click → Copy to clipboard
2. Set as lastCopiedId in Zustand
3. Show checkmark icon
4. After 2s → Clear lastCopiedId
5. Icon resets to copy icon

### ActionButton

**Location:** `src/components/ui/action-button.tsx`

Button for action modal grid.

**Props:**

```typescript
interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}
```

**Usage:**

```tsx
import { ActionButton } from '@/components/ui/action-button';
import { ExternalLink } from 'lucide-react';

<ActionButton
  icon={ExternalLink}
  label="Open"
  onClick={() => window.open(url)}
/>;
```

**Styling:**

- Flex-1 for equal width
- Vertical layout (icon above label)
- Destructive variant (red text)

## Input Components

### SimpleCommandBlock

**Location:** `src/components/inputs/SimpleCommandBlock.tsx`

Read-only command display with copy button.

**Props:**

```typescript
interface SimpleCommandBlockProps {
  id: string;
  command: string;
  description?: string;
}
```

**Usage:**

```tsx
import { SimpleCommandBlock } from '@/components/inputs/SimpleCommandBlock';

<SimpleCommandBlock
  id="git-status"
  command="git status"
  description="Check repository status"
/>;
```

### InputCommandBlock

**Location:** `src/components/inputs/InputCommandBlock.tsx`

Command block with dynamic input placeholders.

**Props:**

```typescript
interface InputCommandBlockProps {
  id: string;
  template: string; // e.g., "git commit -m {message}"
  placeholders: Record<string, string>;
}
```

**Usage:**

```tsx
<InputCommandBlock
  id="git-commit"
  template="git commit -m {message}"
  placeholders={{ message: 'Your commit message' }}
/>
```

**Features:**

- Dynamic placeholders
- Template substitution
- Copy final command

### LinkInputCommandBlock

**Location:** `src/components/inputs/LinkInputCommandBlock.tsx`

Command block for link/URL commands.

**Props:**

```typescript
interface LinkInputCommandBlockProps {
  id: string;
  baseUrl: string;
  placeholder: string;
}
```

## Skeleton Components

Loading skeletons for async content.

**Location:** `src/components/skeletons/`

### Skeleton (Base)

**Location:** `src/components/skeletons/Skeleton.tsx`

```tsx
import { Skeleton } from '@/components/skeletons/Skeleton';

<Skeleton className="h-4 w-[250px]" />;
```

### CardSkeleton

**Location:** `src/components/skeletons/CardSkeleton.tsx`

```tsx
import { CardSkeleton } from '@/components/skeletons/CardSkeleton';

<CardSkeleton />  // Grid view
<CardSkeleton variant="list" />  // List view
```

### ButtonSkeleton

**Location:** `src/components/skeletons/ButtonSkeleton.tsx`

```tsx
import { ButtonSkeleton } from '@/components/skeletons/ButtonSkeleton';

<ButtonSkeleton />;
```

## Authentication Components

### LoginForm

**Location:** `src/components/auth/login-form.tsx`

Email/password sign-in form.

**Features:**

- React Hook Form + Zod
- Error handling
- Loading states
- Link to sign-up

**Usage:**

```tsx
import { LoginForm } from '@/components/auth/login-form';

<LoginForm />;
```

### AuthForm

**Location:** `src/components/auth/auth-form.tsx`

Combined sign-in/sign-up form with tabs.

**Features:**

- Tab switching (Sign In / Sign Up)
- Form validation
- Password reset link
- Error display

**Usage:**

```tsx
import { AuthForm } from '@/components/auth/auth-form';

<AuthForm />;
```

## Collapsible Components

### SimpleCollapsibleContainer

**Location:** `src/components/collapsibles/SimpleCollapsibleContainer.tsx`

Basic collapsible section.

**Props:**

```typescript
interface SimpleCollapsibleContainerProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}
```

**Usage:**

```tsx
import { SimpleCollapsibleContainer } from '@/components/collapsibles';

<SimpleCollapsibleContainer title="Advanced Options">
  <p>Hidden content</p>
</SimpleCollapsibleContainer>;
```

### CollapsiblePrompt

**Location:** `src/components/collapsibles/CollapsiblePrompt.tsx`

Collapsible prompt with copy button.

**Props:**

```typescript
interface CollapsiblePromptProps {
  title: string;
  prompt: string;
  defaultOpen?: boolean;
}
```

### ChainStepPrompt

**Location:** `src/components/collapsibles/ChainStepPrompt.tsx`

Multi-step prompt container.

**Props:**

```typescript
interface ChainStepPromptProps {
  stepNumber: number;
  title: string;
  prompt: string;
  defaultOpen?: boolean;
}
```

## Debug Components

### ErrorDebugger

**Location:** `src/components/debug/ErrorDebugger.tsx`

Development error display.

**Props:**

```typescript
interface ErrorDebuggerProps {
  error: Error;
  componentStack?: string;
}
```

**Usage:**

```tsx
import { ErrorDebugger } from '@/components/debug/ErrorDebugger';

<ErrorDebugger error={error} componentStack={stack} />;
```

**Features:**

- Only shows in development
- Error message + stack trace
- Component stack trace
- Expandable sections

### ErrorBoundary

**Location:** `src/components/ErrorBoundary.tsx`

React error boundary component.

**Props:**

```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
```

**Usage:**

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary fallback={<p>Something went wrong</p>}>
  <App />
</ErrorBoundary>;
```

## PWA Components

### InstallPWA

**Location:** `src/components/InstallPWA.tsx`

PWA install prompt.

**Features:**

- Detects installable state
- BeforeInstallPrompt event
- Custom install UI
- Auto-hides after install

**Usage:**

```tsx
import { InstallPWA } from '@/components/InstallPWA';

// In root layout
<InstallPWA />;
```

## Utility Components

### Toaster

**Location:** `src/components/ui/sonner.tsx`

Toast notification system.

**Usage:**

```tsx
// Import toast function
import { toast } from 'sonner';

// Show toast
toast.success('Card saved!');
toast.error('Failed to delete');
toast.info('Processing...');

// In root layout
import { Toaster } from '@/components/ui/sonner';
<Toaster />;
```

## Component Patterns

### Server Components (Default)

```tsx
// No 'use client' directive
// Can use async/await
// Cannot use hooks or browser APIs

export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

### Client Components

```tsx
'use client';

// Can use hooks, browser APIs, event handlers
import { useState } from 'react';

export default function Component() {
  const [state, setState] = useState(false);
  return <button onClick={() => setState(true)}>Click</button>;
}
```

### Polymorphic Components (asChild)

```tsx
// Button as Link
<Button asChild>
  <Link href="/dashboard">Go</Link>
</Button>

// SidebarMenuButton as Link
<SidebarMenuButton asChild>
  <a href="https://example.com">External</a>
</SidebarMenuButton>
```

### Composition Pattern

```tsx
// Card composition
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardAction>
      <Button>Action</Button>
    </CardAction>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Render Props Pattern

```tsx
// Not commonly used, prefer composition
```

### Compound Components

```tsx
// Sidebar compound components
<Sidebar>
  <SidebarHeader />
  <SidebarContent>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton />
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarContent>
  <SidebarFooter />
</Sidebar>
```

## Styling Patterns

### Tailwind Utilities

```tsx
// Prefer utility classes
<div className="flex items-center gap-4 p-4" />;

// Use cn() for conditional classes
import { cn } from '@/lib/utils';

<div className={cn('base-classes', isActive && 'active-classes', className)} />;
```

### CVA (Class Variance Authority)

```tsx
import { cva } from 'class-variance-authority';

const buttonVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'default-classes',
      destructive: 'destructive-classes',
    },
    size: {
      default: 'h-9',
      sm: 'h-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

// Usage
<button className={buttonVariants({ variant: 'destructive', size: 'sm' })} />;
```

### Data Attributes (Slots)

```tsx
// shadcn/ui pattern
<div data-slot="card">
  <div data-slot="card-header">
    <div data-slot="card-title">Title</div>
  </div>
</div>

// CSS targeting
[data-slot="card"] {
  /* styles */
}
```

## State Management Patterns

### Zustand Store

```tsx
import { useAppStore } from '@/stores/use-app-store';

// Select specific values
const view = useAppStore((state) => state.view);
const setView = useAppStore((state) => state.setView);

// Multiple values
const [view, setView] = useAppStore((state) => [state.view, state.setView]);
```

### React Context

```tsx
import { useAuth } from '@/lib/auth-context';

const { user, loading, signIn, signOut } = useAuth();
```

### Local State

```tsx
const [open, setOpen] = useState(false);
const [value, setValue] = useState('');
```

## Form Patterns

### React Hook Form + Zod

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(schema),
});

const onSubmit = (data: FormData) => {
  // Handle form submission
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Input {...register('email')} aria-invalid={!!errors.email} />
    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
  </form>
);
```

### Field Arrays

```tsx
import { useFieldArray } from 'react-hook-form';

const { fields, append, remove } = useFieldArray({
  control,
  name: 'links',
});

// Add field
<Button onClick={() => append({ id: uuidv4(), label: '', href: '' })}>
  Add Link
</Button>;

// Render fields
{
  fields.map((field, index) => (
    <div key={field.id}>
      <Input {...register(`links.${index}.label`)} />
      <Button onClick={() => remove(index)}>Remove</Button>
    </div>
  ));
}
```

## Accessibility Patterns

### ARIA Labels

```tsx
<button aria-label="Close modal" onClick={onClose}>
  <X className="h-4 w-4" />
</button>
```

### ARIA Invalid

```tsx
<Input
  aria-invalid={hasError ? 'true' : 'false'}
  aria-describedby={hasError ? 'error-id' : undefined}
/>;
{
  hasError && (
    <p id="error-id" className="text-red-500">
      Error message
    </p>
  );
}
```

### Dialog/Modal

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-description">Description</p>
</div>
```

### Focus Management

```tsx
// Keyboard navigation
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };
  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, [onClose]);

// Focus trap (handled by Radix Dialog)
```

---

## AI Development Context

### Component Discovery

```typescript
// Find components by pattern
src/components/ui/*.tsx        // shadcn/ui primitives
src/components/cards/*.tsx     // Card components
src/components/dashboard/*.tsx // Dashboard components
```

### Component Creation Checklist

1. **Determine if server or client component**
   - Event handlers → Client
   - Browser APIs → Client
   - Async data fetching → Server
   - Static content → Server

2. **Check existing components first**
   - shadcn/ui for primitives
   - Custom components for patterns

3. **TypeScript types**
   - Define props interface
   - Use ComponentProps for HTML elements
   - Export types if reusable

4. **Styling approach**
   - Tailwind utilities first
   - CVA for variants
   - cn() for conditional classes

5. **Accessibility**
   - ARIA labels for icon buttons
   - ARIA invalid for form fields
   - Keyboard navigation
   - Focus management

### Copy-Paste Ready Examples

**Button with Icon:**

```tsx
<Button variant="destructive" size="sm">
  <Trash className="mr-2 h-4 w-4" />
  Delete
</Button>
```

**Card in Grid:**

```tsx
<Card className="h-24 cursor-pointer py-0">
  <CardHeader className="flex h-full flex-col items-center justify-center p-3">
    <Icon className="mb-1.5 h-6 w-6" />
    <CardTitle className="text-xs">{title}</CardTitle>
  </CardHeader>
</Card>
```

**Form with Validation:**

```tsx
const schema = z.object({
  name: z.string().min(1, 'Required'),
});

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema),
});

<form onSubmit={handleSubmit(onSubmit)}>
  <Input {...register('name')} aria-invalid={!!errors.name} />
  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
</form>;
```

**Modal/Sheet:**

```tsx
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="bottom">
    <SheetTitle>Title</SheetTitle>
    {/* Content */}
  </SheetContent>
</Sheet>
```

---

**🤖 Generated with AI assistance using the docs-mcp POWER framework template**

**Last Updated:** 2025-10-08
**Component Library Version:** 0.1.0
**Next Review:** When adding new component categories or major UI updates
