'use client';

import React, { useState } from 'react';
import { FormGenerator } from './FormGenerator';
import { projectFormSchema } from '@/lib/forms/projectSchema';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProjectData } from '@/lib/forms/formTypes';

interface ProjectFormProps {
  onSuccess?: (data: ProjectData) => void;
  className?: string;
}

export function ProjectForm({ onSuccess, className }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const handleSubmit = async (data: ProjectData) => {
    setIsSubmitting(true);

    try {
      const { data: insertedData, error } = await supabase
        .from('projects')
        .insert([data])
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
