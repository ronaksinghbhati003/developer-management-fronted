/**
 * @file DeveloperRepository.ts
 * @description Concrete implementation of IDeveloperRepository.
 */

import { injectable } from 'inversify';
import type { IDeveloperRepository, GetDevelopersParams } from '@/domain/repositories/IDeveloperRepository';
import type { Developer } from '@/domain/entities/developer.entity';
import { apiService } from '@/services/api/apiService';
import { ENDPOINTS } from '@/services/api/endpoints';
import { developerMapper, type DeveloperApiResponse } from '@/data/mappers/developerMapper';
import type { PaginatedApiResponse } from '@/types/api.types';

@injectable()
export class DeveloperRepository implements IDeveloperRepository {
  async getAll(params?: GetDevelopersParams): Promise<PaginatedApiResponse<Developer>> {
    const response = await apiService.get<PaginatedApiResponse<DeveloperApiResponse>>(
      ENDPOINTS.DEVELOPERS.LIST,
      { searchParams: params as Record<string, string | number> }
    );

    return {
      ...response,
      data: developerMapper.toDomainList(response.data),
    };
  }

  async getById(id: string): Promise<Developer> {
    const response = await apiService.get<DeveloperApiResponse>(ENDPOINTS.DEVELOPERS.DETAIL(id));
    return developerMapper.toDomain(response);
  }

  async create(data: Omit<Developer, 'id' | 'joinedAt'>): Promise<Developer> {
    const response = await apiService.post<DeveloperApiResponse>(ENDPOINTS.DEVELOPERS.CREATE, {
      json: data,
    });
    return developerMapper.toDomain(response);
  }

  async update(id: string, data: Partial<Developer>): Promise<Developer> {
    const response = await apiService.patch<DeveloperApiResponse>(ENDPOINTS.DEVELOPERS.UPDATE(id), {
      json: data,
    });
    return developerMapper.toDomain(response);
  }

  async delete(id: string): Promise<void> {
    await apiService.delete(ENDPOINTS.DEVELOPERS.DELETE(id));
  }
}
