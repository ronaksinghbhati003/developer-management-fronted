# LifeOS Frontend Architecture

This document translates the product prompt into a production-ready frontend architecture for a clean, minimal Light-theme SaaS app.

## 1) Prompt Analysis Summary

### Product Direction
- Product is a real productivity SaaS, not a visual concept demo.
- UI must prioritize clarity, low cognitive load, and quick daily actions.
- Core value is operational planning and course correction across life domains.

### Hard UI Constraints
- Light theme only.
- White page surfaces with light gray borders (`#e5e7eb`).
- No dark/futuristic/neon treatment.
- No overly complex visual hierarchy.
- Keep layout practical and sparse.

### Core IA Requirements
- Persistent left sidebar for domain navigation.
- Consistent top header with title, date, actions, avatar.
- Main content with centered max-width and a strict 2-3 column limit.
- Fixed bottom AI input bar available globally.

### Critical Feature
- Right-side, non-blocking "Course Correction" panel triggered by off-track state.
- Must not lock the screen or force a modal flow.

## 2) Information Architecture

### Primary Navigation (Sidebar)
- Dashboard
- Study
- Work
- Finance
- Health
- Social
- DSA
- Portfolio
- Settings

### Route Map (App Router)
Recommended App Router structure:

```txt
src/app/
  (lifeos)/
    layout.tsx                     # Sidebar + Header + Main + AI Input shell
    dashboard/page.tsx
    study/page.tsx
    work/page.tsx
    finance/page.tsx
    health/page.tsx
    social/page.tsx
    dsa/page.tsx
    portfolio/page.tsx
    settings/page.tsx
```

Notes:
- Keep all authenticated LifeOS screens inside a single route group shell.
- Keep current root page minimal (marketing/login) or redirect into `dashboard` if authenticated.

## 3) Frontend Layering (Aligned With Existing Clean Architecture)

### Presentation Layer
- Owns page composition, UI components, and user interactions.
- Contains shell components and domain widgets.
- Reads data via selectors/hooks only.

### Store Layer (Redux Toolkit)
- Owns feature state, async thunks, selectors, and UI state (panel open/close).
- Normalized domain-specific slices to avoid large monolithic state.

### Domain Layer
- Owns business logic for "off-track detection", plan adjustments, and KPI calculations.
- Contains use cases for each domain (Study/Work/Health/etc.).

### Data Layer
- Repositories + mappers for API to domain conversion.
- Backend contract can evolve without breaking UI components.

## 4) Shell Architecture

## App Shell Responsibilities
- Persistent left Sidebar.
- Sticky Top Header.
- Scrollable main content area.
- Fixed bottom AI input bar.
- Right-side Reality Check panel mounted once at shell level.

## Layout Grid
Desktop:
- Sidebar: fixed width (240px).
- Content column: fluid, max width 1200px, centered.
- Dashboard sections: max 3 columns where required.

Mobile/Tablet:
- Sidebar becomes drawer.
- Header actions collapse (keep primary button visible).
- Main content stacks into one column.
- Reality Check panel uses full width on very small screens only.

## 5) Page Composition Blueprint

## Dashboard
Top section:
- Greeting: "Good Evening, Piyush"
- Reality Check card (message + "Fix My Plan")
- AI Insight box (single concise recommendation)

Middle section:
- Today Plan (time-based list)
- Pending Tasks (study + work)
- Life Balance Summary (progress bars: Study, Work, Health, Social)

Bottom section:
- Weekly Progress chart
- Recent Activity logs (last 3)

## Study
- Current Topics table/list: name, progress, status.
- Pending Topics list.
- Backlog list with delayed highlight.
- "Add Topic" primary action.

## Work
- Office Tasks list.
- Freelance Tasks list.
- Summary row: total hours + productivity.

## Finance
- KPI row: Income, Expenses, Savings.
- Expense list.
- Purchase Planning list: item, price, status.

## Health
- Workout card: today's plan + streak.
- Body Stats card: weight.
- Activity card: steps, calories.
- AI suggestion callout.

## Social
- Friends list.
- Recent interactions list.
- Reminder callout: "You haven't talked to X".

## DSA
- Total solved metric.
- Problem list.
- Streak metric.

## Portfolio
- Project list cards (lightweight, compact).
- Status and progress per project.

## 6) Core Feature: Reality Check Panel

## Trigger Logic
Panel opens when `isOffTrack = true`, derived from use-case output.

Suggested input signals:
- Missed study target hours.
- Skipped workout tasks.
- Excess low-priority task time.

## Interaction Requirements
- Slide-in from right.
- Non-modal behavior (no full-screen overlay lock).
- User can continue working while panel is open.

## Panel Content Contract
- Title: "Course Correction"
- Message: "You spent too much time on low-priority tasks and missed study goals"
- Breakdown rows:
  - Study: Missed (2h pending)
  - Work: Completed
  - Health: Skipped
- CTA buttons:
  - Primary: "Fix My Plan"
  - Secondary: "Remind Later"

## State Model
`uiSlice.realityCheck`:
- `isOpen: boolean`
- `lastTriggeredAt: string | null`
- `snoozedUntil: string | null`
- `reasonCodes: string[]`

## 7) Component Architecture

## Shell Components
- `AppSidebar`
- `AppHeader`
- `MainContainer`
- `AiInputBar`
- `RealityCheckPanel`

## Reusable UI Primitives
- `SectionBlock`
- `DataList`
- `StatInline`
- `ProgressBar`
- `StatusBadge`
- `ActionRow`

## Page Widgets (Feature Components)
Dashboard widgets:
- `GreetingBlock`
- `RealityCheckCard`
- `AiInsightBox`
- `TodayPlanList`
- `PendingTasksList`
- `LifeBalanceBars`
- `WeeklyProgressChart`
- `RecentActivityList`

Domain widgets:
- `StudyTopicList`, `WorkTaskList`, `FinanceKpiRow`, `HealthActivityCard`, etc.

Guideline:
- Keep widgets small and composable.
- Keep business rules out of components.

## 8) State and Data Contracts

## Redux Slices (Recommended)
- `dashboardSlice`
- `studySlice`
- `workSlice`
- `financeSlice`
- `healthSlice`
- `socialSlice`
- `dsaSlice`
- `portfolioSlice`
- `uiSlice` (global UI, drawers, panel state)

## Selector Strategy
- Build memoized selectors per domain.
- Derive computed indicators (`isOffTrack`, `balanceScore`, `pendingCount`) in selectors/use-cases.
- Components consume selectors, never raw nested state paths.

## Domain Types (Core)
- `PlanItem` (time, title, category, status)
- `TaskItem` (name, domain, status, timeSpent)
- `LifeMetric` (study/work/health/social progress)
- `RealityCheckSignal` (type, severity, message)
- `ActivityLog` (time, action, domain)

## 9) Visual System (Minimal Light Theme)

## Tokens
- Background: `#ffffff`
- Surface: `#ffffff`
- Border: `#e5e7eb`
- Text Primary: `#111827`
- Text Secondary: `#6b7280`
- Primary Accent (blue): `#2563eb`
- Positive Accent (green): `#16a34a`

## Styling Rules
- Border-first separation; avoid heavy cards.
- Very subtle shadows only where needed for hierarchy.
- Consistent spacing scale (8px base).
- Tight typography rhythm; avoid oversized hero patterns.
- Status colors limited to neutral/blue/green with minimal warning red.

## 10) Accessibility and UX Standards

- Keyboard focus visible on all actionable elements.
- Proper heading hierarchy per page (`h1` once, then `h2`).
- ARIA labels on icon-only actions.
- Status indicators must not rely only on color.
- Panel open/close should preserve focus order.
- AI input bar must be reachable and usable on mobile.

## 11) Performance and Production Readiness

- Keep page widgets server-friendly where possible; use client components only for interaction/state.
- Lazy-load charting module for dashboard bottom section.
- Use list virtualization only if item counts become large.
- Keep API payload mapped to minimal domain model.
- Add skeleton loaders for each section instead of full-page blocking spinners.

## 12) Recommended Implementation Phases

1. Build app shell (`Sidebar`, `Header`, `Main`, `AiInputBar`, route group layout).
2. Implement dashboard with static mock data and exact content blocks.
3. Add `RealityCheckPanel` behavior and `uiSlice` trigger flow.
4. Implement domain pages (Study/Work/Finance/Health/Social/DSA/Portfolio).
5. Wire real repositories/use-cases and replace mock data.
6. Add responsive polish, accessibility checks, and loading/empty states.

## 13) Definition of Done (UI)

- Every required page exists and follows the shared shell.
- Light theme is strictly maintained everywhere.
- Dashboard includes all top/middle/bottom sections.
- Reality Check panel is non-blocking and fully functional.
- AI input bar is fixed and accessible across pages.
- Layout never exceeds 3 columns and remains usable on mobile.
- No decorative or concept-style UI elements that reduce usability.

---

This architecture is intentionally simple and implementation-oriented so the team can move directly from structure to build with minimal rework.
