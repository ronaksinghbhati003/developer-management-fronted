/**
 * @file CreateDeveloperUseCase.ts
 * @description Use case to create a new developer.
 */

import { injectable, inject } from 'inversify';
import { TYPES } from '@/lib/di/types';
import type { IDeveloperRepository } from '@/domain/repositories/IDeveloperRepository';
import type { Developer } from '@/domain/entities/developer.entity';

@injectable()
export class CreateDeveloperUseCase {
  constructor(
    @inject(TYPES.IDeveloperRepository)
    private readonly developerRepository: IDeveloperRepository
  ) {}

  async execute(data: Omit<Developer, 'id' | 'joinedAt'>): Promise<Developer> {
    return await this.developerRepository.create(data);
  }
}
