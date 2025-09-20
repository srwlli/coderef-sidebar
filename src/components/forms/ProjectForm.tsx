'use client';

import React, { useState } from 'react';
import { FormGenerator } from './FormGenerator';
import { projectFormSchema } from '@/lib/forms/projectSchema';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { ProjectData, DbProject } from '@/lib/forms/formTypes';
import { useAuth } from '@/lib/auth-context';
import { useUpdateProject, useCheckProjectName } from '@/hooks/useProjects';
import { User } from '@supabase/supabase-js';

interface ProjectFormProps {
  onSuccess?: (data: ProjectData) => void;
  onCancel?: () => void;
  className?: string;
  initialData?: DbProject; // For editing
  mode?: 'create' | 'edit';
}

export function ProjectForm({
  onSuccess,
  onCancel,
  className,
  initialData,
  mode = 'create',
}: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const updateProject = useUpdateProject();
  const checkProjectName = useCheckProjectName();

  const handleSubmit = async (data: ProjectData) => {
    setIsSubmitting(true);

    try {
      // Check project name uniqueness before submitting (only if name changed in edit mode)
      const shouldCheckName =
        mode === 'create' ||
        (mode === 'edit' &&
          initialData &&
          data.project_name !== initialData.project_name);

      if (shouldCheckName) {
        try {
          const isNameAvailable = await checkProjectName.mutateAsync({
            projectName: data.project_name,
            excludeId:
              mode === 'edit' && initialData ? initialData.id : undefined,
          });

          if (!isNameAvailable) {
            throw new Error(
              'A project with this name already exists. Please choose a different name.'
            );
          }
        } catch (nameCheckError) {
          console.error('Error checking project name:', nameCheckError);
          // Don't block the update if name check fails - just warn
          if (mode === 'create') {
            throw nameCheckError;
          }
        }
      }
      if (mode === 'edit' && initialData) {
        // Edit mode - use mutation hook
        await updateProject.mutateAsync({
          id: initialData.id,
          ...data,
        });

        toast({
          title: 'Success',
          description: 'Project updated successfully!',
          type: 'success',
        });

        // Close modal after successful update
        setTimeout(() => {
          onSuccess?.(data);
        }, 500);
      } else {
        // Create mode - existing logic
        // Check if Supabase is configured
        if (!isSupabaseConfigured() || !supabase) {
          throw new Error('Supabase is not configured');
        }

        // Check if user is authenticated
        if (!user) {
          throw new Error('You must be logged in to create a project');
        }

        // Include user ID in the project data
        // Access user metadata safely
        const userMetadata =
          user && 'user_metadata' in user
            ? (user as User & { user_metadata?: { display_name?: string } })
                .user_metadata
            : undefined;

        // Ensure required fields have defaults
        const projectWithUser = {
          ...data,
          tags: data.tags || [], // Ensure tags is always an array
          links: data.links || [], // Ensure links is always an array
          user_id: user.id,
          username:
            userMetadata?.display_name ||
            user.email?.split('@')[0] ||
            'unknown',
        };

        // Debug: Log the data being sent
        console.log('Creating project with data:', projectWithUser);

        const { data: insertedData, error } = await supabase
          .from('projects')
          .insert([projectWithUser])
          .select()
          .single();

        if (error) {
          throw error;
        }

        toast({
          title: 'Success',
          description:
            projectFormSchema.successMessage || 'Project created successfully!',
          type: 'success',
        });

        // Small delay to ensure UI updates properly
        setTimeout(() => {
          onSuccess?.(insertedData);
        }, 100);
      }
    } catch (error: unknown) {
      console.error(`Project ${mode} error:`, error);

      // Enhanced error logging
      if (error && typeof error === 'object') {
        console.error('Detailed error:', JSON.stringify(error, null, 2));
      }

      // Better error message extraction
      let errorMessage = `Failed to ${mode} project. Please try again.`;

      // Type-safe error handling
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as Error).message;
      } else if (error && typeof error === 'object' && 'details' in error) {
        errorMessage = String((error as { details: unknown }).details);
      } else if (error && typeof error === 'object' && 'hint' in error) {
        errorMessage = String((error as { hint: unknown }).hint);
      }

      toast({
        title: 'Error',
        description: errorMessage,
        type: 'error',
      });

      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (mode === 'edit') {
      onCancel?.();
    } else {
      toast({
        title: 'Form Reset',
        description: 'Form has been cleared.',
        type: 'info',
      });
    }
  };

  // Convert DbProject to ProjectData for form
  const formInitialData = initialData
    ? {
        project_name: initialData.project_name,
        description: initialData.description || '',
        notes: initialData.notes || '',
        tags: Array.isArray(initialData.tags) ? initialData.tags : [],
        links: Array.isArray(initialData.links) ? initialData.links : [],
      }
    : undefined;

  return (
    <FormGenerator<ProjectData>
      schema={projectFormSchema}
      onSubmit={handleSubmit}
      onReset={handleReset}
      disabled={isSubmitting}
      className={className}
      initialData={formInitialData}
    />
  );
}
