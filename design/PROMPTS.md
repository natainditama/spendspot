# SpendSpot: Google Stitch Screen Design Prompts

This document provides production-ready visual and interaction specifications designed for direct input into **Google Stitch** (Stitch Design Agent). All prompts strictly align with [DESIGN.md](./DESIGN.md), modern **iOS Human Interface Guidelines (HIG)**, **shadcn ui OKLCH design tokens**, and **Tamagui UI component variants** (`variant`: "default" | "outline" | "ghost" | "destructive" | "secondary" | "link", and `size`: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg").

---

## Google Stitch Workflow Guide

1. Open your SpendSpot project in **Google Stitch**.
2. Ensure [DESIGN.md](./DESIGN.md) is imported or pasted into the **"Paste existing DESIGN.md"** field.
3. Link the GitHub Repository: `https://github.com/natainditama/spendspot` and Live Website: `https://spendspot.natatama.com`.
4. For each screen below, copy the text inside the **Stitch Prompt** code block into Stitch's screen prompt input.
5. Export the resulting design assets (HTML, PNG, or Figma JSON) and save them in the [design/screens/](./screens/) subfolder.

---

## Screen Catalog

- [Screen 01: Onboarding Value Proposition](#screen-01-onboarding-value-proposition)
- [Screen 02: Authentication and Biometrics](#screen-02-authentication-and-biometrics)
- [Screen 03: Financial Profile Setup](#screen-03-financial-profile-setup)
- [Screen 04: Home Daily Dashboard](#screen-04-home-daily-dashboard)
- [Screen 05: Geofence Spots Map](#screen-05-geofence-spots-map)
- [Screen 06: Add Expense Transaction](#screen-06-add-expense-transaction)
- [Screen 07: Budget Analytics Trends](#screen-07-budget-analytics-trends)
- [Screen 08: Finance AI Chat](#screen-08-finance-ai-chat)
- [Screen 09: Settings Profile Management](#screen-09-settings-profile-management)
- [Screen 10: Geofence Arrival Sheet](#screen-10-geofence-arrival-sheet)
- [Screen 11: Budget Warning Alert](#screen-11-budget-warning-alert)
- [Screen 12: Receipt Scanner Review](#screen-12-receipt-scanner-review)

---

### Screen 01: Onboarding Value Proposition

- **Output File Name**: `01_onboarding_intro.png`
- **Purpose**: Introduce SpendSpot core value proposition (smart location-based expense tracking and AI commute assistant) to new users with a clean, native iOS aesthetic.

#### Stitch Prompt:

```text
Design a modern iOS mobile onboarding screen for "SpendSpot - Smart Location Expense & Commute Budget Tracker with AI".
Device frame: iPhone 16 Pro (393 x 852 pt).
Design System: Follow DESIGN.md tokens (shadcn ui OKLCH zinc aesthetics, Tailwind typography, and Apple iOS HIG touch).

Simplicity and Anti-Clutter Directives:
- Maintain a minimalist, breathable layout with generous whitespace.
- Do NOT add unnecessary floating cards, secondary promotional badges, or micro-widgets.
- Focus exclusively on the single value carousel and clear primary onboarding action.
- Icon Policy: Strict restraint. Use icons only for core navigation elements.

Visual Atmosphere and Layout:
- Background: var(--background) pure white with an ultra-subtle ambient gradient circle at the top.
- Top: Discreet "Skip" Button (variant: "link", size: "sm") on the top right in var(--muted-foreground).
- Center: An elegant 3-slide swipeable Card (rounded-2xl) carousel displaying:
  1. Slide 1 (Active): A high-fidelity card illustrating "Automatic Geofenced Commute Logging" with a minimalist map view, pulsing radar rings (30m to 75m radius), and a floating pop-up card saying "Arrived at MRT Bundaran HI: Log Rp 14.000?".
  2. Slide 2: "Daily & Commute Budget Limits" showing an iOS circular progress gauge hitting 65% with green and amber alert accents.
  3. Slide 3: "Private AI Financial Advisor" with conversational chat bubbles and a Badge (variant: "secondary") saying "20 AI queries/day".
- Carousel pagination indicator: 3 smooth capsule dots below the card (active dot is elongated in var(--primary), inactive dots are var(--border)).
- Typography:
  - Title: SF Pro Display 32pt Bold (text-3xl), var(--foreground): "Spend smarter on every commute."
  - Subtitle: SF Pro Text 16pt Regular (text-base), var(--muted-foreground): "Auto-detect your favorite transit spots, track daily travel caps, and get smart AI spending advice."
- Bottom Action Area:
  - Primary CTA: Button (variant: "default", size: "lg", rounded-xl, full-width): "Get Started".
  - Secondary CTA: Button (variant: "outline", size: "lg", rounded-xl, full-width): "I already have an account".
  - Safe Area: Bottom home indicator bar padding.
```

---

### Screen 02: Authentication and Biometrics

- **Output File Name**: `02_auth_login.png`
- **Purpose**: Sign-in and authentication screen featuring secure credential inputs, Apple Face ID biometrics, and Tamagui UI form controls.

#### Stitch Prompt:

```text
Design a clean, modern iOS authentication screen for SpendSpot.
Device frame: iPhone 16 Pro (393 x 852 pt).
Style: shadcn ui zinc palette with native iOS feel.

Simplicity and Anti-Clutter Directives:
- Keep the screen airy, clean, and distraction-free with generous vertical spacing.
- Do NOT crowd the form with redundant helper badges, extra banners, or decorative illustrations.
- Present only the primary sign-in form, Face ID option, and social sign-in buttons.
- Icon Policy: Restrained to essential input affordances (password visibility toggle and Apple/Google brand glyphs).

Layout and Elements:
- Navigation Bar: Inline back button chevron, center app title "SpendSpot" in clean typography.
- Header:
  - Title: "Welcome back" (text-2xl, font-bold, var(--foreground)).
  - Subtitle: "Sign in to track your commute and daily budget." (text-sm, var(--muted-foreground)).
- Form Controls (shadcn Input component):
  - Email Field: Input (rounded-md, bg var(--input), 1px border var(--border)), placeholder "name@example.com".
  - Password Field: Input (rounded-md) with trailing Eye toggle for visibility.
  - "Forgot Password?" right-aligned Button (variant: "link", size: "sm").
- Primary Button: Button (variant: "default", size: "lg", full-width): "Sign In".
- Biometric Option:
  - Inset rounded card below button: Button (variant: "outline", size: "lg", full-width): "Sign in with Face ID" featuring the Apple Face ID glyph.
- Divider: "Or continue with" with subtle hairline horizontal border line (var(--border)).
- Social Sign-in Buttons:
  - Button (variant: "default", size: "lg", full-width): "Continue with Apple".
  - Button (variant: "outline", size: "lg", full-width): "Continue with Google".
- Footer: "Don't have an account? Sign up" with legal terms caption at the bottom (text-xs, var(--muted-foreground)).
```

---

### Screen 03: Financial Profile Setup

- **Output File Name**: `03_setup_wizard.png`
- **Purpose**: Initial configuration wizard for preferred base currency, daily and commute budget limits, and background geofencing privacy rationale.

#### Stitch Prompt:

```text
Design an iOS onboarding setup wizard screen for SpendSpot.
Device frame: iPhone 16 Pro (393 x 852 pt).

Simplicity and Anti-Clutter Directives:
- Keep the setup flow focused on 3 clear sections without extraneous explanations.
- Use ample spacing between configuration cards to prevent visual fatigue.
- Icon Policy: Only functional selection checkmarks and a single privacy location indicator.

Layout and Components:
- Top: Stepper progress bar: "Step 2 of 3: Preferences & Budget" (horizontal segmented line indicator in var(--primary)).
- Section 1: Preferred Currency Selector:
  - Horizontal grid of 4 selectable currency pill cards:
    1. IDR ("Rp", Indonesian Rupiah): Button (variant: "default", size: "default") selected state.
    2. USD ("$", US Dollar): Button (variant: "outline", size: "default").
    3. SGD ("S$", Singapore Dollar): Button (variant: "outline", size: "default").
    4. EUR ("€", Euro): Button (variant: "outline", size: "default").
- Section 2: Commute & Daily Spending Limit:
  - Inset grouped Card (rounded-2xl, border var(--border), p-6).
  - Large editable currency input: "Rp 100.000" / day (text-3xl, font-bold).
  - Helper note: "We'll alert you at 80% (Rp 80.000) and 100% threshold." (text-xs, var(--muted-foreground)).
  - Monthly estimated cap preview: "Rp 2.500.000 / month" (text-sm, font-medium).
- Section 3: Geofence Background Permission Rationale (Privacy First Card):
  - Card (rounded-xl, bg var(--secondary), border var(--border), p-4).
  - Heading: "Always-on Commute Awareness" (text-base, font-semibold).
  - Body: "SpendSpot triggers expense logging only when you arrive within 30m to 300m of your saved transit spots. Your live GPS coordinates are never stored or uploaded." (text-sm, var(--muted-foreground)).
- Bottom Sticky Button: Button (variant: "default", size: "lg", full-width): "Enable Location & Continue".
```

---

### Screen 04: Home Daily Dashboard

- **Output File Name**: `04_home_dashboard.png`
- **Purpose**: Primary daily overview screen showing real-time budget ring, active geofence arrival detection, threshold alert, quick actions, and recent expenses.

#### Stitch Prompt:

```text
Design the primary iOS Home Dashboard screen for SpendSpot.
Device frame: iPhone 16 Pro (393 x 852 pt).
Style: Modern iOS 18 / shadcn zinc elegance with balanced visual hierarchy.

Simplicity and Anti-Clutter Directives:
- CRITICAL: Keep the layout clean, uncluttered, and breathable.
- Do NOT generate extra secondary widgets, marketing banners, stock tickers, or complex nested graphs.
- Limit the view to: Header, Hero Budget Gauge, 1 Active Geofence Card, 4 Quick Actions, and 3 Recent Transactions.
- Icon Policy: Essential navigation and action icons only. Do NOT add decorative icons to every text item.

Header:
- Left: User avatar ("Nata Inditama") with greeting "Good morning, Nata" (text-base, font-medium).
- Right: Badge (variant: "secondary"): "IDR (Rp)" and Bell icon for alerts.

Hero Section (Budget Progress):
- Card (rounded-2xl, bg var(--card), border var(--border), p-6, soft ambient shadow):
- Circular budget ring gauge:
  - Ring progress at 68% (clean black track on zinc background).
  - Center metric: "Rp 68.000" spent of "Rp 100.000" daily limit (text-2xl, font-bold).
  - Remaining pill badge: Badge (variant: "secondary"): "Rp 32.000 remaining today".
- Dynamic Threshold Alert Banner:
  - Inset card below gauge in warm amber tint with warning border:
  - Warning text: "Approaching Commute Limit: 80% threshold reached" (text-xs, font-semibold).

Active Geofence Status Card:
- Card (rounded-xl, border var(--border), p-4):
  - "Currently at: MRT Bundaran HI Station (Saved Spot)" (text-sm, font-semibold).
  - Detected: 45m radius • Default Payment: QRIS (text-xs, var(--muted-foreground)).
  - Quick action: Button (variant: "default", size: "sm"): "Log Ticket (Rp 14.000)".

Quick Actions Row (4 clean circular icon buttons with labels below):
- 1. Button (variant: "secondary", size: "icon-lg") + label "Add Expense"
- 2. Button (variant: "secondary", size: "icon-lg") + label "Scan Receipt"
- 3. Button (variant: "secondary", size: "icon-lg") + label "Ask AI" (with Badge variant: "secondary" "16 left")
- 4. Button (variant: "secondary", size: "icon-lg") + label "New Spot"

Recent Transactions List:
- Section Header: "Today's Expenses" (text-lg, font-semibold) with Button (variant: "link", size: "sm"): "See All".
- Grouped inset Card (rounded-2xl, border var(--border), divide-y):
  - Row 1: "Kopi Kenangan (Office Spot)", "08:15 AM • QRIS", "-Rp 24.000".
  - Row 2: "TransJakarta Commute", "07:30 AM • Transit Card", "-Rp 3.500".
  - Row 3: "Pertamina Gas Station", "Yesterday • Debit Card", "-Rp 50.000".

Bottom Navigation Bar:
- Translucent frosted glass tab bar (`backdrop-blur-md bg-background/85`):
  - [Home] (Active, solid icon + dot)
  - [Spots & Map]
  - [Analytics]
  - [AI Advisor]
  - [Settings]
```

---

### Screen 05: Geofence Spots Map

- **Output File Name**: `05_geofence_map.png`
- **Purpose**: Interactive map screen displaying favorite commute locations, geofence radius rings (30m to 300m), and an expandable bottom sheet list.

#### Stitch Prompt:

```text
Design an iOS Map and Saved Geofence Spots screen for SpendSpot.
Device frame: iPhone 16 Pro (393 x 852 pt).

Simplicity and Anti-Clutter Directives:
- Keep the map viewport clear and uncluttered.
- Show only 4 clean location pins with translucent radius rings on the map.
- The bottom sheet must contain concise spot rows without nested sub-menus or redundant badges.
- Icon Policy: Location pins on map and top search icon only.

Layout and Components:
- Map Viewport: Apple Maps-style light vector map showing the transit corridor.
- Interactive Geofence Markers on Map:
  - Spot 1 (Active location): "MRT Bundaran HI" with a blue pin and a translucent pulsating blue geofence circle (75m radius).
  - Spot 2: "SCBD Office Tower" with green pin and circle (150m radius).
  - Spot 3: "Apartment / Home" with purple pin and circle (50m radius).
  - Spot 4: "Starbucks Thamrin" with orange pin and circle (30m radius).
- Floating Top Search Bar:
  - Input (rounded-full, bg var(--background), border var(--border)): "Search location or address...".
  - Floating GPS Location recalibrate Button (variant: "secondary", size: "icon").
- Bottom Sheet (Draggable iOS Bottom Sheet, rounded-3xl, bg var(--card)):
  - Handle capsule bar at top center.
  - Header: "Saved Transit Spots (4)" with Button (variant: "default", size: "sm"): "+ Add Spot".
  - Inset Spot List:
    - Item 1: "MRT Bundaran HI", Category: Transportation, Default: QRIS, "Visited 42 times: Last today", Geofence: 75m.
    - Item 2: "SCBD Office Tower", Category: Food & Beverage, Default: E-Wallet, "Visited 128 times", Geofence: 150m.
    - Item 3: "Kopi Tuku Cipete", Category: Food & Beverage, Default: Cash, "Visited 15 times", Geofence: 30m.
- Bottom Navigation Bar visible at the bottom.
```

---

### Screen 06: Add Expense Transaction

- **Output File Name**: `06_add_transaction.png`
- **Purpose**: Rapid expense entry interface featuring a large iOS-style numeric keypad, 9 standard expense categories, payment method selector, and saved spot tagging.

#### Stitch Prompt:

```text
Design an iOS Add Expense Transaction modal screen for SpendSpot.
Device frame: iPhone 16 Pro (393 x 852 pt).
Style: Clean, fast, thumb-friendly numeric keypad layout.

Simplicity and Anti-Clutter Directives:
- Maximize speed of logging: prioritize the hero amount display and custom numeric keypad.
- Do NOT add complex multi-step tabs or lengthy forms.
- Keep category and payment method selection concise and 1-tap accessible.
- Icon Policy: Only standard category glyphs and keypad backspace icon.

Header:
- Navigation Bar: Button (variant: "ghost", size: "sm"): "Cancel" on top left, "New Expense" title in center, Button (variant: "default", size: "sm"): "Save" on top right.

Hero Amount Display:
- Large centered currency input:
  - Currency label: "IDR" (text-sm, var(--muted-foreground))
  - Big number: "Rp 35.000" (SF Pro Display 44pt Bold, text-4xl, var(--foreground)).
  - Subtitle badge: Badge (variant: "secondary"): "Detected nearby: Starbucks Thamrin (tap to unlink)".

Category Selector (Horizontal Scroll / 3x3 Grid):
- 9 Standard expense categories with pastel background tags:
  1. Food & Beverage: Badge (variant: "default") selected state.
  2. Transportation: Badge (variant: "outline").
  3. Housing & Utilities: Badge (variant: "outline").
  4. Education: Badge (variant: "outline").
  5. Healthcare: Badge (variant: "outline").
  6. Entertainment: Badge (variant: "outline").
  7. Shopping: Badge (variant: "outline").
  8. Financial: Badge (variant: "outline").
  9. Other: Badge (variant: "outline").

Payment Method Selector:
- Horizontal segmented pill row:
  - Button (variant: "ghost", size: "sm"): [CASH]
  - Button (variant: "secondary", size: "sm"): [QRIS (Selected)]
  - Button (variant: "ghost", size: "sm"): [DEBIT CARD]
  - Button (variant: "ghost", size: "sm"): [CREDIT CARD]
  - Button (variant: "ghost", size: "sm"): [E-WALLET]
  - Button (variant: "ghost", size: "sm"): [OTHER]

Supplementary Fields:
- Inset cell 1: Input (rounded-md): "Morning iced latte before commute meeting".
- Inset cell 2: Button (variant: "outline", size: "default", full-width): "Attach Receipt Photo".

iOS Custom Numeric Keypad:
- Bottom-aligned 3x4 iOS style numeric keypad:
  - Rows 1 to 3: Numbers 1 through 9.
  - Row 4: "000" shortcut button, "0", and Backspace icon.
- Bottom primary action: Button (variant: "default", size: "lg", full-width): "Save Transaction".
```

---

### Screen 07: Budget Analytics Trends

- **Output File Name**: `07_analytics_trends.png`
- **Purpose**: Spending analytics and commute trend visualization comparing commute versus general expenses across custom time windows.

#### Stitch Prompt:

```text
Design a comprehensive iOS Financial Analytics and Commute Trends screen for SpendSpot.
Device frame: iPhone 16 Pro (393 x 852 pt).

Simplicity and Anti-Clutter Directives:
- Keep the analytics visual hierarchy clean and easy to interpret at a glance.
- Do NOT clutter with secondary financial ratios, complex candlestick charts, or extraneous indicators.
- Limit content to: Period Selector, 2 Summary Cards, Commute Bar Chart, Category Donut Chart, and Top 3 Hotspots.
- Icon Policy: Restrained to period toggles and export trigger only.

Header:
- Title: "Analytics" (Large iOS title 34pt Bold, text-4xl).
- Period Segmented Control (Apple native pill style):
  - Button (variant: "ghost", size: "sm"): [Day]
  - Button (variant: "secondary", size: "sm"): [Week (Active)]
  - Button (variant: "ghost", size: "sm"): [Month]
  - Button (variant: "ghost", size: "sm"): [Year]

Summary Metric Cards (2-column layout):
- Card 1: "Total Commute": "Rp 245.000" (+12% vs last week).
- Card 2: "Avg Daily Spend": "Rp 35.000" / day (Under limit).

Commute vs General Expense Bar Chart:
- Card (rounded-2xl, border var(--border), p-4):
  - Header: "Daily Commute Trajectory" with 7 day bars (Mon to Sun).
  - Horizontal dashed reference line at "Rp 100.000" limit.
  - Dual-tone vertical bars: Dark bar for commute (var(--chart-1)), light zinc bar for other expenses (var(--chart-2)).
  - Friday bar displays a threshold alert dot.

Category Breakdown Section:
- Clean donut chart with category percentage breakdown:
  - Food & Beverage: 45% (var(--chart-1))
  - Transportation: 32% (var(--chart-2))
  - Entertainment: 15% (var(--chart-3))
  - Others: 8% (var(--chart-4))
- Breakdown table below chart with category name, percentage, and total amount.

Top Commute Hotspots List:
- Inset Card ranking:
  - 1. MRT Bundaran HI: 14 trips • Rp 196.000
  - 2. Kopi Kenangan Menara BCA: 8 trips • Rp 144.000
  - 3. TransJakarta Dukuh Atas: 6 trips • Rp 21.000

Footer Button: Button (variant: "outline", size: "default", full-width): "Export CSV / PDF Report".
Bottom Navigation Bar visible.
```

---

### Screen 08: Finance AI Chat

- **Output File Name**: `08_ai_chat.png`
- **Purpose**: Conversational AI Financial Advisor chat interface backed by Supabase Edge Functions with daily query quotas and actionable commute recommendations.

#### Stitch Prompt:

```text
Design a conversational iOS AI Financial Assistant screen for SpendSpot.
Device frame: iPhone 16 Pro (393 x 852 pt).

Simplicity and Anti-Clutter Directives:
- Maintain a clean, readable messaging interface with comfortable line height and padding.
- Do NOT overload chat bubbles with excessive charts or nested accordions.
- Keep prompt suggestion chips short and punchy.
- Icon Policy: Quota status pill, attachment plus button, and send action button only. Avoid decorative emojis in prompt chips.

Header:
- Navigation Bar:
  - Left: Back chevron.
  - Center: "Finance AI Advisor" (text-base, font-semibold).
  - Right: Badge (variant: "secondary"): "16 / 20 queries left today".

Chat Feed Layout:
- System Welcome Message (AI):
  - Message bubble Card (rounded-2xl, bg var(--secondary), text var(--secondary-foreground), p-4):
    "Hi Nata. I analyzed your commute patterns for this week. You have spent Rp 68.000 today out of your Rp 100.000 limit. You are on track to save Rp 150.000 this month."
- User Message:
  - Bubble (rounded-2xl, bg var(--primary), text var(--primary-foreground), right-aligned, p-4):
    "How much can I spend on dinner if I want to stay under my daily limit?"
- AI Response with Actionable Card:
  - Bubble containing response text and an embedded recommendation Card:
    - Text: "You have Rp 32.000 remaining in today's allowance. Here are 2 options:"
    - Option 1: "Take TransJakarta (Rp 3.500) instead of ride-hailing to reserve Rp 28.500 for dinner."
    - Option 2: "Or visit your saved spot 'Warung Bu Kris' nearby for dinner under Rp 30.000."
  - Action buttons inside bubble:
    - Button (variant: "outline", size: "sm"): "View Transit Route"
    - Button (variant: "default", size: "sm"): "Log Dinner Expense"

Prompt Suggestion Chips (Horizontal Scroll above input bar):
  - Badge (variant: "outline"): "Commute saving tips"
  - Badge (variant: "outline"): "Weekly expense summary"
  - Badge (variant: "outline"): "Remaining daily limit"

Bottom Chat Input Bar:
- Tamagui UI / iOS styled input bar with frosted blur background:
  - Left: Button (variant: "ghost", size: "icon"): [+] attachment.
  - Center: Input (rounded-full, bg var(--input), border var(--border)): "Ask financial advisor...".
  - Right: Button (variant: "default", size: "icon", rounded-full): send arrow.
```

---

### Screen 09: Settings Profile Management

- **Output File Name**: `09_settings_profile.png`
- **Purpose**: Account management, currency preferences, geofence radius sensitivity, threshold alert toggles, and biometric security controls.

#### Stitch Prompt:

```text
Design a native iOS Settings screen for SpendSpot using Apple Grouped Inset List layout.
Device frame: iPhone 16 Pro (393 x 852 pt).

Simplicity and Anti-Clutter Directives:
- Follow standard Apple iOS Settings layout with clean inset grouped containers.
- Group related options logically with ample white space between sections.
- Do NOT add promotional upgrade banners or distracting decorative elements.
- Icon Policy: Use standard category leading icons inside grouped table cells.

Header:
- Large iOS title: "Settings" (text-4xl, font-bold, var(--foreground)).

Section 1: User Profile Header Card:
- Grouped inset Card (rounded-2xl, border var(--border), p-4):
  - Avatar: Circular photo ("Nata Inditama").
  - Name & Email: "Nata Inditama", "natainditama.dev@gmail.com".
  - Subtitle: Badge (variant: "secondary"): "Pro Member: Commute Smart Tracker".
  - Trailing chevron.

Section 2: Regional & Currency Preferences:
- Grouped Card (rounded-2xl, border var(--border), divide-y):
  - Row 1: "Preferred Language", trailing value "English (US) >".
  - Row 2: "Default Currency", trailing value "IDR (Rp) >".
  - Row 3: "Threshold Notifications", trailing toggle switch (Active, alerted at 80% and 100%).

Section 3: Geofence & Location Settings:
- Grouped Card (rounded-2xl, border var(--border), divide-y):
  - Row 1: "Default Spot Radius", trailing value "75 meters >".
  - Row 2: "GPS Accuracy Mode", trailing value "High Precision (Commute)".
  - Row 3: "Battery Saver Geofencing", trailing toggle switch (Active).

Section 4: AI Advisor & Quotas:
- Grouped Card (rounded-2xl, border var(--border), divide-y):
  - Row 1: "Daily AI Query Limit", trailing value "20 queries/day".
  - Row 2: Button (variant: "link", size: "sm"): "Clear AI Conversation History".

Section 5: Security & Data:
- Grouped Card (rounded-2xl, border var(--border), divide-y):
  - Row 1: "Require Face ID on Launch", toggle switch (Active).
  - Row 2: Button (variant: "ghost", size: "sm", full-width): "Export All Financial Data (JSON/CSV)".
  - Row 3: Button (variant: "destructive", size: "sm", full-width): "Delete Account & Data".

Footer:
- "SpendSpot v1.0.0 (Build 57.0.24) • natatama.com" in var(--muted-foreground).
- Bottom Navigation Bar visible.
```

---

### Screen 10: Geofence Arrival Sheet

- **Output File Name**: `10_arrival_sheet.png`
- **Purpose**: Rapid 1-tap confirmation bottom sheet triggered automatically upon arriving at a saved commute spot.

#### Stitch Prompt:

```text
Design an iOS Modal Bottom Sheet for "Geofence Arrival Quick-Log" in SpendSpot.
Context: Dimmed background scrim over the Home Dashboard.
Sheet properties: Bottom-anchored Card, rounded-3xl (radius 24pt), white fill, top drag capsule indicator.

Simplicity and Anti-Clutter Directives:
- Keep the sheet ultra-focused on a single action: 1-tap expense confirmation.
- Do NOT crowd the sheet with complex configuration options or secondary analytics.
- Provide clear primary confirmation and a simple dismiss action.
- Icon Policy: Arrival status indicator and primary confirmation checkmark only.

Content Layout:
- Top Header:
  - Leading green arrival status dot.
  - Title: "You Have Arrived at a Saved Spot" (text-xl, font-bold).
  - Subtitle: "Location: MRT Bundaran HI Station (45m radius)" (text-sm, var(--muted-foreground)).
- Spot Card Preview:
  - Inset Card (rounded-xl, bg var(--secondary), border var(--border), p-4):
    - Row 1: Badge (variant: "secondary"): "Transportation".
    - Row 2: Pre-filled standard fare: "Rp 14.000" (text-3xl, font-bold).
    - Row 3: Default payment method: "QRIS (BCA Mobile)" (text-xs, var(--muted-foreground)).
- 1-Tap Action:
  - Primary button: Button (variant: "default", size: "lg", full-width, rounded-xl):
    "Confirm & Log Rp 14.000".
- Secondary Action:
  - Outline button: Button (variant: "outline", size: "default", full-width, rounded-xl):
    "Edit Amount or Payment Method".
- Dismiss:
  - Text link: Button (variant: "link", size: "sm"): "Not spending here (Dismiss)".
```

---

### Screen 11: Budget Warning Alert

- **Output File Name**: `11_budget_alert.png`
- **Purpose**: Critical alert dialog displayed when spending reaches the 80% commute threshold or exceeds the 100% daily cap, featuring AI spending advice.

#### Stitch Prompt:

```text
Design an iOS Alert Bottom Sheet for "Budget Threshold Warning" in SpendSpot.
Context: High-priority financial guardrail notification over active screen.
Sheet properties: Bottom-anchored Card, rounded-3xl, pure white container, subtle warning border highlight.

Simplicity and Anti-Clutter Directives:
- Ensure the warning message and remaining budget metric are immediately legible.
- Do NOT display secondary breakdown charts inside the alert.
- Keep the AI recommendation card concise (maximum 2 sentences).
- Icon Policy: Single warning triangle icon at the top.

Content Layout:
- Hero Warning Icon:
  - Circular badge in soft amber tint with central Warning Triangle.
- Header:
  - Title: "80% Commute Budget Reached" (text-xl, font-bold, var(--foreground)).
  - Subtitle: "You have spent Rp 82.000 of your Rp 100.000 daily allowance." (text-sm, var(--muted-foreground)).
- Financial Gauge Meter:
  - Horizontal segmented bar showing 82% filled in amber, 18% remaining in gray.
  - Metric breakdown: "Remaining today: Rp 18.000" (text-base, font-semibold).
- AI Commute Recommendation Box:
  - Inset Card (rounded-xl, bg var(--secondary), border var(--border), p-4):
    "AI Advice: Your regular evening transit home costs Rp 14.000. If you avoid extra snacks, you will stay safely under your Rp 100.000 cap."
- Buttons:
  - Primary Button: Button (variant: "default", size: "lg", full-width, rounded-xl): "Acknowledge & Set Alert".
  - Secondary Button: Button (variant: "outline", size: "default", full-width, rounded-xl): "Temporarily Adjust Daily Cap".
```

---

### Screen 12: Receipt Scanner Review

- **Output File Name**: `12_receipt_scanner.png`
- **Purpose**: Physical paper receipt scanning interface featuring viewfinder edge-detection brackets and real-time OCR extracted data confirmation.

#### Stitch Prompt:

```text
Design an iOS Camera Receipt Scanner and OCR Review modal for SpendSpot.
Device frame: iPhone 16 Pro (393 x 852 pt).

Simplicity and Anti-Clutter Directives:
- Keep the camera viewfinder unobstructed with clean bounding guides.
- The OCR review bottom card must present structured data in clean rows without visual noise.
- Icon Policy: Top flash toggle and primary save checkmark only.

Screen Layout:
- Top Overlay:
  - Dark translucent camera header with Button (variant: "ghost", size: "sm"): "Cancel" on left, Flash toggle icon on right.
  - Helper instruction banner: "Align paper receipt within the frame" (text-xs, font-medium).
- Camera Viewfinder (Full-screen camera preview):
  - 4 luminous green corner brackets highlighting detected receipt boundaries.
  - Real-time scanning line animation passing over the receipt.
- Bottom Slide-up OCR Confirmation Card (covers bottom 40% of viewport):
  - Header: "Receipt Scanned Successfully" with green status indicator.
  - Parsed Data Table (Grouped inset rows inside Card, border var(--border)):
    - Merchant: "Kopi Kenangan - Grand Indonesia" (text-sm, font-semibold)
    - Date & Time: "19 Sep 2026 • 08:24 AM" (text-xs, var(--muted-foreground))
    - Auto-Category: Badge (variant: "secondary"): "Food & Beverage"
    - Total Amount: "Rp 32.000" (text-xl, font-bold, var(--foreground))
    - Payment Method: "QRIS" (text-xs, var(--muted-foreground))
- Action Buttons:
  - Button 1: Button (variant: "default", size: "lg", full-width, rounded-xl): "Save to Expenses".
  - Button 2: Button (variant: "ghost", size: "default", full-width): "Retake Photo".
```
