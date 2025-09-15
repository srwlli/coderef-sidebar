Supabase Authentication Setup Instructions for Claude Code Agents

Prerequisites

- Next.js 14+ project with TypeScript
- Tailwind CSS configured
- shadcn/ui initialized
- Supabase project created with credentials

Package Installation

# Install Supabase and form handling

npm install @supabase/supabase-js @supabase/ssr
npm install react-hook-form @hookform/resolvers zod
npm install lucide-react sonner

# Install shadcn/ui components (if not already installed)

npx shadcn@latest add button input label tabs card avatar dropdown-menu separator

Environment Setup

Create .env.local:
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

Core Files to Create

1. Authentication Types (src/types/auth.d.ts)

export interface User {
id: string;
email: string;
full_name?: string;
avatar_url?: string;
}

export interface AuthState {
user: User | null;
loading: boolean;
signIn: (email: string, password: string) => Promise<void>;
signUp: (email: string, password: string, fullName: string) => Promise<void>;
signOut: () => Promise<void>;
resetPassword: (email: string) => Promise<void>;
}

2. Supabase Client (src/lib/supabase.ts)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
auth: {
autoRefreshToken: true,
persistSession: true,
detectSessionInUrl: true
}
})

3. Auth Context Provider (src/lib/auth-context.tsx)

"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from './supabase'
import type { AuthState } from '@/types/auth'

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
const [user, setUser] = useState<User | null>(null)
const [loading, setLoading] = useState(true)

    useEffect(() => {
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      )

      return () => subscription.unsubscribe()
    }, [])

    const signIn = async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
    }

    const signUp = async (email: string, password: string, fullName: string) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      })
      if (error) throw error
    }

    const signOut = async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    }

    const resetPassword = async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
    }

    const value: AuthState = {
      user: user ? {
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name,
        avatar_url: user.user_metadata?.avatar_url,
      } : null,
      loading,
      signIn,
      signUp,
      signOut,
      resetPassword,
    }

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    )

}

export function useAuth() {
const context = useContext(AuthContext)
if (context === undefined) {
throw new Error('useAuth must be used within an AuthProvider')
}
return context
}

4. Login Form Component (src/components/auth/login-form.tsx)

"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth-context'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
email: z.string().email('Please enter a valid email address'),
password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
const { signIn } = useAuth()
const router = useRouter()
const [showPassword, setShowPassword] = useState(false)
const [isLoading, setIsLoading] = useState(false)

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormData) => {
      try {
        setIsLoading(true)
        await signIn(data.email, data.password)
        toast.success('Welcome back!')
        router.push('/dashboard') // CRITICAL: Navigate after successful auth
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to sign in')
      } finally {
        setIsLoading(false)
      }
    }

    return (
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    )

}

Layout Setup

5. Root Layout (src/app/layout.tsx)

import { AuthProvider } from '@/lib/auth-context'

export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
<html lang="en">
<body>
<AuthProvider>
{children}
</AuthProvider>
</body>
</html>
)
}

6. Protected Dashboard Layout (src/app/(dashboard)/layout.tsx)

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function DashboardLayout({
children,
}: {
children: React.ReactNode
}) {
const { user, loading } = useAuth()
const router = useRouter()

    useEffect(() => {
      if (!loading && !user) {
        router.push('/auth')
      }
    }, [user, loading, router])

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading...</p>
          </div>
        </div>
      )
    }

    if (!user) {
      return null // Will redirect via useEffect
    }

    return (
      <div className="min-h-screen">
        {children}
      </div>
    )

}

7. Root Page Redirect (src/app/page.tsx)

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function Home() {
const { user, loading } = useAuth()
const router = useRouter()

    useEffect(() => {
      if (!loading) {
        if (user) {
          router.push('/dashboard')
        } else {
          router.push('/auth')
        }
      }
    }, [user, loading, router])

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    )

}

Critical Middleware Setup

8. Disabled Middleware (src/middleware.ts)

import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
// IMPORTANT: Disabled to prevent conflicts with client-side navigation
// Using client-side auth protection instead
return NextResponse.next()
}

export const config = {
matcher: [
'/((?!_next/static|_next/image|favicon.ico|api).*)',
],
}

Key Implementation Notes

⚠️ Critical Requirements:

1. MUST add router.push('/dashboard') after successful sign-in
2. MUST disable middleware to prevent navigation conflicts
3. MUST add client-side protection to dashboard layout
4. MUST wrap app with AuthProvider in root layout

🔒 Security Notes:

- API/Database: Still protected by Supabase RLS and JWT validation
- Session Management: Handled securely by Supabase cookies
- Route Protection: Client-side only (adequate for most applications)
- Production: Consider adding minimal middleware for token refresh only

🚫 Common Pitfalls to Avoid:

1. Do NOT use server-side middleware redirects - causes screen flash
2. Do NOT forget router.push in login form - users stay on auth page
3. Do NOT use deprecated @supabase/auth-helpers-nextjs - use @supabase/ssr
4. Do NOT use complex middleware patterns - client-side is simpler and works

✅ Working Pattern:

- Login form: Handles navigation (router.push)
- Dashboard layout: Protects routes (client-side check)
- Middleware: Disabled to prevent conflicts
- Root page: Redirects based on auth state

This setup avoids the middleware conflicts that cause authentication issues in Next.js 15 and provides a clean, working authentication flow.
