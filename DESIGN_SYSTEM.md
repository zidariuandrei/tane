# Herbarium UI Design System

## Overview
Botanical journal-inspired UI for Tane (種) - Idea Incubator.

## Design Philosophy
- **Style**: Herbarium / Botanical Journal / Pressed Plants
- **Feel**: Scientific observation meets artistic sketching

---

## Typography

### Font Pairing (2 fonts only)
| Font | Role | Usage |
|------|------|-------|
| **Caveat** (Google Fonts) | Handwritten/Organic | Buttons, titles, labels, status badges |
| **Crimson Text** (Google Fonts) | Serif | Body text, research content, timestamps |

### Font Weights
- Caveat: 400, 500, 700
- Crimson Text: 400, 600

### CDN Setup
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;700&family=Crimson+Text:wght@400;600&display=swap" rel="stylesheet">
```

---

## Color Palette

### Paper (Light Mode)
```css
--paper-cream: #f5f1e8;      /* Main background */
--paper-warm: #e8e0d0;       /* Card backgrounds */
--paper-shadow: #d4cec0;     /* Shadows, borders */
--ink-dark: #3d3630;         /* Primary text */
--ink-light: #e8e0d0;        /* Text on dark */
```

### Paper (Dark Mode)
```css
--paper-dark: #2a2520;       /* Main background */
--paper-warm-dark: #3d3630;  /* Card backgrounds */
--ink-light: #e8e0d0;        /* Primary text */
--ink-dark: #3d3630;         /* Text on light (rare) */
```

### Botanical Colors
```css
--sage-fresh: #87a878;       /* Primary accent - living green */
--sage-dried: #6b7c5c;       /* Secondary - pressed green */
--moss-deep: #4a5d3f;        /* Dark green - mature plants */
--mint-light: #b8d4c0;       /* Light highlights */
```

### Earth Tones
```css
--sepia-light: #c9a87c;      /* Planted state - seed in soil */
--sepia-dark: #8b7355;       /* Borders, aged elements */
--bark-brown: #5d4e37;       /* Tree state - mature */
--terracotta: #a67b5b;       /* Warm accents */
```

### Seed State Colors
```css
/* Status strips on cards */
--planted: var(--sepia-light);     /* Sand/tan - seed in soil */
--sprouting: var(--sage-fresh);    /* Light green - new growth */
--growing: var(--moss-deep);        /* Deep green - established */
--tree: var(--bark-brown);          /* Brown - mature */
```

---

## CSS Effects (Image-Free)

### 1. Paper Texture
```css
.paper-texture {
  background-color: var(--paper-cream);
  position: relative;
}

.paper-texture::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  pointer-events: none;
}
```

### 2. Paper Shadow (Lifted Effect)
```css
.paper-shadow {
  box-shadow: 
    0 1px 1px rgba(0,0,0,0.05),
    0 2px 2px rgba(0,0,0,0.05),
    0 4px 4px rgba(0,0,0,0.05),
    0 8px 8px rgba(0,0,0,0.05);
}
```

### 3. Tape Corners
```css
.tape-corner {
  position: relative;
}

.tape-corner::before {
  content: '';
  position: absolute;
  top: -8px;
  left: -8px;
  width: 40px;
  height: 15px;
  background: rgba(201, 168, 124, 0.4);
  border: 1px solid rgba(139, 115, 85, 0.2);
  transform: rotate(-45deg);
}
```

---

## Component Specifications

### SeedCard (Specimen Card)
- **Structure**: Paper card with lifted shadow
- **Corners**: Organic rounding (12px border-radius)
- **Status Strip**: 4px colored bar on left edge (planted=sand, sprouting=green, etc.)
- **Tape**: Decorative tape corners (top-left, bottom-right)
- **Typography**:
  - Title: Caveat, 700 weight, 24px
  - Content: Crimson Text, 400 weight, 16px
  - Metadata: Crimson Text, 400 weight, 14px
- **Animations**: Basic fade-in on mount (300ms ease-out)

### ResearchButton
- **Shape**: Organic pill (border-radius: 9999px)
- **Font**: Caveat, 500 weight, 16px
- **Colors**:
  - Idle: Background transparent, border 1px sage
  - Hover: Background sage-fresh, text white
  - Active: Background sage-dried
  - Loading: Background sepia-light, cursor wait
- **Padding**: 8px 20px

### ResearchCard (Journal Entry)
- **Structure**: Paper card, slightly larger than SeedCard
- **Typography**:
  - Headings: Caveat, 700 weight, 20px
  - Body: Crimson Text, 400 weight, 16px
- **Sections**: Hand-drawn divider lines between sections
- **Expand**: Smooth height transition (400ms ease-in-out)

### Page Layout
- **Background**: Paper texture (cream in light, dark in dark mode)
- **Cards Grid**: 1 column on mobile, 2 columns on desktop
- **Spacing**: 24px between cards
- **Container**: max-width 1200px, centered

---

## Utility Classes Reference

### Typography
```css
.handwritten { font-family: 'Caveat', cursive; }
.serif { font-family: 'Crimson Text', serif; }
```

### Paper Effects
```css
.paper-card          /* Card with texture + shadow */
.paper-texture       /* Background texture only */
.paper-shadow        /* Multi-layer shadow */
.tape-corner         /* Tape on corners */
.tape-corner-tl      /* Tape top-left only */
.tape-corner-br      /* Tape bottom-right only */
```

### Seed States
```css
/* Borders (left strip) */
.border-planted, .border-sprouting, .border-growing, .border-tree

/* Backgrounds */
.bg-planted, .bg-sprouting, .bg-growing, .bg-tree

/* Text colors */
.text-planted, .text-sprouting, .text-growing, .text-tree
```

### Layout
```css
.specimen-card       /* Full seed card styling */
.journal-entry       /* Research card styling */
.status-strip        /* Left edge color strip */
```

---

## Dark Mode

### Strategy
- Use `prefers-color-scheme` media query
- Swap paper colors (cream ↔ dark)
- Keep botanical greens but reduce saturation slightly
- Warm highlights for interactive elements

### CSS Implementation
```css
@media (prefers-color-scheme: dark) {
  :root {
    --paper-cream: #2a2520;
    --paper-warm: #3d3630;
    --ink-dark: #e8e0d0;
    /* Muted botanical colors */
    --sage-fresh: #6b8e5c;
  }
}
```

---

### Current Solid Components
All UI components are solid (opaque backgrounds) for now:
- Easier to develop and test
- Clear visual hierarchy
- Can be adapted later

---

## Implementation Checklist

### Phase 1: Setup
- [ ] Add Google Fonts to `app.html`
- [ ] Rewrite `app.css` with theme system
- [ ] Create utility classes

### Phase 2: Components
- [ ] Refactor `SeedCard.svelte`
- [ ] Refactor `ResearchButton.svelte`
- [ ] Refactor `ResearchCard.svelte`
- [ ] Refactor `+page.svelte` layout

### Phase 3: Polish
- [ ] Test light mode
- [ ] Test dark mode
- [ ] Verify all checks pass (types, format, lint)
- [ ] Test on different screen sizes

---

## Questions & Decisions Log

1. **Font Loading**: Google Fonts CDN ✓
2. **Border Radius**: Organic feel (12px) ✓
3. **Status Strip**: Yes, on left edge ✓
4. **Button Shape**: Organic pills (fully rounded) ✓
5. **Animations**: Basic fade for now ✓
6. **Color Strip**: 4px left border ✓
7. **Icons**: Keep emoji for now ✓

---

## Files Modified

| File | Changes |
|------|---------|
| `src/app.html` | Add Google Fonts CDN |
| `src/app.css` | Complete theme system rewrite |
| `src/routes/+page.svelte` | Herbarium layout |
| `src/lib/components/SeedCard.svelte` | Full redesign |
| `src/lib/components/ResearchButton.svelte` | Style updates |
| `src/lib/components/ResearchCard.svelte` | Journal style |

---

## Notes

- **CSS-only**: No image files for textures
- **CDN Fonts**: Easy to swap later if needed
- **2 Fonts Only**: Caveat + Crimson Text
- **Dark Mode**: Uses system preference
- **Herbarium Vibe**: Botanical journal, pressed plants, field notes

---

**Created**: 2026-02-01
**Status**: Ready for implementation
