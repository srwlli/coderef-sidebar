2025-09-13T10:04:33.311Z Running build in Washington, D.C., USA (East) – iad1
2025-09-13T10:04:33.312Z Build machine configuration: 2 cores, 8 GB
2025-09-13T10:04:33.350Z Retrieving list of deployment files...
2025-09-13T10:04:33.865Z Downloading 98 deployment files...
2025-09-13T10:04:34.983Z Restored build cache from previous deployment (ESyf6FACCbuDJKoC27MKxV5ZJSHD)
2025-09-13T10:04:35.529Z Running "vercel build"
2025-09-13T10:04:35.914Z Vercel CLI 47.1.1
2025-09-13T10:04:36.238Z Installing dependencies...
2025-09-13T10:04:37.459Z
2025-09-13T10:04:37.460Z > sidebar-app@0.1.0 prepare
2025-09-13T10:04:37.460Z > husky
2025-09-13T10:04:37.460Z
2025-09-13T10:04:37.516Z .git can't be found
2025-09-13T10:04:37.517Z up to date in 1s
2025-09-13T10:04:37.518Z
2025-09-13T10:04:37.518Z 173 packages are looking for funding
2025-09-13T10:04:37.519Z run `npm fund` for details
2025-09-13T10:04:37.546Z Detected Next.js version: 15.5.2
2025-09-13T10:04:37.550Z Running "npm run build"
2025-09-13T10:04:37.655Z
2025-09-13T10:04:37.656Z > sidebar-app@0.1.0 build
2025-09-13T10:04:37.656Z > next build --turbopack
2025-09-13T10:04:37.656Z
2025-09-13T10:04:38.722Z ▲ Next.js 15.5.2 (Turbopack)
2025-09-13T10:04:38.722Z
2025-09-13T10:04:38.790Z Creating an optimized production build ...
2025-09-13T10:04:48.287Z ✓ Finished writing to disk in 18ms
2025-09-13T10:04:48.316Z ✓ Compiled successfully in 8.8s
2025-09-13T10:04:48.323Z Linting and checking validity of types ...
2025-09-13T10:04:54.398Z
2025-09-13T10:04:54.399Z Failed to compile.
2025-09-13T10:04:54.399Z
2025-09-13T10:04:54.399Z ./src/app/(app)/ai-tools/page.tsx
2025-09-13T10:04:54.399Z 3:15 Warning: 'ExternalLink' is defined but never used. @typescript-eslint/no-unused-vars
2025-09-13T10:04:54.399Z 8:3 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
2025-09-13T10:04:54.399Z 9:3 Warning: 'CardContent' is defined but never used. @typescript-eslint/no-unused-vars
2025-09-13T10:04:54.400Z 10:3 Warning: 'CardAction' is defined but never used. @typescript-eslint/no-unused-vars
2025-09-13T10:04:54.400Z
2025-09-13T10:04:54.400Z ./src/app/(app)/prompts/page.tsx
2025-09-13T10:04:54.400Z 2:10 Warning: 'MessageSquare' is defined but never used. @typescript-eslint/no-unused-vars
2025-09-13T10:04:54.400Z
2025-09-13T10:04:54.400Z ./src/app/(app)/spec-kit/page.tsx
2025-09-13T10:04:54.400Z 5:3 Warning: 'Package' is defined but never used. @typescript-eslint/no-unused-vars
2025-09-13T10:04:54.400Z 7:3 Warning: 'ExternalLink' is defined but never used. @typescript-eslint/no-unused-vars
2025-09-13T10:04:54.401Z
2025-09-13T10:04:54.401Z ./src/app/(app)/tech-stacks/page.tsx
2025-09-13T10:04:54.401Z 7:3 Warning: 'Cloud' is defined but never used. @typescript-eslint/no-unused-vars
2025-09-13T10:04:54.401Z
2025-09-13T10:04:54.401Z ./src/components/collapsibles/CollapsiblePrompt.tsx
2025-09-13T10:04:54.401Z 19:3 Warning: 'icon' is defined but never used. @typescript-eslint/no-unused-vars
2025-09-13T10:04:54.401Z
2025-09-13T10:04:54.401Z ./src/components/collapsibles/SimpleCollapsibleContainer.tsx
2025-09-13T10:04:54.401Z 17:3 Warning: 'icon' is defined but never used. @typescript-eslint/no-unused-vars
2025-09-13T10:04:54.402Z
2025-09-13T10:04:54.402Z ./src/components/navigation/BackButton.tsx
2025-09-13T10:04:54.402Z 43:3 Error: React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return? react-hooks/rules-of-hooks
2025-09-13T10:04:54.402Z 53:6 Warning: React Hook useEffect has a missing dependency: 'handleBack'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
2025-09-13T10:04:54.402Z
2025-09-13T10:04:54.402Z info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
2025-09-13T10:04:54.442Z Error: Command "npm run build" exited with 1
