/**
 * @file env.ts
 * @description Environment variable validation using Zod.
 * All env variables are validated at startup — missing vars will throw at build time.
 */

import { z } from 'zod';

const envSchema = z.object({
  // App
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_APP_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // API
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_API_TIMEOUT: z.string().transform(Number).default('10000'),

  // Auth
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  NEXTAUTH_URL: z.string().url().optional(),
});

// Parse and validate - will throw descriptive errors if vars are missing
const _env = envSchema.safeParse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
});

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables. Check your .env file.');
}

export const env = _env.data;
