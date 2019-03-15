import {Router, Response, Request} from 'express';
import * as jwt from 'jsonwebtoken';

import {UserModel} from "../models";
import {CONST} from "../config";
import {MongoError} from "mongodb";
import {Mail, session} from "../helper";

interface IRequest extends Request {
    session: any;
}

class RootController {
    private router: Router = Router();
    public routers() {
        this.router.get('/', this.root);
        this.router.post('/login', this.login.bind(this));
        this.router.get('/logout', this.logout);
        this.router.get('/session', this.getSession);
        this.router.post('/registration', this.addUser.bind(this));
        return this.router;
    }

    private root(req: Request, res: Response) {
        res.status(200).send('Hello =D  ');
    }

    private getSession(req: Request, res: Response) {
        if (req.headers.authorization && req.session!.user) {
            return res.status(200).send(session.getCurrentSeesion(req));
        }
        res.status(403).send({message: 'No Authorized'});
    }

    private logout(req: Request, res: Response) {
        session.deleteSession(req);
        return res.status(200).send({message: 'OK'});
    }

    private login(req: Request | any, res: Response) {
        const body = req.body;
        UserModel.findOne({email: body.email}).exec((err, doc) => {
            if (err) {
                return res.status(500).send('Internal Error');
            }

            if (!doc) {
                return res.status(401).json({ message: "Email/password are incorrect" }) ;
            }

            /*
            if (!doc.status) {
                return res.status(401).send({message: 'Please verify your email.'});
            }
            */
            if (!doc.checkPassword(body.password)) {
                return  res.status(401).send({message: 'password is incorrect'});
            }

            const userDoc: any = doc.toJSON();
            delete userDoc.status;
            const user = {
                user: userDoc,
                token: this.setToken(doc._id, doc.email)
            };
            req.session['user '] = 'qweqweqwe';
            session.setSession(req, user);
            res.status(200).send(user);
        });
    }

    private addUser(req: Request, res: Response) {
        const body = req.body;
        const newUser = new UserModel(body);
        newUser.save((err: MongoError, doc: any) => {
            if (err) {
                if (err.code === 11000) {
                    return res.status(401).send({message: 'Email already taken'});
                }
                return res.status(500).send(err);
            }
            const user = doc.toJSON();
            const mail = new Mail(body.email, user._id);
            const result = mail.sendMail();
            res.status(200).send({ result });
        });
    }

    private setToken(id: string, email: string): string {
        return jwt.sign({
            exp: Date.now() + (1000 * 60 * 60 * 24 * 30),
            data: { id, email }
        }, CONST.secret);
    }
}

export const RootRoutes = new RootController().routers();