import { z } from 'zod';
import { FieldConfig, FormSchema, GeneratedSchema } from '../types';

/**
 * Generate Zod schema from form field configurations
 */
export function generateZodSchema(fields: FieldConfig[]): GeneratedSchema {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    // Base schema based on field type
    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
        // Start with base string schema with length validations
        fieldSchema = z.string();

        // Add length validations first
        if ('maxLength' in field && field.maxLength) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            field.maxLength,
            `Maximum ${field.maxLength} characters`
          );
        }
        if ('minLength' in field && field.minLength) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            field.minLength,
            `Minimum ${field.minLength} characters`
          );
        }

        // Add pattern validation
        if ('pattern' in field && field.pattern) {
          fieldSchema = (fieldSchema as z.ZodString).regex(
            new RegExp(field.pattern),
            'Invalid format'
          );
        }

        // Add type-specific validation last
        if (field.type === 'email') {
          fieldSchema = (fieldSchema as z.ZodString).email(
            'Please enter a valid email address'
          );
        } else if (field.type === 'url') {
          fieldSchema = (fieldSchema as z.ZodString)
            .url('Please enter a valid URL')
            .or(z.literal(''));
        }
        break;

      case 'textarea':
        fieldSchema = z.string();

        // Add length validations for textarea
        if ('maxLength' in field && field.maxLength) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            field.maxLength,
            `Maximum ${field.maxLength} characters`
          );
        }
        if ('minLength' in field && field.minLength) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            field.minLength,
            `Minimum ${field.minLength} characters`
          );
        }
        break;

      case 'number':
        fieldSchema = z.number();

        // Add number validations
        if ('min' in field && field.min !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).min(
            field.min,
            `Minimum value is ${field.min}`
          );
        }
        if ('max' in field && field.max !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).max(
            field.max,
            `Maximum value is ${field.max}`
          );
        }
        break;

      case 'tags':
        fieldSchema = z.array(z.string()).default([]);

        // Add max tags validation using refine for custom validation
        if ('maxTags' in field && field.maxTags) {
          fieldSchema = fieldSchema.refine(
            (tags: unknown) =>
              Array.isArray(tags) && tags.length <= field.maxTags!,
            { message: `Maximum ${field.maxTags} tags allowed` }
          );
        }
        break;

      case 'links':
        fieldSchema = z.array(z.object({
          url: z.string().url('Please enter a valid URL'),
          title: z.string().optional(),
          description: z.string().optional(),
        })).default([]);

        // Add max links validation
        if ('maxLinks' in field && field.maxLinks) {
          fieldSchema = fieldSchema.refine(
            (links: unknown) =>
              Array.isArray(links) && links.length <= field.maxLinks!,
            { message: `Maximum ${field.maxLinks} links allowed` }
          );
        }
        break;

      case 'images':
        fieldSchema = z.array(z.object({
          url: z.string().url('Please enter a valid URL'),
          alt: z.string().optional(),
          caption: z.string().optional(),
          filename: z.string().optional(),
          size: z.number().optional(),
          type: z.string().optional(),
        })).default([]);

        // Add max files validation
        if ('maxFiles' in field && field.maxFiles) {
          fieldSchema = fieldSchema.refine(
            (files: unknown) =>
              Array.isArray(files) && files.length <= field.maxFiles!,
            { message: `Maximum ${field.maxFiles} files allowed` }
          );
        }
        break;

      case 'project-select':
        fieldSchema = z.string();
        break;

      case 'select':
        if ('multiple' in field && field.multiple) {
          fieldSchema = z.array(z.string()).default([]);
        } else {
          fieldSchema = z.string();
        }
        break;

      case 'checkbox':
        fieldSchema = z.boolean().default(false);
        break;

      case 'date':
        fieldSchema = z.string().or(z.date());
        break;

      default:
        fieldSchema = z.string();
    }

    // Make field optional if not required
    if (!field.required) {
      if (
        field.type === 'tags' ||
        field.type === 'links' ||
        field.type === 'images' ||
        (field.type === 'select' && 'multiple' in field && field.multiple)
      ) {
        // Arrays default to empty array
        fieldSchema = fieldSchema.optional().default([]);
      } else if (field.type === 'checkbox') {
        // Booleans default to false
        fieldSchema = fieldSchema.optional().default(false);
      } else {
        // Strings can be empty
        fieldSchema = fieldSchema.optional().or(z.literal(''));
      }
    } else {
      // Required field validation
      if (field.type === 'tags' || field.type === 'links' || field.type === 'images') {
        fieldSchema = fieldSchema.refine(
          (items: unknown) => Array.isArray(items) && items.length > 0,
          { message: `${field.label} is required` }
        );
      } else if (
        field.type === 'select' &&
        'multiple' in field &&
        field.multiple
      ) {
        fieldSchema = (fieldSchema as z.ZodArray<z.ZodString>).min(
          1,
          `${field.label} is required`
        );
      } else if (field.type !== 'checkbox') {
        fieldSchema = (fieldSchema as z.ZodString).min(
          1,
          `${field.label} is required`
        );
      }
    }

    schemaFields[field.key] = fieldSchema;
  });

  return z.object(schemaFields) as GeneratedSchema;
}

/**
 * Validate form data against schema
 */
export function validateFormData<T extends Record<string, unknown>>(
  data: Record<string, unknown>,
  schema: GeneratedSchema<T>
) {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((err: z.ZodIssue) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { _form: 'Validation failed' } };
  }
}

/**
 * Prepare data for Supabase insertion
 */
export function prepareSupabaseData(
  formData: Record<string, unknown>,
  schema: FormSchema
): Record<string, unknown> {
  const supabaseData = { ...formData };

  // Add auto fields if configured
  if (schema.autoFields?.user_id) {
    // Note: user_id will be handled in the submission function with auth.uid()
    delete supabaseData.user_id; // Remove if accidentally included
  }

  if (schema.autoFields?.created_at) {
    delete supabaseData.created_at; // Let Supabase handle with DEFAULT NOW()
  }

  if (schema.autoFields?.updated_at) {
    delete supabaseData.updated_at; // Let Supabase handle with DEFAULT NOW()
  }

  // Convert empty strings to null for optional fields
  Object.keys(supabaseData).forEach((key) => {
    if (supabaseData[key] === '') {
      supabaseData[key] = null;
    }
  });

  return supabaseData;
}

/**
 * Get default values for form based on schema
 */
export function getDefaultValues(
  fields: FieldConfig[]
): Record<string, unknown> {
  const defaults: Record<string, unknown> = {};

  fields.forEach((field) => {
    switch (field.type) {
      case 'tags':
      case 'links':
      case 'images':
        defaults[field.key] = [];
        break;
      case 'checkbox':
        defaults[field.key] = false;
        break;
      case 'select':
        if ('multiple' in field && field.multiple) {
          defaults[field.key] = [];
        } else {
          defaults[field.key] = '';
        }
        break;
      case 'number':
        defaults[field.key] = undefined;
        break;
      default:
        defaults[field.key] = '';
    }
  });

  return defaults;
}