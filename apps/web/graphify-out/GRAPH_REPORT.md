# Graph Report - web  (2026-10-03)

## Corpus Check
- 75 files · ~55,972 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 328 nodes · 514 edges · 23 communities (16 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `16b423b2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DisciplinesSection.tsx
- router.tsx
- LiquidGlassEngine.ts
- client.ts
- devDependencies
- package.json
- apiFetch
- compilerOptions
- LandingPage.tsx
- compilerOptions
- DisciplinesSlide.tsx
- userApi.ts
- ManagerCatalogsPage.tsx
- LiquidGlassEngine
- Navbar.tsx
- ViewModeToggle.tsx
- useSlideController.ts
- ManagerUsersPage.tsx
- PlaceholderPage.tsx
- tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `LiquidGlassEngine` - 14 edges
2. `compilerOptions` - 14 edges
3. `apiFetch()` - 13 edges
4. `compilerOptions` - 11 edges
5. `LANDING_IMAGES` - 8 edges
6. `ArrowButton()` - 8 edges
7. `useInView()` - 8 edges
8. `getCurrentUser()` - 7 edges
9. `MemberProfilePage()` - 6 edges
10. `scripts` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Reveal()` --calls--> `useInView()`  [EXTRACTED]
  src/shared/ui/Reveal.tsx → src/hooks/useInView.ts
- `LiquidGlassButtonProps` --references--> `LiquidGlassShape`  [EXTRACTED]
  src/shared/liquid-glass/LiquidGlassButton.tsx → src/shared/liquid-glass/types.ts
- `LiquidGlassContainerProps` --references--> `LiquidGlassShape`  [EXTRACTED]
  src/shared/liquid-glass/LiquidGlassContainer.tsx → src/shared/liquid-glass/types.ts
- `LiquidGlassEngine` --references--> `LiquidGlassParams`  [EXTRACTED]
  src/shared/liquid-glass/LiquidGlassEngine.ts → src/shared/liquid-glass/types.ts
- `LuxuryLoginForm()` --calls--> `homePath()`  [EXTRACTED]
  src/features/auth/LuxuryLoginForm.tsx → src/shared/api/client.ts

## Import Cycles
- None detected.

## Communities (23 total, 7 thin omitted)

### Community 0 - "DisciplinesSection.tsx"
Cohesion: 0.09
Nodes (23): LoginPage(), LANDING_IMAGES, ArrowButton(), ArrowButtonProps, InfiniteMarquee(), InfiniteMarqueeProps, RevealImage(), RevealImageProps (+15 more)

### Community 1 - "router.tsx"
Cohesion: 0.09
Nodes (21): router, ClassItem, StaffClassesPage(), AttendanceStudent, CoachAttendancePage(), ManagerReportsPage(), MemberCardPage(), ClassSessionItem (+13 more)

### Community 2 - "LiquidGlassEngine.ts"
Cohesion: 0.13
Nodes (22): LiquidGlassButton(), LiquidGlassButtonProps, ChatMessage, createMessage(), INITIAL_MESSAGES, LiquidGlassChatbot(), SuggestionItem, SUGGESTIONS (+14 more)

### Community 3 - "client.ts"
Cohesion: 0.13
Nodes (18): LuxuryLoginForm(), LuxuryLoginFormProps, ApiError, AUTH_STORAGE_KEY, clearAuthSession(), getCurrentUser(), homePath(), loginApi() (+10 more)

### Community 4 - "devDependencies"
Cohesion: 0.10
Nodes (21): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+13 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (20): html2canvas, dependencies, html2canvas, react, react-dom, react-router-dom, @vitejs/plugin-react, name (+12 more)

### Community 6 - "apiFetch"
Cohesion: 0.20
Nodes (17): register(), RegisterInput, sendOtp(), verifyOtp(), RegisterPage(), Step, EMPTY_METRIC, MemberProfilePage() (+9 more)

### Community 7 - "compilerOptions"
Cohesion: 0.10
Nodes (19): DOM, DOM.Iterable, ES2022, src, compilerOptions, esModuleInterop, isolatedModules, jsx (+11 more)

### Community 8 - "LandingPage.tsx"
Cohesion: 0.15
Nodes (13): CustomCursor(), FullpageScrollManager(), FullpageScrollManagerProps, SECTION_NAMES, IntroCurtain(), IntroCurtainProps, IntelligenceSection(), ScrollNavbar() (+5 more)

### Community 9 - "compilerOptions"
Cohesion: 0.13
Nodes (14): ES2023, vite.config.ts, compilerOptions, allowImportingTsExtensions, lib, module, moduleDetection, moduleResolution (+6 more)

### Community 10 - "DisciplinesSlide.tsx"
Cohesion: 0.17
Nodes (9): SlideControls(), SlideControlsProps, DISCIPLINES_DATA, DisciplinesSlideProps, ThumbnailStripProps, DisciplineItem, InquiryFormData, SlideId (+1 more)

### Community 11 - "userApi.ts"
Cohesion: 0.18
Nodes (11): CORE_ROLES, CreateUserPayload, Permission, PermissionDto, RoleDto, SystemRole, UserAccount, userApi (+3 more)

### Community 12 - "ManagerCatalogsPage.tsx"
Cohesion: 0.22
Nodes (10): Body, catalogApi, Discipline, MembershipPackage, Room, Form, ManagerCatalogsPage(), ROOM_STATUS_LABEL (+2 more)

## Knowledge Gaps
- **112 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+107 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LiquidGlassEngine` connect `LiquidGlassEngine` to `LiquidGlassEngine.ts`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `LANDING_IMAGES` connect `DisciplinesSection.tsx` to `DisciplinesSlide.tsx`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `LiquidGlassChatbot()` connect `LiquidGlassEngine.ts` to `LandingPage.tsx`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _112 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DisciplinesSection.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08717948717948718 - nodes in this community are weakly interconnected._
- **Should `router.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0945945945945946 - nodes in this community are weakly interconnected._
- **Should `LiquidGlassEngine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._