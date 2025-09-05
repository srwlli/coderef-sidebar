# Components

This document describes the React components used in this application.

## CollapsibleContainer

A general-purpose collapsible container. It has a `title`, an optional `icon` and `description`. The icon, which can be a `lucide-react` icon or any other React node, is displayed inline with the title. The main content (`children`) is shown or hidden by clicking the header. It can be expanded by default.

- **File:** `src/components/CollapsibleContainer/CollapsibleContainer.tsx`
- **Props:** `title`, `icon`, `description`, `children`, `defaultExpanded`, `className`

## CollapsiblePrompt

Designed to display a prompt for a user to copy. It features a `title` and `description`, and the `content` of the prompt is revealed when expanded. It includes a `CopyButton` and can display a list of `docs` (documentation links).

- **File:** `src/components/CollapsiblePrompt/CollapsiblePrompt.tsx`
- **Props:** `title`, `description`, `content`, `docs`

## CommandBlock

Displays a single, non-collapsible shell `command`. It includes a `CopyButton` to copy the command and can show related `docs`.

- **File:** `src/components/CommandBlock/CommandBlock.tsx`
- **Props:** `title`, `command`, `docs`, `onCopy`, `className`

## CopyButton

A button to copy text to the clipboard. It provides visual feedback, changing its text to "Copying..." during the copy process and "Copied!" after a successful copy. It also coordinates with other copy buttons to indicate which one was clicked last.

- **File:** `src/components/CopyButton/CopyButton.tsx`
- **Props:** `content`, `onCopy`, `variant`, `className`

## InputCopyButton

Creates a command string dynamically. It takes a `baseCommand` with a placeholder (`{{input}}`) and an input field for the user to provide a value. The final command is displayed and can be copied with a `CopyButton`.

- **File:** `src/components/InputCopyButton/InputCopyButton.tsx`
- **Props:** `title`, `baseCommand`, `placeholder`, `defaultValue`, `docs`, `inputLabel`, `className`
