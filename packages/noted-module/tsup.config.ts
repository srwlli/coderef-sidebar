import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/components/index.ts',
    'src/lib/types/index.ts'
  ],
  format: ['esm', 'cjs'],
  dts: false, // Temporarily disable TypeScript declarations
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'next',
    '@supabase/supabase-js',
    'react-hook-form',
    '@hookform/resolvers',
    'zod',
    'lucide-react',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
    '@radix-ui/react-slot',
    '@radix-ui/react-label',
    '@radix-ui/react-dropdown-menu'
  ]
})