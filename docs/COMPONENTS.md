# Component Library Reference

**Framework**: React 19.1.0 + Next.js 15.5.2
**Version**: 0.1.0
**Last Updated**: 2025-10-03

---

## Overview

The Sidebar App component library provides a comprehensive set of reusable UI components and modules designed for modern React applications. This multi-purpose dashboard leverages a modular architecture with clean separation of concerns and consistent design patterns throughout.

### Key Characteristics

- ✅ **Consistent card-based layouts** across 80% of pages
- ✅ **Unified component library** usage (cards, collapsibles, inputs)
- ✅ **Standardized icon usage** via Lucide React
- ✅ **Strong component discipline** with design patterns
- ✅ **Full TypeScript integration** with proper type safety
- ✅ **Atomic design principles** for component organization

### Component Architecture

The component library is organized into several layers:

- **Primitive Components** (`src/components/ui/`): Base UI elements built on Radix UI and shadcn/ui
- **Composite Components** (`src/components/`): Business logic components
- **Layout Components** (`src/components/layout/`): Application structure
- **Hooks** (`src/hooks/`): Reusable state and logic patterns

---

## Component Usage Analysis

### Most Frequently Used Components

| Component                  | Usage Count | Pages                                    | Import Pattern              |
| -------------------------- | ----------- | ---------------------------------------- | --------------------------- |
| **Card Components**        | 15+         | Dashboard, AI Tools, Workflows, Settings | `@/components/cards`        |
| **Collapsible Containers** | 8+          | Git Commands, Prompts, NextJS Setup      | `@/components/collapsibles` |
| **Lucide Icons**           | 25+         | All pages                                | `lucide-react`              |
| **Next.js Link**           | 20+         | All navigation pages                     | `next/link`                 |
| **Command Blocks**         | 5+          | Git Commands, NextJS Setup               | `@/components/inputs`       |

### Component Categories

#### 1. Layout Components

- `Card`, `CardHeader`, `CardTitle`, `CardContent` - Primary layout system
- `SimpleCollapsibleContainer` - Content organization
- `Sidebar`, `SidebarContent`, `SidebarMenu` - Navigation system
- `Header` - Page headers with breadcrumbs

#### 2. UI Components

- `Button` - Actions and navigation
- `Input` - Form interactions
- `Badge` - Status indicators
- `Dropdown Menu` - Action menus

#### 3. Business Logic Components

- `AuthForm` - Authentication flows
- `InstallPWA` - PWA installation prompts

#### 4. Utility Components

- `SimpleCommandBlock`, `InputCommandBlock` - Command reference
- `CodeScanChainContainer` - Multi-step workflows
- `Breadcrumb` - Navigation context

---

## Core UI Components

### Button Component

**Location**: `src/components/ui/button.tsx`
**Dependencies**: Radix UI Slot, CVA, Tailwind CSS

```typescript
import { Button } from '@/components/ui/button';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="destructive" size="lg">
  Delete Item
</Button>

// As child component (polymorphic)
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

**Props Interface**:

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
  asChild?: boolean;
}
```

**Variant Examples**:

```typescript
// Primary action
<Button variant="default">Save Changes</Button>

// Dangerous action
<Button variant="destructive">Delete Account</Button>

// Secondary action
<Button variant="outline">Cancel</Button>

// Subtle action
<Button variant="ghost">View Details</Button>

// Icon-only button
<Button variant="outline" size="icon">
  <Plus className="h-4 w-4" />
</Button>
```

### Input Component

**Location**: `src/components/ui/input.tsx`
**State Management**: Controlled/Uncontrolled patterns

```typescript
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Controlled input with label
const [email, setEmail] = useState('');

<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input
    id="email"
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</div>
```

**Props Interface**:

```typescript
interface InputProps extends React.ComponentProps<'input'> {
  // Inherits all standard HTML input props
}
```

### Card Components

**Location**: `src/components/cards/Card.tsx`
**Pattern**: Composition-based layout system

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components/cards';

<Card className="h-32 cursor-pointer hover:shadow-lg">
  <CardHeader className="flex h-full flex-col items-center justify-center">
    <Bot className="mb-2 h-8 w-8" />
    <CardTitle className="text-sm sm:text-base">
      AI Tools
    </CardTitle>
  </CardHeader>
</Card>
```

**Common Patterns**:

```typescript
// Navigation card grid (Dashboard pattern)
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {items.map((item) => (
    <Link key={item.href} href={item.href}>
      <Card className="h-32 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
        <CardHeader className="flex h-full flex-col items-center justify-center p-4 text-center">
          <item.icon className="mb-2 h-8 w-8 flex-shrink-0" />
          <CardTitle className="text-sm leading-tight sm:text-base">
            {item.title}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  ))}
</div>
```

### Badge Component

**Location**: `src/components/ui/badge.tsx`
**Pattern**: Status and count indicators

```typescript
import { Badge } from '@/components/ui/badge';

// Count badge
<Badge variant="secondary">{items.length}</Badge>

// Status badge
<Badge variant="default">Active</Badge>
<Badge variant="destructive">Error</Badge>
```

---

## Layout Components

### Sidebar System

**Location**: `src/components/layout/sidebar.tsx`
**State Management**: Context API with localStorage persistence

The sidebar system provides a complete navigation solution with responsive design, collapsible states, and keyboard shortcuts.

```typescript
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/layout/sidebar';

// Complete sidebar implementation
function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Dashboard" asChild>
                    <Link href="/dashboard">
                      <Home />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex flex-1 flex-col">
          <header className="flex h-12 items-center gap-4 border-b px-4">
            <SidebarTrigger />
          </header>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
```

**Sidebar Context API**:

```typescript
interface SidebarContextProps {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

// Usage in components
const { state, toggleSidebar, isMobile } = useSidebar();
```

**State Persistence Pattern**:

```typescript
// Automatic localStorage persistence
const setSidebarState = (open: boolean) => {
  localStorage.setItem('sidebar_state', JSON.stringify(open));
};

// Keyboard shortcut (Cmd/Ctrl + B)
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'b' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      toggleSidebar();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [toggleSidebar]);
```

### Header Component

**Location**: `src/components/layout/Header.tsx`
**Pattern**: Consistent header structure across pages

```typescript
import Header from '@/components/layout/Header';

// Responsive header with dynamic content
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
```

**Header Pattern** (Standardized across all pages):

```
[Icon + Title + Badge] | [Actions Area]
```

Example implementations:

- Dashboard: No header (direct grid layout)
- AI Tools: Icon + Title + Count badge
- Workflows: Icon + Title + Count badge

### Breadcrumb Component

**Location**: `src/components/navigation/Breadcrumb.tsx`
**Pattern**: Context-aware navigation

```typescript
import { Breadcrumb } from '@/components/navigation/Breadcrumb';

// Automatic breadcrumb generation from route
<Breadcrumb />

// Inline variant for headers
<Breadcrumb inline />
```

**Route Mapping**:

```typescript
const routeLabels: Record<string, string> = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/ai-tools': 'AI Tools',
  '/ai-tools/prompts': 'Prompts',
  '/workflows': 'Workflows',
  '/workflows/nextjs-setup': 'Next.js Setup',
  '/git-commands': 'Git Commands',
  '/settings': 'Settings',
};
```

---

## Authentication Components

### AuthForm Component

**Location**: `src/components/auth/auth-form.tsx`
**State Management**: React Hook Form + Zod validation

```typescript
import { AuthForm } from '@/components/auth/auth-form';

// Complete authentication form
function AuthPage() {
  return (
    <div className="container max-w-md mx-auto py-8">
      <AuthForm />
    </div>
  );
}
```

**Form State Management**:

```typescript
// Unified schema for login/signup
const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().optional(),
});

// React Hook Form integration
const {
  register,
  handleSubmit,
  formState: { errors },
  setError,
} = useForm<FormData>({
  resolver: zodResolver(authSchema),
});

// Toggle between login/signup modes
const [isSignup, setIsSignup] = useState(false);
const [isLoading, setIsLoading] = useState(false);
```

---

## Custom Hooks

### useIsMobile Hook

**Location**: `src/hooks/use-mobile.ts`
**Pattern**: Responsive breakpoint detection

```typescript
import { useIsMobile } from '@/hooks/use-mobile';

function ResponsiveComponent() {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
}
```

**Implementation Pattern**:

```typescript
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
```

### useAuth Hook

**Location**: `src/lib/auth-context.tsx`
**Pattern**: Authentication state management

```typescript
import { useAuth } from '@/lib/auth-context';

function ProtectedComponent() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;

  return <div>Welcome, {user.email}</div>;
}
```

---

## State Management Patterns

### Context Providers

**AuthProvider Pattern**:

```typescript
// Authentication state management
import { AuthProvider, useAuth } from '@/lib/auth-context';

function App() {
  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  );
}

// Usage in components
const { user, loading, signIn, signOut } = useAuth();
```

**Sidebar Context Pattern**:

```typescript
// Layout state with persistence
const { state, open, setOpen, toggleSidebar } = useSidebar();

// Automatic persistence
useEffect(() => {
  localStorage.setItem('sidebar_state', JSON.stringify(open));
}, [open]);
```

### URL State Synchronization

**Search Params Integration**:

```typescript
// URL-driven UI state
const searchParams = useSearchParams();
const currentTab = searchParams.get('tab') || 'default';

const handleTabChange = (tab: string) => {
  const params = new URLSearchParams(searchParams);
  params.set('tab', tab);
  router.push(`${pathname}?${params.toString()}`);
};

// Sync component state with URL
useEffect(() => {
  setViewMode(currentTab as ViewMode);
}, [currentTab]);
```

---

## Styling & Layout Patterns

### Consistent Patterns

#### 1. Grid Layouts

```typescript
// Standard responsive grid
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {items.map(item => (...))}
</div>
```

#### 2. Card Styling

```typescript
// Navigation cards
<Card className="h-32 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
  <CardHeader className="flex h-full flex-col items-center justify-center p-4 text-center">
    {/* content */}
  </CardHeader>
</Card>
```

#### 3. Icon Sizing Standards

- Primary icons: `h-8 w-8`
- Secondary icons: `h-4 w-4` or `h-5 w-5`
- Menu icons: `h-6 w-6`

#### 4. Spacing Patterns

- Grid gaps: `gap-4`
- Vertical spacing: `space-y-6` or `space-y-4`
- Section spacing: `mb-6` or `mb-8`

### Layout Wrapper Patterns

**Dashboard/Card Grid Pages**:

```typescript
<div className="flex-1 overflow-y-auto p-8">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {/* cards */}
  </div>
</div>
```

**Content Pages with Sections**:

```typescript
<div className="flex-1 overflow-y-auto p-8">
  <main className="mx-auto max-w-7xl">
    <div className="space-y-6">
      {/* sections */}
    </div>
  </main>
</div>
```

---

## Component Usage Rules

### Naming Conventions

1. **PascalCase** for component names: `FormGenerator`, `NotesDashboard`
2. **camelCase** for props and handlers: `onSubmit`, `isLoading`
3. **kebab-case** for CSS classes: `sidebar-content`, `menu-item`
4. **SCREAMING_SNAKE_CASE** for constants: `MOBILE_BREAKPOINT`, `SIDEBAR_WIDTH`

### Props Patterns

```typescript
// Interface naming convention
interface ComponentNameProps {
  // Required props first
  requiredProp: string;

  // Optional props with defaults
  optionalProp?: boolean;

  // Event handlers
  onAction?: (data: SomeType) => void;

  // Style/layout props
  className?: string;

  // Children/composition
  children?: React.ReactNode;
}

// Default props pattern (functional components)
function Component({
  requiredProp,
  optionalProp = false,
  className,
  ...rest
}: ComponentNameProps) {
  return (
    <div className={cn('base-classes', className)} {...rest}>
      {/* component content */}
    </div>
  );
}
```

### Import Path Standardization

**Recommended Pattern**:

```typescript
// UI components (shadcn/ui)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Custom components (index exports)
import { Card, CardHeader, CardTitle } from '@/components/cards';
import { SimpleCollapsibleContainer } from '@/components/collapsibles';

// Utilities
import { cn } from '@/lib/utils';

// Icons
import { Home, Settings } from 'lucide-react';

// Next.js
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
```

### Error Handling

```typescript
// Component-level error handling
function SafeComponent({ children }: { children: React.ReactNode }) {
  try {
    return <div>{children}</div>;
  } catch (error) {
    console.error('Component error:', error);
    return <div>Something went wrong</div>;
  }
}

// Form validation error handling
const onSubmit = async (data: FormData) => {
  try {
    await submitData(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      // Set field-specific errors
      error.issues.forEach(issue => {
        form.setError(issue.path, { message: issue.message });
      });
    } else {
      // Set global error
      setError('Submission failed. Please try again.');
    }
  }
};
```

### Performance Optimization

```typescript
// Memoization patterns
const MemoizedComponent = React.memo(function Component({ data, onChange }) {
  const processedData = useMemo(() => {
    return data.map(item => expensiveTransform(item));
  }, [data]);

  const handleChange = useCallback((newValue: string) => {
    onChange(newValue);
  }, [onChange]);

  return <div>{/* component content */}</div>;
});

// Lazy loading pattern
const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

---

## Copy-Paste Ready Examples

### 1. Responsive Layout with Sidebar

```typescript
// Complete responsive layout implementation
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/layout/sidebar';
import { usePathname } from 'next/navigation';
import { Home, Bot, Workflow, Settings } from 'lucide-react';
import Link from 'next/link';

const navigationItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/ai-tools', label: 'AI Tools', icon: Bot },
  { href: '/workflows', label: 'Workflows', icon: Workflow },
  { href: '/settings', label: 'Settings', icon: Settings },
];

function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      tooltip={item.label}
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex flex-1 flex-col">
          <header className="sticky top-0 z-50 flex h-12 items-center gap-4 border-b bg-background px-4">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="font-semibold">Application Title</h1>
            </div>
          </header>

          <div className="flex-1 p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
```

### 2. Dashboard Card Grid

```typescript
// Navigation card grid pattern (used in Dashboard, AI Tools, Workflows)
import { Card, CardHeader, CardTitle } from '@/components/cards';
import { Bot, Workflow, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const dashboardItems = [
    {
      title: 'AI Tools',
      href: '/ai-tools',
      icon: Bot,
    },
    {
      title: 'Workflows',
      href: '/workflows',
      icon: Workflow,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dashboardItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className="block"
            >
              <Card className="h-32 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
                <CardHeader className="flex h-full flex-col items-center justify-center p-4 text-center">
                  <IconComponent className="mb-2 h-8 w-8 flex-shrink-0" />
                  <CardTitle className="text-sm leading-tight sm:text-base">
                    {item.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

### 3. Collapsible Content Sections

```typescript
// Collapsible container pattern (used in Git Commands, Prompts)
import { SimpleCollapsibleContainer } from '@/components/collapsibles';
import { SimpleCommandBlock } from '@/components/inputs';
import { GitBranch } from 'lucide-react';

export default function GitCommandsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <main className="mx-auto max-w-7xl">
        <div className="space-y-6">
          <SimpleCollapsibleContainer
            icon={<GitBranch className="h-5 w-5" />}
            title="Git Repository Setup"
            defaultOpen={false}
          >
            <div className="space-y-4">
              <SimpleCommandBlock
                command="git init"
                description="Initialize a new Git repository"
              />
              <SimpleCommandBlock
                command="git add ."
                description="Stage all changes"
              />
              <SimpleCommandBlock
                command="git commit -m 'Initial commit'"
                description="Create initial commit"
              />
            </div>
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            icon={<GitBranch className="h-5 w-5" />}
            title="Remote Repository"
            defaultOpen={false}
          >
            <div className="space-y-4">
              <SimpleCommandBlock
                command="git remote add origin <url>"
                description="Add remote repository"
              />
              <SimpleCommandBlock
                command="git push -u origin main"
                description="Push to remote"
              />
            </div>
          </SimpleCollapsibleContainer>
        </div>
      </main>
    </div>
  );
}
```

### 4. Form with Validation

```typescript
// Form pattern with React Hook Form + Zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Handle form submission
      console.log(data);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
```

---

## Component Reuse Opportunities

### High Reuse Potential

**ToolPageWrapper**: Standardize tool page layouts

```typescript
// Proposed reusable wrapper for AI Tools, Git Commands, etc.
interface ToolPageWrapperProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function ToolPageWrapper({ title, icon, children }: ToolPageWrapperProps) {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <main className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-3">
          {icon}
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}
```

**NavigationCardGrid**: Reuse dashboard grid pattern

```typescript
// Proposed reusable card grid component
interface NavigationCard {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

interface NavigationCardGridProps {
  items: NavigationCard[];
}

function NavigationCardGrid({ items }: NavigationCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={index}
            href={item.href}
            className="block"
            {...(item.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            <Card className="h-32 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-col items-center justify-center p-4 text-center">
                <IconComponent className="mb-2 h-8 w-8 flex-shrink-0" />
                <CardTitle className="text-sm leading-tight sm:text-base">
                  {item.title}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
```

### Medium Reuse Potential

**SettingsCardGrid**: Settings page pattern
**WorkflowContainer**: Multi-step process displays
**EmptyState**: Consistent empty state messaging

---

## Best Practices Summary

### ✅ Do's

1. Use index exports for component libraries (`@/components/cards`)
2. Follow PascalCase for component names
3. Use `cn()` utility for conditional classes
4. Implement proper TypeScript interfaces for all props
5. Use memo/useMemo/useCallback for performance optimization
6. Follow atomic design principles (atoms → molecules → organisms)
7. Use consistent spacing patterns (`gap-4`, `space-y-6`)
8. Implement proper error boundaries
9. Use Zod for form validation
10. Follow accessibility best practices (ARIA labels, keyboard navigation)

### ❌ Don'ts

1. Don't mix import patterns (stick to index exports OR direct imports)
2. Don't use inline styles (use Tailwind classes)
3. Don't skip TypeScript types for props
4. Don't duplicate templates (create reusable components)
5. Don't ignore accessibility (add proper labels, ARIA attributes)
6. Don't use custom padding on pages (use layout wrappers)
7. Don't create one-off components (make them reusable)
8. Don't forget error handling in forms
9. Don't skip loading states
10. Don't use magic numbers (define constants)

---

## Technical Specifications

**Component Library**: Custom + shadcn/ui
**Icons**: Lucide React
**Styling**: Tailwind CSS
**Form Handling**: React Hook Form + Zod
**State Management**: React Context + React Query
**Routing**: Next.js App Router
**TypeScript**: Strict mode enabled

### Component File Locations

- **UI Components**: `src/components/ui/`
- **Card Components**: `src/components/cards/`
- **Collapsibles**: `src/components/collapsibles/`
- **Layout**: `src/components/layout/`
- **Navigation**: `src/components/navigation/`
- **Auth**: `src/components/auth/`
- **Inputs**: `src/components/inputs/`
- **Hooks**: `src/hooks/`

---

## Conclusion

The Sidebar App component library demonstrates **strong component discipline** (8.5/10) with:

- ✅ Excellent design system consistency
- ✅ Clear component boundaries and organization
- ✅ Good separation of concerns
- ✅ Comprehensive TypeScript integration
- ✅ Reusable patterns throughout

**Areas for improvement**:

- Minor layout wrapper inconsistencies
- Opportunity for more component abstraction
- Potential for extracting common patterns into reusable templates

This documentation provides comprehensive component reference with practical examples for rapid development and AI-assisted code generation.

---

**Framework**: POWER
**Purpose**: Component library reference and analysis
**Generated**: 2025-10-03
**Store As**: components_summary
