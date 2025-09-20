'use client';

import React, { useState } from 'react';
import { FormGenerator } from './FormGenerator';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth-context';
import { DbProject } from '@/lib/forms/formTypes';

interface TestData {
  project_name: string;
  description: string;
}

interface TestEditFormProps {
  initialData: DbProject;
  onSuccess?: (data: TestData) => void;
  onCancel?: () => void;
}

// Minimal test schema
const testSchema = {
  title: 'Test Edit Form',
  description: 'Minimal test form for debugging',
  table: 'projects',
  submitText: 'Update Test',
  resetText: 'Cancel',
  successMessage: 'Test updated successfully!',
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
      rows: 3,
      maxLength: 500,
    },
  ],
};

export function TestEditForm({
  initialData,
  onSuccess,
  onCancel,
}: TestEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  console.log('🔍 TestEditForm initialized with:', { initialData, user });

  const handleSubmit = async (data: TestData) => {
    console.log('🔍 TestEditForm handleSubmit called with:', data);
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

      console.log('🔍 Calling Supabase update...');

      // Direct Supabase call - minimal update
      const { data: updateData, error } = await supabase
        .from('projects')
        .update({
          project_name: data.project_name,
          description: data.description,
        })
        .eq('id', initialData.id)
        .eq('user_id', user.id)
        .select()
        .single();

      console.log('🔍 Supabase response:', { updateData, error });

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }

      console.log('✅ Update successful:', updateData);

      toast({
        title: 'Success',
        description: 'Test update completed!',
        type: 'success',
      });

      onSuccess?.(updateData);
    } catch (error: unknown) {
      console.error('❌ TestEditForm error:', error);

      toast({
        title: 'Error',
        description: (error as Error)?.message || 'Update failed',
        type: 'error',
      });

      // Don't throw - keep form open for debugging
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    console.log('🔍 TestEditForm reset called');
    onCancel?.();
  };

  // Simple data conversion
  const formInitialData = {
    project_name: initialData.project_name,
    description: initialData.description || '',
  };

  console.log(
    '🔍 TestEditForm rendering with formInitialData:',
    formInitialData
  );

  return (
    <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
      <h3 className="mb-4 text-lg font-semibold text-yellow-800">
        🧪 Test Edit Form
      </h3>
      <p className="mb-4 text-sm text-yellow-700">
        Minimal test form to debug edit functionality
      </p>

      <FormGenerator<TestData>
        schema={testSchema}
        onSubmit={handleSubmit}
        onReset={handleReset}
        disabled={isSubmitting}
        initialData={formInitialData}
      />
    </div>
  );
}
