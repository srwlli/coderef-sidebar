import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function NextjsSetupPage() {
  return (
    <div className="min-h-screen p-8">
      <main className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-6">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Next.js Setup</CardTitle>
              <CardDescription>This page is a work in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Content coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
