/**
 * @file container.ts
 * @description InversifyJS DI container configuration.
 */

import { Container } from 'inversify';
import { TYPES } from './types';

// Repositories
import type { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import { AuthRepository } from '@/data/repositories/AuthRepository';
import type { IDeveloperRepository } from '@/domain/repositories/IDeveloperRepository';
import { DeveloperRepository } from '@/data/repositories/DeveloperRepository';

// Use Cases - Auth
import { LoginUseCase } from '@/domain/use-cases/auth/loginUseCase';
import { LogoutUseCase } from '@/domain/use-cases/auth/logoutUseCase';

// Use Cases - Developer
import { GetDevelopersUseCase } from '@/domain/use-cases/developer/GetDevelopersUseCase';
import { GetDeveloperByIdUseCase } from '@/domain/use-cases/developer/GetDeveloperByIdUseCase';
import { CreateDeveloperUseCase } from '@/domain/use-cases/developer/CreateDeveloperUseCase';
import { UpdateDeveloperUseCase } from '@/domain/use-cases/developer/UpdateDeveloperUseCase';
import { DeleteDeveloperUseCase } from '@/domain/use-cases/developer/DeleteDeveloperUseCase';

const container = new Container();

// ─── Bind Repositories ────────────────────────────────────────────────────────

container.bind<IAuthRepository>(TYPES.IAuthRepository).to(AuthRepository).inSingletonScope();
container.bind<IDeveloperRepository>(TYPES.IDeveloperRepository).to(DeveloperRepository).inSingletonScope();

// ─── Bind Auth Use Cases ──────────────────────────────────────────────────────

container.bind<LoginUseCase>(TYPES.LoginUseCase).to(LoginUseCase);
container.bind<LogoutUseCase>(TYPES.LogoutUseCase).to(LogoutUseCase);

// ─── Bind Developer Use Cases ─────────────────────────────────────────────────

container.bind<GetDevelopersUseCase>(TYPES.GetDevelopersUseCase).to(GetDevelopersUseCase);
container.bind<GetDeveloperByIdUseCase>(TYPES.GetDeveloperByIdUseCase).to(GetDeveloperByIdUseCase);
container.bind<CreateDeveloperUseCase>(TYPES.CreateDeveloperUseCase).to(CreateDeveloperUseCase);
container.bind<UpdateDeveloperUseCase>(TYPES.UpdateDeveloperUseCase).to(UpdateDeveloperUseCase);
container.bind<DeleteDeveloperUseCase>(TYPES.DeleteDeveloperUseCase).to(DeleteDeveloperUseCase);

export { container };
