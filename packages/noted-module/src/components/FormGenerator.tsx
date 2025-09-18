'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import {
  FormSchema,
  FieldConfig,
  TextFieldConfig,
  TextAreaFieldConfig,
  TagsFieldConfig,
  LinksFieldConfig,
  ImagesFieldConfig,
  ProjectSelectFieldConfig,
} from '../lib/types';
import {
  generateZodSchema,
  getDefaultValues,
  prepareSupabaseData,
} from '../lib/forms/validation';
import { TextField } from './fields/TextField';
import { TextAreaField } from './fields/TextAreaField';
import { TagField } from './fields/TagField';
import { LinksField } from './fields/LinksField';
import { ImagesField } from './fields/ImagesField';
import { ProjectSelectField } from './fields/ProjectSelectField';
import { cn } from '../lib/utils';
import { Loader2, Tag, FolderOpen, Link } from 'lucide-react';
import type { SupabaseClient, User } from '@supabase/supabase-js';

interface FormGeneratorProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  schema: FormSchema;
  onSubmit: (data: T) => Promise<void>;
  onReset?: () => void;
  className?: string;
  disabled?: boolean;
  initialData?: T;
  // Optional props for integrations
  supabaseClient?: SupabaseClient;
  user?: User;
}

export function FormGenerator<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  schema,
  onSubmit,
  onReset,
  className,
  disabled = false,
  initialData,
  supabaseClient,
  user,
}: FormGeneratorProps<T>) {
  const zodSchema = generateZodSchema(schema.fields);
  const defaultValues = initialData || getDefaultValues(schema.fields);

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

  const handleFieldJump = (fieldKey: string) => {
    // Scroll to the field
    const fieldElement = document.getElementById(fieldKey);
    if (fieldElement) {
      fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      fieldElement.focus();
    }
  };

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
        // Special handling for title field to include add dropdown
        if (field.key === 'title') {
          return (
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <TextField
                  {...commonProps}
                  config={field as TextFieldConfig}
                  value={typeof value === 'string' ? value : ''}
                  onChange={(newValue) => setValue(field.key, newValue)}
                />
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0"
                  title="Set Project"
                  onClick={() => handleFieldJump('project_name')}
                >
                  <FolderOpen className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0"
                  title="Add Tags"
                  onClick={() => handleFieldJump('tags')}
                >
                  <Tag className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0"
                  title="Add Links"
                  onClick={() => handleFieldJump('links')}
                >
                  <Link className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        }
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

      case 'links':
        return (
          <LinksField
            {...commonProps}
            config={field as LinksFieldConfig}
            value={Array.isArray(value) ? value : []}
            onChange={(newValue) => setValue(field.key, newValue)}
          />
        );

      case 'images':
        return (
          <ImagesField
            {...commonProps}
            config={field as ImagesFieldConfig}
            value={Array.isArray(value) ? value : []}
            onChange={(newValue) => setValue(field.key, newValue)}
          />
        );

      case 'project-select':
        return (
          <ProjectSelectField
            {...commonProps}
            config={field as ProjectSelectFieldConfig}
            value={typeof value === 'string' ? value : ''}
            onChange={(newValue) => setValue(field.key, newValue)}
            supabaseClient={supabaseClient}
            user={user}
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
    <div className={cn('flex h-full flex-col p-3 sm:p-0', className)}>
      {/* Form header - fixed height */}
      <div className="mb-4 flex-shrink-0 space-y-3">
        {/* Title and description - only show if they exist */}
        {(schema.title || schema.description) && (
          <div className="space-y-2">
            {schema.title && (
              <h2 className="text-2xl font-semibold">{schema.title}</h2>
            )}
            {schema.description && (
              <p className="text-muted-foreground">{schema.description}</p>
            )}
          </div>
        )}
      </div>

      {/* Form - flexible height */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-1 flex-col"
      >
        {/* Main content fields - flexible */}
        <div className="flex flex-1 flex-col gap-4">
          {schema.fields.map((field) => (
            <div
              key={field.key}
              className={field.type === 'textarea' ? 'flex-1' : 'flex-shrink-0'}
            >
              {renderField(field)}
            </div>
          ))}
        </div>

        {/* Form actions - fixed height */}
        <div className="flex flex-shrink-0 items-center justify-end gap-1 pt-4">
          {schema.resetText && (
            <>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleReset}
                disabled={disabled || isSubmitting}
                className="text-muted-foreground hover:text-foreground"
              >
                {schema.resetText}
              </Button>
              <span className="text-muted-foreground">|</span>
            </>
          )}
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            disabled={disabled || isSubmitting}
            className="text-muted-foreground hover:text-foreground"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Submitting...' : schema.submitText || 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
}
