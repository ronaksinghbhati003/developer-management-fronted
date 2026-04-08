/**
 * @file formatters.ts
 * @description Pure formatting utility functions.
 * No side effects — input in, formatted string out.
 */

// ─── Date Formatters ──────────────────────────────────────────────────────────

/**
 * Format a date to a readable string.
 * @example formatDate(new Date()) => "Apr 09, 2025"
 */
export function formatDate(date: Date | string | number, locale = 'en-US'): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: '2-digit' });
}

/**
 * Format a date to include time.
 * @example formatDateTime(new Date()) => "Apr 09, 2025, 10:30 AM"
 */
export function formatDateTime(date: Date | string | number, locale = 'en-US'): string {
  const d = new Date(date);
  return d.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Returns a human-friendly relative time string.
 * @example timeAgo(new Date(Date.now() - 60000)) => "1 minute ago"
 */
export function timeAgo(date: Date | string | number): string {
  const now = Date.now();
  const diff = now - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);

  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second'],
  ];

  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count !== 1 ? 's' : ''} ago`;
  }

  return 'just now';
}

// ─── Number Formatters ────────────────────────────────────────────────────────

/**
 * Format a number as currency.
 * @example formatCurrency(1500) => "$1,500.00"
 */
export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale = 'en-US',
): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

/**
 * Format a large number with commas.
 * @example formatNumber(1000000) => "1,000,000"
 */
export function formatNumber(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

// ─── String Formatters ────────────────────────────────────────────────────────

/**
 * Capitalize the first letter of a string.
 * @example capitalize("hello world") => "Hello world"
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert a string to title case.
 * @example toTitleCase("hello world") => "Hello World"
 */
export function toTitleCase(str: string): string {
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * Truncate a string with ellipsis.
 * @example truncate("Hello World", 5) => "Hello..."
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
}

/**
 * Format bytes to human-readable file size.
 * @example formatBytes(1048576) => "1 MB"
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}
