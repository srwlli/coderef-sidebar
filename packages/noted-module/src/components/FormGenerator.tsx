'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
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
import { Loader2, Tag, FolderOpen, Link, Plus } from 'lucide-react';
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

  // Projects dropdown state
  const [projects, setProjects] = useState<
    Array<{ project_name: string; description?: string }>
  >([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [showNewProjectInput, setShowNewProjectInput] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  // Tags dropdown state
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [loadingTags, setLoadingTags] = useState(false);
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  // Links dropdown state
  const [showNewLinkInput, setShowNewLinkInput] = useState(false);
  const [newLinkUrl, setNewLinkUrl] = useState('');

  // Load projects from database
  const loadProjects = useCallback(async () => {
    if (!supabaseClient || !user) return;

    setLoadingProjects(true);
    try {
      const { data, error } = await supabaseClient
        .from('projects')
        .select('project_name, description')
        .eq('user_id', user.id)
        .order('project_name');

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoadingProjects(false);
    }
  }, [supabaseClient, user]);

  // Load tags from database
  const loadTags = useCallback(async () => {
    if (!supabaseClient || !user) return;

    setLoadingTags(true);
    try {
      const { data, error } = await supabaseClient
        .from('noted')
        .select('tags')
        .eq('user_id', user.id);

      if (error) throw error;

      // Extract unique tags from all notes
      const allTags = new Set<string>();
      data?.forEach((note) => {
        if (note.tags && Array.isArray(note.tags)) {
          note.tags.forEach((tag: string) => allTags.add(tag));
        }
      });

      setAvailableTags(Array.from(allTags).sort());
    } catch (error) {
      console.error('Error loading tags:', error);
    } finally {
      setLoadingTags(false);
    }
  }, [supabaseClient, user]);

  // Load projects and tags on component mount
  useEffect(() => {
    if (supabaseClient && user) {
      loadProjects();
      loadTags();
    }
  }, [loadProjects, loadTags]);

  const handleProjectSelect = (projectName: string) => {
    setValue('project_name', projectName);
  };

  const handleNewProjectSubmit = () => {
    if (newProjectName.trim()) {
      setValue('project_name', newProjectName.trim());
      setNewProjectName('');
      setShowNewProjectInput(false);
    }
  };

  const handleTagSelect = (tag: string) => {
    const currentTags = Array.isArray(watchedValues.tags)
      ? watchedValues.tags
      : [];
    if (!currentTags.includes(tag)) {
      setValue('tags', [...currentTags, tag]);
    }
  };

  const handleNewTagSubmit = () => {
    if (newTagName.trim()) {
      const currentTags = Array.isArray(watchedValues.tags)
        ? watchedValues.tags
        : [];
      const trimmedTag = newTagName.trim();
      if (!currentTags.includes(trimmedTag)) {
        setValue('tags', [...currentTags, trimmedTag]);
      }
      setNewTagName('');
      setShowNewTagInput(false);
    }
  };

  const handleNewLinkSubmit = () => {
    if (newLinkUrl.trim()) {
      const currentLinks = Array.isArray(watchedValues.links)
        ? watchedValues.links
        : [];
      const trimmedUrl = newLinkUrl.trim();

      // Check if URL already exists
      const urlExists = currentLinks.some(
        (link: { url: string }) => link.url === trimmedUrl
      );
      if (!urlExists) {
        setValue('links', [...currentLinks, { url: trimmedUrl }]);
      }
      setNewLinkUrl('');
      setShowNewLinkInput(false);
    }
  };

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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-9 w-9 p-0"
                      title="Set Project"
                    >
                      <FolderOpen className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    {loadingProjects ? (
                      <div className="text-muted-foreground p-2 text-center text-sm">
                        Loading projects...
                      </div>
                    ) : (
                      <>
                        {projects.length > 0 && (
                          <>
                            {projects.map((project) => (
                              <DropdownMenuItem
                                key={project.project_name}
                                onClick={() =>
                                  handleProjectSelect(project.project_name)
                                }
                                className="flex flex-col items-start"
                              >
                                <div className="font-medium">
                                  {project.project_name}
                                </div>
                                {project.description && (
                                  <div className="text-muted-foreground truncate text-xs">
                                    {project.description}
                                  </div>
                                )}
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                          </>
                        )}

                        {showNewProjectInput ? (
                          <div className="space-y-2 p-2">
                            <Input
                              type="text"
                              placeholder="Enter project name"
                              value={newProjectName}
                              onChange={(e) =>
                                setNewProjectName(e.target.value)
                              }
                              onKeyPress={(e) =>
                                e.key === 'Enter' && handleNewProjectSubmit()
                              }
                              className="h-8 text-sm"
                              autoFocus
                            />
                            <div className="flex gap-1">
                              <Button
                                type="button"
                                size="sm"
                                onClick={handleNewProjectSubmit}
                                disabled={!newProjectName.trim()}
                                className="h-6 px-2 text-xs"
                              >
                                Add
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setShowNewProjectInput(false);
                                  setNewProjectName('');
                                }}
                                className="h-6 px-2 text-xs"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => setShowNewProjectInput(true)}
                            className="flex items-center gap-2"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add New Project</span>
                          </DropdownMenuItem>
                        )}
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-9 w-9 p-0"
                      title="Add Tags"
                    >
                      <Tag className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    {loadingTags ? (
                      <div className="text-muted-foreground p-2 text-center text-sm">
                        Loading tags...
                      </div>
                    ) : (
                      <>
                        {availableTags.length > 0 && (
                          <>
                            {availableTags
                              .filter((tag) => {
                                const currentTags = Array.isArray(
                                  watchedValues.tags
                                )
                                  ? watchedValues.tags
                                  : [];
                                return !currentTags.includes(tag);
                              })
                              .map((tag) => (
                                <DropdownMenuItem
                                  key={tag}
                                  onClick={() => handleTagSelect(tag)}
                                >
                                  <span>{tag}</span>
                                </DropdownMenuItem>
                              ))}
                            {availableTags.filter((tag) => {
                              const currentTags = Array.isArray(
                                watchedValues.tags
                              )
                                ? watchedValues.tags
                                : [];
                              return !currentTags.includes(tag);
                            }).length > 0 && <DropdownMenuSeparator />}
                          </>
                        )}

                        {showNewTagInput ? (
                          <div className="space-y-2 p-2">
                            <Input
                              type="text"
                              placeholder="Enter tag name"
                              value={newTagName}
                              onChange={(e) => setNewTagName(e.target.value)}
                              onKeyPress={(e) =>
                                e.key === 'Enter' && handleNewTagSubmit()
                              }
                              className="h-8 text-sm"
                              autoFocus
                            />
                            <div className="flex gap-1">
                              <Button
                                type="button"
                                size="sm"
                                onClick={handleNewTagSubmit}
                                disabled={!newTagName.trim()}
                                className="h-6 px-2 text-xs"
                              >
                                Add
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setShowNewTagInput(false);
                                  setNewTagName('');
                                }}
                                className="h-6 px-2 text-xs"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => setShowNewTagInput(true)}
                            className="flex items-center gap-2"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add New Tag</span>
                          </DropdownMenuItem>
                        )}

                        {availableTags.filter((tag) => {
                          const currentTags = Array.isArray(watchedValues.tags)
                            ? watchedValues.tags
                            : [];
                          return !currentTags.includes(tag);
                        }).length === 0 &&
                          availableTags.length > 0 && (
                            <div className="text-muted-foreground p-2 text-center text-sm">
                              All available tags are already added
                            </div>
                          )}
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-9 w-9 p-0"
                      title="Add Links"
                    >
                      <Link className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    {showNewLinkInput ? (
                      <div className="space-y-2 p-2">
                        <Input
                          type="url"
                          placeholder="Enter URL (https://...)"
                          value={newLinkUrl}
                          onChange={(e) => setNewLinkUrl(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === 'Enter' && handleNewLinkSubmit()
                          }
                          className="h-8 text-sm"
                          autoFocus
                        />
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleNewLinkSubmit}
                            disabled={!newLinkUrl.trim()}
                            className="h-6 px-2 text-xs"
                          >
                            Add
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setShowNewLinkInput(false);
                              setNewLinkUrl('');
                            }}
                            className="h-6 px-2 text-xs"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => setShowNewLinkInput(true)}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add URL</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
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
