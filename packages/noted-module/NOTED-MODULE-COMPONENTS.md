# Noted Module Components Reference

## User Interface Components and Icons

This document provides a reference for all UI components and their associated icons in the noted module.

## Header Components (`src/components/layout/Header.tsx`)

### Navigation Buttons on Title Line

When on the `/noted` page, the header displays two primary navigation buttons:

#### 1. Create Note Button

- **Icon**: `Plus` from `lucide-react`
- **Size**: `h-4 w-4`
- **Text**: "Create Note" (hidden on small screens: `hidden sm:inline`)
- **Function**: Switches to create tab (`handleTabChange('create')`)
- **Active State**: Default variant when `currentTab === 'create'`
- **Inactive State**: Ghost variant
- **Location**: `Header.tsx:38-46`

#### 2. My Notes Button

- **Icon**: `List` from `lucide-react`
- **Size**: `h-4 w-4`
- **Text**: "My Notes" (hidden on small screens: `hidden sm:inline`)
- **Function**: Switches to list tab (`handleTabChange('list')`)
- **Active State**: Default variant when `currentTab === 'list'`
- **Inactive State**: Ghost variant
- **Location**: `Header.tsx:47-56`

**Layout**: Both buttons are positioned on the right side of the header using `ml-auto` and are contained within a flex gap of 1.

## Form Components (`packages/noted-module/src/components/FormGenerator.tsx`)

### Quick Action Buttons

Located next to the title field, these buttons provide quick navigation to specific form sections:

#### 1. Set Project Button

- **Icon**: `FolderOpen` from `lucide-react`
- **Size**: `h-4 w-4`
- **Title**: "Set Project"
- **Function**: Jumps to project_name field (`handleFieldJump('project_name')`)
- **Style**: Outline variant, small size (`h-9 w-9 p-0`)
- **Location**: `FormGenerator.tsx:109-118`

#### 2. Add Tags Button

- **Icon**: `Tag` from `lucide-react`
- **Size**: `h-4 w-4`
- **Title**: "Add Tags"
- **Function**: Jumps to tags field (`handleFieldJump('tags')`)
- **Style**: Outline variant, small size (`h-9 w-9 p-0`)
- **Location**: `FormGenerator.tsx:119-128`

#### 3. Add Links Button

- **Icon**: `Link` from `lucide-react`
- **Size**: `h-4 w-4`
- **Title**: "Add Links"
- **Function**: Jumps to links field (`handleFieldJump('links')`)
- **Style**: Outline variant, small size (`h-9 w-9 p-0`)
- **Location**: `FormGenerator.tsx:129-138`

**Layout**: These buttons are arranged in a horizontal flex container with a gap of 1, positioned to the right of the title input field.

### Form Action Buttons

Located at the bottom of the form, these buttons handle form submission and reset:

#### 4. Submit Button

- **Icon**: `Loader2` (conditional - only when submitting)
- **Size**: `h-4 w-4` with `animate-spin` class
- **Text**:
  - Default: `schema.submitText` or "Submit"
  - Loading: "Submitting..."
- **Function**: Submits the form (`handleFormSubmit`)
- **Style**: Ghost variant, small size
- **Loading State**: Shows spinning loader icon with "Submitting..." text
- **Location**: `FormGenerator.tsx:276-285`

#### 5. Reset Button (Conditional)

- **Icon**: None - text only
- **Text**: Uses `schema.resetText` value
- **Function**: Resets the form to default values (`handleReset`)
- **Style**: Ghost variant, small size
- **Visibility**: Only shown when `schema.resetText` exists
- **Location**: `FormGenerator.tsx:263-272`

**Layout**: Form action buttons are positioned at the bottom right of the form with a separator (`|`) between reset and submit buttons when both are present.

## Icon Library

All icons are sourced from **Lucide React** (`lucide-react`) with consistent sizing:

### Icon Reference

- `Plus` - Create/Add actions
- `List` - List/View actions
- `FolderOpen` - Project/Folder actions
- `Tag` - Tagging actions
- `Link` - URL/Link actions
- `Loader2` - Loading states (with `animate-spin`)

### Standard Sizing

- **Primary icons**: `h-4 w-4` (16x16px)
- **Button sizing**:
  - Header buttons: Default button sizing
  - Quick action buttons: `h-9 w-9 p-0` (36x36px with no padding)
  - Form action buttons: Small button sizing

## Component Hierarchy

```
Header
├── SidebarTrigger
├── Title ("noted" or "coderef")
└── Navigation Buttons (when on /noted page)
    ├── Create Note Button (Plus icon)
    └── My Notes Button (List icon)

FormGenerator
├── Form Header
├── Form Fields
│   └── Title Field
│       ├── TextField Input
│       └── Quick Action Buttons
│           ├── Set Project (FolderOpen icon)
│           ├── Add Tags (Tag icon)
│           └── Add Links (Link icon)
└── Form Actions
    ├── Reset Button (conditional, text only)
    └── Submit Button (Loader2 icon when submitting)
```

## Accessibility Features

- **Tooltips**: Quick action buttons include `title` attributes for accessibility
- **Loading States**: Submit button provides visual feedback with spinner and text change
- **Keyboard Navigation**: Form supports standard keyboard navigation
- **Screen Reader Support**: Buttons include appropriate text labels (hidden on mobile for space)

## Responsive Behavior

- **Mobile**: Button text is hidden on small screens (`hidden sm:inline`)
- **Desktop**: Full button text is displayed
- **Quick Actions**: Icon-only buttons maintain consistent size across breakpoints
- **Form Actions**: Maintain bottom-right positioning across screen sizes
