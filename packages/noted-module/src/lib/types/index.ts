import { z } from 'zod';

// Field types supported by the form generator
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
  | 'links'
  | 'images'
  | 'project-select';

// Base field configuration
export interface BaseFieldConfig {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

// Text field specific configuration
export interface TextFieldConfig extends BaseFieldConfig {
  type: 'text' | 'email' | 'url';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

// Textarea field configuration
export interface TextAreaFieldConfig extends BaseFieldConfig {
  type: 'textarea';
  rows?: number;
  maxLength?: number;
  minLength?: number;
}

// Tags field configuration
export interface TagsFieldConfig extends BaseFieldConfig {
  type: 'tags';
  maxTags?: number;
  allowCustomTags?: boolean;
  suggestions?: string[];
}

// Select field configuration
export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select';
  options: Array<{ label: string; value: string }>;
  multiple?: boolean;
}

// Number field configuration
export interface NumberFieldConfig extends BaseFieldConfig {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

// Links field configuration
export interface LinksFieldConfig extends BaseFieldConfig {
  type: 'links';
  maxLinks?: number;
  allowTitleEdit?: boolean;
  allowDescriptionEdit?: boolean;
}

// Images field configuration
export interface ImagesFieldConfig extends BaseFieldConfig {
  type: 'images';
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  allowedTypes?: string[];
  allowCaptions?: boolean;
}

// Project select field configuration
export interface ProjectSelectFieldConfig extends BaseFieldConfig {
  type: 'project-select';
  allowCustom?: boolean;
  placeholder?: string;
}

// Union of all field configurations
export type FieldConfig =
  | TextFieldConfig
  | TextAreaFieldConfig
  | TagsFieldConfig
  | SelectFieldConfig
  | NumberFieldConfig
  | LinksFieldConfig
  | ImagesFieldConfig
  | ProjectSelectFieldConfig
  | BaseFieldConfig;

// Form schema configuration
export interface FormSchema {
  title: string;
  description?: string;
  fields: FieldConfig[];
  submitText?: string;
  resetText?: string;
  successMessage?: string;
  table: string; // Supabase table name
  autoFields?: {
    user_id?: boolean; // Auto-add auth.uid()
    created_at?: boolean; // Auto-add timestamp
    updated_at?: boolean; // Auto-add timestamp
  };
}

// Link object type
export interface LinkObject {
  url: string;
  title?: string;
  description?: string;
}

// Image object type
export interface ImageObject {
  url: string;
  alt?: string;
  caption?: string;
  filename?: string;
  size?: number;
  type?: string;
}

// Field value types
export type FieldValue =
  | string
  | number
  | boolean
  | string[]
  | Date
  | LinkObject[]
  | ImageObject[]
  | null
  | undefined;

// Form submission data
export type FormData<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T;

// Form state
export interface FormState<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  data: FormData<T>;
}

// Validation result
export interface ValidationResult<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  success: boolean;
  data?: FormData<T>;
  errors?: Record<string, string>;
}

// Form generator props
export interface FormGeneratorProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  schema: FormSchema;
  onSubmit?: (data: FormData<T>) => Promise<void>;
  onSuccess?: (data: FormData<T>) => void;
  onError?: (error: string) => void;
  className?: string;
  disabled?: boolean;
  defaultValues?: Partial<FormData<T>>;
}

// Field component props
export interface FieldProps {
  config: FieldConfig;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
  error?: string;
  disabled?: boolean;
}

// Zod schema generation utility types
export type ZodSchemaType = z.ZodTypeAny;
export type GeneratedSchema<
  T extends Record<string, unknown> = Record<string, unknown>,
> = z.ZodObject<{ [K in keyof T]: z.ZodTypeAny }>;

// Noted-specific data type
export interface NotedData extends Record<string, unknown> {
  title: string;
  description: string;
  project_name?: string;
  tags: string[];
  links: LinkObject[];
  images: ImageObject[];
  screenshots: ImageObject[];
}

// Database noted type with additional fields
export interface DbNoted extends NotedData {
  id: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}