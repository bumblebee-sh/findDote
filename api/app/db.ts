import mongoose from "mongoose";
import {CONST} from './config';

export class DataBase {
    // cb: (a?: any) => void
    public static async init() {
        mongoose.connect(CONST.dbUrl);
        const db = mongoose.connection;
        db.on("error", () => console.log("DB Connection error"));
    }
}