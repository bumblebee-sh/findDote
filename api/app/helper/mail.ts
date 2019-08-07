import * as nodemailer from "nodemailer";
import * as jwt from 'jsonwebtoken';
import {CONST} from '../config';

export class Mail {
    constructor(
        public to: string,
        public id?: string
        ) { }

    async sendMail() {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mailbox9113@gmail.com',
                pass: 'ivtkm107'
            }
        });

        const authToken = jwt.sign({
            data: { id: this.id }
        }, CONST.secret, { expiresIn: '1h' });

        const mailOptions = {
            from: '"Fred Foo 👻"',
            to: this.to,
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<p>Hello. Please confirm Your email by clicking <a href='http://localhost:4200?token=" + authToken + "'>here</a></p>"
        };

        await transporter.sendMail(mailOptions);
    }
}