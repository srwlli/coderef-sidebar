# Project Page Transformation Instructions

**For AI Agents:** This document provides precise instructions for applying project information form results to project pages. Use this to ensure consistent formatting and structure across all project pages.

---

## **File Location Pattern**

**Target File:** `src/app/(app)/projects/[project-slug]/page.tsx`

Where `[project-slug]` is the kebab-case version of the project name (e.g., "My Sports Rank" → "my-sports-rank")

---

## **1. Project Header Transformation**

### **Project Description (Lines ~125-130)**

```typescript
// FIND THIS BLOCK:
<p className="text-muted-foreground">
  A sample project description showcasing modern development
  practices and technologies. This is mock content for demonstration
  purposes.
</p>

// REPLACE WITH:
<p className="text-muted-foreground">
  [Project Description from form]
</p>
```

### **Project Statistics (Lines ~105-112)**

```typescript
// FIND THIS BLOCK:
const projectStats = {
  pages: 12,
  components: 45,
  linesOfCode: 8750,
  documentation: 3200,
};

// REPLACE WITH:
const projectStats = {
  pages: [Pages from form],
  components: [Components from form],
  linesOfCode: [Lines of Code from form],
  documentation: [Documentation Lines from form],
};
```

---

## **2. Navigation Cards Transformation (Lines ~163-198)**

### **MANDATORY TITLES (NEVER CHANGE):**

- Card 1: "View Project"
- Card 2: "View Documentation"
- Card 3: "View Git"
- Card 4: "View Workflow"

### **URL Updates Only:**

```typescript
// Card 1 - View Project
<Link href="[New Link URL from form]" className="block">
  // Keep title as "View Project"

// Card 2 - View Documentation
<Link href="[Documentation URL from form]" className="block">
  // Keep title as "View Documentation"

// Card 3 - View Git
<Link href="[GitHub repository URL from form]" className="block">
  // Keep title as "View Git"

// Card 4 - View Workflow
<Link href="[Workflow URL from form]" className="block">
  // Keep title as "View Workflow"
```

---

## **3. Collapsible Sections Transformation**

### **Section 1: Purpose (Lines ~201-303)**

#### **Title Update (Line ~202):**

```typescript
// FIND:
title = '[Current Title]';

// REPLACE WITH:
title = '[Project Name] Purpose';
```

#### **Content Updates:**

```typescript
// "What is this project?" section (Lines ~208-217)
<h4 className="mb-3 font-semibold">What is this project?</h4>
<p className="text-muted-foreground leading-relaxed">
  [What is this project from form]
</p>

// Key Features list (Lines ~222-258)
// Replace all 5 <li> elements with features from form:
<li className="flex items-start gap-2">
  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
  <span>
    <strong>[Feature Name]:</strong> [Feature Description]
  </span>
</li>
// Repeat for all 5 features, cycling through colors: blue, green, purple, orange, red

// Target Use Cases (Lines ~263-301)
// Replace all 4 colored boxes with use cases from form:
<div className="rounded-lg bg-blue-50 p-3">
  <h5 className="mb-2 font-medium text-blue-900">
    [Use Case Title]
  </h5>
  <p className="text-sm text-blue-700">
    [Use Case Description]
  </p>
</div>
// Repeat for all 4 use cases, cycling through colors: blue, green, purple, orange
```

### **Section 2: Features (Lines ~306-441)**

#### **Title Update (Line ~307):**

```typescript
// FIND:
title = '[Current Title]';

// REPLACE WITH:
title = '[Project Name] Features';
```

#### **Content Updates:**

```typescript
// Core Functionality Cards (Lines ~315-367)
// Replace all 4 cards with core functionality from form:
<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
  <div className="mb-2 flex items-center gap-3">
    <FolderOpen className="h-5 w-5 text-blue-600" />
    <h5 className="font-medium text-blue-900">
      [Core Feature Title]
    </h5>
  </div>
  <p className="text-sm text-blue-700">
    [Core Feature Description]
  </p>
</div>
// Repeat for all 4 core features, cycling through colors: blue, green, purple, orange

// UI/UX Features (Lines ~374-397)
// Replace all 3 UI/UX feature boxes:
<div className="rounded-lg bg-gray-50 p-4">
  <h5 className="mb-2 font-medium">[UI Feature Name]</h5>
  <p className="text-muted-foreground text-sm">
    [UI Feature Description]
  </p>
</div>
// Repeat for all 3 UI/UX features

// Technical Capabilities (Lines ~406-439)
// Replace all 3 technical capability items:
<div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
  <Shield className="mt-0.5 h-5 w-5 text-slate-600" />
  <div>
    <h5 className="font-medium">[Technical Capability Name]</h5>
    <p className="text-muted-foreground text-sm">
      [Technical Capability Description]
    </p>
  </div>
</div>
// Repeat for all 3 technical capabilities, using icons: Shield, Package, TestTube
```

### **Section 3: Stack (Lines ~444-591)**

#### **Title Update (Line ~445):**

```typescript
// FIND:
title = '[Current Title]';

// REPLACE WITH:
title = '[Project Name] Stack';
```

#### **Architecture Overview Update (Lines ~456-480):**

```typescript
// Replace the 3 architecture description boxes:
<div className="rounded-lg bg-blue-50 p-3">
  <h5 className="mb-2 font-medium text-blue-900">App Style</h5>
  <p className="text-sm text-blue-700">
    [App Style description from form]
  </p>
</div>
<div className="rounded-lg bg-green-50 p-3">
  <h5 className="mb-2 font-medium text-green-900">Components</h5>
  <p className="text-sm text-green-700">
    [Components description from form]
  </p>
</div>
<div className="rounded-lg bg-purple-50 p-3">
  <h5 className="mb-2 font-medium text-purple-900">State</h5>
  <p className="text-sm text-purple-700">
    [State description from form]
  </p>
</div>
```

#### **Tech Stack Data Update (Lines ~30-103):**

```typescript
// COMPLETELY REPLACE the techStackData object:
const techStackData = {
  core: [
    // Copy all core technologies from form exactly as provided
    {
      name: '[Tech Name]',
      version: '[Version]',
      description: '[Description]',
    },
    // ... continue for all core technologies
  ],
  ui: [
    // Copy all UI libraries from form exactly as provided
    {
      name: '[Library Name]',
      version: '[Version]',
      description: '[Description]',
    },
    // ... continue for all UI libraries
  ],
  state: [
    // Copy all state management tools from form exactly as provided
    {
      name: '[Tool Name]',
      version: '[Version]',
      description: '[Description]',
    },
    // ... continue for all state tools
  ],
  utility: [
    // Copy all development utilities from form exactly as provided
    {
      name: '[Utility Name]',
      version: '[Version]',
      description: '[Description]',
    },
    // ... continue for all utilities
  ],
};
```

---

## **4. Critical Requirements**

### **DO NOT CHANGE:**

1. **File structure** - Keep all existing imports, component structure, layout
2. **CSS classes** - Maintain exact Tailwind classes and styling
3. **Navigation card titles** - Always use: "View Project", "View Documentation", "View Git", "View Workflow"
4. **Icon components** - Keep existing Lucide React icons in their current positions
5. **Color schemes** - Maintain the existing color patterns (blue, green, purple, orange, red cycle)

### **ALWAYS CHANGE:**

1. **Project description** in header
2. **Project statistics** numbers
3. **Navigation card URLs** (but not titles)
4. **Collapsible section titles** to "[Project Name] [Section]" format
5. **All content within collapsible sections** based on form data
6. **Tech stack data** object completely

### **VALIDATION CHECKLIST:**

- [ ] Project name appears in all 3 collapsible titles
- [ ] Navigation cards have correct URLs but standard titles
- [ ] All form data has been applied
- [ ] No placeholder/mock content remains
- [ ] File structure and styling unchanged
- [ ] Project statistics updated with real numbers

---

## **5. Example Transformation Result**

For a project named "My Sports Rank", the final page should have:

**Collapsible Titles:**

- "My Sports Rank Purpose"
- "My Sports Rank Features"
- "My Sports Rank Stack"

**Navigation Card Titles:**

- "View Project" (with real project URL)
- "View Documentation" (with real docs URL)
- "View Git" (with real repository URL)
- "View Workflow" (with real workflow URL)

**All Content:** Replaced with actual project information from the form, maintaining the exact structure and styling of the template.
