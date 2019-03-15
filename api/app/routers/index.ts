import {Router, Request, Response} from 'express';
import {UserRouter, RootRoutes, PetRoutes} from '../controllers';

export default class Routers {
    private static router: Router = Router();
    public static routes() {
        this.router.use('/', RootRoutes);
        this.router.use('/user', UserRouter);
        this.router.use('/pet', PetRoutes);
        return this.router;
    }
}