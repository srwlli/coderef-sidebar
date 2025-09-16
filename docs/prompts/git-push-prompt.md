<purpose>Execute git workflow: status check, add changes, commit with changelog-based message, await push confirmation</purpose>

<output>
- Git status results showing current changes
- Staged changes confirmation after git add .
- Commit message based on changelog updates
- Commit summary and PAUSE for EXPLICIT user confirmation before push
</output>

<work>EXECUTE git commands: git status, git add ., git commit. Generate commit message from changelog. STOP and require explicit "yes" confirmation before git push.</work>

<examples>
"git commit -m 'feat: Add 5-stage AI analysis workflow - v1.2.0'"
"CONFIRMATION REQUIRED: Type 'yes' to execute git push origin main"
</examples>

<requirements>Execute git commands immediately, use conventional commit format, MANDATORY pause for explicit user "yes" before git push execution.</requirements>
