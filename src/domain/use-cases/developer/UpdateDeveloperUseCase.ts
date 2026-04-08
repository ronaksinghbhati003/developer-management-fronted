/**
 * @file UpdateDeveloperUseCase.ts
 * @description Use case to update an existing developer.
 */

import { injectable, inject } from 'inversify';
import { TYPES } from '@/lib/di/types';
import type { IDeveloperRepository } from '@/domain/repositories/IDeveloperRepository';
import type { Developer } from '@/domain/entities/developer.entity';

@injectable()
export class UpdateDeveloperUseCase {
  constructor(
    @inject(TYPES.IDeveloperRepository)
    private readonly developerRepository: IDeveloperRepository
  ) {}

  async execute(id: string, data: Partial<Developer>): Promise<Developer> {
    return await this.developerRepository.update(id, data);
  }
}
