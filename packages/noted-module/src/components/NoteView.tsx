'use client';

import React from 'react';
import { DbNoted } from '../lib/types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';
import {
  Calendar,
  Folder,
  Tag,
  Link,
  Image,
  ArrowLeft,
  Edit,
  Trash2,
  ExternalLink,
} from 'lucide-react';

interface NoteViewProps {
  note: DbNoted;
  onBack: () => void;
  onEdit: (note: DbNoted) => void;
  onDelete: (id: number) => Promise<void>;
  className?: string;
}

export function NoteView({
  note,
  onBack,
  onEdit,
  onDelete,
  className,
}: NoteViewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = async () => {
    if (
      confirm(
        'Are you sure you want to delete this note? This action cannot be undone.'
      )
    ) {
      await onDelete(note.id);
      onBack();
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Notes
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(note)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-3xl leading-tight font-bold">{note.title}</h1>

        {/* Meta information */}
        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Created {formatDate(note.created_at)}</span>
          </div>

          {note.updated_at !== note.created_at && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Updated {formatDate(note.updated_at)}</span>
            </div>
          )}

          {note.project_name && (
            <div className="flex items-center gap-1">
              <Folder className="h-4 w-4" />
              <span>{note.project_name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-sm max-w-none">
        <div className="text-base leading-relaxed whitespace-pre-wrap">
          {note.description}
        </div>
      </div>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Tag className="h-4 w-4" />
            Tags
          </div>
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      {note.links && note.links.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Link className="h-4 w-4" />
            Links
          </div>
          <div className="space-y-2">
            {note.links.map((link, index) => (
              <div key={index} className="space-y-1 rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800"
                  >
                    {link.title || link.url}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                {link.description && (
                  <p className="text-muted-foreground text-sm">
                    {link.description}
                  </p>
                )}
                {!link.title && (
                  <p className="text-muted-foreground font-mono text-xs">
                    {link.url}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Images */}
      {note.images && note.images.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image className="h-4 w-4" aria-hidden="true" />
            Images
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {note.images.map((image, index) => (
              <div key={index} className="space-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt={image.alt || `Image ${index + 1}`}
                  className="h-48 w-full rounded-lg border object-cover"
                />
                {image.caption && (
                  <p className="text-muted-foreground text-sm">
                    {image.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Screenshots */}
      {note.screenshots && note.screenshots.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image className="h-4 w-4" aria-hidden="true" />
            Screenshots
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {note.screenshots.map((screenshot, index) => (
              <div key={index} className="space-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screenshot.url}
                  alt={screenshot.alt || `Screenshot ${index + 1}`}
                  className="h-48 w-full rounded-lg border object-cover"
                />
                {screenshot.caption && (
                  <p className="text-muted-foreground text-sm">
                    {screenshot.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
