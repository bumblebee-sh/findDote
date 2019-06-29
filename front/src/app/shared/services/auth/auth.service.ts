import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl: string = environment.apiUrl;
  localStorage: Storage = localStorage;

  constructor(
    private http: HttpClient
  ) { }

  login(data: {email: string, password: string}) {
    return this.http.post(this.apiUrl + '/login', data, {withCredentials: true}).pipe(
      tap((res: any) => this.localStorage.setItem(environment.localStorage, res.token))
    );
  }

  logout() {
    return this.http.get(this.apiUrl + '/logout', {withCredentials: true}).pipe(
      tap(res => this.localStorage.removeItem(environment.localStorage))
    );
  }

  registration(data: {email: string, password: string}) {
    return this.http.post(this.apiUrl + '/registration', data);
  }

  session() {
    return this.http.get(this.apiUrl + '/session', {withCredentials: true});
  }

  getToken(): string {
    return this.localStorage.getItem(environment.localStorage);
  }

  confirmPassword(token: string) {
    return this.http.post(this.apiUrl + '/user/confirmEmail', {token});
  }
}
