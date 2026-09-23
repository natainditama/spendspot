---
version: alpha
name: SpendSpot shadcn iOS Design System
description: Modern iOS Human Interface Guidelines design system for SpendSpot smart location expense and commute tracker with AI, built on shadcn ui tokens, Tailwind CSS values, and Tamagui UI components.
colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.145 0 0)"
  card: "oklch(1 0 0)"
  card-foreground: "oklch(0.145 0 0)"
  popover: "oklch(1 0 0)"
  popover-foreground: "oklch(0.145 0 0)"
  primary: "oklch(0.205 0 0)"
  primary-foreground: "oklch(0.985 0 0)"
  secondary: "oklch(0.97 0 0)"
  secondary-foreground: "oklch(0.205 0 0)"
  muted: "oklch(0.97 0 0)"
  muted-foreground: "oklch(0.45 0 0)"
  accent: "oklch(0.97 0 0)"
  accent-foreground: "oklch(0.205 0 0)"
  destructive: "oklch(0.577 0.245 27.325)"
  destructive-foreground: "oklch(0.985 0 0)"
  border: "oklch(0.922 0 0)"
  input: "oklch(0.922 0 0)"
  ring: "oklch(0.708 0 0)"
  chart-1: "oklch(0.87 0 0)"
  chart-2: "oklch(0.556 0 0)"
  chart-3: "oklch(0.439 0 0)"
  chart-4: "oklch(0.371 0 0)"
  chart-5: "oklch(0.269 0 0)"
  sidebar: "oklch(0.985 0 0)"
  sidebar-foreground: "oklch(0.145 0 0)"
  sidebar-primary: "oklch(0.205 0 0)"
  sidebar-primary-foreground: "oklch(0.985 0 0)"
  sidebar-accent: "oklch(0.97 0 0)"
  sidebar-accent-foreground: "oklch(0.205 0 0)"
  sidebar-border: "oklch(0.922 0 0)"
  sidebar-ring: "oklch(0.708 0 0)"
typography:
  text-xs:
    fontFamily: SF Pro Text
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1rem
  text-sm:
    fontFamily: SF Pro Text
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
  text-base:
    fontFamily: SF Pro Text
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5rem
  text-lg:
    fontFamily: SF Pro Text
    fontSize: 1.125rem
    fontWeight: 500
    lineHeight: 1.75rem
  text-xl:
    fontFamily: SF Pro Display
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.75rem
  text-2xl:
    fontFamily: SF Pro Display
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 2rem
  text-3xl:
    fontFamily: SF Pro Display
    fontSize: 1.875rem
    fontWeight: 700
    lineHeight: 2.25rem
  text-4xl:
    fontFamily: SF Pro Display
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 2.5rem
rounded:
  none: 0px
  sm: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  2xl: 1rem
  3xl: 1.5rem
  full: 9999px
spacing:
  base: 1rem
  0: 0px
  1: 0.25rem
  2: 0.5rem
  3: 0.75rem
  4: 1rem
  5: 1.25rem
  6: 1.5rem
  8: 2rem
  10: 2.5rem
  12: 3rem
  16: 4rem
components:
  button-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: 0.625rem
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    rounded: "{rounded.md}"
    padding: 0.625rem
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 0.625rem
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.md}"
    padding: 0.625rem
  button-ghost:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    rounded: "{rounded.md}"
    padding: 0.625rem
  button-link:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: 0px
  card-container:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.xl}"
    padding: 1.5rem
  popover-surface:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.popover-foreground}"
    rounded: "{rounded.md}"
    padding: 1rem
  input-field:
    backgroundColor: "{colors.input}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 0.75rem
  badge-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.full}"
    padding: 0.25rem
  badge-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.full}"
    padding: 0.25rem
  badge-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    rounded: "{rounded.full}"
    padding: 0.25rem
  badge-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: 0.25rem
  badge-muted:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: 0.25rem
  caption-muted:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.none}"
    padding: 0.25rem
  ring-indicator:
    backgroundColor: "{colors.ring}"
    rounded: "{rounded.full}"
    padding: 0.125rem
  border-separator:
    backgroundColor: "{colors.border}"
    rounded: "{rounded.none}"
    height: 1px
  chart-bar-1:
    backgroundColor: "{colors.chart-1}"
    rounded: "{rounded.sm}"
  chart-bar-2:
    backgroundColor: "{colors.chart-2}"
    rounded: "{rounded.sm}"
  chart-bar-3:
    backgroundColor: "{colors.chart-3}"
    rounded: "{rounded.sm}"
  chart-bar-4:
    backgroundColor: "{colors.chart-4}"
    rounded: "{rounded.sm}"
  chart-bar-5:
    backgroundColor: "{colors.chart-5}"
    rounded: "{rounded.sm}"
  sidebar-container:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.sidebar-foreground}"
    rounded: "{rounded.none}"
    padding: 1rem
  sidebar-item-primary:
    backgroundColor: "{colors.sidebar-primary}"
    textColor: "{colors.sidebar-primary-foreground}"
    rounded: "{rounded.md}"
    padding: 0.5rem
  sidebar-item-accent:
    backgroundColor: "{colors.sidebar-accent}"
    textColor: "{colors.sidebar-accent-foreground}"
    rounded: "{rounded.md}"
    padding: 0.5rem
  sidebar-separator:
    backgroundColor: "{colors.sidebar-border}"
    rounded: "{rounded.none}"
    height: 1px
  sidebar-focus-ring:
    backgroundColor: "{colors.sidebar-ring}"
    rounded: "{rounded.full}"
    padding: 0.125rem
---

# SpendSpot shadcn iOS Modern Design System

## Overview

SpendSpot is an intelligent location-based expense and commute budget tracker with AI. The visual design couples the tactile polish of Apple iOS Human Interface Guidelines (SF Pro typography, translucent frosted blur bars, squircle card corners, and native touch hierarchy) with the precision token architecture of shadcn ui, Tailwind CSS, and Tamagui UI.

Key principles:

- **Financial Clarity**: Numbers and budget caps dominate with clear visual hierarchy, bold tabular figures, and dynamic threshold warnings.
- **Spatial Awareness**: Geofence tracking (30m to 300m radius) is visualized with subtle pulsating radar rings, clean map pins, and arrival trigger cards.
- **Intelligent Frictionlessness**: High-frequency commute logging requires 1-tap confirmation with pre-selected payment methods (QRIS, Transit Cards, Cash).
- **Accessibility and Contrast**: Strict adherence to WCAG AA minimum 4.5:1 contrast standards, high legibility, and standardized 44x44pt minimum touch targets.
- **Simplicity and Anti-Clutter**: Interfaces prioritize generous negative space and concise layouts over dense cards or excessive micro-analytics.
- **Restrained Iconography**: Icons are restricted to functional touchpoints (navigation, search, dismiss, and critical status). Purely decorative icon clutter is prohibited.

## Colors

The color palette directly adopts the modern shadcn ui OKLCH token system. The palette includes both light and dark themes:

### Light Mode (:root)

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}
```

### Dark Mode (.dark)

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}
```

## Typography

Typography leverages Apple San Francisco (SF Pro) paired with standard Tailwind CSS typographic sizing and line heights:

- **text-xs** (0.75rem / 12px, line-height 1rem): Micro-captions, status pills, and timestamp metadata.
- **text-sm** (0.875rem / 14px, line-height 1.25rem): Secondary labels, form helper text, and list subtitle rows.
- **text-base** (1rem / 16px, line-height 1.5rem): Standard body copy, button labels, and input fields.
- **text-lg** (1.125rem / 18px, line-height 1.75rem): Section titles and medium emphasis card headers.
- **text-xl** (1.25rem / 20px, line-height 1.75rem): Large modal sheet titles and card group headings.
- **text-2xl** (1.5rem / 24px, line-height 2rem): Navigation bar titles and secondary metrics.
- **text-3xl** (1.875rem / 30px, line-height 2.25rem): Hero balance displays and main screen greetings.
- **text-4xl** (2.25rem / 36px, line-height 2.5rem): Large numeric keypad inputs and primary onboarding titles.

## Layout

Layout follows the standard Tailwind CSS spacing scale across an iOS viewport (optimized for iPhone 16 Pro 393x852 pt):

- **Spacing Units**:
  - `0`: 0px
  - `1`: 0.25rem (4px, micro-padding for inline badges)
  - `2`: 0.5rem (8px, compact component gap)
  - `3`: 0.75rem (12px, standard form gap)
  - `4`: 1rem (16px, base layout gutter)
  - `5`: 1.25rem (20px, screen horizontal margins)
  - `6`: 1.5rem (24px, card internal padding)
  - `8`: 2rem (32px, section spacing)
  - `10`: 2.5rem (40px, modal vertical padding)
  - `12`: 3rem (48px, hero block separation)
  - `16`: 4rem (64px, safe area bottom tab clearances)

## Elevation & Depth

Elevation is rendered through tonal layers, subtle hairlines, and soft ambient shadows:

- **Borders**: 1px solid `var(--border)` (`oklch(0.922 0 0)` in light mode, `oklch(1 0 0 / 10%)` in dark mode).
- **Cards**: Flat white surface with 1px border and soft ambient shadow (`rgba(0, 0, 0, 0.03)`).
- **Bottom Sheets**: Elevated 24pt corner radius with background scrim (`rgba(0, 0, 0, 0.4)`).
- **Floating Controls**: Soft tactile drop shadow (`shadow-md shadow-zinc-900/10`).

## Shapes

Shapes utilize Tailwind CSS corner radius tokens anchored to the shadcn `--radius: 0.625rem` design token:

- **none**: `0px` (`rounded-none`) for divider rules and full-bleed banners.
- **sm**: `0.25rem` (`rounded-sm` / `var(--radius-sm)`, 4px) for checkboxes and micro-badges.
- **md**: `0.375rem` (`rounded-md` / `var(--radius-md)`, 6px) for standard inputs, list rows, and buttons.
- **lg**: `0.5rem` (`rounded-lg` / `var(--radius-lg)`, 8px) for interactive pills and secondary cards.
- **xl**: `0.75rem` (`rounded-xl` / `var(--radius-xl)`, 12px) for elevated cards and popovers.
- **2xl**: `1rem` (`rounded-2xl`, 16px) for grouped inset containers and modals.
- **3xl**: `1.5rem` (`rounded-3xl`, 24px) for bottom sheets and large dialogs.
- **full**: `9999px` (`rounded-full`) for circular action buttons, pill badges, and avatars.

## Components

Components strictly map to shadcn ui variant and size specifications:

### Button Component

- **Variants**:
  - `default`: Primary solid black button (`backgroundColor: {colors.primary}`, `textColor: {colors.primary-foreground}`, `rounded: {rounded.md}`).
  - `outline`: Bordered button with neutral background (`backgroundColor: {colors.background}`, `textColor: {colors.foreground}`, 1px border `var(--border)`).
  - `ghost`: Transparent hover button (`backgroundColor: {colors.accent}`, `textColor: {colors.accent-foreground}`).
  - `destructive`: Warning/danger action button (`backgroundColor: {colors.destructive}`, `textColor: {colors.destructive-foreground}`).
  - `secondary`: Subtle zinc button (`backgroundColor: {colors.secondary}`, `textColor: {colors.secondary-foreground}`).
  - `link`: Borderless text link (`backgroundColor: {colors.background}`, `textColor: {colors.primary}`, underlined on tap).
- **Sizes**:
  - `default`: `h-10 px-4 py-2` (touch friendly)
  - `xs`: `h-7 px-2 text-xs`
  - `sm`: `h-9 px-3 text-sm`
  - `lg`: `h-12 px-8 text-base`
  - `icon`: `h-10 w-10`
  - `icon-xs`: `h-7 w-7`
  - `icon-sm`: `h-8 w-8`
  - `icon-lg`: `h-12 w-12`

### Card Component

- Inset grouped card container (`backgroundColor: {colors.card}`, `textColor: {colors.card-foreground}`, `rounded: {rounded.xl}`, `padding: 1.5rem`).

### Input Component

- Form control field (`backgroundColor: {colors.input}`, `textColor: {colors.foreground}`, `rounded: {rounded.md}`, `padding: 0.75rem`).

### Badge Component

- Pill indicator badges available in `default`, `secondary`, `destructive`, `outline`, and `muted` variants.

### Chart Components

- 5-step monochromatic and semantic chart tokens (`chart-1` through `chart-5`) for commute vs daily spend visualizations.

### Sidebar and Navigation Components

- Inset navigation items, active indicators, and focus rings mapped to `sidebar` and `sidebar-primary` tokens.

## Do's and Don'ts

- **Do** prioritize the daily commute allowance and remaining budget ring above all secondary metrics.
- **Do** provide immediate 1-tap confirmation when an expense matches a detected saved spot.
- **Do** maintain strict WCAG AA contrast (minimum 4.5:1 for text, 3:1 for interactive glyphs).
- **Do** follow Apple iOS Human Interface Guidelines for navigation titles, sheets, and touch targets (minimum 44x44pt).
- **Do** maintain generous negative space to ensure screens feel open, clean, and breathable.
- **Do** place icons only where they serve an essential navigational or state-indication purpose.
- **Don't** clutter transaction cards with technical metadata; prioritize amount, merchant/spot, and payment method.
- **Don't** add decorative icons to every label when the text is already clear and concise.
- **Don't** overwhelm screens with non-essential cards, auxiliary widgets, or dense mini-charts.
- **Don't** use arbitrary corner radius values; strictly adhere to the defined `rounded` scale.
- **Don't** display harsh pure black borders; use semi-transparent borders with `var(--border)`.

---

## Google Stitch Integration & Project Metadata

When importing SpendSpot into Google Stitch:

1. **Paste existing DESIGN.md**:
   - Copy and paste this complete `DESIGN.md` file (including the YAML front matter) into Stitch's **"Paste a DESIGN.md file here..."** textarea.
2. **Drop and drop files**:
   - **Upload a DESIGN.md file**: Direct upload of `design/DESIGN.md`.
   - **Screenshots, images, fonts and logos**: Upload the SpendSpot brand assets (`apps/mobile-app/assets/images/icon.png`, adaptive icons, SF Pro font package).
   - **Upload a .fig file**: Optional export from Figma if using the Tamagui UI iOS mobile kit.
3. **Public GitHub repository**:
   - URL: `https://github.com/natainditama/spendspot`
   - Enables Stitch to synchronize design tokens directly with Tamagui UI components and monorepo source files.
4. **Live website**:
   - URL: `https://spendspot.natatama.com`
