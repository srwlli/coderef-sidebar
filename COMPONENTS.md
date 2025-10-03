# Component Library Reference

**[Framework]**: React 19.1.0 + Next.js 15.5.2
**[Version]**: 0.1.0

## Overview

The Sidebar App component library provides a comprehensive set of reusable UI components and modules designed for modern React applications. As referenced in `{{readme_summary}}`, this multi-purpose dashboard leverages a modular architecture detailed in `{{architecture_summary}}`, with data management patterns described in `{{api_summary}}`. The component system follows atomic design principles and supports full TypeScript integration.

## Component Architecture

The component library is organized into several layers:

- **Primitive Components** (`src/components/ui/`): Base UI elements built on Radix UI
- **Composite Components** (`src/components/`): Business logic components
- **Layout Components** (`src/components/layout/`): Application structure
- **Hooks** (`src/hooks/`): Reusable state and logic patterns

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
**State Management**: URL params and routing

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

### useToast Hook

**Location**: `src/hooks/use-toast.ts`
**Pattern**: Toast notification abstraction

```typescript
import { useToast } from '@/hooks/use-toast';

function ActionComponent() {
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: 'Success!',
      description: 'Your action was completed successfully.',
      type: 'success',
    });
  };

  const handleError = (error: Error) => {
    toast({
      title: 'Error',
      description: error.message,
      type: 'error',
    });
  };

  return (
    <Button onClick={handleSuccess}>
      Complete Action
    </Button>
  );
}
```

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

### Form State Management

**React Hook Form Integration**:

```typescript
// Schema-driven form validation
const schema = generateZodSchema(fields);

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: getDefaultValues(fields),
});

// Error handling with field-level feedback
const onSubmit = async (data: FormData) => {
  try {
    await submitData(data);
    form.reset();
    toast({ title: 'Success', type: 'success' });
  } catch (error) {
    form.setError('root', { message: error.message });
  }
};
```

### URL State Synchronization

**Search Params Integration**:

```typescript
// URL-driven UI state
const searchParams = useSearchParams();
const currentTab = searchParams.get('tab') || 'create';

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

### Error Boundaries

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

## Copy-Paste Ready Examples

### Responsive Layout with Sidebar

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

const navigationItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/projects', label: 'Projects', icon: FolderOpen },
  { href: '/notes', label: 'Notes', icon: FileText },
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

### Data Table with Actions

```typescript
// Reusable data table with CRUD operations
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DataTableProps<T> {
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
}

function DataTable<T extends { id: string; title: string; created_at: string }>({
  data,
  onEdit,
  onDelete,
  loading = false,
}: DataTableProps<T>) {
  const { toast } = useToast();

  const handleDelete = async (item: T) => {
    try {
      await onDelete(item.id);
      toast({
        title: 'Deleted',
        description: `"${item.title}" has been deleted.`,
        type: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete item.',
        type: 'error',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div>
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-muted-foreground">
              Created {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(item)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(item)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No items found.
        </div>
      )}
    </div>
  );
}
```

---

## AI-Focused Footer

This component library documentation was generated using the POWER framework for comprehensive component reference. The structure follows modern React component patterns optimized for both human developers and AI system analysis, providing clear interfaces, usage patterns, state management strategies, and copy-paste ready examples for efficient component library understanding and implementation.

**Framework**: POWER
**Purpose**: Component library reference
**Generated**: 2025-09-18
**Store As**: components_summary
