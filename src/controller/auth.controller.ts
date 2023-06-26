import { inject, injectable } from 'inversify';
import { RegistrableController } from './RegistrableController';
import { Application, NextFunction, Request, Response } from 'express';
import Types from '../config/types';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { dataResponse } from '../util/response';

@injectable()
export class AuthController implements RegistrableController {

    @inject(Types.AuthMiddleware)
    private authMiddleware: AuthMiddleware;

    public register(app: Application): void {

        app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { email, password } = req.body;
                const user = await this.authMiddleware.login(email, password);
                return dataResponse(res, user);
            } catch (error) {
                return next(error);
            }
        });

    }

}