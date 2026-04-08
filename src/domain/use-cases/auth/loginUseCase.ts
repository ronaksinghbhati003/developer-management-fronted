/**
 * @file loginUseCase.ts
 * @description Login use case — pure business logic.
 *
 * Use cases orchestrate domain operations.
 * They depend ONLY on repository interfaces, never on concrete implementations.
 *
 * Usage:
 *   const authRepo = new AuthRepository();  // from data layer
 *   const login = new LoginUseCase(authRepo);
 *   const user = await login.execute({ email, password });
 */

import { injectable, inject } from 'inversify';
import { TYPES } from '@/lib/di/types';
import type { IAuthRepository, LoginCredentials } from '@/domain/repositories/IAuthRepository';
import type { AuthUser } from '@/domain/entities/user.entity';
import { STORAGE_KEYS } from '@/utils/constants';
import { logger } from '@/utils/logger';

@injectable()
export class LoginUseCase {
  constructor(
    @inject(TYPES.IAuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(credentials: LoginCredentials): Promise<AuthUser> {
    logger.info('LoginUseCase: executing login', { email: credentials.email });

    // Business rule: email must be lowercase
    const normalizedCredentials = {
      ...credentials,
      email: credentials.email.toLowerCase().trim(),
    };

    const authUser = await this.authRepository.login(normalizedCredentials);

    // Business rule: persist tokens after successful login
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, authUser.accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, authUser.refreshToken);
    }

    logger.info('LoginUseCase: login successful', { userId: authUser.id });
    return authUser;
  }
}
