'use client';

import React from 'react';
import { DbNoted } from '../lib/types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';
import { Calendar, Folder, Tag, Trash2, Edit } from 'lucide-react';

interface NotesListProps {
  notes: DbNoted[];
  loading: boolean;
  error: string | null;
  onViewNote: (note: DbNoted) => void;
  onEditNote: (note: DbNoted) => void;
  onDeleteNote: (id: number) => Promise<void>;
  className?: string;
}

export function NotesList({
  notes,
  loading,
  error,
  onViewNote,
  onEditNote,
  onDeleteNote,
  className,
}: NotesListProps) {
  if (loading) {
    return (
      <div className={cn('flex items-center justify-center p-8', className)}>
        <div className="text-muted-foreground">Loading notes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('flex items-center justify-center p-8', className)}>
        <div className="text-destructive">Error: {error}</div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className={cn('flex items-center justify-center p-8', className)}>
        <div className="space-y-2 text-center">
          <div className="text-muted-foreground">No notes found</div>
          <div className="text-muted-foreground text-sm">
            Start by creating your first note
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={cn('space-y-4', className)}>
      {notes.map((note) => (
        <div
          key={note.id}
          className="hover:bg-muted/30 cursor-pointer rounded-lg border p-4 transition-colors"
          onClick={() => onViewNote(note)}
        >
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-lg leading-tight font-semibold">
                  {note.title}
                </h3>
              </div>
              <div className="flex flex-shrink-0 items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditNote(note);
                  }}
                  className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure you want to delete this note?')) {
                      onDeleteNote(note.id);
                    }
                  }}
                  className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Description preview */}
            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
              {truncateText(note.description)}
            </p>

            {/* Meta information */}
            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
              {/* Date */}
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(note.created_at)}</span>
              </div>

              {/* Project */}
              {note.project_name && (
                <div className="flex items-center gap-1">
                  <Folder className="h-3 w-3" />
                  <span>{note.project_name}</span>
                </div>
              )}

              {/* Tags count */}
              {note.tags && note.tags.length > 0 && (
                <div className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  <span>
                    {note.tags.length} tag{note.tags.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>

            {/* Tags preview */}
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {note.tags.slice(0, 5).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {note.tags.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{note.tags.length - 5} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
