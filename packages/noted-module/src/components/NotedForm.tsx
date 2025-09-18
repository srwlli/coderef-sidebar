'use client';

import React, { useState } from 'react';
import { FormGenerator } from './FormGenerator';
import { notedFormSchema } from '../lib/forms/notedSchema';
import { NotedData, DbNoted } from '../lib/types';
import type { SupabaseClient, User } from '@supabase/supabase-js';

interface NotedFormProps {
  onSuccess?: (data: NotedData) => void;
  onCancel?: () => void;
  className?: string;
  initialData?: DbNoted; // For editing
  mode?: 'create' | 'edit';
  // Required integrations
  supabaseClient: SupabaseClient;
  user: User;
  toast: (config: {
    title: string;
    description: string;
    type: 'success' | 'error' | 'info';
  }) => void;
}

export function NotedForm({
  onSuccess,
  onCancel,
  className,
  initialData,
  mode = 'create',
  supabaseClient,
  user,
  toast,
}: NotedFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: NotedData) => {
    setIsSubmitting(true);

    try {
      // Check if Supabase is configured
      if (!supabaseClient) {
        throw new Error('Supabase client is not provided');
      }

      // Check if user is authenticated
      if (!user) {
        throw new Error('You must be logged in to save a note');
      }

      if (mode === 'edit' && initialData) {
        // Edit mode
        const { data: updateData, error } = await supabaseClient
          .from('noted')
          .update({
            title: data.title,
            description: data.description,
            project_name: data.project_name || null,
            tags: data.tags || [],
            links: data.links || [],
            images: data.images || [],
            screenshots: data.screenshots || [],
          })
          .eq('id', initialData.id)
          .eq('user_id', user.id) // Ensure user can only update their own notes
          .select()
          .single();

        if (error) {
          throw error;
        }

        toast({
          title: 'Success',
          description: 'Note updated successfully!',
          type: 'success',
        });

        onSuccess?.(updateData);
      } else {
        // Create mode
        // User metadata is not used, removed the unused variable

        const noteWithUser = {
          ...data,
          user_id: user.id,
          tags: data.tags || [],
          links: data.links || [],
          images: data.images || [],
          screenshots: data.screenshots || [],
        };

        const { data: insertedData, error } = await supabaseClient
          .from('noted')
          .insert([noteWithUser])
          .select()
          .single();

        if (error) {
          throw error;
        }

        toast({
          title: 'Success',
          description:
            notedFormSchema.successMessage || 'Note saved successfully!',
          type: 'success',
        });

        onSuccess?.(insertedData);
      }
    } catch (error: unknown) {
      console.error(`Note ${mode} error:`, error);

      toast({
        title: 'Error',
        description:
          (error as Error)?.message ||
          `Failed to ${mode} note. Please try again.`,
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

  // Convert DbNoted to NotedData for form
  const formInitialData = initialData
    ? {
        title: initialData.title,
        description: initialData.description,
        project_name: initialData.project_name || '',
        tags: initialData.tags || [],
        links: initialData.links || [],
        images: initialData.images || [],
        screenshots: initialData.screenshots || [],
      }
    : undefined;

  return (
    <FormGenerator<NotedData>
      schema={notedFormSchema}
      onSubmit={handleSubmit}
      onReset={handleReset}
      disabled={isSubmitting}
      className={className}
      initialData={formInitialData}
      supabaseClient={supabaseClient}
      user={user}
    />
  );
}
