'use client';

import React, { useState, useEffect } from 'react';
import { NotedForm } from './NotedForm';
import { NotesList } from './NotesList';
import { NoteView } from './NoteView';
import { useNotes } from '../hooks/useNotes';
import { getNotedEditFormSchema } from '../lib/forms/notedSchema';
import { FormGenerator } from './FormGenerator';
import { DbNoted, NotedData } from '../lib/types';
import { cn } from '../lib/utils';
import type { SupabaseClient, User } from '@supabase/supabase-js';

interface NotesDashboardProps {
  supabaseClient: SupabaseClient;
  user: User;
  toast: (config: {
    title: string;
    description: string;
    type: 'success' | 'error' | 'info';
  }) => void;
  className?: string;
  initialTab?: string;
}

type ViewMode = 'create' | 'list' | 'view' | 'edit';

export function NotesDashboard({
  supabaseClient,
  user,
  toast,
  className,
  initialTab = 'create',
}: NotesDashboardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(initialTab as ViewMode);
  const [selectedNote, setSelectedNote] = useState<DbNoted | null>(null);

  const { notes, loading, error, deleteNote, refreshNotes } = useNotes({
    supabaseClient,
    user,
  });

  // Sync with URL tab changes
  useEffect(() => {
    setViewMode(initialTab as ViewMode);
  }, [initialTab]);

  // Listen for upload actions from header
  useEffect(() => {
    const handleUploadAction = (event: CustomEvent) => {
      const action = event.detail;
      console.log('Dashboard received upload action:', action);
      console.log('Current viewMode:', viewMode);

      // Switch to create mode if not already there
      if (viewMode !== 'create') {
        console.log('Switching to create mode');
        setViewMode('create');
      }
      // Emit another event for the form to handle
      // Use a longer timeout to ensure the form is fully rendered
      setTimeout(() => {
        console.log('Dispatching notedFocusField event:', action);
        window.dispatchEvent(
          new CustomEvent('notedFocusField', { detail: action })
        );
      }, 500);
    };

    window.addEventListener(
      'notedUploadAction',
      handleUploadAction as EventListener
    );
    return () => {
      window.removeEventListener(
        'notedUploadAction',
        handleUploadAction as EventListener
      );
    };
  }, [viewMode]);

  const handleNoteSuccess = () => {
    refreshNotes();
    setViewMode('list');
  };

  const handleViewNote = (note: DbNoted) => {
    setSelectedNote(note);
    setViewMode('view');
  };

  const handleEditNote = (note: DbNoted) => {
    setSelectedNote(note);
    setViewMode('edit');
  };

  const handleEditSuccess = () => {
    refreshNotes();
    setViewMode('list');
    setSelectedNote(null);
  };

  const handleEditCancel = () => {
    setViewMode('list');
    setSelectedNote(null);
  };

  const handleDeleteNote = async (id: number) => {
    await deleteNote(id);
    toast({
      title: 'Success',
      description: 'Note deleted successfully',
      type: 'success',
    });
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'create':
        return (
          <NotedForm
            supabaseClient={supabaseClient}
            user={user}
            toast={toast}
            onSuccess={handleNoteSuccess}
            className="h-full"
          />
        );

      case 'list':
        return (
          <NotesList
            notes={notes}
            loading={loading}
            error={error}
            onViewNote={handleViewNote}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
            className="h-full overflow-y-auto"
          />
        );

      case 'view':
        return selectedNote ? (
          <NoteView
            note={selectedNote}
            onBack={() => setViewMode('list')}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            className="h-full overflow-y-auto"
          />
        ) : null;

      case 'edit':
        return selectedNote ? (
          <FormGenerator<NotedData>
            schema={getNotedEditFormSchema()}
            onSubmit={async (data: NotedData) => {
              try {
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
                  .eq('id', selectedNote.id)
                  .eq('user_id', user.id)
                  .select()
                  .single();

                if (error) throw error;

                toast({
                  title: 'Success',
                  description: 'Note updated successfully!',
                  type: 'success',
                });

                handleEditSuccess();
              } catch (error) {
                console.error('Edit note error:', error);
                toast({
                  title: 'Error',
                  description:
                    (error as Error)?.message || 'Failed to update note',
                  type: 'error',
                });
                throw error;
              }
            }}
            onReset={handleEditCancel}
            initialData={{
              title: selectedNote.title,
              description: selectedNote.description,
              project_name: selectedNote.project_name || '',
              tags: selectedNote.tags || [],
              links: selectedNote.links || [],
              images: selectedNote.images || [],
              screenshots: selectedNote.screenshots || [],
            }}
            supabaseClient={supabaseClient}
            user={user}
            className="h-full"
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className={cn('flex h-full flex-col', className)}>
      {/* Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Mobile: Fixed height, no scrolling */}
        <div className="h-[80vh] overflow-hidden md:hidden">
          {renderContent()}
        </div>

        {/* Desktop: Scrollable */}
        <div className="hidden flex-1 p-6 md:block">
          <div className="mx-auto max-w-4xl">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
