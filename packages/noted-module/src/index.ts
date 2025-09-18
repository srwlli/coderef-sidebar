// Main exports
export { NotedForm } from './components/NotedForm';
export { FormGenerator } from './components/FormGenerator';

// Form configuration
export { notedFormSchema, getNotedFormSchema, getNotedEditFormSchema } from './lib/forms/notedSchema';

// Types
export type {
  NotedData,
  DbNoted,
  FormSchema,
  FieldConfig,
  LinkObject,
  ImageObject,
} from './lib/types';

// Field components (for custom usage)
export * from './components/fields';

// Utilities
export { generateZodSchema, validateFormData, prepareSupabaseData } from './lib/forms/validation';
export { cn } from './lib/utils';