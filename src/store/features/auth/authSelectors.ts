/**
 * @file authSelectors.ts
 * @description Memoized selectors for the auth slice.
 * Always use selectors to read Redux state — never access state.auth directly in components.
 *
 * Usage:
 *   const user = useAppSelector(selectCurrentUser);
 *   const isAuth = useAppSelector(selectIsAuthenticated);
 */

import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

// ─── Base Selector ────────────────────────────────────────────────────────────
const selectAuthState = (state: RootState) => state.auth;

// ─── Derived Selectors ────────────────────────────────────────────────────────

export const selectCurrentUser = createSelector(
  selectAuthState,
  (auth) => auth.data,
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (auth) => auth.isAuthenticated,
);

export const selectAuthStatus = createSelector(
  selectAuthState,
  (auth) => auth.status,
);

export const selectAuthError = createSelector(
  selectAuthState,
  (auth) => auth.error,
);

export const selectIsAuthLoading = createSelector(
  selectAuthState,
  (auth) => auth.status === 'loading',
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (auth) => auth.accessToken,
);

export const selectUserRole = createSelector(
  selectCurrentUser,
  (user) => user?.role ?? null,
);
