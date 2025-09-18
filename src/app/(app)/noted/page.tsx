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
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
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
      </main>
    </div>
  );
}