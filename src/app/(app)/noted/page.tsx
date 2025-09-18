'use client';

import { NotesDashboard } from '../../../../packages/noted-module/src';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export default function NotedPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get('tab') || 'create';

  if (!user) {
    return <div>Please log in to access notes.</div>;
  }

  if (!isSupabaseConfigured() || !supabase) {
    return <div>Supabase configuration missing.</div>;
  }

  // Convert simplified User to Supabase User format
  const supabaseUser: SupabaseUser = {
    id: user.id,
    aud: 'authenticated',
    role: 'authenticated',
    email: user.email,
    created_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {
      full_name: user.full_name,
      avatar_url: user.avatar_url,
    },
  } as SupabaseUser;

  return (
    <div className="flex h-screen flex-col">
      <NotesDashboard
        supabaseClient={supabase}
        user={supabaseUser}
        toast={toast}
        initialTab={currentTab}
      />
    </div>
  );
}
