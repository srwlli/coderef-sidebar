📋 Complete Tool & Call Reference

🔧 MCP Tools (Defined in docs-mcp/server.py)

1. list_templates

- Purpose: List all available POWER framework templates
- Required params: None
- Optional params: None
- Returns: List of templates (readme, architecture, api, components, schema, user-guide)

2. get_template

- Purpose: Retrieve content of a specific template
- Required params: template_name
- Optional params: None
- template_name options: "readme", "architecture", "api", "components", "schema", "user-guide"

3. generate_foundation_docs

- Purpose: Generate all 6 foundation documents
- Required params: project_path
- Optional params: None
- Returns: Templates + generation plan

4. generate_individual_doc

- Purpose: Generate a single document
- Required params: project_path, template_name
- Optional params: None

5. get_changelog 📖 READ

- Purpose: Query changelog history
- Required params: project_path
- Optional params:
  - version (string): Specific version (e.g., "1.0.2")
  - change_type (enum): "bugfix", "enhancement", "feature", "breaking_change", "deprecation", "security"
  - breaking_only (boolean): Only show breaking changes

6. add_changelog_entry ✍️ WRITE

- Purpose: Add new changelog entry
- Required params:
  - project_path (string)
  - version (string, pattern: ^[0-9]+\.[0-9]+\.[0-9]+$)
  - change_type (enum): "bugfix", "enhancement", "feature", "breaking_change", "deprecation", "security"
  - severity (enum): "critical", "major", "minor", "patch"
  - title (string)
  - description (string)
  - files (array of strings)
  - reason (string)
  - impact (string)
- Optional params:
  - breaking (boolean, default: false)
  - migration (string)
  - summary (string)
  - contributors (array of strings)

7. update_changelog 🤖 INSTRUCT (NEW!)

- Purpose: Agentic workflow - guides agent to self-document
- Required params:
  - project_path (string)
  - version (string, pattern: ^[0-9]+\.[0-9]+\.[0-9]+$)
- Optional params: None
- Returns: 3-step instructions for agent

---

🎯 MCP Tools I Can Call (Currently Available)

From hello-mcp:

- mcp**hello-mcp**read_document - Read hello-world.txt

From docs-mcp:

- mcp**docs-mcp**list_templates
- mcp**docs-mcp**get_template
- mcp**docs-mcp**generate_foundation_docs
- mcp**docs-mcp**generate_individual_doc
- mcp**docs-mcp**get_changelog
- mcp**docs-mcp**add_changelog_entry
- ⚠️ mcp**docs-mcp**update_changelog - NOT AVAILABLE YET (needs MCP server restart)

From ide:

- mcp**ide**getDiagnostics - Get language diagnostics
- mcp**ide**executeCode - Execute Python code in Jupyter kernel

---

🛠️ Standard Claude Code Tools (Always Available)

1. Task - Launch specialized agents
2. Bash - Execute shell commands
3. Glob - Fast file pattern matching
4. Grep - Search file contents (ripgrep)
5. Read - Read files
6. Edit - Edit files (exact string replacement)
7. Write - Write/create files
8. NotebookEdit - Edit Jupyter notebooks
9. WebFetch - Fetch web content
10. WebSearch - Search the web
11. TodoWrite - Manage task lists
12. SlashCommand - Execute custom slash commands
13. BashOutput - Get output from background shells
14. KillShell - Kill background shells

---

📊 Summary by Category

| Category                 | Tools   | Purpose                                         |
| ------------------------ | ------- | ----------------------------------------------- |
| Documentation Generation | 4 tools | Template listing, retrieval, and doc generation |
| Changelog Management     | 3 tools | Read, write, and instruct (agentic workflow)    |
| File Operations          | 5 tools | Read, Write, Edit, Glob, Grep                   |
| Execution                | 2 tools | Bash, Task (agents)                             |
| Web                      | 2 tools | WebFetch, WebSearch                             |
| Development              | 3 tools | IDE diagnostics, code execution, notebooks      |
| Utilities                | 3 tools | TodoWrite, SlashCommand, shell management       |

Total: 22 tools (7 MCP docs-mcp + 15 standard Claude Code)

---

# docs-mcp Quick Reference

> Complete tool and call reference for the docs-mcp MCP server

**Last Updated**: 2025-10-09
**Version**: 1.0.3

---

## Table of Contents

- [MCP Tools (docs-mcp)](#mcp-tools-docs-mcp)
- [MCP Tools I Can Call](#mcp-tools-i-can-call)
- [Standard Claude Code Tools](#standard-claude-code-tools)
- [Summary by Category](#summary-by-category)

---

## MCP Tools (docs-mcp)

### 1. list_templates

**Purpose**: List all available POWER framework templates

**Required params**: None
**Optional params**: None
**Returns**: List of templates (readme, architecture, api, components, schema, user-guide)

**Example**:

```
list_templates()
```

---

### 2. get_template

**Purpose**: Retrieve content of a specific template

**Required params**:

- `template_name` (enum): `"readme"`, `"architecture"`, `"api"`, `"components"`, `"schema"`, `"user-guide"`

**Optional params**: None

**Example**:

```
get_template(template_name="readme")
```

---

### 3. generate_foundation_docs

**Purpose**: Generate all 6 foundation documents

**Required params**:

- `project_path` (string): Absolute path to project directory

**Optional params**: None
**Returns**: Templates + generation plan

**Example**:

```
generate_foundation_docs(project_path="C:/path/to/project")
```

---

### 4. generate_individual_doc

**Purpose**: Generate a single document

**Required params**:

- `project_path` (string): Absolute path to project directory
- `template_name` (enum): `"readme"`, `"architecture"`, `"api"`, `"components"`, `"schema"`, `"user-guide"`

**Optional params**: None

**Example**:

```
generate_individual_doc(
    project_path="C:/path/to/project",
    template_name="api"
)
```

---

### 5. get_changelog 📖 READ

**Purpose**: Query changelog history

**Required params**:

- `project_path` (string): Absolute path to project directory

**Optional params**:

- `version` (string): Specific version (e.g., "1.0.2")
- `change_type` (enum): `"bugfix"`, `"enhancement"`, `"feature"`, `"breaking_change"`, `"deprecation"`, `"security"`
- `breaking_only` (boolean): Only show breaking changes

**Examples**:

```
# Get full changelog
get_changelog(project_path="C:/path/to/project")

# Get specific version
get_changelog(
    project_path="C:/path/to/project",
    version="1.0.2"
)

# Get all breaking changes
get_changelog(
    project_path="C:/path/to/project",
    breaking_only=true
)

# Filter by type
get_changelog(
    project_path="C:/path/to/project",
    change_type="feature"
)
```

---

### 6. add_changelog_entry ✍️ WRITE

**Purpose**: Add new changelog entry

**Required params**:

- `project_path` (string): Absolute path to project directory
- `version` (string): Version number (pattern: `^[0-9]+\.[0-9]+\.[0-9]+$`)
- `change_type` (enum): `"bugfix"`, `"enhancement"`, `"feature"`, `"breaking_change"`, `"deprecation"`, `"security"`
- `severity` (enum): `"critical"`, `"major"`, `"minor"`, `"patch"`
- `title` (string): Short title of the change
- `description` (string): Detailed description of what changed
- `files` (array): List of affected files
- `reason` (string): Why this change was made
- `impact` (string): Impact on users/system

**Optional params**:

- `breaking` (boolean): Whether this is a breaking change (default: false)
- `migration` (string): Migration guide (if breaking)
- `summary` (string): Version summary (for new versions)
- `contributors` (array): List of contributors

**Example**:

```
add_changelog_entry(
    project_path="C:/path/to/project",
    version="1.0.3",
    change_type="feature",
    severity="major",
    title="Added new feature X",
    description="Implemented feature X with capabilities Y and Z...",
    files=["server.py", "lib/feature.py"],
    reason="Users requested ability to...",
    impact="Users can now...",
    breaking=false,
    contributors=["willh", "Claude Code AI"]
)
```

---

### 7. update_changelog 🤖 INSTRUCT (NEW in v1.0.3)

**Purpose**: Agentic workflow - guides agent to self-document changes

**Required params**:

- `project_path` (string): Absolute path to project directory
- `version` (string): Version number (pattern: `^[0-9]+\.[0-9]+\.[0-9]+$`)

**Optional params**: None
**Returns**: 3-step instructions for agent

**How it works**:

1. Agent calls `update_changelog(project_path, version)`
2. Tool returns structured instructions:
   - **STEP 1**: Analyze your changes
   - **STEP 2**: Determine change type & severity
   - **STEP 3**: Call add_changelog_entry
3. Agent autonomously analyzes context
4. Agent executes `add_changelog_entry(...)`
5. Changelog updated!

**Example**:

```
update_changelog(
    project_path="C:/path/to/project",
    version="1.0.3"
)
```

**Design Pattern**: This is a **meta-tool** that orchestrates agentic workflows by providing instructions rather than executing directly.

---

## MCP Tools I Can Call

### From hello-mcp

- `mcp__hello-mcp__read_document` - Read hello-world.txt

### From docs-mcp

- `mcp__docs-mcp__list_templates`
- `mcp__docs-mcp__get_template`
- `mcp__docs-mcp__generate_foundation_docs`
- `mcp__docs-mcp__generate_individual_doc`
- `mcp__docs-mcp__get_changelog`
- `mcp__docs-mcp__add_changelog_entry`
- `mcp__docs-mcp__update_changelog` ⚠️ (requires MCP server restart to be available)

### From ide

- `mcp__ide__getDiagnostics` - Get language diagnostics from VS Code
- `mcp__ide__executeCode` - Execute Python code in Jupyter kernel

---

## Standard Claude Code Tools

### File Operations

1. **Read** - Read files from filesystem
2. **Write** - Write/create files
3. **Edit** - Edit files (exact string replacement)
4. **Glob** - Fast file pattern matching
5. **Grep** - Search file contents (ripgrep-based)

### Execution & Development

6. **Bash** - Execute shell commands
7. **Task** - Launch specialized agents for complex tasks
8. **NotebookEdit** - Edit Jupyter notebook cells
9. **BashOutput** - Get output from background shells
10. **KillShell** - Kill background shell processes

### Web & Research

11. **WebFetch** - Fetch and process web content
12. **WebSearch** - Search the web

### Utilities

13. **TodoWrite** - Manage task lists
14. **SlashCommand** - Execute custom slash commands

---

## Summary by Category

| Category                     | Tool Count | Tools                                                                           |
| ---------------------------- | ---------- | ------------------------------------------------------------------------------- |
| **Documentation Generation** | 4          | list_templates, get_template, generate_foundation_docs, generate_individual_doc |
| **Changelog Management**     | 3          | get_changelog (read), add_changelog_entry (write), update_changelog (instruct)  |
| **File Operations**          | 5          | Read, Write, Edit, Glob, Grep                                                   |
| **Execution**                | 4          | Bash, Task, NotebookEdit, executeCode                                           |
| **Web**                      | 2          | WebFetch, WebSearch                                                             |
| **Development**              | 2          | getDiagnostics, BashOutput/KillShell                                            |
| **Utilities**                | 2          | TodoWrite, SlashCommand                                                         |

**Total Tools**: 22 (7 MCP docs-mcp + 3 MCP other + 12 standard Claude Code)

---

## Change Types Reference

| Type              | When to Use                     | Example                      |
| ----------------- | ------------------------------- | ---------------------------- |
| `bugfix`          | Fixed a bug or error            | "Fixed crash when..."        |
| `enhancement`     | Improved existing functionality | "Improved performance of..." |
| `feature`         | Added new functionality         | "Added support for..."       |
| `breaking_change` | Incompatible API changes        | "Changed API signature..."   |
| `deprecation`     | Marked features for removal     | "Deprecated X in favor of Y" |
| `security`        | Security patches                | "Patched vulnerability..."   |

---

## Severity Levels Reference

| Severity   | Impact                        | Example                     |
| ---------- | ----------------------------- | --------------------------- |
| `critical` | System broken, data loss risk | "Fixed data corruption bug" |
| `major`    | Significant feature impact    | "Added new MCP tool"        |
| `minor`    | Small improvements            | "Improved error messages"   |
| `patch`    | Cosmetic, docs-only           | "Fixed typo in template"    |

---

## Agentic Workflow Pattern

The **update_changelog** tool demonstrates the **meta-tool pattern**:

```
┌─────────────────────────────────────────────────────────┐
│ Agent makes changes to project                          │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ Agent: update_changelog(project_path, version)          │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ Tool: Returns structured 3-step instructions            │
│   • Step 1: Analyze your changes                        │
│   • Step 2: Determine type/severity                     │
│   • Step 3: Call add_changelog_entry                    │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ Agent: Analyzes context autonomously                    │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ Agent: add_changelog_entry(...contextual details...)    │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ Changelog updated! ✅                                    │
└─────────────────────────────────────────────────────────┘
```

**Key Innovation**: The tool **instructs** rather than **executes**, enabling autonomous agent self-documentation.

---

## Related Files

- **server.py** - MCP server implementation (7 tools defined)
- **generators/** - Generator classes for docs and changelog
- **templates/power/** - POWER framework templates
- **coderef/changelog/CHANGELOG.json** - Project changelog
- **coderef/changelog/schema.json** - Changelog JSON schema
- **user-guide.md** - Complete user guide with best practices

---

**Generated by**: Claude Code AI
**Maintained by**: willh, Claude Code AI
