import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {of} from 'rxjs';

import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  getRegions() {
    return of([
      {title: 'Some'},
      {title: 'Some 1'},
      {title: 'Some 2'},
    ]);
  }

  search(params) {
    return this.http.get(environment.apiUrl + '/search', {params});
  }
}
