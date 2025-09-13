'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/cards';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkMode = theme === 'dark';

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card
            className="cursor-pointer transition-shadow duration-200 hover:shadow-lg"
            onClick={toggleDarkMode}
          >
            <CardHeader className="flex flex-col items-center justify-center p-6 text-center">
              {isDarkMode ? (
                <Sun className="mb-4 h-12 w-12 text-yellow-500" />
              ) : (
                <Moon className="mb-4 h-12 w-12 text-blue-500" />
              )}
              <CardTitle className="text-lg">Dark Mode</CardTitle>
              <CardDescription className="text-center">
                {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6 text-center">
              <button
                className={`rounded-full p-3 transition-all duration-200 hover:scale-110 ${
                  isDarkMode
                    ? 'bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800'
                    : 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800'
                }`}
              >
                {isDarkMode ? (
                  <Sun className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                ) : (
                  <Moon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                )}
              </button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
