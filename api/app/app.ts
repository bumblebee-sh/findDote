import express from "express";
import session from "express-session";
import fileUpload from "express-fileupload";
import * as path from "path";

import {Response, Request, NextFunction} from "express";
import * as bodyParser from "body-parser";

import {CONST} from "./config";
import routers from './routers';
import {DataBase} from './db';

class App {
    public app: express.Application;
    constructor() {
        this.app = express();
        (async () => {
            try {
                await this.initDb();
            } catch (e) {
                return console.log(e);
            }
            this.config();
            this.setRouters();
        })();
    }

    private initDb() {
        return new Promise((resolve, reject) => {
            DataBase.init().then(data => {
                resolve();
                console.log('data', data);
            }).catch((err) => {
                reject();
                console.log('err', err);
            });
        });
    }

    public initServer() {
        this.app.listen(process.env.port || CONST.port, () => {
            console.log('listen on port: ', process.env.port || CONST.port);
        });
    }

    private config() {
        this.app.use(fileUpload());
        this.app.use('/public', express.static(path.join(__dirname, '/public')));

        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', CONST.frontUrl);
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,uuid, message, uuid, x-access-token');
            next();
        });

        this.app.use(session({
            secret: CONST.secret,
            resave: true,
            saveUninitialized: true,
            cookie: {
                httpOnly: false
            }
        }));
    }

    private setRouters() {
        this.app.use('/', routers.routes());
    }
}

const app: App = new App();
app.initServer();
