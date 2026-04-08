/**
 * @file api.types.ts
 * @description Global API response wrapper types used throughout the application.
 * All API responses should conform to these contracts.
 */

// ─── Generic API Response Wrapper ─────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

export interface PaginatedApiResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ─── API Error ─────────────────────────────────────────────────────────────────

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// ─── Request Options ──────────────────────────────────────────────────────────

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}
