/**
 * @file logoutUseCase.ts
 * @description Logout use case — clears tokens and calls the API.
 */

import { injectable, inject } from 'inversify';
import { TYPES } from '@/lib/di/types';
import type { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import { STORAGE_KEYS } from '@/utils/constants';
import { logger } from '@/utils/logger';

@injectable()
export class LogoutUseCase {
  constructor(
    @inject(TYPES.IAuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(): Promise<void> {
    logger.info('LogoutUseCase: executing logout');

    try {
      await this.authRepository.logout();
    } catch (error) {
      // Even if server-side logout fails, clean up locally
      logger.warn('LogoutUseCase: server logout failed, cleaning up locally', error);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
      }
    }

    logger.info('LogoutUseCase: logout complete');
  }
}
