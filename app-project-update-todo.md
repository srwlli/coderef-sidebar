# Template: Replacing Placeholder Projects

## **Quick Todo Checklist for Each New Project:**

### **1. Card Updates (Main Listing Pages)**

- [ ] Update name in `src/app/(app)/projects/page.tsx` (line ~20-24 for Project 4, 5, etc.)
- [ ] Change href from `/project-landing` to specific route

### **2. Directory Structure**

- [ ] Create new directory: `src/app/(app)/projects/[project-name]/`
- [ ] Copy template from existing landing pages or create new `page.tsx`

### **3. Page Content Updates**

- [ ] Update `<CardTitle>` with actual project name (ONLY change the title)
- [ ] Update internal navigation links to use new route (replace `/project-landing` with `/[new-route]`)
- [ ] **OPTIONAL:** Replace description with real project description
- [ ] **OPTIONAL:** Update "What is this project?" section with actual purpose
- [ ] **OPTIONAL:** Replace mock features with real features (5 bullet points)
- [ ] **OPTIONAL:** Update target user sections (4 colored boxes)
- [ ] **OPTIONAL:** Update core functionality cards (4 feature cards)
- [ ] **OPTIONAL:** Replace tech stack data with actual technologies used

**Note:** For initial setup, only update the title and internal routing. Content updates can be done later when ready to customize the project page.

### **4. Breadcrumb Configuration**

- [ ] Add route mapping in `src/components/navigation/Breadcrumb.tsx`
- [ ] Add entries like: `'/projects/[name]': 'ActualName'`

### **5. Routing Consistency**

- [ ] Ensure all internal links point to correct routes
- [ ] Update any "View Project", "View Documentation" etc. links
- [ ] Test navigation from cards to detail pages

## **Files to Modify for Each Replacement:**

1. **`src/app/(app)/projects/page.tsx`** - Update project card name + href
2. **`src/components/navigation/Breadcrumb.tsx`** - Add route label mapping
3. **Create: `src/app/(app)/projects/[new-name]/page.tsx`** - New project page

## **Examples:**

### **Minimal Update (Title Only - Smart Phrases Pattern):**

```tsx
// 1. Update card in projects/page.tsx
{
  name: 'Smart Phrases',           // Changed from 'Project 4'
  href: '/projects/smart-phrases', // Changed from '/projects/project-landing'
}

// 2. Copy template page and update only title
<CardTitle className="text-2xl">Smart Phrases</CardTitle>

// 3. Update internal navigation links
// Replace all "/projects/project-landing" with "/projects/smart-phrases"
```

### **Full Content Update (MyStudyApp Pattern):**

### Card Update:

```tsx
// In projects/page.tsx
{
  name: 'MyStudyApp',           // Changed from 'Project 3'
  href: '/projects/mystudyapp', // Changed from '/projects/project-landing'
}
```

### Breadcrumb Update:

```tsx
// In Breadcrumb.tsx
const routeLabels: Record<string, string> = {
  // ... existing routes
  '/projects/mystudyapp': 'MyStudyApp',
};
```

This checklist covers the exact same pattern used for MyStudyApp - just repeat for remaining Projects when ready to replace them with real projects.

---

## **IMPORTANT NOTES:**

**✅ Applications Section Removed:** The entire Applications section has been completely removed from:

- Sidebar navigation
- Dashboard cards
- Breadcrumb system
- File system (`/src/app/(app)/applications/` directory deleted)
- All documentation references

**📋 Current Project Status:**

- ✅ **MyStudyApp** (Project 3) - Fully customized with study-focused content
- ✅ **Smart Phrases** (Project 4) - Title-only update, template content
- ✅ **My Sports Rank** (Project 5) - Title-only update, template content
- ✅ **iCaughta'** (Project 6) - Title-only update, template content
- ✅ **noted** (Project 7) - Title-only update, template content
- ✅ **formed** (Project 8) - Title-only update, template content
- ✅ **Agents** (Project 9) - Title-only update, template content
- ✅ **Highway Games** (Project 10) - Title-only update, template content
- ✅ **My Dash** (Project 11) - Title-only update, template content
- ✅ **Paper trail** (Project 12) - Title-only update, template content
- ✅ **UDS** (Project 13) - Title-only update, template content
- ❌ **Projects 14-16** - Still using generic "Project X" names

This template now focuses exclusively on **Projects** workflow.
