import { Container } from 'inversify';
import Types from './types';
import { RegistrableController } from '../controller/RegistrableController';
import { AuthMiddleware, AuthMiddlewareImpl } from '../middleware/auth.middleware';
import { FirebaseService, FirebaseServiceImpl } from '../service/firebase.service';
import { AuthController } from '../controller/auth.controller';
import { ClientController } from '../controller/client.controller';
import { ClientService, ClientServiceImpl } from '../service/client.service';
import { ClientRepository } from '../repository/client.repository';

const container: Container = new Container();

// Controllers
container.bind<RegistrableController>(Types.Controller).to(ClientController);
container.bind<RegistrableController>(Types.Controller).to(AuthController);

// Middlewares
container.bind<AuthMiddleware>(Types.AuthMiddleware).to(AuthMiddlewareImpl);

// Services
container.bind<FirebaseService>(Types.FirebaseService).to(FirebaseServiceImpl);
container.bind<ClientService>(Types.ClientService).to(ClientServiceImpl);

// Repositories
container.bind<ClientRepository>(Types.ClientRepository).to(ClientRepository);

export { container };