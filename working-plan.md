# CollapsiblePrompt Update Plan

## Step 1: Update Import

- Replace `import CopyButton from '../CopyButton/CopyButton';`
- With `import { ActiveCopyButton } from '@/components/buttons/ActiveCopyButton';`

## Step 2: Update Header

- Replace `<CopyButton content={content} variant="header" />` with `<ActiveCopyButton content={content} />`
- Update header styling to match SimpleCollapsibleContainer pattern
- Header layout: **Toggle ▶ | Icon | Title | [ActiveCopyButton]**

## Step 3: Update Content Area

- Replace `<CopyButton content={content} className="flex-shrink-0 self-start" />` with `<ActiveCopyButton content={content} className="flex-shrink-0 self-start" />`

## Step 4: Clean Up

- Remove `handleTextSelect` function (lines 25-31)
- Remove `onClick={(e) => handleTextSelect(e.currentTarget)}` from content div (line 65)

## Step 5: Add to Prompts Page

- Import CollapsiblePrompt to `src/app/(app)/prompts/page.tsx`
- Replace placeholder Card with CollapsiblePrompt example

**Result:** Clean "Toggle ▶ | Icon | Title | [ActiveCopyButton]" header layout as specified.
