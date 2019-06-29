import { Injectable } from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  getRegions() {
    return of([
      {title: 'Some'},
      {title: 'Some 1'},
      {title: 'Some 2'},
    ]);
  }
}
