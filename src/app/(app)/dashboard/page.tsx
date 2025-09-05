import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/cards';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-6">
          <Link href="/nextjs-setup" className="no-underline">
            <Card className="w-full max-w-sm cursor-pointer transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle>Next.js Setup</CardTitle>
                <CardDescription>
                  Quick start guide for Next.js projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Get your Next.js application up and running with best
                  practices and configurations.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/git-commands" className="no-underline">
            <Card className="w-full max-w-sm cursor-pointer transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle>Git Commands</CardTitle>
                <CardDescription>
                  Essential Git commands reference
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Master version control with commonly used Git commands and
                  workflows.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/settings" className="no-underline">
            <Card className="w-full max-w-sm cursor-pointer transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Customize your application settings and preferences.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/prompts" className="no-underline">
            <Card className="w-full max-w-sm cursor-pointer transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle>Prompts</CardTitle>
                <CardDescription>
                  AI prompt templates and examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Explore and use effective prompts for various AI interactions.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
