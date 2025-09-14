## Mobile Sidebar Auto-Close Fix

### Problem

The mobile sidebar doesn't automatically close when users tap navigation items, requiring them to tap outside the sidebar to close it manually.

### Root Cause Analysis

- Mobile sidebar uses Radix UI Sheet overlay pattern
- Menu items are `<Link>` components that navigate but don't trigger sidebar close
- Sheet only closes via backdrop click or Escape key, not content interaction
- Missing auto-close logic after navigation on mobile devices

### Solution Approach

Add automatic sidebar closing functionality when navigation items are clicked on mobile devices.

### Implementation Steps

1. **Create Enhanced Menu Button Component**:
   - Extend existing `SidebarMenuButton` to handle mobile auto-close
   - Detect mobile state via `useSidebar()` hook
   - Add click handler that closes mobile sidebar after navigation

2. **Modify App Layout**:
   - Update menu item implementation to use enhanced button
   - Maintain existing desktop behavior (no auto-close)
   - Preserve current active state logic and styling

3. **Implementation Details**:
   - Use `useSidebar()` hook to access `isMobile` and `setOpenMobile`
   - Add click handler that calls `setOpenMobile(false)` only on mobile
   - Ensure navigation still occurs before closing
   - Maintain accessibility and keyboard navigation

4. **Testing Requirements**:
   - Verify desktop sidebar behavior unchanged
   - Confirm mobile sidebar closes after navigation
   - Test with keyboard navigation
   - Validate active state preservation

### Files to Modify

- `src/app/(app)/layout.tsx` - Update menu button usage
- Consider creating a wrapper component if needed

### Expected Outcome

- Mobile users tap menu item → navigate to page → sidebar automatically closes
- Desktop behavior remains unchanged
- Improved mobile UX with one-tap navigation

### Technical Notes

- Current issue: Sheet `onOpenChange={setOpenMobile}` only triggers on overlay interactions
- Navigation links don't automatically trigger sidebar state changes
- Need to bridge navigation behavior with sidebar control
