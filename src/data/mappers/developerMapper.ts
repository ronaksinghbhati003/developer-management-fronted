/**
 * @file developerMapper.ts
 * @description Mapper to transform API developer responses to domain entities.
 */

import type { Developer } from '@/domain/entities/developer.entity';

export interface DeveloperApiResponse {
  id: string;
  userId: string;
  name: string;
  email: string;
  skills: string[];
  experience_years: number;
  designation: string;
  department: string;
  status: Developer['status'];
  joined_at: string;
}

export const developerMapper = {
  /**
   * Transforms an API response into a domain Developer entity.
   */
  toDomain(apiDev: DeveloperApiResponse): Developer {
    return {
      id: apiDev.id,
      userId: apiDev.userId,
      name: apiDev.name,
      email: apiDev.email,
      skills: apiDev.skills,
      experienceYears: apiDev.experience_years,
      designation: apiDev.designation,
      department: apiDev.department,
      status: apiDev.status,
      joinedAt: new Date(apiDev.joined_at),
    };
  },

  /**
   * Transforms a list of API responses into domain entities.
   */
  toDomainList(apiDevs: DeveloperApiResponse[]): Developer[] {
    return apiDevs.map(this.toDomain);
  },
};
