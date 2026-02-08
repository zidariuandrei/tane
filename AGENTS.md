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
*   **Environment**: Do NOT read `.env` files directly.
    *   **Backend (SvelteKit)**: Use `$env/static/private` (e.g., `import { API_KEY } from '$env/static/private'`).
    *   **Runtime Scripts (Bun)**: Use `process.env`.
    *   **Reference**: You may read `.env.example` to check available variable names.

### 3. Workflow
*   **MVP Plan**: Refer to `MVP_PLAN.md` for the current roadmap and feature set.
*   **Design**: Refer to `DESIGN_SYSTEM.md` for color tokens and utility classes.

### 4. Common Tasks
*   **New Components**: Create in `src/lib/components`. Ensure they accept `class` props for Tailwind merging.
*   **Database**: Schema changes go in `src/lib/server/db.ts`.

### 6. Testing Strategy
*   **Philosophy**: **Value-Driven Testing**.
    *   **Goal**: Tests should be a safety net for refactoring, not a burden.
    *   **Integration First**: Prefer Service/Integration tests for orchestration logic (e.g., "Does planting a seed result in a report?"). This ensures the *feature* works regardless of internal code structure.
    *   **Unit Tests**: Use selectively for complex, isolated logic (e.g., data parsers, intricate UI state). Do *not* unit test simple glue code or orchestration where mocks would be larger than the code itself.
    *   **Robustness**:
        *   Test **Business Logic** (outcomes), not implementation details.
        *   Avoid over-mocking internal private methods.
        *   Focus on Happy Path + Critical Failures (e.g., DB down). Avoid exhaustive edge-case testing for the MVP unless critical.
*   **Tooling**: `bun:test`.

## Skills & Tools
*   **Skills**: `svelte5-best-practices`, `frontend-design`.
*   **Tools**: Standard `pi` toolset (read, write, edit, bash).
