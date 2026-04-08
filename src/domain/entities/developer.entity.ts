/**
 * @file developer.entity.ts
 * @description Core Developer domain entity.
 */

export interface Developer {
  id: string;
  userId: string;
  name: string;
  email: string;
  skills: string[];
  experienceYears: number;
  designation: string;
  department: string;
  status: DeveloperStatus;
  joinedAt: Date;
}

export type DeveloperStatus = 'available' | 'assigned' | 'on-leave' | 'inactive';
