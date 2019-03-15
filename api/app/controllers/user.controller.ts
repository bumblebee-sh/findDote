import {Router, Response, Request} from 'express';
import {UserModel} from '../models';
import {Mail} from '../helper/mail';
import {MongoError} from 'mongodb';
import * as jwt from 'jsonwebtoken';
import {CONST} from '../config';

class UserController {
    private router: Router = Router();

    public routers() {
        this.router.get('/:id', this.currentUser);
        this.router.post('/confirmEmail', this.confirmEmail);
        return this.router;
    }

    private confirmEmail(req: Request, res: Response) {
        let decodedToken: any = null;
        try {
            decodedToken = jwt.verify(req.body.token, CONST.secret);
        } catch (e) {
            return res.status(401).send({message: 'Token is expired.'});
        }

        UserModel.findById(decodedToken.data.id).then((doc: any) => {
            if (doc.status) {
                res.status(200).send({message: 'Email already confirmed'});
            }
            doc.status = true;
            doc.save((err: Error, user: any) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send({message: user});
            });
        }).catch( err => res.status(500).json(err));
    }

    private currentUser(req: Request, res: Response) {
        UserModel.findById(req.params.id).then((doc: any) => {
            res.status(200).json(doc);
        }).catch( (err: any) => res.status(500).json(err));
    }

}
export const UserRouter = new UserController().routers();