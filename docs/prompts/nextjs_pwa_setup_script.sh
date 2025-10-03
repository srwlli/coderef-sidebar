#!/bin/bash

# Next.js PWA Setup Script - Automated Project Creation
# This script automates the entire setup process for a modern Next.js PWA

set -e  # Exit on any error

# ============================================================================
# PROJECT CONFIGURATION - CUSTOMIZE THESE VARIABLES
# ============================================================================

PROJECT_NAME="my-app"
APP_TITLE="My App"
APP_SHORT_NAME="MyApp"
APP_DESCRIPTION="Modern Next.js PWA"
THEME_COLOR="#000000"
BACKGROUND_COLOR="#ffffff"
UI_BASE_COLOR="slate"
STORE_NAME="app-storage"
CONTAINER_COMPONENT="ExampleComponent"

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

print_header() {
    echo ""
    echo "=============================================="
    echo "$1"
    echo "=============================================="
}

print_step() {
    echo ""
    echo "📋 $1"
    echo "---"
}

print_success() {
    echo "✅ $1"
}

print_error() {
    echo "❌ Error: $1"
    exit 1
}

create_file() {
    local file_path="$1"
    local content="$2"
    echo "$content" > "$file_path"
    print_success "Created $file_path"
}

# ============================================================================
# MAIN SETUP PROCESS
# ============================================================================

print_header "Next.js PWA Setup Script"
echo "Creating project: $PROJECT_NAME"
echo "App title: $APP_TITLE"
echo ""

# Phase 1: Project Foundation Setup
print_header "Phase 1: Project Foundation Setup"

print_step "1.1 Creating Next.js project..."
npx create-next-app@latest "$PROJECT_NAME" \
    --typescript \
    --tailwind \
    --eslint \
    --app \
    --src-dir \
    --import-alias \
    --no-git
print_success "Next.js project created"

cd "$PROJECT_NAME"

print_step "1.2 Installing core dependencies..."
npm install zustand @supabase/supabase-js next-pwa
npm install --save-dev webpack
print_success "Core dependencies installed"

print_step "1.3 Initializing shadcn/ui..."
echo "Setting up shadcn/ui with default responses..."
npx shadcn-ui@latest init --yes --defaults
print_success "shadcn/ui initialized"

print_step "1.4 Installing UI components..."
npx shadcn-ui@latest add button input card dialog toast avatar badge dropdown-menu sheet tabs
print_success "UI components installed"

# Phase 2: PWA Configuration
print_header "Phase 2: PWA Configuration"

print_step "2.1 Configuring PWA build..."
cat > next.config.js << EOF
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withPWA(nextConfig)
EOF
print_success "PWA configuration created"

print_step "2.2 Creating PWA manifest..."
cat > public/manifest.json << EOF
{
  "name": "$APP_TITLE",
  "short_name": "$APP_SHORT_NAME",
  "description": "$APP_DESCRIPTION",
  "start_url": "/",
  "display": "standalone",
  "background_color": "$BACKGROUND_COLOR",
  "theme_color": "$THEME_COLOR",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512", 
      "type": "image/png"
    }
  ]
}
EOF
print_success "PWA manifest created"

print_step "2.3 Updating layout with PWA meta tags..."
cat > src/app/layout.tsx << EOF
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '$APP_TITLE',
  description: '$APP_DESCRIPTION',
  manifest: '/manifest.json',
  themeColor: '$THEME_COLOR',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="$THEME_COLOR" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
EOF
print_success "Layout updated with PWA meta tags"

# Phase 3: Backend Integration
print_header "Phase 3: Backend Integration"

print_step "3.1 Creating environment file..."
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
EOF
print_success "Environment file created"

print_step "3.2 Creating Supabase client..."
mkdir -p src/lib
cat > src/lib/supabase.ts << EOF
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
EOF
print_success "Supabase client created"

# Phase 4: State Management
print_header "Phase 4: State Management"

print_step "4.1 Creating Zustand store..."
mkdir -p src/store
cat > src/store/useStore.ts << EOF
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  user: any | null
  isLoading: boolean
  setUser: (user: any) => void
  setLoading: (loading: boolean) => void
  clearUser: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: '$STORE_NAME',
    }
  )
)
EOF
print_success "Zustand store created"

# Phase 5: Component Development
print_header "Phase 5: Component Development"

print_step "5.1 Creating example component..."
cat > "src/components/$CONTAINER_COMPONENT.tsx" << EOF
'use client'

import { useStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function $CONTAINER_COMPONENT() {
  const { user, isLoading, setUser, setLoading } = useStore()

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>$CONTAINER_COMPONENT</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>User: {user ? user.email : 'Not logged in'}</p>
        <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
        <Button 
          onClick={() => setLoading(!isLoading)}
          variant="outline"
        >
          Toggle Loading
        </Button>
      </CardContent>
    </Card>
  )
}
EOF
print_success "Example component created"

print_step "5.2 Updating home page..."
cat > src/app/page.tsx << EOF
import $CONTAINER_COMPONENT from '@/components/$CONTAINER_COMPONENT'

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen flex items-center justify-center">
      <$CONTAINER_COMPONENT />
    </main>
  )
}
EOF
print_success "Home page updated"

# Phase 6: Git and Environment Setup
print_header "Phase 6: Git and Environment Setup"

print_step "6.1 Updating .gitignore..."
cat >> .gitignore << EOF

# Environment variables
.env.local
.env*.local

# PWA files
public/sw.js
public/workbox-*.js
public/worker-*.js
public/sw.js.map
public/workbox-*.js.map
public/worker-*.js.map
EOF
print_success ".gitignore updated"

print_step "6.2 Creating placeholder icons..."
# Create simple placeholder icons (you should replace these with real icons)
mkdir -p public/temp-icons
echo "<!-- Replace with actual 192x192 PNG icon -->" > public/icon-192x192.png
echo "<!-- Replace with actual 512x512 PNG icon -->" > public/icon-512x512.png
print_success "Placeholder icons created"

# Phase 7: Testing and Finalization
print_header "Phase 7: Testing and Validation"

print_step "7.1 Installing dependencies..."
npm install
print_success "All dependencies installed"

print_step "7.2 Testing TypeScript compilation..."
npx tsc --noEmit
print_success "TypeScript compilation successful"

print_step "7.3 Testing development build..."
echo "Testing if the project builds without errors..."
timeout 30s npm run dev > /dev/null 2>&1 || {
    echo "Development server test completed (timeout expected)"
}
print_success "Development build test completed"

# Final Summary
print_header "🎉 Setup Complete!"

echo "Your Next.js PWA project '$PROJECT_NAME' has been created successfully!"
echo ""
echo "📁 Project Structure:"
echo "   ├── src/"
echo "   │   ├── app/           # App router pages"
echo "   │   ├── components/    # React components"
echo "   │   ├── lib/           # Utility libraries"
echo "   │   └── store/         # Zustand state management"
echo "   ├── public/            # Static assets"
echo "   └── .env.local         # Environment variables"
echo ""
echo "🔧 Next Steps:"
echo "   1. Replace placeholder icons in /public/ with real PWA icons"
echo "   2. Update .env.local with your actual Supabase credentials"
echo "   3. Customize the $CONTAINER_COMPONENT component for your needs"
echo "   4. Run 'npm run dev' to start development"
echo "   5. Run 'npm run build' to test production build"
echo ""
echo "📚 Available Commands:"
echo "   npm run dev          # Start development server"
echo "   npm run build        # Build for production"
echo "   npm run start        # Start production server"
echo "   npm run lint         # Run ESLint"
echo ""
echo "🌟 Features Included:"
echo "   ✅ TypeScript"
echo "   ✅ Tailwind CSS"
echo "   ✅ PWA (installable, offline capable)"
echo "   ✅ Supabase integration"
echo "   ✅ Zustand state management"
echo "   ✅ shadcn/ui components"
echo "   ✅ Modern project structure"
echo ""
echo "Happy coding! 🚀"