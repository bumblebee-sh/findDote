import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, switchMap } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '@app/pages/user/store/auth.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.IAppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('UserStore').pipe(
      take(1),
      switchMap((userState: fromAuth.IState) => {
        const copiedReq = req.clone({headers: req.headers.append('Authorization', userState.token ? 'Bearer ' + userState.token : '')});
        return next.handle(copiedReq);
      })
    );
  }
}
