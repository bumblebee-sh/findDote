import { Action } from '@ngrx/store';
import {UserModel} from "@app/shared/models";
import {IState} from './user.reducer';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const SET_TOKEN = 'SET_TOKEN';

export class UserLogIn implements Action {
  readonly type = LOG_IN;
  constructor(public payload: IState) {}
}

export class UserLogOut implements Action {
  readonly type = LOG_OUT;
}

export class UserSetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: {token: string, status?: boolean}) {}
}

export type UserActions = UserLogIn | UserLogOut | UserSetToken;
