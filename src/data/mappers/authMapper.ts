/**
 * @file authMapper.ts
 * @description Maps raw API response to domain AuthUser entity.
 * Keeps API schema changes isolated — only update mappers, not domain or UI code.
 */

import type { AuthUser, User } from '@/domain/entities/user.entity';

/** Raw shape returned from the Auth API */
export interface AuthApiResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  avatar_url?: string;
  access_token: string;
  refresh_token: string;
  created_at: string;
  updated_at: string;
}

export const authMapper = {
  /**
   * Map API login response to AuthUser domain entity.
   */
  toAuthUser(raw: AuthApiResponse): AuthUser {
    return {
      id: raw.id,
      email: raw.email,
      firstName: raw.first_name,
      lastName: raw.last_name,
      fullName: `${raw.first_name} ${raw.last_name}`,
      role: raw.role as AuthUser['role'],
      status: raw.status as AuthUser['status'],
      avatar: raw.avatar_url,
      accessToken: raw.access_token,
      refreshToken: raw.refresh_token,
      createdAt: new Date(raw.created_at),
      updatedAt: new Date(raw.updated_at),
    };
  },

  /**
   * Map API user response to User domain entity.
   */
  toUser(raw: Omit<AuthApiResponse, 'access_token' | 'refresh_token'>): User {
    return {
      id: raw.id,
      email: raw.email,
      firstName: raw.first_name,
      lastName: raw.last_name,
      fullName: `${raw.first_name} ${raw.last_name}`,
      role: raw.role as User['role'],
      status: raw.status as User['status'],
      avatar: raw.avatar_url,
      createdAt: new Date(raw.created_at),
      updatedAt: new Date(raw.updated_at),
    };
  },
};
