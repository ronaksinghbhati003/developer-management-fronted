/**
 * @file validators.ts
 * @description Pure validation utility functions using Zod schemas.
 * Returns boolean or typed validation results — no side effects.
 */

import { z } from 'zod';

// ─── Common Schemas ───────────────────────────────────────────────────────────

export const emailSchema = z.string().email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number');

export const urlSchema = z.string().url('Please enter a valid URL');

// ─── Validator Functions ──────────────────────────────────────────────────────

/**
 * Validate an email address.
 */
export function isValidEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

/**
 * Validate a password against security rules.
 */
export function isValidPassword(password: string): boolean {
  return passwordSchema.safeParse(password).success;
}

/**
 * Validate a phone number (E.164 format).
 */
export function isValidPhone(phone: string): boolean {
  return phoneSchema.safeParse(phone).success;
}

/**
 * Validate a URL.
 */
export function isValidUrl(url: string): boolean {
  return urlSchema.safeParse(url).success;
}

/**
 * Check if a value is empty (null, undefined, empty string, or empty array).
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Get Zod field errors as a plain object.
 * @example getZodErrors(result.error) => { email: "Invalid email" }
 */
export function getZodErrors(error: z.ZodError): Record<string, string> {
  return error.errors.reduce<Record<string, string>>((acc, err) => {
    const key = err.path.join('.');
    acc[key] = err.message;
    return acc;
  }, {});
}
