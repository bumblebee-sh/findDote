import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Store} from '@ngrx/store';

import {IAppState} from '@app/store/app.reducer';
import {IState} from '@app/pages/user/store/user.reducer';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(
    private store: Store<IAppState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('UserStore').pipe( map((res: IState) => !!res.token ));
  }
}
