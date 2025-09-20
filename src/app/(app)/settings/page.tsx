'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/cards';
import { LogOut, Moon, Sun, Download, CheckCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { usePWAInstall } from '@/components/InstallPWA';
import ErrorBoundary from '@/components/ErrorBoundary';
function SettingsPageContent() {
  const [mounted, setMounted] = useState(false);

  // All hooks must be called unconditionally at top level
  const { theme, setTheme } = useTheme();
  const { signOut } = useAuth();
  const router = useRouter();
  const {
    isInstalled = false,
    canInstall = false,
    isLoading: pwaLoading = false,
    handleInstallClick = () => console.log('PWA install not available'),
  } = usePWAInstall() || {};

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Skeleton cards while loading */}
        {[
          { iconVariant: 'rounded-full', title: 'w-20', desc: 'w-28' },
          { iconVariant: 'rounded-lg', title: 'w-24', desc: 'w-32' },
          { iconVariant: 'rounded-full', title: 'w-16', desc: 'w-24' },
        ].map((skeleton, i) => (
          <Card
            key={i}
            className="animate-pulse transition-shadow duration-200 hover:shadow-lg"
          >
            <CardHeader className="flex flex-col items-center justify-center p-6 text-center">
              <div
                className={`mb-4 h-12 w-12 ${skeleton.iconVariant} bg-gray-200 dark:bg-gray-700`}
              />
              <div
                className={`h-5 ${skeleton.title} mb-2 rounded bg-gray-200 dark:bg-gray-700`}
              />
              <div
                className={`h-4 ${skeleton.desc} rounded bg-gray-100 dark:bg-gray-600`}
              />
            </CardHeader>
            <CardContent className="pb-6 text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const isDarkMode = theme === 'dark';

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
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

      {mounted &&
        (pwaLoading || isInstalled || canInstall) &&
        (pwaLoading ? (
          <Card className="animate-pulse transition-shadow duration-200 hover:shadow-lg">
            <CardHeader className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 h-12 w-12 rounded-lg bg-blue-200 dark:bg-blue-800" />
              <div className="mb-2 h-5 w-20 rounded bg-blue-100 dark:bg-blue-700" />
              <div className="h-4 w-28 rounded bg-gray-100 dark:bg-gray-600" />
            </CardHeader>
            <CardContent className="pb-6 text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-700 dark:to-blue-600" />
            </CardContent>
          </Card>
        ) : (
          <Card
            className="cursor-pointer transition-shadow duration-200 hover:shadow-lg"
            onClick={
              isInstalled
                ? undefined
                : () => {
                    console.log('PWA card clicked');
                    handleInstallClick();
                  }
            }
          >
            <CardHeader className="flex flex-col items-center justify-center p-6 text-center">
              {isInstalled ? (
                <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
              ) : (
                <Download className="mb-4 h-12 w-12 text-blue-500" />
              )}
              <CardTitle className="text-lg">
                {isInstalled ? 'Coderef Installed' : 'Install Coderef'}
              </CardTitle>
              <CardDescription className="text-center">
                {isInstalled
                  ? 'Coderef is installed on your device'
                  : 'Install Coderef as a native app'}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6 text-center">
              <button
                className={`rounded-full p-3 transition-all duration-200 hover:scale-110 ${
                  isInstalled
                    ? 'bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800'
                    : 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800'
                }`}
                disabled={isInstalled}
              >
                {isInstalled ? (
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                ) : (
                  <Download className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                )}
              </button>
            </CardContent>
          </Card>
        ))}

      <Card
        className="cursor-pointer transition-shadow duration-200 hover:shadow-lg"
        onClick={handleSignOut}
      >
        <CardHeader className="flex flex-col items-center justify-center p-6 text-center">
          <LogOut className="mb-4 h-12 w-12 text-red-500" />
          <CardTitle className="text-lg">Sign Out</CardTitle>
          <CardDescription className="text-center">
            Sign out of your account
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6 text-center">
          <button className="rounded-full bg-red-100 p-3 transition-all duration-200 hover:scale-110 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800">
            <LogOut className="h-8 w-8 text-red-600 dark:text-red-400" />
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <ErrorBoundary>
      <SettingsPageContent />
    </ErrorBoundary>
  );
}
