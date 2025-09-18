'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotedForm } from '../../../packages/noted-module/src';
import type { SupabaseClient } from '@supabase/supabase-js';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  supabaseClient: SupabaseClient;
  user: any;
  toast: (config: { title: string; description: string; type: 'success' | 'error' | 'info' }) => void;
}

export default function AddNoteModal({
  isOpen,
  onClose,
  supabaseClient,
  user,
  toast,
}: AddNoteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold">New Note</h2>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <NotedForm
          supabaseClient={supabaseClient}
          user={user}
          toast={toast}
          onSuccess={(data) => {
            console.log('Note saved:', data);
            toast({
              title: 'Success',
              description: 'Note saved successfully',
              type: 'success',
            });
            onClose();
          }}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}