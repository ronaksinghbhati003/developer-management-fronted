/**
 * @file kyInstance.ts
 * @description Configured KY HTTP client instance.
 *
 * Features:
 * - Base URL from environment variables
 * - Default timeout
 * - Auth token injection via beforeRequest hook
 * - 401 auto-redirect to login
 * - Centralized error logging
 *
 * Usage: Import `kyInstance` only within apiService.ts — not directly in components.
 */

import ky, { type KyInstance, type Options, HTTPError } from 'ky';
import { STORAGE_KEYS, HTTP_STATUS, ROUTES } from '@/utils/constants';
import { logger } from '@/utils/logger';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api';
const TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? 10000);

/**
 * Get the stored access token from localStorage.
 * Safe to call in SSR (returns null on server).
 */
function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

/**
 * Remove all auth tokens and redirect to login.
 * Called when a 401 response is received.
 */
function handleUnauthorized(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  window.location.href = ROUTES.LOGIN;
}

const defaultOptions: Options = {
  prefixUrl: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  hooks: {
    // ─── Before Request: Inject Auth Token ───────────────────────────────────
    beforeRequest: [
      (request) => {
        const token = getAccessToken();
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
        logger.debug(`[KY] → ${request.method} ${request.url}`);
      },
    ],

    // ─── After Response: Log Success ─────────────────────────────────────────
    afterResponse: [
      (_request, _options, response) => {
        logger.debug(`[KY] ← ${response.status} ${response.url}`);
        return response;
      },
    ],

    // ─── Before Error: Handle 401 & Log ──────────────────────────────────────
    beforeError: [
      (error: HTTPError) => {
        const { response } = error;
        logger.error(`[KY] Error ${response?.status}`, error.message);
        if (response?.status === HTTP_STATUS.UNAUTHORIZED) {
          handleUnauthorized();
        }
        return error;
      },
    ],
  },
};

export const kyInstance: KyInstance = ky.create(defaultOptions);
