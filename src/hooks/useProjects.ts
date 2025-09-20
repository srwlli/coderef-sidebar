'use client';

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import type { DbProject, ProjectData } from '@/lib/forms/formTypes';

export function useProjects() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['projects', user?.id],
    queryFn: async (): Promise<DbProject[]> => {
      if (!supabase || !user?.id) {
        throw new Error('Not authenticated or Supabase not configured');
      }

      console.log('Fetching projects for user:', user.id);

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }

      console.log('Fetched projects:', data);

      // Ensure data compatibility for projects without links field
      return (data || []).map((project) => ({
        ...project,
        tags: Array.isArray(project.tags) ? project.tags : [],
        links: Array.isArray(project.links) ? project.links : [],
      }));
    },
    enabled: !!user?.id && !!supabase,
    staleTime: 10 * 1000, // Very short stale time for frequent updates
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 30 * 1000, // Poll every 30 seconds as fallback
  });

  // Set up real-time subscription for better sync
  React.useEffect(() => {
    if (!supabase || !user?.id) return;

    console.log('Setting up real-time subscription for user:', user.id);

    const channel = supabase
      .channel(`projects_${user.id}`, {
        config: {
          broadcast: { self: true },
        },
      })
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Real-time postgres update received:', payload);

          // Update cache immediately based on the event type
          if (payload.eventType === 'INSERT') {
            console.log('New project inserted:', payload.new);
          } else if (payload.eventType === 'UPDATE') {
            console.log('Project updated:', payload.new);
          } else if (payload.eventType === 'DELETE') {
            console.log('Project deleted:', payload.old);
          }

          // Force refetch for immediate UI update
          queryClient.invalidateQueries({ queryKey: ['projects', user.id] });
          queryClient.refetchQueries({ queryKey: ['projects', user.id] });
        }
      )
      .on('broadcast', { event: 'project_created' }, (payload) => {
        console.log('Broadcast: Project created:', payload);
        queryClient.invalidateQueries({ queryKey: ['projects', user.id] });
        queryClient.refetchQueries({ queryKey: ['projects', user.id] });
      })
      .on('broadcast', { event: 'project_updated' }, (payload) => {
        console.log('Broadcast: Project updated:', payload);
        queryClient.invalidateQueries({ queryKey: ['projects', user.id] });
        queryClient.refetchQueries({ queryKey: ['projects', user.id] });
      })
      .subscribe((status, err) => {
        console.log('Subscription status:', status);
        if (err) {
          console.error('Subscription error:', err);
        }

        if (status === 'SUBSCRIBED') {
          console.log('✅ Real-time subscription active for projects');
        } else if (status === 'CHANNEL_ERROR') {
          console.error('❌ Real-time subscription failed');
        }
      });

    return () => {
      console.log('Cleaning up subscription');
      supabase.removeChannel(channel);
    };
  }, [user?.id, queryClient]);

  return query;
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (projectData: ProjectData): Promise<DbProject> => {
      if (!supabase || !user?.id) {
        throw new Error('Not authenticated or Supabase not configured');
      }

      console.log('Creating project:', projectData);

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

      if (error) {
        console.error('Error creating project:', error);
        throw error;
      }

      console.log('Created project:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('Project created successfully:', data);

      // Broadcast manual update for immediate sync
      if (supabase && user?.id) {
        supabase.channel(`projects_${user.id}`).send({
          type: 'broadcast',
          event: 'project_created',
          payload: { project: data },
        });
      }

      // Invalidate and refetch projects immediately
      queryClient.invalidateQueries({ queryKey: ['projects', user?.id] });
      // Also refetch to ensure immediate update
      queryClient.refetchQueries({ queryKey: ['projects', user?.id] });
    },
    onError: (error) => {
      console.error('Create project mutation error:', error);
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

      // Ensure data consistency
      const updateData = {
        ...projectData,
        tags: Array.isArray(projectData.tags) ? projectData.tags : [],
        links: Array.isArray(projectData.links) ? projectData.links : [],
      };

      const { data, error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id) // RLS safety check
        .select()
        .single();

      if (error) {
        console.error('Error updating project:', error);
        throw error;
      }

      console.log('Updated project:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('Project updated successfully:', data);

      // Broadcast manual update for immediate sync
      if (supabase && user?.id) {
        supabase.channel(`projects_${user.id}`).send({
          type: 'broadcast',
          event: 'project_updated',
          payload: { project: data },
        });
      }

      // Invalidate and refetch projects immediately
      queryClient.invalidateQueries({ queryKey: ['projects', user?.id] });
      // Also refetch to ensure immediate update
      queryClient.refetchQueries({ queryKey: ['projects', user?.id] });
    },
    onError: (error) => {
      console.error('Update project mutation error:', error);
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

      console.log(
        'Checking project name:',
        projectName,
        'excludeId:',
        excludeId
      );

      let query = supabase
        .from('projects')
        .select('id')
        .eq('user_id', user.id)
        .eq('project_name', projectName.trim());

      // Exclude current project when editing
      if (excludeId) {
        query = query.neq('id', excludeId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error checking project name:', error);
        throw error;
      }

      console.log(
        'Name check result - data:',
        data,
        'isAvailable:',
        !data || data.length === 0
      );

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
