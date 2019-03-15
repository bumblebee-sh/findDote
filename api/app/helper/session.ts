import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import {CONST} from '../config';

interface ISession {
    token: string;
    user: any;
}

interface IRequest extends Request {
    session: any;
}

class Session {
    setSession(req: Request | IRequest, data: ISession) {
        const map = new Map();
        map.set(data.token, data.user);
        req.session['user'] = JSON.stringify([...map]);
    }

    getCurrentSeesion(req: Request) {
        const sess = new Map(JSON.parse(req.session!.user));
        const token: any = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
        if (sess.get(token)) {
            const { data } = (jwt.verify(token , CONST.secret)) as any;
            return data;
        }
        return null;
    }

    deleteSession(req: Request | IRequest) {
        req.session.destroy((err: any) => {
            // console.log(err);
        });
    }
}

export const session = new Session();