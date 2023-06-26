import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { Unauthorize } from '../util/exceptions';
import { FirebaseService } from '../service/firebase.service';
import Types from '../config/types';

export interface AuthMiddleware {
    isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void>;
    login(email: string, password: string): Promise<void>;
}

@injectable()
export class AuthMiddlewareImpl implements AuthMiddleware {

    constructor(@inject(Types.FirebaseService) private firebaseService: FirebaseService) {}

    public async login(email: string, password: string): Promise<void> {
        try {
            const token = await this.firebaseService.signIn(email, password);
            return token;
        } catch (error) {
            throw new Unauthorize('Unable to login user');
        }
    }

    public async isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.get('Authorization').split(' ')[1];
            if (!token) return next(new Unauthorize('No token provided'));
            const decodedToken = await this.firebaseService.verifyToken(token);
            res.req.body.user = decodedToken;
            return next();
        } catch (error) {
            console.log(error);
            return next(new Unauthorize('Unable to authorize'));
        }
    }

}