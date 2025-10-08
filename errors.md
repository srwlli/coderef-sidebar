## Error Type

Console Error

## Error Message

The result of getSnapshot should be cached to avoid an infinite loop

    at ActiveCopyButton (src\components\buttons\ActiveCopyButton.tsx:21:54)
    at CollapsiblePrompt (src\components\collapsibles\CollapsiblePrompt.tsx:53:11)
    at PromptsPage (src\app\(app)\ai-tools\prompts\page.tsx:12:7)

## Code Frame

19 |
20 | // Use Zustand store for global "last copied" tracking

> 21 | const { lastCopiedId, setLastCopied } = useAppStore((state) => ({

     |                                                      ^

22 | lastCopiedId: state.lastCopiedId,
23 | setLastCopied: state.setLastCopied,
24 | }));

Next.js version: 15.5.2 (Webpack)

---

Runtime Error

Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.

src\components\collapsibles\CollapsiblePrompt.tsx (53:11) @ CollapsiblePrompt

51 | </div>
52 | <div onClick={(e) => e.stopPropagation()}>

> 53 | <ActiveCopyButton

     |           ^

54 | content={content}
55 | className="!h-9 !min-w-[75px] !px-3 !py-2 !text-xs"
56 | />
Call Stack
53

Show 51 ignore-listed frame(s)
CollapsiblePrompt
src\components\collapsibles\CollapsiblePrompt.tsx (53:11)
PromptsPage
src\app\(app)\ai-tools\prompts\page.tsx (12:7)
