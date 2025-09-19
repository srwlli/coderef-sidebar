import { FormSchema } from './formTypes';

/**
 * Form schema configuration for the projects table
 */
export const projectFormSchema: FormSchema = {
  title: '',
  description: '',
  table: 'projects',
  submitText: 'Create Project',
  resetText: 'Clear Form',
  successMessage: 'Project created successfully!',
  autoFields: {
    user_id: true,
    created_at: true,
    updated_at: true,
  },
  fields: [
    {
      key: 'project_name',
      label: '',
      type: 'text',
      required: true,
      placeholder: 'Project Name...',
      description: '',
      maxLength: 255,
    },
    {
      key: 'description',
      label: '',
      type: 'textarea',
      required: false,
      placeholder: 'Description...',
      description: '',
      rows: 4,
      maxLength: 1000,
    },
    {
      key: 'notes',
      label: '',
      type: 'textarea',
      required: false,
      placeholder: 'Notes...',
      description: '',
      rows: 3,
      maxLength: 1000,
    },
    {
      key: 'tags',
      label: 'Tags',
      type: 'tags',
      required: false,
      placeholder: 'Add tags (press Enter to add)',
      description:
        'Add relevant tags to categorize your project (e.g., React, TypeScript, API)',
      maxTags: 10,
      allowCustomTags: true,
      suggestions: [
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Node.js',
        'Python',
        'API',
        'Database',
        'Frontend',
        'Backend',
        'Full Stack',
        'Mobile',
        'Web App',
        'CLI Tool',
        'Library',
        'Framework',
        'Authentication',
        'Real-time',
        'E-commerce',
        'Portfolio',
        'Open Source',
        'Private',
      ],
    },
    {
      key: 'links',
      label: 'Project Links',
      type: 'links',
      required: false,
      description:
        'Add relevant links for your project (Git repository, live demo, etc.)',
      maxLinks: 10,
      allowTitleEdit: true,
      allowDescriptionEdit: true,
    },
  ],
};

/**
 * Get project form schema with custom configuration
 */
export function getProjectFormSchema(
  overrides?: Partial<FormSchema>
): FormSchema {
  return {
    ...projectFormSchema,
    ...overrides,
    fields: overrides?.fields || projectFormSchema.fields,
  };
}
