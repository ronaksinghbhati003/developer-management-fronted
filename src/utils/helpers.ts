/**
 * @file helpers.ts
 * @description General-purpose utility helper functions.
 */

// ─── Object Helpers ───────────────────────────────────────────────────────────

/**
 * Remove undefined and null keys from an object (shallow).
 * Useful for cleaning query params before sending to API.
 */
export function removeEmpty<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== null && value !== undefined),
  ) as Partial<T>;
}

/**
 * Deep clone an object using structuredClone (safe for JSON-serializable data).
 */
export function deepClone<T>(value: T): T {
  return structuredClone(value);
}

/**
 * Pick specific keys from an object.
 * @example pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) => { a: 1, c: 3 }
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      if (key in obj) acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>,
  );
}

/**
 * Omit specific keys from an object.
 * @example omit({ a: 1, b: 2, c: 3 }, ['b']) => { a: 1, c: 3 }
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

// ─── Array Helpers ─────────────────────────────────────────────────────────────

/**
 * Group an array of objects by a key.
 * @example groupBy([{type:'a',...},{type:'b',...}], 'type') => { a: [...], b: [...] }
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce<Record<string, T[]>>((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {});
}

/**
 * Remove duplicate values from an array.
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Chunk an array into smaller arrays of the given size.
 * @example chunk([1,2,3,4,5], 2) => [[1,2],[3,4],[5]]
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// ─── Async Helpers ─────────────────────────────────────────────────────────────

/**
 * Sleep / delay utility.
 * @example await sleep(1000); // wait 1 second
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry an async function a given number of times before throwing.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 1000,
): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
      await sleep(delayMs);
    }
  }
  throw new Error('retry: unreachable');
}

// ─── String Helpers ───────────────────────────────────────────────────────────

/**
 * Generate a random alphanumeric ID.
 * @example generateId(8) => "a1b2c3d4"
 */
export function generateId(length = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * Convert a string to a URL-friendly slug.
 * @example toSlug("Hello World!") => "hello-world"
 */
export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}
