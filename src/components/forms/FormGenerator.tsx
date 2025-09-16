'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  FormSchema,
  FieldConfig,
  TextFieldConfig,
  TextAreaFieldConfig,
  TagsFieldConfig,
} from '@/lib/forms/formTypes';
import {
  generateZodSchema,
  getDefaultValues,
  prepareSupabaseData,
} from '@/lib/forms/validation';
import { TextField } from './fields/TextField';
import { TextAreaField } from './fields/TextAreaField';
import { TagField } from './fields/TagField';
import { cn } from '@/lib/utils';

interface FormGeneratorProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  schema: FormSchema;
  onSubmit: (data: T) => Promise<void>;
  onReset?: () => void;
  className?: string;
  disabled?: boolean;
}

export function FormGenerator<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  schema,
  onSubmit,
  onReset,
  className,
  disabled = false,
}: FormGeneratorProps<T>) {
  const zodSchema = generateZodSchema(schema.fields);
  const defaultValues = getDefaultValues(schema.fields);

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

  const watchedValues = watch();

  const renderField = (field: FieldConfig) => {
    const value = watchedValues[field.key];
    const error = errors[field.key]?.message as string;

    const commonProps = {
      error,
      disabled: disabled || isSubmitting,
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
        return (
          <TextField
            {...commonProps}
            config={field as TextFieldConfig}
            value={typeof value === 'string' ? value : ''}
            onChange={(newValue) => setValue(field.key, newValue)}
          />
        );

      case 'textarea':
        return (
          <TextAreaField
            {...commonProps}
            config={field as TextAreaFieldConfig}
            value={typeof value === 'string' ? value : ''}
            onChange={(newValue) => setValue(field.key, newValue)}
          />
        );

      case 'tags':
        return (
          <TagField
            {...commonProps}
            config={field as TagsFieldConfig}
            value={Array.isArray(value) ? value : []}
            onChange={(newValue) => setValue(field.key, newValue)}
          />
        );

      default:
        console.warn(`Unsupported field type: ${field.type}`);
        return null;
    }
  };

  const handleFormSubmit = async (data: Record<string, unknown>) => {
    try {
      const supabaseData = prepareSupabaseData(data, schema);
      await onSubmit(supabaseData as T);
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  };

  const handleReset = () => {
    reset(defaultValues);
    onReset?.();
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Form header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{schema.title}</h2>
        {schema.description && (
          <p className="text-muted-foreground">{schema.description}</p>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Form fields */}
        <div className="space-y-4">
          {schema.fields.map((field) => (
            <div key={field.key}>{renderField(field)}</div>
          ))}
        </div>

        {/* Form actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={disabled || isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? 'Submitting...' : schema.submitText || 'Submit'}
          </Button>

          {schema.resetText && (
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={disabled || isSubmitting}
            >
              {schema.resetText}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
