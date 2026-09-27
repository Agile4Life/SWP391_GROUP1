# Multi-Theme System & Runova Athletic High-Performance Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete multi-theme system featuring both the original **Söl Sanctuary (Quiet Luxury Wellness)** theme and the new **Runova Athletic (High-Performance Court & Racket Sports)** theme, with instant switching via a Settings modal backed by WebGL Liquid Glass.

**Architecture:** A React `ThemeContext` provides active theme state (`'sol' | 'runova'`) persisted in `localStorage` and injected as a `data-theme` attribute on `document.documentElement`. CSS Custom Properties dynamically adapt across themes, while components adapt their layout and media (using existing `LiquidGlassContainer` and `LiquidGlassButton` components from `shared/liquid-glass`).

**Tech Stack:** React 19, TypeScript, Vite, CSS Custom Properties, WebGL Shaders (via existing `shared/liquid-glass`).

**Spec:** [docs/superpowers/specs/2026-09-27-multi-theme-runova-design.md](file:///Users/trancongtuananh/Documents/GitHub/SWP391_GROUP1/docs/superpowers/specs/2026-09-27-multi-theme-runova-design.md)

## Global Constraints
- Absolute requirement: Never remove, break, or degrade the existing Söl Sanctuary theme.
- The new theme must strictly match the 5 reference design mockups (deep court green `#16382C`, tennis volt lime `#D4E95C`, warm athletic canvas `#EFECE6`, squircle card shapes, pill buttons).
- Reuse the existing WebGL Liquid Glass components in `apps/web/src/shared/liquid-glass/` without recreating shaders or canvas code.
- Zero lint errors (`npm run lint`) and successful TypeScript compilation (`npm run build`).

## Review Focus
1. Söl theme must remain visually identical when `theme === 'sol'`.
2. Instant switching without page reload; persistence on page refresh.
3. Liquid Glass containers must initialize correctly and render without WebGL errors when toggling themes.
4. Mobile responsiveness must be preserved across all screen sizes.
5. All navigation links and buttons must remain accessible and functional.

---

### Task 1: Theme State Management & CSS Tokens

**Files:**
- Create: `apps/web/src/shared/context/ThemeContext.tsx`
- Modify: `apps/web/src/main.tsx`
- Modify: `apps/web/src/styles.css`

**Interfaces:**
- Produces: `ThemeContext`, `ThemeProvider`, `useTheme(): { theme: 'sol' | 'runova', setTheme: (t: 'sol' | 'runova') => void, toggleTheme: () => void }`
- Produces: CSS custom properties under `[data-theme="runova"]`

- [ ] **Step 1: Create ThemeContext.tsx**
Create `apps/web/src/shared/context/ThemeContext.tsx` with `ThemeMode = 'sol' | 'runova'`, `localStorage` sync with key `'scms_theme'`, and automatic update to `document.documentElement.setAttribute('data-theme', theme)`.

```tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'sol' | 'runova';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'scms_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'runova' ? 'runova' : 'sol';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'sol' ? 'runova' : 'sol');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

- [ ] **Step 2: Wrap App in main.tsx**
Wrap `<RouterProvider router={router} />` with `<ThemeProvider>` in `apps/web/src/main.tsx`.

- [ ] **Step 3: Define Runova Design Tokens in styles.css**
In `apps/web/src/styles.css`, append scoped CSS variables for `[data-theme="runova"]`:
- `--color-bg-base: #EFECE6;`
- `--color-bg-warm: #E4E0D5;`
- `--color-bg-card: #FFFFFF;`
- `--color-text-main: #111A14;`
- `--color-text-muted: #627267;`
- `--color-accent-lime: #D4E95C;`
- `--color-accent-court: #16382C;`
- `--color-accent-clay: #D96B43;`
- `--radius-card: 22px;`
- `--radius-pill: 9999px;`

- [ ] **Step 4: Verify build**
Run: `npm run build` in `apps/web`
Expected: Build succeeds with 0 errors.

- [ ] **Step 5: Commit**
```bash
git add apps/web/src/shared/context/ThemeContext.tsx apps/web/src/main.tsx apps/web/src/styles.css
git commit -m "feat(theme): add ThemeContext and Runova athletic design tokens"
```

---

### Task 2: Settings Modal with LiquidGlass Integration & Header Triggers

**Files:**
- Create: `apps/web/src/shared/ui/SettingsModal.tsx`
- Modify: `apps/web/src/features/landing/components/sections/ScrollNavbar.tsx`
- Modify: `apps/web/src/shared/ui/AppLayout.tsx`

**Interfaces:**
- Consumes: `useTheme` from `shared/context/ThemeContext`
- Consumes: `LiquidGlassContainer` and `LiquidGlassButton` from `shared/liquid-glass`
- Produces: `SettingsModal` component with interactive theme preview cards, gear icon trigger in landing navbar and portal header.

- [ ] **Step 1: Create SettingsModal.tsx**
Build `apps/web/src/shared/ui/SettingsModal.tsx` showing:
- Modal backdrop with click-outside to close.
- Window wrapped in `LiquidGlassContainer` or glass styling.
- 2 Theme Cards side by side:
  - **Söl Sanctuary**: Quiet Luxury Wellness, swatch of ivory, espresso, gold.
  - **Runova Athletic**: High-Performance Sports, swatch of court green, volt lime, athletic canvas.
- Active checkmark badge.
- Close button.

- [ ] **Step 2: Add Settings trigger to ScrollNavbar.tsx**
In `apps/web/src/features/landing/components/sections/ScrollNavbar.tsx`:
- Import `useTheme` and `SettingsModal`.
- Add state `isSettingsOpen`.
- Add a circular settings button with gear icon `⚙️` next to the `LOGIN` button.
- Dynamically update brand title: "SÖL WELLNESS SANCTUARY" when `sol`, "RUNOVA ATHLETIC CLUB" when `runova`.

- [ ] **Step 3: Add Settings trigger to AppLayout.tsx**
In `apps/web/src/shared/ui/AppLayout.tsx`:
- Import `useTheme` and `SettingsModal`.
- Add state `isSettingsOpen`.
- Add settings gear button `⚙️` in the portal top header next to user profile.
- Apply dynamic sidebar styling (Deep Court Green `#16382C` when `runova`, `#1A1614` when `sol`).

- [ ] **Step 4: Verify build**
Run: `npm run build` in `apps/web`
Expected: PASS with 0 errors.

- [ ] **Step 5: Commit**
```bash
git add apps/web/src/shared/ui/SettingsModal.tsx apps/web/src/features/landing/components/sections/ScrollNavbar.tsx apps/web/src/shared/ui/AppLayout.tsx
git commit -m "feat(ui): add SettingsModal and theme triggers in navbar and portal header"
```

---

### Task 3: Landing Page Adaptation for Runova Athletic Theme

**Files:**
- Modify: `apps/web/src/features/landing/landing.css`
- Modify: `apps/web/src/features/landing/components/sections/HeroSection.tsx`
- Modify: `apps/web/src/features/landing/components/sections/PhilosophySection.tsx`
- Modify: `apps/web/src/features/landing/components/sections/DisciplinesSection.tsx`
- Modify: `apps/web/src/features/landing/components/sections/IntelligenceSection.tsx`
- Modify: `apps/web/src/features/landing/components/sections/PackagesSection.tsx`

**Interfaces:**
- Consumes: `useTheme` from `shared/context/ThemeContext`
- Consumes: `LiquidGlassContainer` and `LiquidGlassButton` from `shared/liquid-glass`
- Produces: Dynamic presentation of Image 2 (Hero "SPORTS PASSION"), Image 3 ("At Runova, we redefine..."), Image 4 ("EXPLORE FACILITIES"), Image 5 ("AT SPORTVERSE, AI POWERS SMARTER TRAINING").

- [ ] **Step 1: Add Runova scoped styles in landing.css**
Add `[data-theme="runova"]` selectors for:
- Hero banner with tournament green gradient & court texture.
- Bold condensed uppercase typography for headings.
- Pill radius for action buttons and badges.
- Squircle radius (`22px`) for card grids.

- [ ] **Step 2: Update HeroSection.tsx**
When `theme === 'runova'`:
- Headline: "SPORTS PASSION" with solid white and transparent outline layers (matching Image 2).
- Floating top-right widget: `<LiquidGlassContainer shape="rect" borderRadius={20}>` with "LIMITED SLOTS AVAILABLE" and court thumbnail.
- Floating top-left pill: `<LiquidGlassContainer shape="pill">` with avatar stack and community intro text.
- CTA: "Join a Sport ↗" with pill styling.
When `theme === 'sol'`:
- Retain existing luxury Söl hero layout.

- [ ] **Step 3: Update PhilosophySection.tsx**
When `theme === 'runova'`:
- Headline: "At Runova, we redefine how athletes train and perform" (matching Image 3).
- Layout: Clay tennis court photography, racket with '+' button, pill tag "About Runova", "Get In Touch ↗" button.
When `theme === 'sol'`:
- Retain original Söl philosophy content.

- [ ] **Step 4: Update DisciplinesSection.tsx**
When `theme === 'runova'`:
- Section title: "EXPLORE FACILITIES" (matching Image 4).
- 4 tall vertical squircle cards: Tennis Court, Badminton Arena, Outdoor Lake Track, Padel & Performance.
- Hover badge with `<LiquidGlassContainer shape="pill">`.
When `theme === 'sol'`:
- Retain existing Söl disciplines layout.

- [ ] **Step 5: Update IntelligenceSection.tsx & PackagesSection.tsx**
When `theme === 'runova'`:
- Intelligence title: "AT SPORTVERSE, AI POWERS SMARTER TRAINING" (matching Image 5) with equipment and smart court sensor cards.
- Packages: 3 athletic membership tiers (*Club Player*, *Championship Pro*, *Tournament Master*) with volt lime active highlights.
When `theme === 'sol'`:
- Retain original Söl packages.

- [ ] **Step 6: Verify build**
Run: `npm run build` in `apps/web`
Expected: PASS with 0 errors.

- [ ] **Step 7: Commit**
```bash
git add apps/web/src/features/landing/
git commit -m "feat(landing): adapt landing page sections to Runova athletic theme"
```

---

### Task 4: Member Portal Dashboard Runova Adaptation (Image 1)

**Files:**
- Create: `apps/web/src/features/member/components/RunovaMatchDashboard.tsx`
- Modify: `apps/web/src/features/member/MemberDashboardPage.tsx`
- Modify: `apps/web/src/shared/ui/portal.css`

**Interfaces:**
- Consumes: `useTheme` from `shared/context/ThemeContext`
- Consumes: `LiquidGlassContainer` and `LiquidGlassButton` from `shared/liquid-glass`
- Produces: High-energy player match dashboard matching Image 1 when `theme === 'runova'`.

- [ ] **Step 1: Create RunovaMatchDashboard.tsx**
Implement the exact layout from Image 1:
- **Top Bar**: "Welcome Sasha / Nguyễn Văn An!", date "TODAY IS MATCH DAY", follower / video counters (198K Followers, 550 Following, 1069 Videos), search, notification, bookmark icons.
- **Player Card (Left Column)**: Photo of tennis athlete, overlaid with `<LiquidGlassContainer shape="rect" borderRadius={16}>` displaying player profile (Age: 27, WTA/UTR: 10, social tags).
- **"My Next Match" Card**: Split matchup between Naomi Brown (Japan) and Sasha Indigo (Vietnam) with "18 JANUARY 2026" badge.
- **"Latest Scores" Card**: Pill tabs `[SINGLES]` (active dark pill), `[DOUBLES]`, `[MIXED DOUBLES]`. Set scores (8-3, 8-3) with green "Win" badge.
- **"STATISTIC" Card**: Large `224 Wins [80%]` display over court action photo.
- **Bottom Score Counters**: `86 Wins (Singles)`, `100 Wins (Doubles)`, `38 Wins (Mixed Doubles)`.
- **Bottom Left Promo**: `<LiquidGlassContainer shape="rect" borderRadius={18}>` with "UPGRADE TO PRO FOR MORE FEATURES" and glowing tennis ball graphic.

- [ ] **Step 2: Update MemberDashboardPage.tsx**
Use `const { theme } = useTheme();`:
- If `theme === 'runova'`, render `<RunovaMatchDashboard />`.
- If `theme === 'sol'`, render the original Söl Sanctuary VIP dashboard.

- [ ] **Step 3: Update portal.css for Runova**
Add styling for Runova match dashboard, court green badges, and volt lime highlights.

- [ ] **Step 4: Verify build**
Run: `npm run build` in `apps/web`
Expected: PASS with 0 errors.

- [ ] **Step 5: Commit**
```bash
git add apps/web/src/features/member/ apps/web/src/shared/ui/portal.css
git commit -m "feat(member): add RunovaMatchDashboard matching reference mockup"
```

---

### Task 5: End-to-End Visual Verification & Consistency Check

**Files:**
- Review: `apps/web/src/`

- [ ] **Step 1: Run linter and typecheck**
Run: `npm run lint` and `npm run build` in `apps/web`
Expected: 0 errors, 0 warnings.

- [ ] **Step 2: Verify in browser**
Launch dev server or open browser:
- Test switching themes from Landing Page navbar ⚙️.
- Verify Landing Page transitions between Söl luxury and Runova athletic.
- Test switching themes from Portal header ⚙️.
- Verify Member Dashboard transitions between Söl VIP and Runova Match Dashboard.
- Reload browser and verify theme persistence via `localStorage`.

- [ ] **Step 3: Commit final integration**
```bash
git add -A
git commit -m "chore: complete multi-theme Runova athletic implementation"
```
