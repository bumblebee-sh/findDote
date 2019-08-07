import {NextFunction} from 'express';
import * as fs from 'fs';
import * as path from 'path';
import {UploadedFile} from "express-fileupload";
import {Model, Schema, model, Document} from 'mongoose';

export enum PetEvent {
    All = 0,
    Found,
    Lost
}

export enum PetAge {
    Kitten,
    Teenager,
    Adult
}

export enum PetTypes {
    Other,
    Dog,
    Cat
}

export interface IPet {
    createdAt: string;
    name: string;
    event: string;
    description: string;
    area: object;
    status: string;
    age: string;
    type: string;
    eventText: string;
    typeText: string;
    ageText: string;
}

export interface IPetModel extends IPet, Document {
    savePhoto(file: UploadedFile): void;
}

const PetSchema: Schema<IPetModel> = new Schema<IPetModel>({
    name: {type: String, default: ''},
    event: {type: Number},
    eventText: {type: String},
    description: {type: String, default: ''},
    // location: {
    //     type: { type: String },
    //     coordinates: []
    // },
    area: {
        location: {
            type: { type: String },
            coordinates: []
        },
        radius: {type: Number}
    },
    type: {type: Number},
    typeText: {type: String},
    age: {type: Number, default: 0},
    ageText: {type: String},
    image: {type: String, default: ''}
}, {
    timestamps: true
});

PetSchema.methods.savePhoto = async function(this: IPetModel, file) {
    const id = this._id;
    const filePath = path.join(__dirname, '../public/' + id);
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }
    const fileName = `photo__${Date.now() + id}${path.extname(file.name)}`;
    return new Promise((resolve, reject) => {
        file.mv(`${filePath}/${fileName}` , function(err) {
            if (err) {
                reject(err);
            }
            resolve(`/public/${id}/` + fileName);
        });
    });
};

PetSchema.pre('save', function(this: IPetModel, next: NextFunction) {
    const pet = this;
    pet.eventText = PetEvent[+pet.event];
    pet.typeText = PetTypes[+pet.type];
    pet.ageText = PetAge[+pet.age];
    next();
});

PetSchema.index({ 'area.location': "2dsphere" });

export const PetModel: Model<IPetModel> = model<IPetModel>('pets', PetSchema);
