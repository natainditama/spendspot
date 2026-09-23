# SpendSpot: Mobile App UI and UX Design Workspace

This directory contains the complete design system specifications, design tokens, and engineering prompts for the **SpendSpot Mobile Application** designed for integration with **Google Stitch** (Stitch Design Agent).

---

## Directory Structure

```text
design/
├── DESIGN.md           # Formal Google Stitch Design System (shadcn tokens + HIG guidelines)
├── PROMPTS.md          # 12 Production-ready screen prompts for Google Stitch
├── README.md           # Workspace documentation, architecture, and workflow guide
└── screens/            # Output subfolder to store final exported screen assets
```

---

## Google Stitch Workflow

1. **Access Google Stitch**:
   - Open [Google Stitch](https://stitch.withgoogle.com/) and create a new project named **SpendSpot**.

2. **Configure Design System**:
   - Copy the entire contents of [DESIGN.md](./DESIGN.md) and paste into the **"Paste a DESIGN.md file here..."** input field, or upload the file directly.
   - Enter the **Public GitHub repository**: `https://github.com/natainditama/spendspot`
   - Enter the **Live website**: `https://spendspot.natatama.com`
   - (Optional) Upload brand assets from `apps/mobile-app/assets/images/icon.png`.

3. **Generate Screens with Prompts**:
   - Open [PROMPTS.md](./PROMPTS.md).
   - Select the target screen prompt (for example: _Screen 04: Home Dashboard_).
   - Copy the text inside the **Stitch Prompt** code block and paste it into Google Stitch.

4. **Export and Store Final Designs**:
   - Export your generated screen assets (HTML, PNG, or Figma JSON) from Google Stitch.
   - Save the exported assets inside the [design/screens/](./screens/) subfolder using standardized filenames (for example: `04_home_dashboard.png`).

---

## Design System Validation

The design system specification in `DESIGN.md` strictly adheres to the official `@google/design.md` schema with **0 errors and 0 warnings**:

```bash
bun x @google/design.md lint design/DESIGN.md
```

Validation output:

```json
{
  "findings": [
    {
      "severity": "info",
      "message": "Design system defines 32 colors, 8 typography scales, 8 rounding levels, 12 spacing tokens, 27 components.",
      "rule": "token-summary"
    }
  ],
  "summary": {
    "errors": 0,
    "warnings": 0,
    "infos": 1
  }
}
```

---

## Core Engineering and UX Principles

### 1. Simplicity and Anti-Clutter

Google Stitch can occasionally overpopulate screens with non-essential widgets. SpendSpot strictly enforces negative space, clean typography, and breathable padding. Every screen focuses on a single primary objective so users can log expenses and review commute budgets in seconds without cognitive fatigue.

### 2. Restrained Iconography

Decorative icons are avoided. Icons are deployed strictly where they serve a necessary functional purpose: primary navigation bars, back buttons, search triggers, and high-priority status alerts. Standard text labels provide sufficient context without icon redundancy.

### 3. High Performance

Layouts follow flat component hierarchies without deeply nested views. Vector icons and lightweight SVG gauges replace heavy image assets, ensuring 60 FPS transitions and rapid cold-start rendering on both iOS and Android.

### 4. Privacy and Security

SpendSpot implements privacy by design. Geofence arrival detection operates locally on the device (monitoring a 30m to 300m circular perimeter around user-saved spots). Raw GPS coordinates are never stored, logged, or uploaded to any remote server. Biometric authentication (Face ID and Touch ID) secures financial records on launch.

### 5. Monorepo Scalability

All design tokens in `DESIGN.md` use standard shadcn ui OKLCH variables and Tailwind CSS scales that map directly to Tamagui UI components and theme tokens within the monorepo packages (`packages/core-logic` and `apps/mobile-app`). This ensures complete consistency across design, prototyping, and production implementation.
