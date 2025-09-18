'use client';

import { Card, CardContent } from '@/components/cards';
import { NotedForm } from '../../../../packages/noted-module/src';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/hooks/use-toast';

export default function NotedPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  return (
    <div className="md:p-8">
      <main className="md:mx-auto md:max-w-4xl">
        <div className="md:hidden">
          {/* Mobile: Full-screen notepad style, edge-to-edge */}
          <div className="min-h-screen bg-background">
            <NotedForm
              supabaseClient={supabase}
              user={user}
              toast={toast}
              onSuccess={(data) => {
                console.log('Note saved:', data);
              }}
            />
          </div>
        </div>
        <div className="hidden md:block">
          {/* Desktop: Keep card wrapper */}
          <Card>
            <CardContent className="pt-6">
              <NotedForm
                supabaseClient={supabase}
                user={user}
                toast={toast}
                onSuccess={(data) => {
                  console.log('Note saved:', data);
                }}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}