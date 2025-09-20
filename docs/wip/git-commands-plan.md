# Plan: Add Comprehensive Git Branch Commands

## Current State

- Git Commands page exists at `/git-commands`
- Only has `git branch -M main` in Git Init Workflow
- Missing comprehensive branch management commands

## Proposed Addition: Git Branch Management Section

### New Collapsible Container: "Git Branch Management"

Add between "Basic Git Commands" and "Vercel Deployment Workflow" sections

### Commands to Include:

#### Branch Creation & Navigation:

- `git branch` - List all branches
- `git branch <branch-name>` - Create new branch (InputCommandBlock)
- `git checkout -b <branch-name>` - Create and switch (InputCommandBlock)
- `git switch -c <branch-name>` - Modern create and switch (InputCommandBlock)
- `git checkout <branch-name>` - Switch to branch (InputCommandBlock)
- `git switch <branch-name>` - Modern switch (InputCommandBlock)

#### Branch Information:

- `git branch -a` - List all branches (local + remote)
- `git branch -v` - Show last commit on each branch
- `git branch -r` - List remote branches only

#### Branch Cleanup:

- `git branch -d <branch-name>` - Delete branch safely (InputCommandBlock)
- `git branch -D <branch-name>` - Force delete branch (InputCommandBlock)
- `git push origin --delete <branch-name>` - Delete remote branch (InputCommandBlock)

#### Branch Synchronization:

- `git fetch origin` - Fetch remote branches
- `git push origin <branch-name>` - Push branch to remote (InputCommandBlock)
- `git pull origin <branch-name>` - Pull specific branch (InputCommandBlock)

### Implementation:

1. Add new SimpleCollapsibleContainer with GitBranch icon
2. Mix of SimpleCommandBlock and InputCommandBlock components
3. Organize commands logically by workflow
4. Position between existing sections for logical flow

### Benefits:

- Complete branch workflow coverage
- Educational value for git branch operations
- Consistent with existing command page structure
- Interactive placeholders for branch names

## Missing Essential Git Branch Commands:

### Branch Management:

- `git branch` - List all branches
- `git branch <branch-name>` - Create new branch
- `git branch -d <branch-name>` - Delete branch (safe)
- `git branch -D <branch-name>` - Force delete branch
- `git branch -m <old-name> <new-name>` - Rename branch

### Branch Navigation:

- `git checkout <branch-name>` - Switch to branch
- `git checkout -b <branch-name>` - Create and switch to new branch
- `git switch <branch-name>` - Modern way to switch branches
- `git switch -c <branch-name>` - Create and switch (modern)

### Branch Information:

- `git branch -r` - List remote branches
- `git branch -a` - List all branches (local + remote)
- `git branch -v` - Show last commit on each branch
- `git branch --merged` - Show merged branches
- `git branch --no-merged` - Show unmerged branches

### Remote Branch Operations:

- `git push origin <branch-name>` - Push branch to remote
- `git push origin --delete <branch-name>` - Delete remote branch
- `git fetch origin` - Fetch remote branches
- `git pull origin <branch-name>` - Pull specific branch
