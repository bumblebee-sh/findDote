import { Injectable } from '@angular/core';
import {environment} from '@env/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorage: Storage = localStorage;
  private jwt: JwtHelperService = new JwtHelperService();
  constructor() { }

  setToken(token: string) {
    this.localStorage.setItem(environment.localStorage, token);
  }

  getToken(): string {
    return this.localStorage.getItem(environment.localStorage);
  }

  clearToken() {
    this.localStorage.removeItem(environment.localStorage);
  }

  parseToken(): any {
    return this.jwt.decodeToken(this.getToken());
  }

  isTokenExpired(token: string): boolean {
    return this.jwt.isTokenExpired(token);
  }
}
