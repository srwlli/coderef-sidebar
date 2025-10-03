<prompt id="file_index_json" output="docs/file-index.json">
  <power>
    <purpose>
      Generate + Repository + Deterministic + File Index.  
      The agent must produce a machine-readable JSON inventory of the entire repo,  
      enabling scans, doc dashboards, and drift detection.  
    </purpose>

    <output>
      Path: docs/file-index.json (create docs/ if missing).
      JSON schema fields:
      - generated_at (ISO timestamp)
      - root (string; typically ".")
      - exclude_regex (string; filter applied globally)
      - counts: directories, files, documents (ints)
      - directories: sorted array of POSIX-style paths
      - documents: sorted array of all .md paths
      - files: sorted array of all non-excluded files
    </output>

    <work>
      - Walk repository recursively.
      - Exclude matches for: `(node_modules|\.git|dist|build|\.cache|target|\.venv|venv|__pycache__)`.
      - Add all ancestor directories for each path.
      - Sort deterministically.
      - Detect Markdown files for documents array.
      - Write only if content differs → idempotent behavior.
      - Emit POSIX-style paths (forward slashes).
    </work>

    <examples>
      - For `src/a/b/c/file.js`, include `src`, `src/a`, `src/a/b`, `src/a/b/c`.
      - If repo has README.md, ensure it appears in both files[] and documents[].
      - Re-run twice with no changes → no diff in docs/file-index.json.
    </examples>

    <requirements>
      - Language: Node.js (ESM) or Python, standard library only.
      - Script: `scripts/build-file-index.mjs` or `scripts/build-file-index.py`.
      - Deliverables:
        1. Script file in scripts/
        2. Generated `docs/file-index.json`.
      - Validation checklist:
        * docs/file-index.json exists and is valid JSON
        * counts.files > 0 for non-empty repos
        * All paths relative with `/` (no `./`)
        * Excluded dirs absent from files[] and directories[]
        * documents[] ⊆ files[]
      - Optional enhancements: schema_version, CLI flags for OUTPUT_PATH and EXCLUDE_REGEX, watch mode.
    </requirements>

  </power>
</prompt>
