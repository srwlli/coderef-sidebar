'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Unified schema that works for both login and signup
const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().optional(),
});

type FormData = z.infer<typeof authSchema>;

export function AuthForm() {
  const { signIn, signUp } = useAuth();
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      // Validate username for signup
      if (isSignup) {
        if (!data.username || data.username.length < 3) {
          setError('username', {
            type: 'manual',
            message: 'Username must be at least 3 characters',
          });
          setIsLoading(false);
          return;
        }
        if (data.username.length > 20) {
          setError('username', {
            type: 'manual',
            message: 'Username must be less than 20 characters',
          });
          setIsLoading(false);
          return;
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(data.username)) {
          setError('username', {
            type: 'manual',
            message:
              'Username can only contain letters, numbers, underscores, and dashes',
          });
          setIsLoading(false);
          return;
        }

        await signUp(data.email, data.password, data.username);
        toast.success(
          'Account created! Please check your email to verify your account.'
        );
      } else {
        await signIn(data.email, data.password);
        toast.success('Welcome back!');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to ${isSignup ? 'sign up' : 'sign in'}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    reset();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">
          {isSignup ? 'Create Account' : 'Welcome back'}
        </h2>
        <p className="text-muted-foreground">
          {isSignup
            ? 'Sign up to start using the application'
            : 'Sign in to your account to continue'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            inputMode="email"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          )}
        </div>

        {isSignup && (
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              autoComplete="username"
              {...register('username')}
            />
            {errors.username && (
              <p className="text-destructive text-sm">
                {errors.username.message}
              </p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="flex gap-2">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="flex-1"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              {...register('password')}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="min-h-[44px] min-w-[44px] shrink-0"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="text-destructive text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? isSignup
              ? 'Creating account...'
              : 'Signing in...'
            : isSignup
              ? 'Create Account'
              : 'Sign in'}
        </Button>
      </form>

      <div className="text-center">
        <Button variant="link" onClick={toggleMode} className="text-sm">
          {isSignup
            ? 'Already have an account? Sign in'
            : "Don't have an account? Sign up"}
        </Button>
      </div>
    </div>
  );
}
