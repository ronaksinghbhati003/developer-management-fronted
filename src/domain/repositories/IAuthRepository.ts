/**
 * @file IAuthRepository.ts
 * @description Auth repository interface (contract).
 * The domain layer defines WHAT operations exist.
 * The data layer provides the HOW (concrete implementation).
 *
 * This allows swapping implementation (e.g., REST → GraphQL) without
 * touching any business logic or UI code.
 */

import type { AuthUser, User } from '@/domain/entities/user.entity';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
}

export interface IAuthRepository {
  /**
   * Authenticate a user with email and password.
   * Returns the authenticated user with tokens.
   */
  login(credentials: LoginCredentials): Promise<AuthUser>;

  /**
   * Register a new user account.
   */
  register(credentials: RegisterCredentials): Promise<AuthUser>;

  /**
   * Log out the current user. Invalidates tokens on the server.
   */
  logout(): Promise<void>;

  /**
   * Fetch the currently authenticated user's profile.
   */
  getMe(): Promise<User>;

  /**
   * Refresh the access token using the stored refresh token.
   */
  refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }>;
}
