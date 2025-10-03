# Header Behavior Summary

## Overview

The header component (`Header.tsx`) provides a consistent experience across all authenticated pages. It renders the mobile sidebar trigger and an inline breadcrumb so navigation context is always visible without requiring route-specific logic.

## Current Behavior

- **SidebarTrigger**: Always rendered to provide mobile navigation access.
- **Breadcrumb**: Rendered inline; it automatically hides itself on routes where breadcrumbs are not needed (such as `/` or `/dashboard`).
- **Actions**: No additional tab controls or buttons are rendered by default.

## Styling and Layout

- **Position**: Sticky header with `sticky top-0 z-50` to remain visible during scroll.
- **Background**: Semi-transparent background with backdrop blur for visual depth.
- **Sizing**: Fixed height (`h-12`) and horizontal padding for comfortable spacing.
- **Border**: Bottom border delineates the header from page content.

## Implementation Notes

- **Location**: `src/components/layout/Header.tsx`
- **Dependencies**: Uses `SidebarTrigger` from the layout sidebar utilities and the shared `Breadcrumb` component.
- **Client Component**: Declared with `'use client'` to access navigation hooks and interactive UI elements.

## Future Enhancements

- Add contextual quick actions (e.g., "New Project") once additional features require them.
- Support optional secondary content such as search or notification indicators when needed.
