/**
 * @file types.ts
 * @description Dependency injection symbols for InversifyJS.
 * Using Symbols ensures that there are no naming collisions.
 */

export const TYPES = {
  // Repositories
  IAuthRepository: Symbol.for('IAuthRepository'),
  IDeveloperRepository: Symbol.for('IDeveloperRepository'),

  // Use Cases - Auth
  LoginUseCase: Symbol.for('LoginUseCase'),
  LogoutUseCase: Symbol.for('LogoutUseCase'),

  // Use Cases - Developer
  GetDevelopersUseCase: Symbol.for('GetDevelopersUseCase'),
  GetDeveloperByIdUseCase: Symbol.for('GetDeveloperByIdUseCase'),
  CreateDeveloperUseCase: Symbol.for('CreateDeveloperUseCase'),
  UpdateDeveloperUseCase: Symbol.for('UpdateDeveloperUseCase'),
  DeleteDeveloperUseCase: Symbol.for('DeleteDeveloperUseCase'),
};
