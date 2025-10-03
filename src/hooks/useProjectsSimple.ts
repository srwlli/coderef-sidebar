'use client';

import { useState, useEffect, useCallback } from 'react';
import { DbProject } from '@/types/project';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { User } from '@/types/auth';

interface UseProjectsSimpleProps {
  supabaseClient: SupabaseClient | null;
  user: User | null;
}

interface UseProjectsSimpleReturn {
  projects: DbProject[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  refreshProjects: () => Promise<void>;
}

export function useProjectsSimple({
  supabaseClient,
  user,
}: UseProjectsSimpleProps): UseProjectsSimpleReturn {
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!supabaseClient || !user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabaseClient
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError((err as Error)?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [supabaseClient, user]);

  const deleteProject = useCallback(
    async (id: number) => {
      if (!supabaseClient || !user) {
        throw new Error('Missing required dependencies');
      }

      try {
        const { error: deleteError } = await supabaseClient
          .from('projects')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id); // Ensure user can only delete their own projects

        if (deleteError) {
          throw deleteError;
        }

        // Remove from local state
        setProjects((prev) => prev.filter((project) => project.id !== id));
      } catch (err) {
        console.error('Error deleting project:', err);
        throw err;
      }
    },
    [supabaseClient, user]
  );

  const refreshProjects = useCallback(async () => {
    await fetchProjects();
  }, [fetchProjects]);

  // Fetch projects on mount and when dependencies change
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    deleteProject,
    refreshProjects,
  };
}
