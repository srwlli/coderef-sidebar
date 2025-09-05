import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/cards';

export default function GitCommandsPage() {
  return (
    <div className="min-h-screen p-8">
      <main className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-6">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Git Commands</CardTitle>
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
