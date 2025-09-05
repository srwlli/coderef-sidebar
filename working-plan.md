# Header Title Adjustments Plan

## Two adjustments needed:

### 1. Color split

- Make "code" blue and "ref" black using separate `<span>` elements with different text colors

### 2. Position change

- Move from right side (current: `justify-between`) to left side next to the toggle
- Remove `justify-between`
- Add `gap-4` back for spacing between toggle and title
- Position will be: `[Toggle] [coderef]` on the left side

This creates a grouped left-aligned layout with the branded title right next to the navigation control.
