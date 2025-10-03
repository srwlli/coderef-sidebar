'use client';

import { useEffect } from 'react';

// Force dynamic rendering to prevent SSG issues
export const dynamic = 'force-dynamic';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { AuthForm } from '@/components/auth/auth-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/cards';

export default function AuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center p-8 pb-[env(safe-area-inset-bottom)]">
      <main className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Authentication</CardTitle>
            <CardDescription>Access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
