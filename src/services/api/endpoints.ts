/**
 * @file endpoints.ts
 * @description Centralized API endpoint registry.
 * All endpoint strings must be defined here — never hardcode URLs in components or use cases.
 *
 * Usage:
 *   import { ENDPOINTS } from '@/services/api/endpoints';
 *   apiService.get(ENDPOINTS.AUTH.ME)
 */

export const ENDPOINTS = {
  // ─── Auth ──────────────────────────────────────────────────────────────────
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // ─── Users ─────────────────────────────────────────────────────────────────
  USERS: {
    LIST: '/users',
    DETAIL: (id: string | number) => `/users/${id}`,
    UPDATE: (id: string | number) => `/users/${id}`,
    DELETE: (id: string | number) => `/users/${id}`,
    PROFILE: '/users/profile',
  },

  // ─── Developers ────────────────────────────────────────────────────────────
  DEVELOPERS: {
    LIST: '/developers',
    DETAIL: (id: string | number) => `/developers/${id}`,
    CREATE: '/developers',
    UPDATE: (id: string | number) => `/developers/${id}`,
    DELETE: (id: string | number) => `/developers/${id}`,
  },
} as const;
