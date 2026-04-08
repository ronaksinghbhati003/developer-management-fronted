/**
 * @file IDeveloperRepository.ts
 * @description Developer repository interface.
 */

import type { Developer } from '@/domain/entities/developer.entity';
import type { PaginatedApiResponse } from '@/types/api.types';

export interface GetDevelopersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: Developer['status'];
}

export interface IDeveloperRepository {
  getAll(params?: GetDevelopersParams): Promise<PaginatedApiResponse<Developer>>;
  getById(id: string): Promise<Developer>;
  create(data: Omit<Developer, 'id' | 'joinedAt'>): Promise<Developer>;
  update(id: string, data: Partial<Developer>): Promise<Developer>;
  delete(id: string): Promise<void>;
}
