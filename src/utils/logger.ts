/**
 * @file logger.ts
 * @description Centralized logger utility.
 * Logs are ONLY shown in development environment.
 * In production, all log methods are no-ops for zero performance overhead.
 *
 * Usage:
 *   import { logger } from '@/utils/logger';
 *   logger.info('User logged in', { userId: 1 });
 *   logger.warn('Token expiring soon');
 *   logger.error('API call failed', error);
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'group' | 'groupEnd';

const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === 'development' ||
  process.env.NODE_ENV === 'development';

const PREFIX = '[DevMgmt]';

const COLORS: Record<string, string> = {
  info: '#4ade80',    // green
  warn: '#facc15',    // yellow
  error: '#f87171',  // red
  debug: '#60a5fa',  // blue
};

function createLogger(level: LogLevel) {
  // In production, return a no-op function
  if (!isDevelopment) {
    return (): void => { /* no-op in production */ };
  }

  return (message: string, ...args: unknown[]): void => {
    const timestamp = new Date().toISOString();
    const color = COLORS[level] ?? '#ffffff';

    switch (level) {
      case 'info':
        console.info(
          `%c${PREFIX} [INFO] ${timestamp}:`,
          `color: ${color}; font-weight: bold;`,
          message,
          ...args,
        );
        break;
      case 'warn':
        console.warn(
          `%c${PREFIX} [WARN] ${timestamp}:`,
          `color: ${color}; font-weight: bold;`,
          message,
          ...args,
        );
        break;
      case 'error':
        console.error(
          `%c${PREFIX} [ERROR] ${timestamp}:`,
          `color: ${color}; font-weight: bold;`,
          message,
          ...args,
        );
        break;
      case 'debug':
        console.debug(
          `%c${PREFIX} [DEBUG] ${timestamp}:`,
          `color: ${color}; font-weight: bold;`,
          message,
          ...args,
        );
        break;
      case 'group':
        console.group(`%c${PREFIX} ${message}`, `color: ${color}; font-weight: bold;`);
        break;
      case 'groupEnd':
        console.groupEnd();
        break;
      default:
        console.log(message, ...args);
    }
  };
}

export const logger = {
  info: createLogger('info'),
  warn: createLogger('warn'),
  error: createLogger('error'),
  debug: createLogger('debug'),
  group: createLogger('group'),
  groupEnd: createLogger('groupEnd'),
} as const;
