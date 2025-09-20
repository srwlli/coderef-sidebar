'use client';

import React, { useState } from 'react';
import { FormGenerator } from './FormGenerator';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { ProjectData, DbProject } from '@/lib/forms/formTypes';
import { useAuth } from '@/lib/auth-context';
import ErrorBoundary from '@/components/ErrorBoundary';

interface ProjectFormProps {
  onSuccess?: (data: ProjectData) => void;
  onCancel?: () => void;
  className?: string;
  initialData?: DbProject; // For editing
  mode?: 'create' | 'edit';
}

// Simple working schema based on TestEditForm pattern
const projectFormSchema = {
  title: 'Project Form',
  description: 'Create or edit project',
  table: 'projects',
  submitText: 'Save Project',
  resetText: 'Cancel',
  successMessage: 'Project saved successfully!',
  fields: [
    {
      key: 'project_name',
      label: 'Project Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter project name...',
      description: 'Name of the project',
      maxLength: 255,
    },
    {
      key: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: false,
      placeholder: 'Enter description...',
      description: 'Project description',
      rows: 4,
      maxLength: 1000,
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'textarea' as const,
      required: false,
      placeholder: 'Enter notes...',
      description: 'Additional project notes',
      rows: 3,
      maxLength: 1000,
    },
  ],
};

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

  console.log('🔍 ProjectForm initialized with:', { mode, initialData, user });

  const handleSubmit = async (data: ProjectData) => {
    console.log('🔍 ProjectForm handleSubmit called:', { mode, data });
    setIsSubmitting(true);

    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured');
      }

      // Check if user is authenticated
      if (!user) {
        throw new Error('You must be logged in');
      }

      if (mode === 'edit' && initialData) {
        // Edit mode - Direct Supabase call (working pattern)
        console.log('🔍 Calling Supabase update...');

        const { data: updateData, error } = await supabase
          .from('projects')
          .update({
            project_name: data.project_name,
            description: data.description,
            notes: data.notes,
          })
          .eq('id', initialData.id)
          .eq('user_id', user.id)
          .select()
          .single();

        console.log('🔍 Supabase update response:', { updateData, error });

        if (error) {
          console.error('❌ Supabase error:', error);
          throw error;
        }

        console.log('✅ Update successful:', updateData);

        toast({
          title: 'Success',
          description: 'Project updated successfully!',
          type: 'success',
        });

        setTimeout(() => {
          onSuccess?.(updateData);
        }, 500);
      } else {
        // Create mode - Direct Supabase call
        console.log('🔍 Creating new project...');

        const projectWithUser = {
          project_name: data.project_name,
          description: data.description,
          notes: data.notes,
          user_id: user.id,
          tags: [],
          links: [],
        };

        console.log('🔍 Project data to insert:', projectWithUser);

        const { data: insertedData, error } = await supabase
          .from('projects')
          .insert([projectWithUser])
          .select()
          .single();

        console.log('🔍 Supabase insert response:', { insertedData, error });

        if (error) {
          console.error('❌ Create error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code,
            fullError: error,
          });
          throw error;
        }

        console.log('✅ Create successful:', insertedData);

        toast({
          title: 'Success',
          description: 'Project created successfully!',
          type: 'success',
        });

        setTimeout(() => {
          onSuccess?.(insertedData);
        }, 100);
      }
    } catch (error: unknown) {
      console.error('❌ ProjectForm error:', error);

      toast({
        title: 'Error',
        description: (error as Error)?.message || `Failed to ${mode} project`,
        type: 'error',
      });

      // Don't throw - keep form open for debugging
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    console.log('🔍 ProjectForm reset called');
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

  // Simple data conversion
  const formInitialData = initialData
    ? {
        project_name: initialData.project_name,
        description: initialData.description || '',
        notes: initialData.notes || '',
        tags: initialData.tags || [],
        links: initialData.links || [],
      }
    : undefined;

  // Mode-specific schema
  const modeSpecificSchema = {
    ...projectFormSchema,
    submitText: mode === 'edit' ? 'Update Project' : 'Create Project',
    successMessage:
      mode === 'edit'
        ? 'Project updated successfully!'
        : 'Project created successfully!',
  };

  console.log('🔍 ProjectForm rendering with:', {
    formInitialData,
    modeSpecificSchema,
  });

  return (
    <ErrorBoundary>
      <FormGenerator<ProjectData>
        schema={modeSpecificSchema}
        onSubmit={handleSubmit}
        onReset={handleReset}
        disabled={isSubmitting}
        className={className}
        initialData={formInitialData}
      />
    </ErrorBoundary>
  );
}
