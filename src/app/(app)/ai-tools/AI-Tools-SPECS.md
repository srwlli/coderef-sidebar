# AI Tools Page Specifications

## 1. Page Identity

- Title: `AI Tools`
- Route: `/ai-tools`
- Component: `AIToolsPage`
- Rendering: Client-side (`use client` directive)

## 2. Dependencies

- UI components: `Card`, `CardHeader`, `CardTitle` from `@/components/cards/Card`; `Badge` from `@/components/ui/badge`
- Icons: `Bot`, `MessageSquare`, `Wrench` from `lucide-react`
- Routing: `Link` from `next/link`
- Styling: Tailwind utility classes applied inline through `className`

## 3. Data Structures

### 3.1 Internal Tools (`internalTools`)

- Shape: `{ name: string; href: string; icon: LucideIcon; isInternal: true }`
- Instances:
  - Prompts -> `/ai-tools/prompts`, icon `MessageSquare`
  - Spec Kit -> `/ai-tools/spec-kit`, icon `Wrench`
- Usage: iterated with index-based key `internal-${index}` to render internal tool cards

### 3.2 External AI Tools (`aiTools`)

- Shape: `{ name: string; url: string }`
- Instances:
  - ChatGPT -> `https://chat.openai.com`
  - Claude -> `https://claude.ai`
  - Gemini -> `https://gemini.google.com`
  - DeepSeek -> `https://chat.deepseek.com`
  - Grok -> `https://grok.x.ai`
  - Le Chat -> `https://chat.mistral.ai`
  - Perplexity -> `https://perplexity.ai`
  - Lovable -> `https://lovable.dev/`
  - Replit -> `https://replit.com`
  - GitHub Copilot -> `https://github.com/features/copilot`
  - Cursor -> `https://cursor.sh`
  - V0 -> `https://v0.dev`
- Usage: iterated with index-based key `external-${index}` to render external tool cards

## 4. Layout & Styling

- Root container: `div.flex.h-full.flex-col`
- Header bar: `div.flex.items-center.justify-between.border-b.p-4`
  - Left cluster: icon (`Bot`), `<h1>` title, `Badge` showing `${internalTools.length + aiTools.length} tools` (currently 14)
  - Right cluster: placeholder `div` for future actions (commented TODO)
- Content region: `div.flex-1.overflow-y-auto.p-8`
  - Main wrapper: `<main class="mx-auto max-w-7xl">`
  - Grid: `div.grid.grid-cols-1.gap-4.sm:grid-cols-2.lg:grid-cols-3.xl:grid-cols-4`
- Cards:
  - Shared styling: `<Card class="h-32 cursor-pointer transition-shadow duration-200 hover:shadow-lg">`
  - Internal cards: icon from `tool.icon`, `CardTitle` displays tool name, wrapped in Next `Link`
  - External cards: `Bot` icon, open in new tab via `target="_blank"` and `rel="noopener noreferrer"`

## 5. Interaction & Behavior

- Internal navigation: client-side route change to respective `/ai-tools/*` pages via `<Link>`
- External navigation: standard anchor tags open vendor sites in new tabs
- Hover feedback: `hover:shadow-lg` increases card elevation
- No local component state or side effects; content is fully static arrays

## 6. Accessibility & Semantics

- Primary heading: `<h1>` with descriptive label "AI Tools"
- Interactive elements: full-card clickable regions using semantic anchors/links
- External links protect parent window via `rel="noopener noreferrer"`

## 7. Extensibility Notes

- Placeholder `div` in header reserved for controls such as "Add Tool" or "Settings"
- Additional tools can be appended by extending `internalTools` or `aiTools` arrays; badge count auto-updates
- To differentiate external services visually, replace static `Bot` icon with service-specific glyphs if available
