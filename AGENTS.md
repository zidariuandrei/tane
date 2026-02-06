# AGENTS.md

## Project Context: Tane (種)

Tane is a digital garden and startup idea incubator. It allows users to "plant" ideas (Seeds), which are then "grown" (researched) by an autonomous AI agent into full reports.

## Architecture

- **Framework**: SvelteKit (Svelte 5)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 + Custom CSS Variables for theming.
  - **Rule**: Use Tailwind utility classes whenever possible.
  - **Exception**: Use custom CSS only for complex animations or specific "Herbarium" effects (like paper textures) defined in `DESIGN_SYSTEM.md`.

## Database: SQLite (via `bun:sqlite`)
- **Runtime**: Bun

## Design System: "Herbarium"

We follow a strict "Botanical Journal" aesthetic.
- **Theme**: Dark mode default ("Night Theme"), with high contrast but warm tones.
- **Typography**:
  - **Headings**: *Caveat* (Handwritten, organic)
  - **Body**: *Crimson Text* (Serif, academic/journal style)
- **Colors**:
  - Backgrounds: Dark paper (`#2a2520`), Warm dark (`#3d3630`)
  - Accents: Sage Fresh (`#87a878`), Sage Dried (`#6b7c5c`)
  - Text: Ink Light (`#e8e0d0`)
- **Visuals**: No generic UI. Use SVG icons (e.g., `PineSeed.svelte`), organic shapes, and paper textures.

## Agent Guidelines

### 0. Core Principles
*   **Keep It Simple**: Prefer simple, straightforward solutions over complex ones.
*   **Don't Repeat Yourself**: Avoid code duplication through proper abstraction.
*   **Testability**: Design components to be easily testable in isolation.
*   **Design**: Keep the same style if one is already stated. Do not add any styling that may break the design language.

### 1. Coding Standards (Svelte 5)
*   **Reactivity**: Use Runes exclusively (`$state`, `$derived`, `$effect`, `$props`).
*   **Events**: Use `onclick` props/attributes, NEVER `on:click`.
*   **Slots**: Use Snippets (`{#snippet}`, `{@render}`) instead of `<slot>`.
*   **Forms**: Use SvelteKit's `enhance` for progressive enhancement.

### 2. File Operations
*   **Paths**: Always use **RELATIVE** paths from the current working directory.
*   **Edits**: Prefer `edit` for surgical changes to avoid overwriting unrelated code. Use `write` only for new files or complete refactors.

### 3. Workflow
*   **MVP Plan**: Refer to `MVP_PLAN.md` for the current roadmap and feature set.
*   **Design**: Refer to `DESIGN_SYSTEM.md` for color tokens and utility classes.

### 4. Common Tasks
*   **New Components**: Create in `src/lib/components`. Ensure they accept `class` props for Tailwind merging.
*   **Database**: Schema changes go in `src/lib/server/db.ts`.

### 5. Quality Control
After writing or modifying code, ALWAYS perform these checks:
1.  **Format & Lint**: Run `biome check --apply .` (or specific files) to fix formatting and linting issues.
2.  **Type Check**: Run `bun run check` to verify TypeScript and Svelte types.
3.  **Verify**: Ensure no errors are reported before declaring the task complete.

## Skills & Tools
*   **Skills**: `svelte5-best-practices`, `frontend-design`.
*   **Tools**: Standard `pi` toolset (read, write, edit, bash).
