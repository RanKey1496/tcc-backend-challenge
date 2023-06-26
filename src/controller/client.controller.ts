import { Application, NextFunction, Request, Response } from 'express';
import { RegistrableController } from './RegistrableController';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { inject, injectable } from 'inversify';
import Types from '../config/types';
import { dataResponse } from '../util/response';
import { ClientService } from '../service/client.service';
import { IdentificationType } from '../entity/client.entity';

@injectable()
export class ClientController implements RegistrableController {

    @inject(Types.AuthMiddleware)
    private authMiddleware: AuthMiddleware;

    @inject(Types.ClientService)
    private clientService: ClientService;

    public register(app: Application): void {

        app.get('/client/', this.authMiddleware.isAuthenticated.bind(this.authMiddleware),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const result = await this.clientService.getAll();
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });

        app.get('/client/:identification', this.authMiddleware.isAuthenticated.bind(this.authMiddleware),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { identification } = req.params;
                    const identificationType: IdentificationType = IdentificationType[String(req.query.identificationType) as keyof typeof IdentificationType];
                    const result = await this.clientService.getByIdentificationAndType(identification, identificationType);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });

        app.post('/client/', this.authMiddleware.isAuthenticated.bind(this.authMiddleware),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { identification, identificationType, name, gender } = req.body;
                    await this.clientService.validateClientDoesntExists(identification, identificationType);
                    await this.clientService.save(identification, identificationType, name, gender);
                    return dataResponse(res, 'Cliente guardado exitosamente');
                } catch (error) {
                    return next(error);
                }
            });

        app.put('/client/', this.authMiddleware.isAuthenticated.bind(this.authMiddleware),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { identification, identificationType, name, gender } = req.body;
                    const client = await this.clientService.getByIdentificationAndType(identification, identificationType);
                    await this.clientService.update(client, name, gender);
                    return dataResponse(res, 'Cliente actualizado exitosamente');
                } catch (error) {
                    return next(error);
                }
            });

        app.delete('/client/:identification', this.authMiddleware.isAuthenticated.bind(this.authMiddleware),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { identification } = req.params;
                    const identificationType: IdentificationType = IdentificationType[String(req.query.identificationType) as keyof typeof IdentificationType];
                    const client = await this.clientService.getByIdentificationAndType(identification, identificationType);
                    await this.clientService.delete(client);
                    return dataResponse(res, 'Cliente eliminado exitosamente');
                } catch (error) {
                    return next(error);
                }
            });

    }

}