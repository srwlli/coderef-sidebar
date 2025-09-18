'use client';

import { NotesDashboard } from '../../../../packages/noted-module/src';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';

export default function NotedPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get('tab') || 'create';

  return (
    <div className="flex h-screen flex-col">
      <NotesDashboard
        supabaseClient={supabase}
        user={user}
        toast={toast}
        initialTab={currentTab}
      />
    </div>
  );
}
