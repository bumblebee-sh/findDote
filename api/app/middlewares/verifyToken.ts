import {Request, Response, NextFunction} from 'express';
import {session} from '../helper';
import {CONST} from '../config';
import * as jwt from 'jsonwebtoken';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const sessToken = session.getCurrentSession(req);
    const userToken = session.getToken(req);

    if (!userToken) {
        return  res.status(400).send({message: 'No provide token'});
    }

    if (sessToken && sessToken === userToken) {
        try {
            await jwt.verify(userToken, CONST.secret);
        } catch (e) {
            return res.status(400).send({message: 'Token expired'});
        }
    }
    next();
};
