/**
 * @file user.entity.ts
 * @description Core User domain entity.
 * This is the domain model — NOT the API response shape.
 * Free from any API/framework concerns.
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'admin' | 'manager' | 'developer' | 'viewer';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface AuthUser extends User {
  accessToken: string;
  refreshToken: string;
}
