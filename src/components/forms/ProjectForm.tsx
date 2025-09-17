'use client';

import React, { useState } from 'react';
import { FormGenerator } from './FormGenerator';
import { projectFormSchema } from '@/lib/forms/projectSchema';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { ProjectData } from '@/lib/forms/formTypes';
import { useAuth } from '@/lib/auth-context';
import { User } from '@supabase/supabase-js';

interface ProjectFormProps {
  onSuccess?: (data: ProjectData) => void;
  className?: string;
}

export function ProjectForm({ onSuccess, className }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (data: ProjectData) => {
    setIsSubmitting(true);

    try {
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
          userMetadata?.display_name || user.email?.split('@')[0] || 'unknown',
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
      });

      onSuccess?.(insertedData);
    } catch (error: unknown) {
      console.error('Project creation error:', error);

      toast({
        title: 'Error',
        description:
          (error as Error)?.message ||
          'Failed to create project. Please try again.',
        variant: 'destructive',
      });

      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    toast({
      title: 'Form Reset',
      description: 'Form has been cleared.',
    });
  };

  return (
    <FormGenerator<ProjectData>
      schema={projectFormSchema}
      onSubmit={handleSubmit}
      onReset={handleReset}
      disabled={isSubmitting}
      className={className}
    />
  );
}
