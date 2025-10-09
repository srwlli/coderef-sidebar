# Custom Dashboard Cards - Phase 2 Features

All planned enhancements for custom dashboard cards beyond MVP.

---

## ⭐ Priority Features

### 1. Supabase Storage Migration - READY TO IMPLEMENT

- **Benefit:** Multi-device sync, cloud backup, no storage limits
- **Effort:** 20 minutes
- **Status:** ✅ Supabase already configured
- **Approach:** JSON file per user in Supabase Storage bucket
- **Details:** See `user-custom-card.json` → `migrationPath.toSupabase`

---

## 🎨 Customization Features

### 2. Drag and Drop Reordering

- **Benefit:** User controls exact card order on dashboard
- **Effort:** Medium
- **Implementation:** Use dnd-kit library, add order field to CustomCard type
- **UX:** Drag cards to reorder, persist order in localStorage/Supabase

### 3. Icon Search and Full Icon Library

- **Benefit:** Access all 1000+ lucide-react icons with search
- **Effort:** Medium
- **Implementation:** Add search filter, virtualization for performance
- **Current:** 50 curated icons → Expand to 1000+

### 4. Icon Color Customization

- **Benefit:** Visual personalization with custom icon colors
- **Effort:** Low
- **Implementation:** Add color picker, store hex value in card data
- **Example:** Red GitHub icon, blue Figma icon, etc.

### 5. Description Field

- **Benefit:** Add optional description to cards
- **Effort:** Low
- **Implementation:** Add field to type, form, and display logic
- **Display:** Show in ActionModal or as tooltip on hover

---

## 🔧 Advanced Features

### 6. Export/Import Card Collections

- **Benefit:** Backup and share card configurations as JSON
- **Effort:** Low (+20 min)
- **Implementation:** JSON export/import via download/upload buttons
- **Use Case:** Backup before reset, share with colleagues

### 7. Edit/Hide/Delete Default Cards

- **Benefit:** Complete dashboard customization
- **Effort:** Medium
- **Implementation:** Convert default cards to stored cards with isDefault flag
- **Features:**
  - Hide default cards you don't use
  - Edit default card titles/URLs
  - Delete default cards
  - Reset to defaults button

### 8. Card Categories/Folders

- **Benefit:** Organize many custom cards into groups
- **Effort:** High
- **Implementation:** New UI paradigm, state management
- **Example:** "AI Tools" folder, "Dev Tools" folder
- **UX:** Collapsible sections, filter by category

### 9. Fetch Favicon/OpenGraph Data

- **Benefit:** Auto-populate icon and title from URL
- **Effort:** Medium
- **Implementation:** API call to fetch metadata, handle CORS, fallbacks
- **UX:** Paste URL → auto-detect icon and title
- **Example:** Paste `https://github.com` → suggests GitHub icon + "GitHub" title

---

## 🚀 Full User Management

### 10. Complete Default Card Management

- **Benefit:** User can modify, hide, or reset all dashboard cards
- **Effort:** 3-4 hours (major refactor)
- **Implementation:**
  - Convert hardcoded default cards to database/storage
  - Add `isDefault: boolean` flag
  - User overrides stored separately
  - Reset to defaults feature
- **Vision:** Fully customizable dashboard where nothing is hardcoded

---

## 📊 Feature Priority Matrix

| Feature                        | Effort | Impact | Priority |
| ------------------------------ | ------ | ------ | -------- |
| Supabase Storage Migration     | Low    | High   | ⭐⭐⭐   |
| Export/Import                  | Low    | Medium | ⭐⭐⭐   |
| Description Field              | Low    | Low    | ⭐⭐     |
| Icon Color Customization       | Low    | Medium | ⭐⭐     |
| Drag and Drop Reordering       | Medium | High   | ⭐⭐⭐   |
| Icon Search (Full Library)     | Medium | Medium | ⭐⭐     |
| Edit/Hide/Delete Default Cards | Medium | High   | ⭐⭐⭐   |
| Fetch Favicon/OG Data          | Medium | High   | ⭐⭐⭐   |
| Card Categories/Folders        | High   | Medium | ⭐       |
| Full User Management           | High   | High   | ⭐⭐     |

---

## 🎯 Recommended Implementation Order

1. **Supabase Storage Migration** (20 min) - Unlocks multi-device sync
2. **Export/Import** (20 min) - Quick win, useful for backup
3. **Drag and Drop Reordering** (1-2 hours) - High user value
4. **Fetch Favicon/OG Data** (1-2 hours) - Reduces manual work
5. **Edit/Hide/Delete Default Cards** (2-3 hours) - Complete customization
6. **Icon Search (Full Library)** (1-2 hours) - More icon choices
7. **Description Field** (30 min) - Nice-to-have metadata
8. **Icon Color Customization** (45 min) - Visual enhancement
9. **Card Categories/Folders** (3-4 hours) - For power users with many cards
10. **Full User Management** (3-4 hours) - Complete refactor

---

## 💡 Feature Requests

Add new feature ideas here as they come up.

### Template

- **Feature Name:**
- **Benefit:**
- **Effort:**
- **Implementation Notes:**
- **Requested By:**
- **Date:**
