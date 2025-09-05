✓ Compiled /dashboard in 571ms
GET /dashboard 200 in 724ms
✓ Compiled /git-commands in 337ms
⨯ ./src/app/(app)/git-commands/page.tsx:1:1
Export SimpleCollapsibleContainer doesn't exist in target module

> 1 | import { SimpleCollapsibleContainer } from '@/components/collapsibles';

    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

2 | import { InputCommandBlock, SimpleCommandBlock } from '@/components/inputs';
3 | import { GitBranch } from 'lucide-react';
4 |

The export SimpleCollapsibleContainer was not found in module [project]/src/components/collapsibles/index.ts [app-rsc] (ecmascript).
Did you mean to import CollapsibleContainer?
All exports of the module are statically known (It doesn't have dynamic exports). So it's known statically that the requested export doesn't exist.

○ Compiling /\_error ...
✓ Compiled /\_error in 1295ms
GET /git-commands 500 in 1928ms
⨯ ./src/app/(app)/git-commands/page.tsx:1:1
Export SimpleCollapsibleContainer doesn't exist in target module

> 1 | import { SimpleCollapsibleContainer } from '@/components/collapsibles';

    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

2 | import { InputCommandBlock, SimpleCommandBlock } from '@/components/inputs';
3 | import { GitBranch } from 'lucide-react';
4 |

The export SimpleCollapsibleContainer was not found in module [project]/src/components/collapsibles/index.ts [app-rsc] (ecmascript).
Did you mean to import CollapsibleContainer?
All exports of the module are statically known (It doesn't have dynamic exports). So it's known statically that the requested export doesn't exist.

GET /git-commands 500 in 117ms
✓ Compiled /favicon.ico in 194ms
GET /favicon.ico 500 in 258ms
GET /dashboard 200 in 386ms
GET / 200 in 134ms
