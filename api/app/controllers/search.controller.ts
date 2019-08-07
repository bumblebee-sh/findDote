import {Request, Response, Router} from 'express';
import {PetModel} from '../models';

class SearchController {
  private router: Router = Router();

  public routers() {
    this.router.get('/', this.search);
    return this.router;
  }

  private search(req: Request, res: Response) {
    const {age, searchType, pet, lat, lng, radius, skip = 0, limit = 10} = req.query;
    const searchQuery: any = {
      age: +age || {$gte: 0},
      event: +searchType || {$gte: 0},
      type: +pet || {$gte: 0}
    };
    if (lat && lng) {
      searchQuery['area.location'] = {
        $near: {
          $maxDistance: radius,
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          }
        }
      };
    }
    PetModel.find(searchQuery, null, {skip: +skip, limit: +limit}).find((error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).send(results);
    });
  }
}

export const SearchRoute: Router = new SearchController().routers();
