import { injectable } from 'inversify';
import admin from 'firebase-admin';
import axios from 'axios';
import { FIREBASE_PROJECT_API_KEY } from '../util/secrets';
const serviceAccount = require('../../tcc.json');

export interface FirebaseService {
    verifyToken(token: string): Promise<any>;
    signIn(email: string, password: string): Promise<any>;
}

@injectable()
export class FirebaseServiceImpl implements FirebaseService {

    private static app: any;

    constructor() {
        if (!FirebaseServiceImpl.app) {
            FirebaseServiceImpl.app = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
        }
    }

    public async verifyToken(token: string): Promise<any> {
        return await admin.auth().verifyIdToken(token);
    }

    public async signIn(email: string, password: string): Promise<any> {
        const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_PROJECT_API_KEY}`;
        const { data } = await axios.post(url, { email, password, returnSecureToken: true });
        return data.idToken;
    }

}