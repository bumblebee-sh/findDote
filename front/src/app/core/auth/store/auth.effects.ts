import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {catchError, switchMap, tap, map } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import {IState} from './auth.reducer';
import * as AuthActions from './auth.actions';
import {environment} from '@env/environment';
import {LocalStorageService} from '@app/shared/services';

@Injectable()
export class AuthEffects {
  private apiUrl = environment.apiUrl;

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.AUTO_LOGIN),
    map( data => {
      const token = this.localStorageService.getToken();
      if (!this.localStorageService.isTokenExpired( token )) {
        return new AuthActions.LogIn({
          user: this.localStorageService.parseToken().data,
          redirect: false,
          token});
      }
      return { type: 'null' };
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.LOGIN_START),
    switchMap( (data: AuthActions.LoginStart) => {
      const userCredential = {
        email: data.payload.email,
        password: data.payload.password
      };
      return this.http.post<IState>(this.apiUrl + '/login',
        userCredential,
        {withCredentials: true}).pipe(
          map((res: IState) => {
            this.localStorageService.setToken(res.token);
            return new AuthActions.LogIn({
              ...res,
              redirect: true
            });
          }),
          catchError( (err: HttpErrorResponse) => {
            return of(new AuthActions.LoginError(err.error.message));
          } ),
      );
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.LOGOUT),
    tap( () => {
      this.router.navigateByUrl('/');
      this.localStorageService.clearToken();
    })
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.LOGIN),
    tap((data: AuthActions.LogIn) => {
      if (data.payload.redirect) {
        this.router.navigateByUrl('/user');
      }
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}

}
