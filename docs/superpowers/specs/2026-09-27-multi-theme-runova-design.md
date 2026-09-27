# Design Spec: Multi-Theme System & Runova Athletic High-Performance Theme

## 1. Overview & Objective
Add a second full theme—**Runova Athletic** (Modern High-Performance Court & Racket Sports Club)—to the Sports Center Management System (SCMS) web frontend (`apps/web`). This theme exists alongside the existing **Söl Sanctuary** (Quiet Luxury Wellness) theme without modifying or removing any of the existing Söl aesthetics.

The goal is to allow the user to demonstrate both themes side-by-side to an instructor/evaluator, switching instantaneously via a dedicated **Settings Modal** accessible from both the public Landing Page and the internal Portal.

## 2. Visual Reference & Design Language (Runova Athletic)
Inspired by the 5 reference mockups:
- **Palette**:
  - Base Background: Court Stone Warm Canvas (`#EFECE6` / `#F4F1EA`)
  - Deep Dark Tone: Tournament Forest Green (`#16382C` / `#1D4436` / `#164E43`)
  - Primary Accent (Volt/Lime): Tennis Ball Neon (`#D4E95C` / `#CCFF00` / `#C8E644`)
  - Secondary Accent (Clay): Clay Court Terracotta (`#D96B43`)
  - Card & Surface: Crisp White (`#FFFFFF`) and Tinted Cream (`#FAF8F5`)
  - High-Contrast Text: Deep Court Charcoal (`#111A14`) and Slate Olive (`#6B7B71`)
- **Typography**:
  - Headings: Condensed, punchy athletic sans-serif (`font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; text-transform: uppercase; letter-spacing: -0.01em;`) or heavy display typography.
  - Body: Geometric modern sans-serif (`font-family: 'Plus Jakarta Sans', sans-serif`).
- **Shapes & Geometries**:
  - Squircles with generous border radii (`16px` - `24px`).
  - Pill badges & buttons (`border-radius: 9999px`).
  - Matchup split cards (Naomi Brown VS Sasha Indigo).
  - Stat counters (`224 Wins [80%]`, set scores).
- **Liquid Glass Integration**:
  - Reuse existing components from `apps/web/src/shared/liquid-glass/`:
    - `LiquidGlassContainer` with `shape="rect" | "pill"` for hero floating widgets, player photo overlays, and the settings modal.
    - `LiquidGlassButton` for pill action triggers (`Join a Sport ↗`, tab switchers).

## 3. Architecture & Technical Design

### 3.1 Theme State & Persistence
- **ThemeContext**:
  - Location: `apps/web/src/shared/context/ThemeContext.tsx`
  - Values: `'sol'` (Default, Quiet Luxury) | `'runova'` (Runova Athletic)
  - Storage key: `localStorage.getItem('scms_theme') || 'sol'`
  - Application: Dynamically injects `data-theme="sol"` or `data-theme="runova"` on `document.documentElement` (`<html>` element).

### 3.2 CSS Custom Properties Strategy
- In `apps/web/src/styles.css`:
  - Define root defaults for `:root` and `[data-theme="sol"]`.
  - Define overrides under `[data-theme="runova"]`:
    - `--color-bg-base: #EFECE6;`
    - `--color-bg-warm: #E6E2D8;`
    - `--color-bg-card: #FFFFFF;`
    - `--color-text-main: #111A14;`
    - `--color-text-muted: #6B7B71;`
    - `--color-accent-sand: #D4E95C;` (Volt Lime)
    - `--color-accent-gold: #1D4436;` (Court Green)
    - `--radius-card: 20px;`
    - `--radius-pill: 9999px;`
    - `--font-serif: 'Plus Jakarta Sans', -apple-system, sans-serif;` (Switches heading font to athletic bold sans)
- In `apps/web/src/features/landing/landing.css`:
  - Scoped rules for `[data-theme="runova"] .sol-page-root`, hero backgrounds, card styles, and borders.
- In `apps/web/src/shared/ui/portal.css`:
  - Scoped rules for `[data-theme="runova"] .app-shell`, sidebar (`#16382C`), table styles, and metric cards.

### 3.3 Settings Modal (`apps/web/src/shared/ui/SettingsModal.tsx`)
- Trigger button with gear icon `⚙️` placed in:
  1. `ScrollNavbar.tsx` (top right, next to LOGIN button).
  2. `AppLayout.tsx` (topbar header, next to user profile).
- Modal features:
  - Backed by `LiquidGlassContainer` for a glassmorphic aesthetic.
  - Two interactive theme cards with live visual badges:
    - Card 1: **Söl Sanctuary** (Serene taupe & gold colors, tag: "Quiet Luxury Wellness").
    - Card 2: **Runova Athletic** (Deep court green & tennis lime colors, tag: "High-Performance Court").
  - Instant toggle button with active indicator checkmark.
  - Persists preference to `localStorage`.

### 3.4 Page-by-Page Adaptation

#### A. Landing Page (`apps/web/src/features/landing/`)
- When theme is `'runova'`:
  - **ScrollNavbar**: Brand text switches to "RUNOVA ATHLETIC CLUB", pill links (Home, Philosophy, Facilities, Training, Packages, Contact), Settings gear button.
  - **HeroSection**: Renders "SPORTS PASSION" headline, court background, floating "LIMITED SLOTS AVAILABLE" `LiquidGlassContainer` widget, avatar community pill, "Join a Sport ↗" button.
  - **PhilosophySection / About**: "At Runova, we redefine how athletes train and perform" with clay tennis court visual and "Get in Touch ↗" CTA.
  - **DisciplinesSection ("EXPLORE FACILITIES")**: 4 vertical squircle cards (Hard Tennis Arena, Championship Badminton, Athletic Lake Track, Padel & Performance) with liquid-glass hover badge.
  - **IntelligenceSection ("AT SPORTVERSE, AI POWERS SMARTER TRAINING")**: AI racket/court analytics, sensors, and intelligent matchmaking.
  - **PackagesSection**: Athletic club tiers (*Club Player*, *Championship Pro*, *Tournament Master*).
  - When theme is `'sol'`: Renders original Söl Sanctuary luxury layout unchanged.

#### B. Member Dashboard (`apps/web/src/features/member/MemberDashboardPage.tsx`)
- When theme is `'runova'`:
  - Renders the **Runova Player Match Hub** (matching Image 1):
    - Top header: "Welcome Sasha / Nguyễn Văn An! TODAY IS MATCH DAY" with follower/video/match counters.
    - Player Profile Card with tennis racket visual and liquid-glass overlay badge (Age: 27, WTA/UTR: 10, social tags).
    - "My Next Match" split card: Naomi Brown (Japan) VS Sasha Indigo (Vietnam/Indonesia) with date badge "18 JANUARY 2026".
    - "Latest Scores" with liquid-glass tab pills `[SINGLES]`, `[DOUBLES]`, `[MIXED DOUBLES]`, set scores (8-3, 8-3) and "Win" badge.
    - "STATISTIC" card: `224 Wins [80%]`, with breakdown: `86 Wins (Singles)`, `100 Wins (Doubles)`, `38 Wins (Mixed)`.
    - Floating bottom promo card: "UPGRADE TO PRO FOR MORE FEATURES" with glowing 3D tennis ball asset.
- When theme is `'sol'`:
  - Renders existing Söl Sanctuary VIP wellness dashboard unchanged.

#### C. Portal Shell (`apps/web/src/shared/ui/AppLayout.tsx`)
- Sidebar background switches to Deep Court Green (`#16382C`), active navigation items highlight with Volt Lime (`#D4E95C`), logo updates to "RUNOVA ATHLETIC".
- Header integrates the Settings gear button `⚙️`.

## 4. Verification & Testing
1. Test switching between Söl and Runova themes from the Landing Page navbar.
2. Test switching from the Member Portal header.
3. Refresh page and confirm `localStorage` persists the active theme.
4. Verify all Söl theme styling, colors, and layout remain completely intact.
5. Verify Runova theme renders the layout with proper responsiveness, WebGL liquid glass integration, and no console errors.
