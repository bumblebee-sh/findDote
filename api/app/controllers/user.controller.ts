import {Router, Response} from 'express';
import * as jwt from 'jsonwebtoken';

import {UserModel} from '../models';
import {CONST} from '../config';
import {Request} from '@app/models/request.interface';
import {session} from '../helper';

class UserController {
    private router: Router = Router();

    public routers() {
        this.router.get('/:id', this.currentUser);
        this.router.put('/', this.updateUser);
        this.router.post('/confirmEmail', this.confirmEmail);
        return this.router;
    }

    private confirmEmail(req: Request, res: Response) {
        let decodedToken: any = null;
        try {
            decodedToken = jwt.verify(req.body.verifyToken, CONST.secret);
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
            const user = doc.toJSON();
            user.id = user._id;
            delete user._id;
            delete user.password;
            res.status(200).json(user);
        }).catch( (err: any) => res.status(500).json(err));
    }

    private updateUser(req: Request, res: Response) {
        const body = req.body;
        if (!session.getCurrentSession(req)) {
            return res.status(500).send({message: 'Internal server error.'});
        }
        const id = session.getCurrentSession(req).id;
        UserModel.findByIdAndUpdate({_id: id}, body, {new : true}, (err, user) => {
            if (err) {
                return res.status(500).send({message: 'Internal server error.'});
            }
            let response = user!.toJSON();
            delete response.password;
            req.session.user = response;
            return res.status(200).send(response);
        });
    }

}
export const UserRouter = new UserController().routers();
