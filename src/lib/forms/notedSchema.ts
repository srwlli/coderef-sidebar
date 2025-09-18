import { FormSchema } from './formTypes';

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
    {
      key: 'project_name',
      label: 'Project',
      type: 'project-select',
      required: false,
      placeholder: 'Select or enter a project name',
      allowCustom: true,
    },
    {
      key: 'tags',
      label: 'Tags',
      type: 'tags',
      required: false,
      placeholder: 'Add tags (press Enter to add)',
      maxTags: 10,
      allowCustomTags: true,
      suggestions: [
        'bug',
        'feature',
        'research',
        'todo',
        'meeting',
        'idea',
        'important',
        'urgent',
        'documentation',
        'testing',
        'deployment',
        'security',
        'performance',
        'ui',
        'ux',
        'api',
        'database',
        'frontend',
        'backend',
        'mobile',
        'web',
        'design',
        'review',
        'feedback',
        'question',
      ],
    },
    {
      key: 'links',
      label: 'Links',
      type: 'links',
      required: false,
      maxLinks: 10,
      allowTitleEdit: true,
      allowDescriptionEdit: true,
    },
    {
      key: 'images',
      label: 'Images',
      type: 'images',
      required: false,
      maxFiles: 5,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
      allowCaptions: true,
    },
    {
      key: 'screenshots',
      label: 'Screenshots',
      type: 'images', // Reuse images field type
      required: false,
      maxFiles: 5,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
      allowCaptions: true,
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