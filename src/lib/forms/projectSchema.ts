import { FormSchema } from './formTypes';

/**
 * Form schema configuration for the projects table
 */
export const projectFormSchema: FormSchema = {
  title: 'Create New Project',
  description:
    'Add a new project to your portfolio with all the essential details and links.',
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
      key: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      placeholder: 'Enter your username',
      description: 'Your unique username for this project',
      maxLength: 50,
      autoFocus: true,
    },
    {
      key: 'project_name',
      label: 'Project Name',
      type: 'text',
      required: true,
      placeholder: 'My Awesome Project',
      description: 'A clear, descriptive name for your project',
      maxLength: 255,
    },
    {
      key: 'description',
      label: 'Description',
      type: 'textarea',
      required: false,
      placeholder: 'Describe what your project does and its key features...',
      description:
        'A detailed description of your project, its purpose, and key features',
      rows: 4,
      maxLength: 1000,
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
      placeholder: 'Add any additional notes, todos, or reminders...',
      description: 'Internal notes, todos, or any additional information',
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
      key: 'git',
      label: 'Git Repository',
      type: 'url',
      required: false,
      placeholder: 'https://github.com/username/repo-name',
      description: 'Link to your Git repository (GitHub, GitLab, etc.)',
      maxLength: 255,
    },
    {
      key: 'supabase',
      label: 'Supabase Project',
      type: 'text',
      required: false,
      placeholder: 'project-id or reference',
      description: 'Supabase project ID or reference if applicable',
      maxLength: 50,
    },
    {
      key: 'local_link',
      label: 'Local Development URL',
      type: 'url',
      required: false,
      placeholder: 'http://localhost:3000',
      description: 'Local development server URL',
      maxLength: 100,
    },
    {
      key: 'deployed_link',
      label: 'Deployed URL',
      type: 'url',
      required: false,
      placeholder: 'https://myproject.vercel.app',
      description: 'Live deployment URL (Vercel, Netlify, etc.)',
      maxLength: 255,
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
