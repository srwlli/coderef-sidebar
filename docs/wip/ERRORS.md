PS C:\Users\willh\Desktop\sidebar-app> git commit -m 'formed module created'
✔ Backed up original state in git stash (a399445)
⚠ Running tasks for staged files...
❯ package.json — 28 files
❯ _.{js,jsx,ts,tsx} — 16 files
✖ eslint --fix [FAILED]
◼ prettier --write
✔ _.{css,scss,md} — 9 files
↓ Skipped because of errors from tasks.
✔ Reverting to original state because of errors...
✔ Cleaning up temporary files...

✖ eslint --fix:

C:\Users\willh\Desktop\sidebar-app\src\app\(app)\forms\page.tsx
8:39 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

C:\Users\willh\Desktop\sidebar-app\src\components\forms\FormGenerator.tsx
16:20 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
33:5 warning 'register' is assigned a value but never used @typescript-eslint/no-unused-vars
62:30 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
72:30 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
82:30 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
94:41 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

C:\Users\willh\Desktop\sidebar-app\src\components\forms\ProjectForm.tsx
10:22 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
19:37 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
39:21 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

C:\Users\willh\Desktop\sidebar-app\src\lib\forms\formTypes.ts
92:39 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
123:10 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
124:21 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

C:\Users\willh\Desktop\sidebar-app\src\lib\forms\validation.ts
133:55 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
140:34 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
154:28 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
156:19 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
186:73 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
187:34 error Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

✖ 19 problems (18 errors, 1 warning)
