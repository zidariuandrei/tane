# Herbarium UI Design System (v2.0)

## Overview
The "Herbarium" system is a **Semantic Theming Engine**. instead of enforcing a single visual style, it enforces a single *language* of interaction (Seed -> Sapling -> Tree), while allowing the visual presentation to shift based on the "Station" (App Context).

## The "Stations" Strategy
We do not enforce rigid visual consistency across apps. Instead, we match the aesthetic to the cognitive mode of the user.

| App | Cognitive Mode | Recommended Theme | Vibe |
|-----|----------------|-------------------|------|
| **Tane** | Ideation / Dreaming | `Everforest` | Organic, Paper, Handwritten, Soft |
| **Zu** | Architecture / Planning | `Gruvbox` | Retro-Computing, Monospace, High Contrast, Technical |
| **Factory** | Execution / Monitoring | `Minimalist` | Clean, Sans-Serif, Industrial, Dashboard |

---

## Shared Semantic Tokens
All apps must implement these CSS variables. The *values* change per theme, but the *names* are constant.

### 1. Paper (Backgrounds)
| Token | Role |
|-------|------|
| `--paper-dark` | Main application background |
| `--paper-warm-dark` | Card / Surface background (slightly lighter/warmer) |
| `--paper-shadow` | Borders, shadows, or separation lines |

### 2. Ink (Content)
| Token | Role |
|-------|------|
| `--ink-light` | Primary text color |
| `--ink-dim` | Secondary / Metadata text (opacity 0.7) |

### 3. Botanical Lifecycle (Status)
The core metaphor of the ecosystem.
| Token | State | Color Role |
|-------|-------|------------|
| `--planted` | `Queued` | Sand / Yellow / Earth (Waiting in soil) |
| `--sprouting` | `Active` | Fresh Green / Bright (New growth) |
| `--growing` | `Processing` | Deep Teal / Aqua (Complex structure) |
| `--tree` | `Done` | Wood Brown / Orange (Solid, permanent) |
| `--terracotta` | `Error` | Red / Clay (Broken pot) |

---

## Typography System
We use functional aliases so fonts can be swapped hot.

```css
.font-heading { font-family: var(--font-primary-heading); }
.font-body    { font-family: var(--font-primary-body); }
```

### Font Pairings by Theme
*   **Everforest**: *Caveat* (Handwritten) + *Crimson Text* (Serif)
*   **Gruvbox**: *Space Mono* (Code) + *Merriweather* (Serif)
*   **Minimalist**: *Roboto* (Neutral) + *Roboto* (Neutral)

---

## Component Guidelines

### 1. The Card (`.paper-card`)
The fundamental unit of data (a Seed, a Blueprint, a Task).
*   **Structure**: Container with `--paper-warm-dark` background.
*   **Interaction**: Hover lift effect (`scale-[1.01]`).
*   **Border**: Optional usage of `--paper-shadow` for separation.

### 2. The Button
*   **Primary**: Solid background using Lifecycle colors (e.g., "Plant" button uses `--sprouting`).
*   **Secondary**: Outline or Ghost using `--ink-light`.

---

## Implementation (Tailwind v4)
This system is implemented via CSS Variables in `@theme` blocks.

```css
@theme {
  /* Default Defaults (Everforest) */
  --font-caveat: "Caveat", cursive;
  --font-crimson: "Crimson Text", serif;
}

@layer base {
  /* Theme: Everforest */
  [data-theme="everforest"] {
    --color-paper-dark: #2d353b;
    --color-sage-fresh: #a7c080;
  }
  
  /* Theme: Gruvbox */
  [data-theme="gruvbox"] {
    --color-paper-dark: #282828;
    --color-sage-fresh: #b8bb26;
  }
}
```

## Icons
*   **Tane**: Organic SVGs (Leaves, Seeds) or Handwritten-style icons.
*   **Zu**: Technical Icons (Lucide-svelte), sharp edges.
*   **Factory**: Status Indicators (Dots, Spinners), compact.

---

**Version**: 2.0
**Updated**: 2026-02-07
**Status**: Live in `src/app.css`
