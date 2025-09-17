# Formed Implementation Guide

## Overview

Formed is a schema-driven form generation system for React applications that provides type-safe, reusable forms with minimal configuration. This guide shows you how to integrate Formed into your projects.

## Quick Start

### 1. Copy the Form System

Copy these directories to your project:

```bash
# Copy these directories to your project:
src/lib/forms/           # Core types and validation
src/components/forms/    # Form components
src/hooks/use-toast.ts   # Toast notifications
```

### 2. Install Dependencies

Ensure you have the required dependencies:

```bash
npm install react-hook-form @hookform/resolvers zod
```

For UI components (if using shadcn/ui):

```bash
npx shadcn add input textarea badge button
```

## Creating a Schema

Define your form configuration using the `FormSchema` interface:

```typescript
export const userFormSchema: FormSchema = {
  title: 'Create User',
  table: 'users',
  fields: [
    { key: 'name', type: 'text', required: true, maxLength: 50 },
    { key: 'email', type: 'email', required: true },
    { key: 'bio', type: 'textarea', maxLength: 500 },
    { key: 'skills', type: 'tags', maxTags: 5 },
  ],
};
```

### Field Types

Formed supports the following field types:

- **text**: Single-line text input
- **email**: Email input with validation
- **url**: URL input with validation
- **textarea**: Multi-line text input
- **tags**: Tag input with chip display and suggestions
- **number**: Numeric input
- **select**: Dropdown selection
- **checkbox**: Boolean checkbox
- **date**: Date input

### Field Configuration Options

Each field supports various configuration options:

```typescript
{
  key: 'fieldName',           // Database column name
  label: 'Field Label',       // Display label
  type: 'text',              // Field type
  required: true,            // Required validation
  placeholder: 'Enter...',   // Placeholder text
  description: 'Help text',  // Field description
  maxLength: 100,           // Max character length
  minLength: 5,             // Min character length
  pattern: '^[A-Z]',        // Regex pattern
  defaultValue: 'default',   // Default value

  // Tag-specific options
  maxTags: 5,               // Maximum tags allowed
  allowCustomTags: true,    // Allow custom tag input
  suggestions: ['tag1'],    // Predefined suggestions

  // Number-specific options
  min: 0,                   // Minimum value
  max: 100,                 // Maximum value

  // Select-specific options
  options: ['opt1', 'opt2'], // Select options
  multiple: false,          // Multiple selection
}
```

## Using the Form Generator

### Basic Usage

```tsx
import { FormGenerator } from './components/forms/FormGenerator';
import { userFormSchema } from './schemas/userSchema';

function UserForm() {
  const handleSubmit = async (data) => {
    // Handle form submission
    console.log('Form data:', data);
  };

  return <FormGenerator schema={userFormSchema} onSubmit={handleSubmit} />;
}
```

### With Error Handling

```tsx
function UserForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Submit to your API
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create user');

      toast({
        title: 'Success',
        description: 'User created successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormGenerator
      schema={userFormSchema}
      onSubmit={handleSubmit}
      disabled={isSubmitting}
    />
  );
}
```

### With Supabase Integration

```tsx
import { createClient } from '@/lib/supabase/client';

function UserForm() {
  const supabase = createClient();

  const handleSubmit = async (data) => {
    const { data: insertedData, error } = await supabase
      .from('users')
      .insert([data])
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log('User created:', insertedData);
  };

  return <FormGenerator schema={userFormSchema} onSubmit={handleSubmit} />;
}
```

## Adding New Field Types

### 1. Update Types

Add your new field type to the `FieldType` union in `formTypes.ts`:

```typescript
export type FieldType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'url'
  | 'tags'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'yourNewType';
```

### 2. Create Field Component

Create a new field component following the existing pattern:

```tsx
// src/components/forms/fields/YourNewField.tsx
interface YourNewFieldProps {
  config: YourNewFieldConfig;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  disabled?: boolean;
}

export function YourNewField({
  config,
  value,
  onChange,
  error,
  disabled,
}: YourNewFieldProps) {
  return (
    <BaseField config={config} error={error}>
      {/* Your field implementation */}
    </BaseField>
  );
}
```

### 3. Update FormGenerator

Add your field type to the switch statement in `FormGenerator.tsx`:

```tsx
switch (field.type) {
  // ... existing cases
  case 'yourNewType':
    return (
      <YourNewField
        {...commonProps}
        config={field as any}
        value={value}
        onChange={(newValue) => setValue(field.key, newValue)}
      />
    );
}
```

### 4. Update Validation

Add validation logic in `validation.ts`:

```tsx
switch (field.type) {
  // ... existing cases
  case 'yourNewType':
    fieldSchema = z.string(); // or your custom validation
    break;
}
```

## Best Practices

### Schema Organization

Create separate schema files for each form:

```
src/
  schemas/
    userSchema.ts
    projectSchema.ts
    settingsSchema.ts
```

### Type Safety

Always define proper TypeScript interfaces for your data:

```typescript
interface User {
  name: string;
  email: string;
  bio?: string;
  skills: string[];
}

const userSchema = generateZodSchema(userFormSchema.fields);
type UserFormData = z.infer<typeof userSchema>;
```

### Reusability

Create reusable field configurations:

```typescript
const commonFields = {
  name: { key: 'name', type: 'text', required: true, maxLength: 50 },
  email: { key: 'email', type: 'email', required: true },
};

export const userFormSchema: FormSchema = {
  title: 'Create User',
  fields: [commonFields.name, commonFields.email /* ... */],
};
```

### Error Handling

Always implement proper error handling:

```tsx
const handleSubmit = async (data) => {
  try {
    await submitData(data);
  } catch (error) {
    // Show user-friendly error message
    toast({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
      variant: 'destructive',
    });
  }
};
```

## Architecture

The Formed system consists of:

- **FormGenerator**: Main component that renders forms from schemas
- **Field Components**: Reusable field types (TextField, TagField, etc.)
- **BaseField**: Common wrapper for labels, descriptions, and errors
- **Validation System**: Zod-based validation with custom rules
- **Type System**: Complete TypeScript definitions

This architecture ensures:

- **Type Safety**: Full TypeScript support
- **Reusability**: Easy to copy to other projects
- **Extensibility**: Simple to add new field types
- **Maintainability**: Clean separation of concerns
