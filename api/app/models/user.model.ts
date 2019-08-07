import { Document, Schema, Model, model } from 'mongoose';
import {NextFunction} from "express";
import * as bcrypt from 'bcrypt';

export interface IUser {
    email: string;
    password: string;
    status: boolean;
    createdAt: string;
}

export interface IUserModel extends IUser, Document {
    checkPassword(pass: string): boolean;
}

export const UserSchema: Schema<IUserModel> = new Schema({
    avatar: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save', function(this: IUserModel, next: NextFunction) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

UserSchema.methods.checkPassword = function(this: IUserModel, pass) {
    return bcrypt.compareSync(`${pass}`, this.password);
};

export const UserModel: Model<IUserModel> = model<IUserModel>('users', UserSchema);
