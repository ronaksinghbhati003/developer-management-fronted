/**
 * @file DeleteDeveloperUseCase.ts
 * @description Use case to delete a developer.
 */

import { injectable, inject } from 'inversify';
import { TYPES } from '@/lib/di/types';
import type { IDeveloperRepository } from '@/domain/repositories/IDeveloperRepository';

@injectable()
export class DeleteDeveloperUseCase {
  constructor(
    @inject(TYPES.IDeveloperRepository)
    private readonly developerRepository: IDeveloperRepository
  ) {}

  async execute(id: string): Promise<void> {
    return await this.developerRepository.delete(id);
  }
}
