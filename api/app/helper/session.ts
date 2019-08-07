import * as jwt from 'jsonwebtoken';
import {CONST} from '../config';
import {Request} from '@app/models/request.interface';

interface ISession {
    token: string;
    user: any;
}

class Session {
    setSession(req: Request, data: ISession) {
        const map = new Map();
        map.set(data.token, data.user);
        req.session['user'] = JSON.stringify([...map]);
    }

    getCurrentSession(req: Request) {
        let sess;
        try {
            sess = new Map(JSON.parse(req.session.user));
        } catch (e) {
            return null;
        }
        const token: any = this.getToken(req);
        if (sess.get(token)) {
            const {data} = (jwt.verify(token, CONST.secret)) as any;
            console.log('WWW,' , data);
            return data;
        }
        return null;
    }

    deleteSession(req: Request) {
        req.session.destroy((err: any) => {
            // console.log(err);
        });
    }

    getToken = (req: Request): string | null => req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

}
export const session = new Session();
