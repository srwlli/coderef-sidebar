'use client';

import { useState, useEffect, useCallback } from 'react';
import { DbNoted } from '../lib/types';
import type { SupabaseClient, User } from '@supabase/supabase-js';

interface UseNotesProps {
  supabaseClient: SupabaseClient;
  user: User;
}

interface UseNotesReturn {
  notes: DbNoted[];
  loading: boolean;
  error: string | null;
  fetchNotes: () => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  refreshNotes: () => Promise<void>;
}

export function useNotes({
  supabaseClient,
  user,
}: UseNotesProps): UseNotesReturn {
  const [notes, setNotes] = useState<DbNoted[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    if (!supabaseClient || !user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabaseClient
        .from('noted')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setNotes(data || []);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError((err as Error)?.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, [supabaseClient, user]);

  const deleteNote = useCallback(
    async (id: number) => {
      if (!supabaseClient || !user) {
        throw new Error('Missing required dependencies');
      }

      try {
        const { error: deleteError } = await supabaseClient
          .from('noted')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id); // Ensure user can only delete their own notes

        if (deleteError) {
          throw deleteError;
        }

        // Remove from local state
        setNotes((prev) => prev.filter((note) => note.id !== id));
      } catch (err) {
        console.error('Error deleting note:', err);
        throw err;
      }
    },
    [supabaseClient, user]
  );

  const refreshNotes = useCallback(async () => {
    await fetchNotes();
  }, [fetchNotes]);

  // Fetch notes on mount and when dependencies change
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return {
    notes,
    loading,
    error,
    fetchNotes,
    deleteNote,
    refreshNotes,
  };
}
