'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import type { DbProject, ProjectData } from '@/lib/forms/formTypes';

export function useProjects() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['projects', user?.id],
    queryFn: async (): Promise<DbProject[]> => {
      if (!supabase || !user?.id) {
        throw new Error('Not authenticated or Supabase not configured');
      }

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id && !!supabase,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (projectData: ProjectData): Promise<DbProject> => {
      if (!supabase || !user?.id) {
        throw new Error('Not authenticated or Supabase not configured');
      }

      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            ...projectData,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch projects
      queryClient.invalidateQueries({ queryKey: ['projects', user?.id] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      id,
      ...projectData
    }: Partial<DbProject> & { id: number }): Promise<DbProject> => {
      if (!supabase || !user?.id) {
        throw new Error('Not authenticated or Supabase not configured');
      }

      const { data, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id)
        .eq('user_id', user.id) // RLS safety check
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch projects
      queryClient.invalidateQueries({ queryKey: ['projects', user?.id] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      if (!supabase || !user?.id) {
        throw new Error('Not authenticated or Supabase not configured');
      }

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id); // RLS safety check

      if (error) throw error;
    },
    onSuccess: () => {
      // Invalidate and refetch projects
      queryClient.invalidateQueries({ queryKey: ['projects', user?.id] });
    },
  });
}

export function useCheckProjectName() {
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      projectName,
      excludeId,
    }: {
      projectName: string;
      excludeId?: number;
    }): Promise<boolean> => {
      if (!supabase || !user?.id) {
        throw new Error('Not authenticated or Supabase not configured');
      }

      if (!projectName.trim()) {
        return true; // Empty names are handled by required validation
      }

      let query = supabase
        .from('projects')
        .select('id')
        .eq('user_id', user.id)
        .ilike('project_name', projectName.trim());

      // Exclude current project when editing
      if (excludeId) {
        query = query.neq('id', excludeId);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Returns true if name is available (no duplicates found)
      return !data || data.length === 0;
    },
  });
}

export function useBulkUpdateProjects() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (
      updates: Array<{ id: number; data: Partial<ProjectData> }>
    ): Promise<DbProject[]> => {
      if (!supabase || !user?.id) {
        throw new Error('Not authenticated or Supabase not configured');
      }

      // Rate limiting check
      if (updates.length > 10) {
        throw new Error('Bulk operation limited to 10 projects at once');
      }

      const results: DbProject[] = [];

      // Process updates sequentially to avoid overwhelming the database
      for (const update of updates) {
        const { data, error } = await supabase
          .from('projects')
          .update(update.data)
          .eq('id', update.id)
          .eq('user_id', user.id) // RLS safety check
          .select()
          .single();

        if (error) throw error;
        results.push(data);

        // Small delay to prevent overwhelming the database
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      return results;
    },
    onSuccess: () => {
      // Invalidate and refetch projects
      queryClient.invalidateQueries({ queryKey: ['projects', user?.id] });
    },
  });
}
