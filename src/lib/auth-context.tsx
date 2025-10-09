'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from './supabase';
import type { AuthState } from '@/types/auth';
import { useAppStore } from '@/stores/use-app-store';

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      // Clear custom cards on sign-out
      if (event === 'SIGNED_OUT') {
        useAppStore.setState({ customCards: [] });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, username: string) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username,
          full_name: username,
        },
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    if (!supabase) throw new Error('Supabase not configured');

    try {
      // Check if there's an active session first
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        // If no session, just clear local state
        setUser(null);
        return;
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      // If sign out fails, still clear local state
      setUser(null);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  };

  const value: AuthState = {
    user: user
      ? {
          id: user.id,
          email: user.email!,
          full_name:
            user.user_metadata?.full_name || user.user_metadata?.display_name,
          avatar_url: user.user_metadata?.avatar_url,
        }
      : null,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
