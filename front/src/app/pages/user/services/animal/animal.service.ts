import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(
    private http: HttpClient
  ) { }

  addPet(data: any) {
    return this.http.post( environment.apiUrl + '/pet', data, {withCredentials: true} );
  }

  getAnimals() {
    return this.http.get( environment.apiUrl + '/pet');
  }
}
