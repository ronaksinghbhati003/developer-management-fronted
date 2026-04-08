/**
 * @file index.ts
 * @description Redux store configuration.
 *
 * Add new feature reducers here as the app grows.
 * RootState and AppDispatch are inferred and exported for typed hooks.
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add more feature reducers here:
    // developers: developersReducer,
    // ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serializable check for Date objects in entities
      serializableCheck: {
        ignoredActions: ['auth/login/fulfilled', 'auth/getMe/fulfilled'],
        ignoredPaths: ['auth.data.createdAt', 'auth.data.updatedAt'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

/** Root state type — automatically inferred from all reducers */
export type RootState = ReturnType<typeof store.getState>;

/** App dispatch type — supports thunks */
export type AppDispatch = typeof store.dispatch;
