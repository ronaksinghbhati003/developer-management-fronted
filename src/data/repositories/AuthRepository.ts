/**
 * @file AuthRepository.ts
 * @description Concrete implementation of IAuthRepository.
 * Uses apiService to make HTTP calls and authMapper to transform responses.
 *
 * This is the ONLY file that knows about both the API shape and the domain shape.
 */

import { injectable } from 'inversify';
import type { IAuthRepository, LoginCredentials, RegisterCredentials } from '@/domain/repositories/IAuthRepository';
import type { AuthUser, User } from '@/domain/entities/user.entity';
import { apiService } from '@/services/api/apiService';
import { ENDPOINTS } from '@/services/api/endpoints';
import { authMapper, type AuthApiResponse } from '@/data/mappers/authMapper';

@injectable()
export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    const response = await apiService.post<AuthApiResponse>(ENDPOINTS.AUTH.LOGIN, {
      json: credentials,
    });
    return authMapper.toAuthUser(response);
  }

  async register(credentials: RegisterCredentials): Promise<AuthUser> {
    const response = await apiService.post<AuthApiResponse>(ENDPOINTS.AUTH.REGISTER, {
      json: credentials,
    });
    return authMapper.toAuthUser(response);
  }

  async logout(): Promise<void> {
    await apiService.post<void>(ENDPOINTS.AUTH.LOGOUT);
  }

  async getMe(): Promise<User> {
    // Remove leading slash - KY prefixUrl requires paths without leading slash
    const url = ENDPOINTS.AUTH.ME.replace(/^\//, '');
    const response = await apiService.get<Omit<AuthApiResponse, 'access_token' | 'refresh_token'>>(url);
    return authMapper.toUser(response);
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await apiService.post<{ access_token: string; refresh_token: string }>(
      ENDPOINTS.AUTH.REFRESH,
      { json: { refresh_token: refreshToken } },
    );
    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };
  }
}
