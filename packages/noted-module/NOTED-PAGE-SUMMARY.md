# Noted Module - Comprehensive Reference Documentation

## 📋 Overview

The **Noted Module** is a production-ready, standalone React component library for note-taking and dynamic form generation. Designed with dependency injection and framework-agnostic principles, it can be integrated into any React application while maintaining complete separation of concerns.

## 🏗️ Architecture Overview

### Core Design Principles

1. **Dependency Injection**: All external dependencies (`supabaseClient`, `user`, `toast`) are injected as props
2. **Framework Agnostic**: Works with Next.js, Vite, CRA, Remix, or any React framework
3. **Minimal Dependencies**: Only essential peer dependencies
4. **Type Safety**: Full TypeScript coverage with exported types
5. **Reusability**: Can be published to NPM and used across multiple applications

### Package Structure

```
packages/noted-module/
├── src/
│   ├── index.ts                    # Public API exports
│   ├── components/                 # React components
│   │   ├── NotesDashboard.tsx     # Main dashboard orchestrator
│   │   ├── NotedForm.tsx          # Note creation/editing form
│   │   ├── FormGenerator.tsx      # Dynamic form generation engine
│   │   ├── NotesList.tsx          # Notes list view
│   │   ├── NoteView.tsx           # Single note display
│   │   ├── fields/                # Form field components
│   │   │   ├── BaseField.tsx      # Common field wrapper
│   │   │   ├── TextField.tsx      # Text input field
│   │   │   ├── TextAreaField.tsx  # Multi-line text field
│   │   │   ├── TagField.tsx       # Tag input with autocomplete
│   │   │   ├── LinksField.tsx     # URL collection field
│   │   │   ├── ImagesField.tsx    # Image upload/management
│   │   │   └── ProjectSelectField.tsx # Project dropdown
│   │   └── ui/                    # Base UI components
│   │       ├── button.tsx         # Button component
│   │       ├── input.tsx          # Input component
│   │       ├── textarea.tsx       # Textarea component
│   │       ├── label.tsx          # Label component
│   │       ├── badge.tsx          # Badge component
│   │       └── dropdown-menu.tsx  # Dropdown component
│   ├── hooks/
│   │   └── useNotes.ts            # Data management hook
│   ├── lib/
│   │   ├── forms/                 # Form schemas & validation
│   │   │   ├── notedSchema.ts     # Note form configuration
│   │   │   └── validation.ts      # Zod validation logic
│   │   ├── types/                 # TypeScript definitions
│   │   │   └── index.ts           # Type exports
│   │   └── utils.ts               # Utility functions
├── dist/                          # Built package output
├── example.tsx                    # Usage examples
├── package.json                   # Package configuration
└── tsconfig.json                  # TypeScript config
```

## 🎯 Core Components

### 1. **NotesDashboard** - Main Orchestrator

```typescript
interface NotesDashboardProps {
  supabaseClient: SupabaseClient;
  user: User;
  toast: ToastFunction;
  className?: string;
  initialTab?: 'create' | 'list' | 'view' | 'edit';
}
```

**Purpose**: Primary dashboard that manages different note views and orchestrates the entire note-taking workflow.

**Features**:

- **View Mode Management**: Switches between create, list, view, and edit modes
- **Event-Driven Architecture**: Listens for upload actions from header components
- **Responsive Layout**: Mobile-first design with desktop enhancements
- **State Management**: Manages selected note state and view transitions
- **Integration Hub**: Connects all note-related components

**View Modes**:

- `create` - Note creation form
- `list` - Notes list with search/filter
- `view` - Read-only note display
- `edit` - Note editing form

### 2. **FormGenerator** - Dynamic Form Engine

```typescript
interface FormGeneratorProps<T = Record<string, unknown>> {
  schema: FormSchema;
  onSubmit: (data: T) => Promise<void>;
  onReset?: () => void;
  className?: string;
  disabled?: boolean;
  initialData?: T;
  supabaseClient?: SupabaseClient;
  user?: User;
}
```

**Purpose**: Schema-driven form builder that renders forms based on JSON configuration.

**Features**:

- **Dynamic Rendering**: Generates forms from schema configuration
- **Validation Integration**: React Hook Form + Zod validation
- **Field Type Support**: Multiple field types with custom rendering
- **Inline Actions**: Quick navigation buttons for form sections
- **Responsive Design**: Adapts to mobile and desktop layouts
- **Supabase Integration**: Built-in database operations

**Inline Action Bar**:
Located next to the title field for quick navigation:

- **Set Project** (`FolderOpen` icon) - Jumps to project selection
- **Add Tags** (`Tag` icon) - Navigates to tags field
- **Add Links** (`Link` icon) - Focuses links section

### 3. **NotedForm** - Specialized Note Form

```typescript
interface NotedFormProps {
  onSuccess?: (data: NotedData) => void;
  onCancel?: () => void;
  className?: string;
  initialData?: DbNoted;
  mode?: 'create' | 'edit';
  supabaseClient: SupabaseClient;
  user: User;
  toast: ToastFunction;
}
```

**Purpose**: Specialized form component built on FormGenerator for note CRUD operations.

**Features**:

- **Mode-Aware**: Handles both creation and editing
- **Supabase Integration**: Direct database operations
- **Error Handling**: Comprehensive error states and recovery
- **Success Callbacks**: Customizable success handling
- **Data Transformation**: Prepares data for Supabase storage

### 4. **NoteView** - Note Display Component

```typescript
interface NoteViewProps {
  note: DbNoted;
  onBack: () => void;
  onEdit: (note: DbNoted) => void;
  onDelete: (id: number) => Promise<void>;
  className?: string;
}
```

**Purpose**: Read-only display component for viewing note details.

**Features**:

- **Rich Content Display**: Supports text, tags, links, images, screenshots
- **Metadata Rendering**: Creation/update dates, project information
- **Action Controls**: Edit and delete buttons
- **Image Galleries**: Grid layout for images and screenshots
- **Link Previews**: External link handling with metadata
- **Responsive Grid**: Adaptive image grid for different screen sizes

### 5. **NotesList** - Notes Browser

```typescript
interface NotesListProps {
  notes: DbNoted[];
  onViewNote: (note: DbNoted) => void;
  onEditNote: (note: DbNoted) => void;
  onDeleteNote: (id: number) => Promise<void>;
  loading?: boolean;
  error?: string;
  className?: string;
}
```

**Purpose**: List view for browsing and managing notes collection.

**Features**:

- **Paginated Display**: Efficient rendering of large note collections
- **Search & Filter**: Find notes by title, content, tags, or project
- **Quick Actions**: Direct access to view, edit, delete operations
- **Sort Options**: Multiple sorting criteria
- **Loading States**: Progressive loading with skeletons

## 🔧 Field Components Architecture

### Base Field System

All field components extend **BaseField** which provides:

- **Label Rendering**: Consistent label display with required indicators
- **Error Handling**: Validation error display
- **Description Support**: Help text and field descriptions
- **Layout Management**: Flexible container handling

### Field Component Types

#### 1. **TextField** - Basic Text Input

```typescript
interface TextFieldConfig extends BaseFieldConfig {
  type: 'text' | 'email' | 'url';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}
```

- **Input Types**: Text, email, URL with appropriate validation
- **Length Limits**: Configurable character constraints
- **Pattern Matching**: Regex validation support
- **Auto-focus**: Configurable focus behavior

#### 2. **TextAreaField** - Multi-line Text

```typescript
interface TextAreaFieldConfig extends BaseFieldConfig {
  type: 'textarea';
  rows?: number;
  maxLength?: number;
  minLength?: number;
}
```

- **Configurable Rows**: Adjustable height
- **Character Limits**: Visual counter and validation
- **Flex-grow Support**: Adapts to container height
- **Resize Control**: User-resizable or fixed

#### 3. **TagField** - Tag Management

```typescript
interface TagsFieldConfig extends BaseFieldConfig {
  type: 'tags';
  maxTags?: number;
  allowCustomTags?: boolean;
  suggestions?: string[];
}
```

- **Tag Creation**: Add/remove tags with keyboard shortcuts
- **Autocomplete**: Suggested tags from predefined list
- **Custom Tags**: Option to allow new tag creation
- **Visual Management**: Tag badges with removal controls

#### 4. **LinksField** - URL Collection

```typescript
interface LinksFieldConfig extends BaseFieldConfig {
  type: 'links';
  maxLinks?: number;
  allowTitleEdit?: boolean;
  allowDescriptionEdit?: boolean;
}
```

- **URL Validation**: Automatic link validation and formatting
- **Metadata Support**: Title and description for each link
- **Batch Operations**: Add/remove multiple links
- **Preview Generation**: Link metadata extraction

#### 5. **ImagesField** - File Upload

```typescript
interface ImagesFieldConfig extends BaseFieldConfig {
  type: 'images';
  maxFiles?: number;
  maxFileSize?: number;
  allowedTypes?: string[];
  allowCaptions?: boolean;
}
```

- **Drag & Drop**: Intuitive file upload interface
- **Image Preview**: Thumbnail generation and display
- **File Validation**: Size and type restrictions
- **Caption Support**: Alt text and captions for accessibility
- **Progress Tracking**: Upload progress indicators

#### 6. **ProjectSelectField** - Project Dropdown

```typescript
interface ProjectSelectFieldConfig extends BaseFieldConfig {
  type: 'project-select';
  allowCustom?: boolean;
  placeholder?: string;
}
```

- **Supabase Integration**: Loads projects from database
- **Search & Filter**: Find projects quickly
- **Custom Creation**: Add new projects inline
- **Selection Management**: Clear and change selections

## 🎨 UI Component Library

### Core UI Components

#### **Button** - Action Controls

- **Variants**: `default`, `ghost`, `outline`, `destructive`
- **Sizes**: `sm`, `default`, `lg`
- **States**: Loading, disabled, active
- **Icon Support**: Leading/trailing icons

#### **Input/Textarea** - Form Controls

- **Error States**: Visual error indicators
- **Focus Management**: Accessible focus handling
- **Placeholder Support**: Contextual hints
- **Validation**: Real-time validation feedback

#### **Badge** - Status Indicators

- **Color Variants**: Multiple semantic colors
- **Sizes**: Small, default variations
- **Interactive**: Removable badges for tags

#### **Dropdown Menu** - Action Menus

- **Radix Integration**: Accessible dropdown components
- **Keyboard Navigation**: Full keyboard support
- **Positioning**: Smart positioning and collision detection

## 📡 Integration Layer

### App Integration Pattern

The module integrates through a dedicated page component that acts as an adapter:

```typescript
// src/app/(app)/noted/page.tsx
export default function NotedPage() {
  // 1. Gather dependencies from main app
  const { user } = useAuth();           // App's auth system
  const { toast } = useToast();         // App's notification system
  const searchParams = useSearchParams(); // URL state management

  // 2. Guard clauses - check prerequisites
  if (!user) return <div>Please log in to access notes.</div>;
  if (!supabase) return <div>Supabase configuration missing.</div>;

  // 3. Data transformation - convert app user to module format
  const supabaseUser: SupabaseUser = {
    id: user.id,
    email: user.email,
    // ... mapping app user to Supabase user format
  };

  // 4. Dependency injection - pass everything to module
  return (
    <div className="flex h-screen flex-col">
      <NotesDashboard
        supabaseClient={supabase}    // Database connection
        user={supabaseUser}          // User data
        toast={toast}                // Notification system
        initialTab={currentTab}      // URL state
      />
    </div>
  );
}
```

### Integration Responsibilities

**Integration Layer** (`page.tsx`):

- **Dependency Collection**: Gathers `supabase`, `user`, `toast`, URL params
- **Authentication Guard**: Validates user auth and configuration
- **Data Transformation**: Converts between app and module data formats
- **Route Management**: Handles URL parameters and navigation
- **Error Boundaries**: App-level error handling and loading states
- **Layout Wrapper**: Provides page-level styling and structure

**Noted Module** (`packages/noted-module`):

- **Pure Business Logic**: Self-contained note functionality
- **Reusable Components**: Framework-agnostic React components
- **Minimal Dependencies**: Only essential peer dependencies
- **Data Operations**: Database CRUD operations
- **Form Logic**: Validation, field management, submission handling

## 🔄 Data Flow

### Note Creation Flow

```
1. User fills out form in FormGenerator
   ↓
2. Form validation with Zod schemas
   ↓
3. Data transformation for Supabase
   ↓
4. NotedForm handles submission
   ↓
5. Supabase insert operation
   ↓
6. Success callback triggers view refresh
   ↓
7. Dashboard switches to list view
```

### Note Management Flow

```
1. NotesDashboard loads with useNotes hook
   ↓
2. useNotes fetches data from Supabase
   ↓
3. Notes displayed in NotesList
   ↓
4. User actions (view/edit/delete) trigger callbacks
   ↓
5. Dashboard manages view mode transitions
   ↓
6. Data updates refresh the notes collection
```

## 🚀 Usage Examples

### Basic Integration

```typescript
import { NotesDashboard } from '@yourorg/noted-module';

function MyApp() {
  return (
    <NotesDashboard
      supabaseClient={supabase}
      user={user}
      toast={toast}
      initialTab="create"
    />
  );
}
```

### Custom Form with FormGenerator

```typescript
import { FormGenerator } from '@yourorg/noted-module';

const customSchema = {
  title: 'Contact Form',
  table: 'contacts',
  fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { key: 'message', label: 'Message', type: 'textarea', required: true },
  ],
};

function ContactForm() {
  return (
    <FormGenerator
      schema={customSchema}
      onSubmit={async (data) => {
        await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
      }}
    />
  );
}
```

### Individual Field Components

```typescript
import { TextField, TagField, ImagesField } from '@yourorg/noted-module/components';

function CustomForm() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);

  return (
    <form>
      <TextField
        config={{ key: 'title', label: 'Title', type: 'text' }}
        value={title}
        onChange={setTitle}
      />
      <TagField
        config={{ key: 'tags', label: 'Tags', type: 'tags' }}
        value={tags}
        onChange={setTags}
      />
      <ImagesField
        config={{ key: 'images', label: 'Images', type: 'images' }}
        value={images}
        onChange={setImages}
      />
    </form>
  );
}
```

## 🔧 Customization & Extension

### Theme Customization

```typescript
function ThemedNotes() {
  return (
    <div className="dark">
      <NotesDashboard
        supabaseClient={supabase}
        user={user}
        toast={toast}
        className="bg-gray-900 text-white"
      />
    </div>
  );
}
```

### Custom Toast Integration

```typescript
// React Hot Toast
import toast from 'react-hot-toast';

const customToast = ({ title, description, type }) => {
  if (type === 'success') toast.success(`${title}: ${description}`);
  else if (type === 'error') toast.error(`${title}: ${description}`);
};

// Chakra UI Toast
import { useToast } from '@chakra-ui/react';

const chakraToast = useToast();
const customToast = ({ title, description, type }) => {
  chakraToast({
    title,
    description,
    status: type,
    duration: 5000,
    isClosable: true,
  });
};
```

## 📚 Type Definitions

### Core Data Types

```typescript
// Note data structure
interface NotedData {
  title: string;
  description: string;
  project_name?: string;
  tags: string[];
  links: LinkObject[];
  images: ImageObject[];
  screenshots: ImageObject[];
}

// Database note with metadata
interface DbNoted extends NotedData {
  id: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// Form field configuration
interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
}

// Complete form schema
interface FormSchema {
  title: string;
  description?: string;
  fields: FieldConfig[];
  submitText?: string;
  resetText?: string;
  table: string;
  autoFields?: {
    user_id?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
  };
}
```

### Integration Types

```typescript
// Required integration props
interface RequiredIntegration {
  supabaseClient: SupabaseClient;
  user: SupabaseUser;
  toast: ToastFunction;
}

// Toast function signature
type ToastFunction = (config: {
  title: string;
  description: string;
  type: 'success' | 'error' | 'info';
}) => void;
```

## 🎯 Key Features Summary

### ✅ Production-Ready Features

- **Full TypeScript Support**: Complete type safety and IntelliSense
- **Validation System**: Zod schemas with real-time validation
- **Responsive Design**: Mobile-first, desktop-enhanced layouts
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Optimized rendering, lazy loading, efficient state management
- **Error Handling**: Comprehensive error states and recovery mechanisms
- **Testing Ready**: Component isolation enables easy unit/integration testing

### ✅ Developer Experience

- **Hot Reloading**: Development-friendly with fast refresh support
- **Component Storybook**: Isolated component development and testing
- **API Documentation**: Complete TypeScript definitions and JSDoc comments
- **Example Integration**: Working examples for multiple frameworks
- **Modular Architecture**: Use individual components or complete system

### ✅ Deployment & Distribution

- **NPM Publishing**: Ready for npm/GitHub packages distribution
- **Tree Shaking**: Optimized bundle size with unused code elimination
- **Multiple Formats**: ESM and CJS builds for broad compatibility
- **Framework Agnostic**: Works with Next.js, Vite, CRA, Remix, etc.

## 📖 Best Practices

### Integration Guidelines

1. **Always provide all required props**: `supabaseClient`, `user`, `toast`
2. **Handle loading and error states** in the integration layer
3. **Transform data types** between app and module formats as needed
4. **Use TypeScript** for better development experience and type safety
5. **Test integration points** separately from module functionality

### Performance Optimization

1. **Lazy load** the module when not immediately needed
2. **Memoize** user transformation logic to prevent unnecessary re-renders
3. **Debounce** search and filter operations in lists
4. **Optimize images** before upload to reduce bandwidth

### Security Considerations

1. **Row Level Security**: Enable RLS policies in Supabase
2. **Input Validation**: Always validate on both client and server
3. **File Upload Limits**: Configure appropriate size and type restrictions
4. **User Permissions**: Ensure users can only access their own data

This comprehensive reference provides everything needed to understand, integrate, and extend the Noted Module across different applications and use cases.
