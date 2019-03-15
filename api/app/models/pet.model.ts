import {NextFunction} from 'express';
import * as fs from 'fs';
import * as path from 'path';
import {UploadedFile} from "express-fileupload";
import {Model, Schema, model, Document} from 'mongoose';

export interface IPet {
    createdAt: string;
    name: string;
    event: string;
    description: string;
    area: object;
    status: string;
    age: string;
    type: string;
}

export interface IPetModel extends IPet, Document {
    savePhoto(file: UploadedFile): void;
}

const PetSchema: Schema<IPetModel> = new Schema({
    createdAt: {type: Date, default: Date.now()},
    name: {type: String, default: ''},
    event: {type: String},
    description: {type: String, default: ''},
    area: {
        center: {
            lat: {type: Number},
            lng: {type: Number}
        },
        radius: {type: Number}
    },
    type: {type: String},
    age: {type: String, default: 0},
    image: {type: String, default: ''}
});

PetSchema.methods.savePhoto = async function(this: IPetModel, file) {
    const filePath = path.join(__dirname, '../public/' + this._id);
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }
    const fileName = `photo__${Date.now()}${path.extname(file.name)}`;
    return new Promise((resolve, reject) => {
        file.mv(`${filePath}/${fileName}` , function(err) {
            if (err) {
                reject(err);
            }
            resolve(fileName);
        });
    });
};

export const PetModel: Model<IPetModel> = model<IPetModel>('pets', PetSchema);