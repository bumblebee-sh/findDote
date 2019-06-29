import { Action } from '@ngrx/store';
import {IState} from './auth.reducer';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const SET_TOKEN = 'SET_TOKEN';

export class LogIn implements Action {
  readonly type = LOG_IN;
  constructor(public payload: IState) {}
}

export class LogOut implements Action {
  readonly type = LOG_OUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: {token: string, status?: boolean}) {}
}

export type AuthActions = LogIn | LogOut | SetToken;
