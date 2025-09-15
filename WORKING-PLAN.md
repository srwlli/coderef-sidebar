# Phased Implementation Plan

This plan addresses mobile sidebar UX, state persistence, baseline security headers, content structure consistency, and CI hygiene.

## Phase 1 — Mobile Sidebar Auto-Close (UX)

- Files: `src/components/layout/sidebar.tsx` (function `SidebarMenuButton` ~498–546)
- Change:
  - Read `{ isMobile, setOpenMobile } = useSidebar()` in `SidebarMenuButton`.
  - Wrap `onClick`: invoke original `props.onClick?.(e)`, then `if (isMobile) setOpenMobile(false)`.
  - Works for both `asChild` and non-`asChild` usage via `Slot`.
- Acceptance:
  - On mobile, tapping a menu item navigates and the Sheet closes automatically.
  - Desktop behavior unchanged (active styling, tooltips, navigation intact).
- Risks: Low. Avoid `preventDefault`; preserve caller `onClick` execution order.
- Effort: ~0.5 day

## Phase 2 — Sidebar Persistence: Cookie → localStorage

- Files: `src/components/layout/sidebar.tsx`
- Change:
  - Replace cookie write at the `setOpen` callback (around current cookie write) with `localStorage.setItem('sidebar_state', JSON.stringify(openState))`.
  - On mount, use `useEffect` to read `localStorage` and initialize `_setOpen` (default `true` to avoid SSR mismatch).
  - Optional: Add a small helper to parse safely and fall back to default on errors.
- Acceptance:
  - Open/closed state persists across reloads without cookies being sent to the server.
- Risks: Low. Ensure all reads happen in `useEffect` to avoid hydration mismatches.
- Effort: ~0.25 day

## Phase 3 — Security Headers (Baseline)

- Files: `next.config.ts`
- Change:
  - Implement `async headers()` returning a catch‑all `{ source: '/(.*)', headers: [...] }` including:
    - `X-Content-Type-Options: nosniff`
    - `Referrer-Policy: origin-when-cross-origin`
    - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
    - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (use in HTTPS environments)
    - `Content-Security-Policy`: start permissive enough for current features; tighten iteratively (remove inline/eval where feasible with nonces/hashes).
- Acceptance:
  - Headers applied in dev/preview; no functional regressions; CSP violations monitored and resolved iteratively.
- Risks: Medium. Over‑strict CSP can break fonts/scripts; tune based on console reports.
- Effort: ~0.5 day initial, plus follow‑up tuning

## Phase 4 — Standardize Content Page Structure

- **STATUS: SKIPPED** - tech-stacks page will be rebuilt from scratch
- Files: ~~content‑heavy pages (e.g., `src/app/(app)/tech-stacks/page.tsx`)~~
- Change: ~~Use `SimpleCollapsibleContainer` for large sections~~
- Rationale: No point refactoring current implementation if rebuilding entirely

## Phase 5 — CI Signal & Hygiene

- Files: `.github/workflows/ci.yml` (new), repo config
- Change:
  - Add CI to run type‑check (`tsc --noEmit`), ESLint, and `next build` on PRs.
  - Ensure pre‑commit hooks pass locally (lint-staged + prettier).
- Acceptance:
  - CI blocks merges on lint/type/build failures; local commits pass hooks.
- Risks: Low
- Effort: ~0.5 day

## Acceptance Criteria (Summary)

- Mobile: Sidebar auto‑closes on item click; desktop unchanged.
- Persistence: `sidebar_state` stored in localStorage; no cookies used.
- Security: Baseline headers present; CSP tuned without breaking functionality.
- ~~Content: Heavy pages use collapsibles and prefer Server Components.~~ (SKIPPED - rebuilding tech-stacks)
- CI: Lint/type/build clean locally and in CI.

## Tasks Checklist

- [x] Phase 1: Add auto‑close logic to `SidebarMenuButton` ✅ COMPLETE
- [x] Phase 2: Swap cookie persistence to localStorage ✅ COMPLETE
- [x] Phase 3: Add security headers via `headers()` in `next.config.ts` ✅ COMPLETE
- [x] Phase 4: ~~Refactor `tech-stacks/page.tsx`~~ ✅ SKIPPED (rebuilding page)
- [x] Phase 5: Add CI workflow for lint/type/build ✅ COMPLETE
- [x] **BONUS**: Supabase Authentication Setup ✅ COMPLETE
- [ ] Phase 6: Custom Forms with Supabase Integration 🚧 NEXT

---

## Reference: Security Headers Overview

Security headers instruct browsers how to behave when handling your site's content, providing protection against common web vulnerabilities.

### Key Security Headers for Next.js Applications

**1. Content Security Policy (CSP)**

```typescript
'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none'"
```

- Purpose: Prevents XSS by controlling which resources can be loaded
- Impact: Blocks malicious scripts, unauthorized external resources
- Risk: Over‑strict CSP can break dev tooling; iterate to tighten

**2. X-Content-Type-Options**

```typescript
'X-Content-Type-Options': 'nosniff'
```

- Purpose: Prevents MIME type sniffing attacks

**3. Referrer-Policy**

```typescript
'Referrer-Policy': 'origin-when-cross-origin'
```

- Purpose: Controls how much referrer information is sent with requests

**4. X-Frame-Options / frame-ancestors**

```typescript
'X-Frame-Options': 'DENY'
// or via CSP: frame-ancestors 'none'
```

- Purpose: Prevents clickjacking attacks

**5. Strict-Transport-Security (HSTS)**

```typescript
'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
```

- Purpose: Forces HTTPS connections

**6. Permissions-Policy**

```typescript
'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
```

- Purpose: Controls browser feature access

### Implementation in Next.js

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Add HSTS only when served via HTTPS/production proxies
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none'",
          },
        ],
      },
    ];
  },
};
```

---

## Reference: Local Storage vs Cookie Persistence

Current code writes a cookie in `sidebar.tsx` to persist sidebar state. Prefer localStorage for this client-only UI preference.

### LocalStorage Implementation

```typescript
// Replace cookie logic with localStorage
const setSidebarState = (open: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sidebar_state', JSON.stringify(open));
  }
};

const getSidebarState = (): boolean => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('sidebar_state');
    return stored ? JSON.parse(stored) : true; // default open
  }
  return true;
};

// SSR-safe initialization
const [open, setOpen] = React.useState(true);
React.useEffect(() => {
  const storedState = getSidebarState();
  if (storedState !== open) setOpen(storedState);
}, []);
```
