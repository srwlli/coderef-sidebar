'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface DebugInfo {
  timestamp: string;
  supabaseConfigured: boolean;
  userAuthenticated: boolean;
  userId: string;
  supabaseUrl?: string;
  supabaseConnection?: string;
  supabaseData?: unknown;
  error?: string;
}

export function ErrorDebugger() {
  const { user } = useAuth();
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    timestamp: '',
    supabaseConfigured: false,
    userAuthenticated: false,
    userId: '',
  });

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const info: DebugInfo = {
          timestamp: new Date().toISOString(),
          supabaseConfigured: isSupabaseConfigured(),
          userAuthenticated: !!user,
          userId: user?.id || 'No user',
          supabaseUrl:
            process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + '...',
        };

        if (supabase) {
          try {
            const { data, error } = await supabase
              .from('projects')
              .select('count')
              .limit(1);
            info.supabaseConnection = error
              ? `Error: ${error.message}`
              : 'Connected';
            info.supabaseData = data;
          } catch (err) {
            info.supabaseConnection = `Connection failed: ${err}`;
          }
        } else {
          info.supabaseConnection = 'Supabase client not initialized';
        }

        setDebugInfo(info);
      } catch (err) {
        setDebugInfo({
          timestamp: new Date().toISOString(),
          supabaseConfigured: false,
          userAuthenticated: false,
          userId: '',
          error: `Debug check failed: ${err}`,
        });
      }
    };

    checkSupabase();
  }, [user]);

  const testProjectCreation = async () => {
    try {
      console.log('🧪 Testing project creation...');

      if (!user) {
        console.error('❌ No user authenticated');
        return;
      }

      if (!supabase) {
        console.error('❌ Supabase not initialized');
        return;
      }

      const testData = {
        project_name: `Test Project ${Date.now()}`,
        description: 'Test description',
        notes: 'Test notes',
        tags: ['test'],
        links: [],
        user_id: user.id,
      };

      console.log('🔄 Sending data:', testData);

      const { data, error } = await supabase
        .from('projects')
        .insert([testData])
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase error:', error);
      } else {
        console.log('✅ Project created successfully:', data);
      }
    } catch (err) {
      console.error('❌ Test failed:', err);
    }
  };

  return (
    <div className="bg-background fixed right-4 bottom-4 z-50 max-w-sm rounded-lg border p-4 text-xs shadow-lg">
      <h3 className="mb-2 font-semibold">Debug Info</h3>
      <pre className="mb-2 whitespace-pre-wrap">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
      <button
        onClick={testProjectCreation}
        className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
      >
        Test Project Creation
      </button>
    </div>
  );
}
