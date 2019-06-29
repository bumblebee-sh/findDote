import {UserModel} from '@app/shared/models';
import { Action } from '@ngrx/store';

export enum ActionTypes {
  LOGIN_START = '[Auth] Login Start',
  LOGIN_ERROR = '[Auth] Login Error',
  LOGIN = '[Auth] LOG_IN',
  LOGOUT = '[Auth] LOG_OUT',
  SET_TOKEN = '[Auth] SET_TOKEN',
  AUTO_LOGIN = '[Auth] AUTO_LOGIN'
}

export class LogIn implements Action {
  readonly type = ActionTypes.LOGIN;
  constructor(public payload: {user: UserModel, redirect: boolean, token?: string}) {}
}

export class LogOut implements Action {
  readonly type = ActionTypes.LOGOUT;
}

export class SetToken implements Action {
  readonly type = ActionTypes.SET_TOKEN;
  constructor(public payload: {token: string, status?: boolean}) {}
}

export class LoginStart implements Action {
  readonly type = ActionTypes.LOGIN_START;
  constructor(public payload: {email: string, password: string}) {}
}

export class LoginError implements Action {
  readonly type = ActionTypes.LOGIN_ERROR;
  constructor(public payload: string) {}
}

export class AutoLogin implements Action {
  readonly type = ActionTypes.AUTO_LOGIN;
}

export type AuthActions = LogIn | LogOut | SetToken | LoginStart | LoginError | AutoLogin;
