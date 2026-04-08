/**
 * @file GetDevelopersUseCase.ts
 * @description Use case to fetch paginated developers.
 */

import { injectable, inject } from 'inversify';
import { TYPES } from '@/lib/di/types';
import type { IDeveloperRepository, GetDevelopersParams } from '@/domain/repositories/IDeveloperRepository';
import type { Developer } from '@/domain/entities/developer.entity';
import type { PaginatedApiResponse } from '@/types/api.types';

@injectable()
export class GetDevelopersUseCase {
  constructor(
    @inject(TYPES.IDeveloperRepository)
    private readonly developerRepository: IDeveloperRepository
  ) {}

  async execute(params?: GetDevelopersParams): Promise<PaginatedApiResponse<Developer>> {
    return await this.developerRepository.getAll(params);
  }
}
