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
import { Loader2, FolderOpen, Tag, Link, Plus, Image, Camera } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

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
  supabaseClient?: any;
  user?: any;
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

  const renderInlineField = (field: FieldConfig) => {
    const value = watchedValues[field.key];

    const getIcon = () => {
      switch (field.key) {
        case 'project_name': return <FolderOpen className="h-4 w-4" />;
        case 'tags': return <Tag className="h-4 w-4" />;
        case 'links': return <Link className="h-4 w-4" />;
        case 'images': return <Image className="h-4 w-4" />;
        case 'screenshots': return <Camera className="h-4 w-4" />;
        default: return <Plus className="h-4 w-4" />;
      }
    };

    const getDisplayText = () => {
      switch (field.key) {
        case 'project_name':
          return value ? `Project: ${value}` : 'Add Project';
        case 'tags':
          return Array.isArray(value) && value.length > 0
            ? `Tags (${value.length})`
            : 'Add Tags';
        case 'links':
          return Array.isArray(value) && value.length > 0
            ? `Links (${value.length})`
            : 'Add Links';
        case 'images':
          return Array.isArray(value) && value.length > 0
            ? `Images (${value.length})`
            : 'Add Images';
        case 'screenshots':
          return Array.isArray(value) && value.length > 0
            ? `Screenshots (${value.length})`
            : 'Add Screenshots';
        default:
          return field.label;
      }
    };

    return (
      <DropdownMenu key={field.key}>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 gap-2 text-muted-foreground hover:text-foreground"
          >
            {getIcon()}
            <span className="text-xs">{getDisplayText()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-4" align="start">
          <div className="space-y-2">
            {renderField(field)}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
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
    <div className={cn('space-y-6', className)}>
      {/* Form header */}
      <div className="space-y-3">
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

        {/* Inline actions bar */}
        <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg border">
          {schema.fields
            .filter((field) => ['project_name', 'tags', 'links', 'images', 'screenshots'].includes(field.key))
            .map((field) => renderInlineField(field))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Main content fields */}
        <div className="space-y-4">
          {schema.fields
            .filter((field) => !['project_name', 'tags', 'links', 'images', 'screenshots'].includes(field.key))
            .map((field) => (
              <div key={field.key}>{renderField(field)}</div>
            ))}
        </div>

        {/* Form actions */}
        <div className="flex justify-end items-center gap-1 pt-4">
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