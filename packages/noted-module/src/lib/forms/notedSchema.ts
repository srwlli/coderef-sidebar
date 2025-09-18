import { FormSchema } from '../types';

/**
 * Form schema configuration for the noted table
 */
export const notedFormSchema: FormSchema = {
  title: '',
  description: '',
  table: 'noted',
  submitText: 'Noted',
  resetText: 'Clear Note',
  successMessage: 'Note saved successfully!',
  autoFields: {
    user_id: true,
    created_at: true,
    updated_at: true,
  },
  fields: [
    {
      key: 'title',
      label: '',
      type: 'text',
      required: true,
      placeholder: 'consider it...',
      maxLength: 255,
      autoFocus: true,
    },
    {
      key: 'description',
      label: '',
      type: 'textarea',
      required: true,
      placeholder: 'noted...',
      rows: 15,
      maxLength: 10000,
    },
  ],
};

/**
 * Get noted form schema with custom configuration
 */
export function getNotedFormSchema(
  overrides?: Partial<FormSchema>
): FormSchema {
  return {
    ...notedFormSchema,
    ...overrides,
    fields: overrides?.fields || notedFormSchema.fields,
  };
}

/**
 * Get noted form schema for editing existing notes
 */
export function getNotedEditFormSchema(): FormSchema {
  return getNotedFormSchema({
    title: 'Edit Note',
    description: 'Update your note with new information or corrections.',
    submitText: 'Update Note',
    successMessage: 'Note updated successfully!',
  });
}
