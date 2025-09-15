# Project Information Collection Form

**Instructions for AI Agent:** Fill out this form to gather ALL information needed to populate the project landing page template. Reference the existing template structure at `src/app/(app)/projects/project-landing/page.tsx` to understand exactly what data is needed.

---

## **1. Project Header Information**

**Project Name:** `[Exact title to display in CardTitle]`

**Project Description:** `[Replace the mock description paragraph in CardContent]`

**Project Statistics:** `[Replace mock projectStats object]`

- Pages: `[number]`
- Components: `[number]`
- Lines of Code: `[number]`
- Documentation Lines: `[number]`

---

## **2. Navigation Cards** (4 action cards below header)

**Card 1 - View Project (Home icon):**

- Current Link: `/dashboard` (line ~166)
- Current Title: "View Project" (line ~170)
- **Instructions:** Update href to actual project/demo URL, keep title or customize
- **New Link URL:** `[Where should "View Project" navigate to?]`
- **New Title:** `[Keep "View Project" or change to "View Demo", "Launch App", etc.]`

**Card 2 - View Documentation (FileText icon):**

- Current Link: `/projects/project-landing` (line ~175)
- Current Title: "View Documentation" (line ~179)
- **Instructions:** Update href to documentation URL (GitHub README, docs site, etc.)
- **New Link URL:** `[Documentation link - GitHub README, docs site, etc.]`
- **New Title:** `[Keep "View Documentation" or customize]`

**Card 3 - View Git (GitBranch icon):**

- Current Link: `/projects/project-landing` (line ~184)
- Current Title: "View Git" (line ~188)
- **Instructions:** Update href to GitHub repository URL
- **New Link URL:** `[GitHub repository URL]`
- **New Title:** `[Keep "View Git" or change to "View Repository", "View Source", etc.]`

**Card 4 - View Workflow (Settings icon):**

- Current Link: `/projects/project-landing` (line ~193)
- Current Title: "View Workflow" (line ~197)
- **Instructions:** Update href and title based on project needs (could be settings, workflow, admin, etc.)
- **New Link URL:** `[Project-specific link - settings, workflow, admin panel, etc.]`
- **New Title:** `[Customize based on project: "View Settings", "View Workflow", "Admin Panel", etc.]`

---

## **3. Applications Purpose Section** (First collapsible)

**Section Title:** `[Replace "Applications Purpose" - what should this be called for your project?]`

**What is this project?** `[Replace the "What is this app?" content with project-specific purpose]`

**Key Features:** `[Replace the 5 Feature A-E items with real features]`

1. **Feature Name:** Description
2. **Feature Name:** Description
3. **Feature Name:** Description
4. **Feature Name:** Description
5. **Feature Name:** Description

**Target Use Cases:** `[Replace the 4 colored boxes with real use cases]`

1. **Use Case Title:** Description (replace "Individual Users")
2. **Use Case Title:** Description (replace "Team Collaboration")
3. **Use Case Title:** Description (replace "Development Workflow")
4. **Use Case Title:** Description (replace "Enterprise Solutions")

---

## **4. Applications Features Section** (Second collapsible)

**Section Title:** `[Replace "Applications Features" with project-appropriate title]`

**Core Functionality Cards:** `[Replace the 4 core feature cards]`

1. **Feature Title:** Description (replace "Project Management")
2. **Feature Title:** Description (replace "Documentation System")
3. **Feature Title:** Description (replace "Development Tools")
4. **Feature Title:** Description (replace "Architecture Tracking")

**UI/UX Features:** `[Replace the 3 UX feature boxes]`

1. **Feature:** Description (replace "Responsive Design")
2. **Feature:** Description (replace "Interactive Elements")
3. **Feature:** Description (replace "Accessibility")

**Technical Capabilities:** `[Replace the 3 technical capability items]`

1. **Capability:** Description (replace "Security Framework")
2. **Capability:** Description (replace "Modular Architecture")
3. **Capability:** Description (replace "Testing Suite")

---

## **5. Applications Stack Section** (Third collapsible)

**Section Title:** `[Replace "Applications Stack" with project-appropriate title]`

**Architecture Overview:** `[Replace the 3 architecture boxes]`

- App Style: `[Description]`
- Components: `[Description]`
- State: `[Description]`

**Core Technologies:** `[Replace techStackData.core array]`

```javascript
core: [
  { name: '[Tech Name]', version: '[Version]', description: '[Description]' },
  { name: '[Tech Name]', version: '[Version]', description: '[Description]' },
  // ... add all core technologies
];
```

**UI/UX Libraries:** `[Replace techStackData.ui array]`

```javascript
ui: [
  {
    name: '[Library Name]',
    version: '[Version]',
    description: '[Description]',
  },
  // ... add all UI libraries
];
```

**State & Data Management:** `[Replace techStackData.state array]`

```javascript
state: [
  { name: '[Tool Name]', version: '[Version]', description: '[Description]' },
  // ... add all state management tools
];
```

**Development Utilities:** `[Replace techStackData.utility array]`

```javascript
utility: [
  {
    name: '[Utility Name]',
    version: '[Version]',
    description: '[Description]',
  },
  // ... add all development utilities
];
```

---

## **6. Content Mapping Reference**

**Template Location:** `src/app/(app)/projects/project-landing/page.tsx`

**Key Variables to Replace:**

- Line ~122: `<CardTitle>Project Name</CardTitle>`
- Line ~126: Project description paragraph
- Line ~107: `projectStats` object (pages, components, linesOfCode, documentation)
- Line ~30: `techStackData` object (core, ui, state, utility arrays)
- Line ~205: "Applications Purpose" title
- Line ~307: "Applications Features" title
- Line ~445: "Applications Stack" title
- Lines 175-200: Navigation card hrefs and titles

**Color Scheme Reference:**

- Blue: `bg-blue-50`, `text-blue-900`, `text-blue-700`
- Green: `bg-green-50`, `text-green-900`, `text-green-700`
- Purple: `bg-purple-50`, `text-purple-900`, `text-purple-700`
- Orange: `bg-orange-50`, `text-orange-900`, `text-orange-700`

---

## **AI Agent Instructions**

1. **Analyze the codebase** to find any existing information about this project
2. **Look for README files, documentation, or comments** that might provide context
3. **Examine the project structure** to understand the technical stack
4. **Check for package.json, dependencies, or config files** to identify technologies
5. **If information is not available in the codebase**, mark fields as `[NEEDS RESEARCH]`
6. **Be specific and accurate** - this information will be used to update the live project pages
7. **Focus on factual information** that can be verified from the code

**Template Usage:**

- Copy this form for each project that needs information gathering
- Name the file: `project-info-[project-slug].md`
- Complete as much as possible from codebase analysis
- Mark uncertain information clearly for later verification
