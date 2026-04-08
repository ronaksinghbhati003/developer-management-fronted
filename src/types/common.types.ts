/**
 * @file common.types.ts
 * @description Shared TypeScript utility types used across the entire application.
 */

// ─── Utility Types ─────────────────────────────────────────────────────────────

/** Makes specific keys of T optional */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Makes specific keys of T required */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** Deep partial - makes all nested properties optional */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Extract the value type from a Promise */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/** ID type used across entities */
export type ID = string | number;

// ─── UI State Types ────────────────────────────────────────────────────────────

export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AsyncState<T> {
  data: T | null;
  status: LoadingState;
  error: string | null;
}

// ─── Common Component Props ───────────────────────────────────────────────────

export interface BaseComponentProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

// ─── Option Type ──────────────────────────────────────────────────────────────

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

// ─── Environment ──────────────────────────────────────────────────────────────

export type Environment = 'development' | 'production' | 'test';
