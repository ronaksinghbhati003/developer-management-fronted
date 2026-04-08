/**
 * @file apiService.ts
 * @description Common API service wrapping the KY instance.
 * Provides typed get/post/put/patch/delete methods used across all repositories.
 *
 * Usage:
 *   import { apiService } from '@/services/api/apiService';
 *
 *   const users = await apiService.get<User[]>('users');
 *   const user  = await apiService.post<User>('auth/login', { json: { email, password } });
 */

import type { Options } from 'ky';
import { kyInstance } from './kyInstance';
import { logger } from '@/utils/logger';
import type { ApiResponse } from '@/types/api.types';

// ─── API Service ──────────────────────────────────────────────────────────────

class ApiService {
  /**
   * HTTP GET request.
   * @param url - Endpoint path (relative to base URL, no leading slash)
   * @param options - Optional KY request options (searchParams, headers, etc.)
   */
  async get<T>(url: string, options?: Options): Promise<T> {
    try {
      return await kyInstance.get(url, options).json<T>();
    } catch (error) {
      logger.error(`GET ${url} failed`, error);
      throw error;
    }
  }

  /**
   * HTTP POST request.
   * @param url - Endpoint path
   * @param options - KY options; use `{ json: payload }` to send a JSON body
   */
  async post<T>(url: string, options?: Options): Promise<T> {
    try {
      return await kyInstance.post(url, options).json<T>();
    } catch (error) {
      logger.error(`POST ${url} failed`, error);
      throw error;
    }
  }

  /**
   * HTTP PUT request (full update).
   */
  async put<T>(url: string, options?: Options): Promise<T> {
    try {
      return await kyInstance.put(url, options).json<T>();
    } catch (error) {
      logger.error(`PUT ${url} failed`, error);
      throw error;
    }
  }

  /**
   * HTTP PATCH request (partial update).
   */
  async patch<T>(url: string, options?: Options): Promise<T> {
    try {
      return await kyInstance.patch(url, options).json<T>();
    } catch (error) {
      logger.error(`PATCH ${url} failed`, error);
      throw error;
    }
  }

  /**
   * HTTP DELETE request.
   */
  async delete<T>(url: string, options?: Options): Promise<T> {
    try {
      return await kyInstance.delete(url, options).json<T>();
    } catch (error) {
      logger.error(`DELETE ${url} failed`, error);
      throw error;
    }
  }

  /**
   * Unwrap a standard ApiResponse<T> envelope.
   * Use when your API returns { data: T, message: string, success: boolean }
   */
  async getUnwrapped<T>(url: string, options?: Options): Promise<T> {
    const response = await this.get<ApiResponse<T>>(url, options);
    return response.data;
  }

  async postUnwrapped<T>(url: string, options?: Options): Promise<T> {
    const response = await this.post<ApiResponse<T>>(url, options);
    return response.data;
  }
}

// Export a single shared instance
export const apiService = new ApiService();
