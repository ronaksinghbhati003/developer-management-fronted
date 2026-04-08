/**
 * @file constants.ts
 * @description Application-wide constants.
 * Import from here instead of hardcoding magic strings.
 */

// ─── App Meta ─────────────────────────────────────────────────────────────────

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'Developer Management';
export const APP_VERSION = '1.0.0';

// ─── Storage Keys ─────────────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'dm_access_token',
  REFRESH_TOKEN: 'dm_refresh_token',
  USER_PROFILE: 'dm_user_profile',
  THEME: 'dm_theme',
} as const;

// ─── Route Paths ──────────────────────────────────────────────────────────────

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

// ─── Pagination Defaults ──────────────────────────────────────────────────────

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

// ─── HTTP Status Codes ────────────────────────────────────────────────────────

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// ─── Date/Time ────────────────────────────────────────────────────────────────

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy HH:mm',
  TIME: 'HH:mm',
} as const;
