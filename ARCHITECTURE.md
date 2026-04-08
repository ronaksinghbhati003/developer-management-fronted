# Developer Management Frontend — Project Architecture Guide

> **For every developer joining this project.** Read this fully before writing any code.

---

## Tech Stack

| Concern | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v3 |
| State Management | Redux Toolkit (feature-based) |
| HTTP Client | KY |
| Validation | Zod |
| Linting | ESLint v9 (flat config) + Prettier |

---

## Getting Started

```bash
npm install
cp .env .env.local      # Fill in real values for your environment
npm run dev             # Start dev server at http://localhost:3000
npm run type-check      # TypeScript type check
npm run lint            # ESLint check
npm run lint:fix        # ESLint auto-fix
npm run format          # Prettier format
```

---

## Folder Structure

```
src/
├── app/                            # Next.js App Router (pages, layouts)
├── presentation/                   # UI Layer
│   ├── components/common/          # Shared UI: Button, Input, Modal, Spinner
│   ├── hooks/                      # Re-exports typed Redux hooks
│   └── providers/                  # ReduxProvider
├── domain/                         # Business Logic (pure — no framework)
│   ├── entities/                   # Domain models (TypeScript interfaces)
│   ├── repositories/               # Repository contracts (interfaces)
│   └── use-cases/                  # Business rules & orchestration
├── data/                           # Data Access Layer
│   ├── repositories/               # Concrete implementations
│   ├── datasources/                # Raw data source abstractions
│   └── mappers/                    # API response ↔ domain entity transforms
├── store/                          # Redux Toolkit (feature-based)
│   ├── index.ts                    # Store config, RootState, AppDispatch
│   ├── hooks.ts                    # Typed useAppSelector / useAppDispatch
│   └── features/auth/              # Auth slice + selectors
├── services/api/                   # HTTP layer
│   ├── kyInstance.ts               # KY client (auth, hooks, timeout)
│   ├── apiService.ts               # get / post / put / patch / delete
│   └── endpoints.ts                # All endpoint constants
├── lib/
│   └── env.ts                      # Zod-validated env variables
├── tailwind.config.ts              # ⚡ Centralized design tokens (colors, fonts, shadows…)
├── utils/
│   ├── constants.ts                # ROUTES, STORAGE_KEYS, HTTP_STATUS
│   ├── formatters.ts               # Date, number, string formatters
│   ├── validators.ts               # Zod schemas + validation helpers
│   ├── helpers.ts                  # pick, omit, groupBy, retry, sleep…
│   └── logger.ts                   # Dev-only logger (silent in prod)
└── types/
    ├── api.types.ts                # ApiResponse<T>, PaginatedApiResponse<T>
    └── common.types.ts             # AsyncState<T>, LoadingState, SelectOption
```

---

## Architecture Layers

### `tailwind.config.ts` — Centralized Theme ⚡
All design tokens live directly in `tailwind.config.ts`. Change a value here and it propagates everywhere.

```ts
// tailwind.config.ts  ← THE ONLY PLACE to change colors
const colors = {
  primary:         '#6366f1',   // ← Change here → updates all components
  'primary-hover': '#4f46e5',
  background:      '#020617',
  surface:         '#0f172a',
  error:           '#ef4444',
};
// Tailwind generates: bg-primary, text-error, border-border, etc.
```

### `logger.ts` — Dev-Only Logger
```ts
import { logger } from '@/utils/logger';

logger.info('User logged in', { userId });   // ✅ Shows in dev (colored + timestamp)
logger.error('API failed', error);           // ✅ Shows in dev
// ✅ All methods are no-ops in production — zero overhead
```

### `services/api/` — HTTP Layer
```
Component → Redux Thunk → Use Case → Repository → apiService → kyInstance → API
```
- `kyInstance.ts` handles auth token, 401 redirect, logging
- `apiService.ts` exposes `get<T>()`, `post<T>()`, `put<T>()`, `patch<T>()`, `delete<T>()`
- `endpoints.ts` is the only place with URL strings

### `domain/` — Pure Business Logic
No React, Next.js, or KY imports allowed here.
- **Entities** — what objects exist (`User`, `Developer`)
- **Repository interfaces** — what operations are possible (`IAuthRepository`)
- **Use cases** — what business rules apply (`LoginUseCase`, `LogoutUseCase`)

### `data/` — Data Access
- **Repositories** — implement domain interfaces using `apiService`
- **Mappers** — convert snake_case API → camelCase domain models

### `store/` — Redux (Feature-Based)
```tsx
import { useAppDispatch, useAppSelector } from '@/presentation/hooks';
import { loginThunk } from '@/store/features/auth/authSlice';
import { selectIsAuthLoading } from '@/store/features/auth/authSelectors';
```
Always use selectors — never `state.auth.data` directly in components.

### Common UI Components
```tsx
import { Button, Input, Modal, Spinner } from '@/presentation/components/common';

<Button variant="primary" size="md" isLoading={saving}>Save</Button>
<Input label="Email" type="email" error={errors.email?.message} />
<Spinner size="lg" />
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_NAME` | ✅ | App display name |
| `NEXT_PUBLIC_APP_URL` | ✅ | Frontend full URL |
| `NEXT_PUBLIC_APP_ENV` | ✅ | `development` / `production` / `test` |
| `NEXT_PUBLIC_API_BASE_URL` | ✅ | Backend API base URL |
| `NEXT_PUBLIC_API_TIMEOUT` | ❌ | Request timeout ms (default 10000) |

```ts
// Always import from lib/env — not process.env
import { env } from '@/lib/env';
const url = env.NEXT_PUBLIC_API_BASE_URL;
```

---

## Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Component file | PascalCase | `UserCard.tsx` |
| Hook | `use` prefix | `useAuth.ts` |
| Use Case class | PascalCase + `UseCase` | `LoginUseCase` |
| Repository class | PascalCase + `Repository` | `AuthRepository` |
| Interface | `I` prefix | `IAuthRepository` |
| Selector | `select` prefix | `selectCurrentUser` |
| Thunk | `Thunk` suffix | `loginThunk` |
| Constant | SCREAMING_SNAKE | `MAX_RETRY_COUNT` |

---

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format all files
npm run format:check # Check formatting without changes
npm run type-check   # TypeScript check (no emit)
```

---

## Adding a New Feature

```
1. domain/entities/[feature].entity.ts          → Define the domain model
2. domain/repositories/I[Feature]Repository.ts  → Define the contract
3. services/api/endpoints.ts                    → Add endpoint constants
4. data/mappers/[feature]Mapper.ts              → API → domain mapping
5. data/repositories/[Feature]Repository.ts     → Implement the contract
6. domain/use-cases/[feature]/...               → Write business rules
7. store/features/[feature]/[feature]Slice.ts   → Redux slice + thunks
8. store/features/[feature]/[feature]Selectors.ts
9. store/index.ts                               → Register the reducer
10. presentation/components/[feature]/...       → Build UI components
11. app/[feature]/page.tsx                      → Thin page shell only
```

---

## Key Rules

- ❌ Never import from `data/` or `services/` directly in a component — use Redux thunks
- ❌ Never put business logic in Redux slices — that belongs in use cases
- ❌ Never hardcode hex colors in components — use Tailwind tokens; edit only `tailwind.config.ts`
- ❌ Never use `console.log` — use `logger` from `@/utils/logger`
- ❌ Never use `process.env.X` — use `env.X` from `@/lib/env`
- ✅ Define all new API endpoints in `endpoints.ts` first
- ✅ Write mappers to isolate API schema from domain models
- ✅ Always use memoized selectors to read Redux state
