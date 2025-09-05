import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/cards';

export default function PromptsPage() {
  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-6">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Prompts</CardTitle>
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
