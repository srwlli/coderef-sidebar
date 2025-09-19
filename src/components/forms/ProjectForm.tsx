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
      // Check project name uniqueness before submitting
      const isNameAvailable = await checkProjectName.mutateAsync({
        projectName: data.project_name,
        excludeId: mode === 'edit' && initialData ? initialData.id : undefined,
      });

      if (!isNameAvailable) {
        throw new Error(
          'A project with this name already exists. Please choose a different name.'
        );
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

        // Keep modal open briefly to show success, then close
        setTimeout(() => {
          onSuccess?.(data);
        }, 1500);
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

        const projectWithUser = {
          ...data,
          user_id: user.id,
          username:
            userMetadata?.display_name ||
            user.email?.split('@')[0] ||
            'unknown',
        };

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

        onSuccess?.(insertedData);
      }
    } catch (error: unknown) {
      console.error(`Project ${mode} error:`, error);

      toast({
        title: 'Error',
        description:
          (error as Error)?.message ||
          `Failed to ${mode} project. Please try again.`,
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
        tags: initialData.tags || [],
        links: initialData.links || [],
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
