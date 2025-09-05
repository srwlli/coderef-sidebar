import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/cards';
import { Button } from '@/components/buttons';
import Link from 'next/link';

export default function Landing() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <main className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-center text-sm">
              Login functionality coming soon...
            </p>
            <Link href="/dashboard" className="block">
              <Button className="w-full">Continue to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
