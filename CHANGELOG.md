# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Comprehensive AI Tools directory with 147 unique tools organized by category
- AI Tools page with interactive cards linking to external AI platforms
- Tech Stacks page with detailed comparisons and real-world examples
- Spec Kit page with comprehensive workflow documentation and agent instructions
- Settings page with dark mode toggle functionality
- Prompts page with collapsible prompt templates for development workflows
- Git Commands page with interactive command blocks
- Next.js Setup page with installation guides and configuration examples
- Sidebar navigation with breadcrumb support and active state indicators
- Collapsible components for organized content presentation
- Dark mode support throughout the application
- Comprehensive prompt framework documentation with COSTAR, POWER, Five S, and CRISPE templates
- Code scan prompt templates for systematic codebase analysis
- Latest updates research prompts for technology stack evaluation
- Idea logging prompt frameworks for systematic concept development
- Claude Code review prompt for enterprise-grade codebase analysis

### Changed

- Removed PageHeader components from AI Tools, Settings, and Tech Stacks pages for consistent layout
- Updated CollapsiblePrompt component to use design tokens instead of hardcoded colors
- Improved dark mode color palette consistency across all collapsible components
- Enhanced sidebar navigation with proper active state management

### Fixed

- Fixed JSX structure issues in Tech Stacks page after PageHeader removal
- Resolved build errors related to unterminated components

### Technical

- Implemented consistent design system using CSS custom properties
- Added proper TypeScript types for all components
- Used Tailwind CSS for responsive design
- Integrated Lucide React icons throughout the application
- Set up Next.js 15 with App Router architecture

## Project Structure

```
src/
├── app/(app)/
│   ├── ai-tools/           # AI tools directory and links
│   ├── dashboard/          # Main dashboard with navigation cards
│   ├── git-commands/       # Git command reference
│   ├── nextjs-setup/       # Next.js setup instructions
│   ├── prompts/            # Development prompt templates
│   ├── settings/           # Application settings
│   ├── spec-kit/           # Spec-Kit workflow documentation
│   ├── tech-stacks/        # Technology stack comparisons
│   └── layout.tsx          # Sidebar layout with navigation
├── components/
│   ├── collapsibles/       # Collapsible content components
│   ├── navigation/         # Navigation and breadcrumb components
│   ├── layout/             # Header and sidebar components
│   ├── cards/              # Card components for grid layouts
│   ├── buttons/            # Interactive button components
│   └── inputs/             # Command input components
└── docs/
    ├── ai-tools/           # AI tools documentation and links
    ├── prompts/            # Prompt framework templates and documentation
    │   ├── frameworks/     # Prompt framework examples and comparisons
    │   ├── code-scan-prompts.md    # Code analysis prompt templates
    │   ├── prompt-latest-updates.md # Technology research prompt templates
    │   └── prompt-idea-log.md      # Idea logging prompt frameworks
    └── tech-stacks/        # Technology stack documentation and guides
```

## Features

### Core Pages

1. **Dashboard** - Central navigation hub with cards for each section
2. **AI Tools** - Curated directory of 147 AI tools with external links
3. **Tech Stacks** - Comprehensive technology stack guides and comparisons
4. **Spec Kit** - Complete workflow documentation for specification-driven development
5. **Prompts** - Ready-to-use prompt templates for development tasks
6. **Git Commands** - Interactive git command reference
7. **Next.js Setup** - Step-by-step setup guides and configurations
8. **Settings** - Application preferences including dark mode toggle

### Key Components

- **Sidebar Navigation** - Collapsible sidebar with active state indicators
- **Breadcrumb Navigation** - Context-aware breadcrumbs for page hierarchy
- **Collapsible Containers** - Organized content sections with expand/collapse
- **Command Blocks** - Interactive command examples with copy functionality
- **Theme Support** - Full dark/light mode with system preference detection

---

_This changelog documents the current state of the sidebar application as a comprehensive developer toolkit and AI resources directory._
