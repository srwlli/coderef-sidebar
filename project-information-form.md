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
- **Instructions:** Update href to actual project/demo URL, ALWAYS keep title as "View Project"
- **New Link URL:** `[Where should "View Project" navigate to?]`
- **New Title:** `"View Project"` (REQUIRED - do not change)

**Card 2 - View Documentation (FileText icon):**

- Current Link: `/projects/project-landing` (line ~175)
- Current Title: "View Documentation" (line ~179)
- **Instructions:** Update href to documentation URL (GitHub README, docs site, etc.)
- **New Link URL:** `[Documentation link - GitHub README, docs site, etc.]`
- **New Title:** `"View Documentation"` (REQUIRED - do not change)

**Card 3 - View Git (GitBranch icon):**

- Current Link: `/projects/project-landing` (line ~184)
- Current Title: "View Git" (line ~188)
- **Instructions:** Update href to GitHub repository URL
- **New Link URL:** `[GitHub repository URL]`
- **New Title:** `"View Git"` (REQUIRED - do not change)

**Card 4 - View Workflow (Settings icon):**

- Current Link: `/projects/project-landing` (line ~193)
- Current Title: "View Workflow" (line ~197)
- **Instructions:** Update href to project workflow/settings/admin URL
- **New Link URL:** `[Project-specific link - settings, workflow, admin panel, etc.]`
- **New Title:** `"View Workflow"` (REQUIRED - do not change)

---

## **3. Project Purpose Section** (First collapsible)

**Section Title:** `"[Project Name] Purpose"` (REQUIRED FORMAT - use exact project name + " Purpose")

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

## **4. Project Features Section** (Second collapsible)

**Section Title:** `"[Project Name] Features"` (REQUIRED FORMAT - use exact project name + " Features")

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

## **5. Project Stack Section** (Third collapsible)

**Section Title:** `"[Project Name] Stack"` (REQUIRED FORMAT - use exact project name + " Stack")

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

## **CRITICAL AI Agent Instructions for Consistency**

### **MANDATORY NAMING CONVENTIONS (DO NOT DEVIATE):**

**Navigation Cards (NEVER CHANGE THESE TITLES):**

- Card 1: "View Project" (Home icon)
- Card 2: "View Documentation" (FileText icon)
- Card 3: "View Git" (GitBranch icon)
- Card 4: "View Workflow" (Settings icon)

**Collapsible Section Titles (REQUIRED FORMAT):**

- Section 1: "[Project Name] Purpose"
- Section 2: "[Project Name] Features"
- Section 3: "[Project Name] Stack"

### **Analysis Instructions:**

1. **Analyze the codebase** to find any existing information about this project
2. **Look for README files, documentation, or comments** that might provide context
3. **Examine the project structure** to understand the technical stack
4. **Check for package.json, dependencies, or config files** to identify technologies
5. **If information is not available in the codebase**, mark fields as `[NEEDS RESEARCH]`
6. **Be specific and accurate** - this information will be used to update the live project pages
7. **Focus on factual information** that can be verified from the code
8. **ALWAYS follow the exact naming conventions above for consistency**

**Template Usage:**

- Copy this form for each project that needs information gathering
- Name the file: `project-info-[project-slug].md`
- Complete as much as possible from codebase analysis
- Mark uncertain information clearly for later verification

---

## **Expected Result Example (Coderef2)**

**This is the expected output format when the form is completed:**

### **1. Project Header Information**

**Project Name:** `Coderef2`
**Project Description:** `Enterprise semantic code intelligence platform with AI governance capabilities, traceable code tags, and comprehensive documentation synchronization for development teams and organizations.`
**Project Statistics:**

- Pages: `127`
- Components: `85`
- Lines of Code: `25000`
- Documentation Lines: `12700`

### **2. Navigation Cards** (STANDARDIZED TITLES - DO NOT CHANGE)

**Card 1 - View Project:** `/projects/coderef2` | "View Project"
**Card 2 - View Documentation:** `/projects/coderef2` | "View Documentation"
**Card 3 - View Git:** `/projects/coderef2` | "View Git"
**Card 4 - View Workflow:** `/projects/coderef2` | "View Workflow"

### **3. Project Purpose Section**

**Section Title:** `"Coderef2 Purpose"` (PROJECT NAME + PURPOSE FORMAT)
**What is this project?** `"Coderef2 is an enterprise-grade semantic code intelligence platform featuring the SACOS framework..."`
**Key Features:**

1. **Semantic Code Tags:** Traceable @Type/Path#Element:Line tags with metadata tracking
2. **AI Governance (SACOS):** Constitutional AI enforcement with multi-layer validation
3. **Drift Detection:** Advanced rename similarity and automated change tracking
4. **Enterprise Compliance:** 127 documentation files with comprehensive audit trails
5. **Multi-Language Support:** TypeScript/JavaScript/Python with AST parsing capabilities

**Target Use Cases:**

1. **Enterprise Teams:** Development teams requiring AI governance and compliance tracking
2. **Financial Services:** Organizations needing 87% microservices adoption compliance
3. **Regulatory Industries:** Healthcare and government requiring AI accountability
4. **Development Organizations:** Companies implementing AI-governed software development

### **4. Project Features Section**

**Section Title:** `"Coderef2 Features"` (PROJECT NAME + FEATURES FORMAT)
**Core Functionality Cards:**

1. **Code Intelligence:** Semantic parsing, tagging, and element discovery across codebases
2. **AI Governance (SACOS):** Constitutional constraints and authorization gates for AI systems
3. **Development Tools:** CLI suite with drift detection, validation, and automation
4. **Enterprise Compliance:** Comprehensive audit trails and policy enforcement frameworks

**UI/UX Features:**

1. **Command Line Interface:** Professional CLI tools with JSON outputs and CI integration
2. **Documentation System:** Automated generation with 127 comprehensive documentation files
3. **Enterprise Integration:** Multi-signature deployment protocols and approval workflows

### **5. Project Stack Section**

**Section Title:** `"Coderef2 Stack"` (PROJECT NAME + STACK FORMAT)
**Architecture Overview:**

- App Style: `Enterprise semantic intelligence platform with constitutional AI governance`
- Components: `Modular architecture with core library, CLI suite, validation services, governance layer`
- State: `Immutable constitutional constraints with real-time policy enforcement`

**Core Technologies:**

```javascript
core: [
  {
    name: 'TypeScript',
    version: '^5.0',
    description: 'Primary language with AST parsing',
  },
  {
    name: 'Node.js',
    version: '18.x',
    description: 'Runtime environment for CLI tools',
  },
  {
    name: 'Commander.js',
    version: '^9.0',
    description: 'CLI framework for coderef-cli',
  },
  {
    name: 'Jest',
    version: '^29.0',
    description: 'Testing framework with coverage',
  },
];
```

This example shows the level of detail and accuracy expected when completing the form for any project.
