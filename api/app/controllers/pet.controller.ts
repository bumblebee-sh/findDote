import {Router, Response, Request} from 'express';
import {UploadedFile} from "express-fileupload";
import {PetModel, PetTypes, PetEvent} from '../models';
import {verifyToken} from '../middlewares';

class PetController {
    private router: Router = Router();

    public routers() {
        this.router.get('/', this.root);
        this.router.post('/', verifyToken, this.addPet.bind(this));
        this.router.get('/:petId', this.findPet);
        this.router.patch('/:petId', verifyToken, this.updatePet);
        return this.router;
    }

    private root(req: Request, res: Response) {
        PetModel.find({}).then(docs => {
            const data = docs.map((el) => {
                el.event = PetEvent[+el.event];
                el.type = PetTypes[+el.event];
                return el;
            });
            res.status(200).json(data);
        }).catch( err => res.status(500).json(err));
    }

    private async addPet(req: Request, res: Response) {
        const body = req.body as {animal: string, photo: UploadedFile};
        const newPet = new PetModel(JSON.parse(body.animal));
        newPet.save( async (err, doc) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (req.files) {
                try {
                    const imageName = await doc.savePhoto(req.files.photo as UploadedFile);
                    doc.update({$set: {image: '//' + req.get('host') + imageName}}, (err, doc) => {

                    });
                } catch (e) {
                    return res.status(500).json(e);
                }
            }
            res.status(200).send({message: doc.name});
        });
    }

    private findPet(req: Request, res: Response) {
        const body = req.params.petId;
        PetModel.findById(body).then(docs => {
            res.status(200).json(docs);
        }).catch( err => res.status(404).json({message: 'Not found'}));
    }

    private updatePet(req: Request, res: Response) {
        const body = req.body;
        PetModel.findOneAndUpdate(req.params.petId, body, {new : true}, (err, doc) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send(doc);
        });
    }
}
export const PetRoutes = new PetController().routers();
