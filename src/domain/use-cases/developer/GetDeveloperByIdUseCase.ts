/**
 * @file GetDeveloperByIdUseCase.ts
 * @description Use case to fetch a single developer by ID.
 */

import { injectable, inject } from 'inversify';
import { TYPES } from '@/lib/di/types';
import type { IDeveloperRepository } from '@/domain/repositories/IDeveloperRepository';
import type { Developer } from '@/domain/entities/developer.entity';

@injectable()
export class GetDeveloperByIdUseCase {
  constructor(
    @inject(TYPES.IDeveloperRepository)
    private readonly developerRepository: IDeveloperRepository
  ) {}

  async execute(id: string): Promise<Developer> {
    return await this.developerRepository.getById(id);
  }
}
