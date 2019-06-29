import {UserModel} from '@app/shared/models';
import * as UserActions from './auth.actions';

export interface IState {
  user: UserModel;
  token: string;
  isAuth: boolean;
  error: string;
  redirect: boolean;
}

const initState: IState =  {
  user: null,
  token: null,
  isAuth: false,
  error: null,
  redirect: true
};

export function AuthReducer(state: IState = initState, action: UserActions.AuthActions) {
  switch (action.type) {
    case UserActions.ActionTypes.LOGIN:
      return {
        ...state,
        isAuth: true,
        ...action.payload
      };
    case UserActions.ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuth: false,
      };
    case UserActions.ActionTypes.SET_TOKEN:
      return {
        ...state,
        user: null,
        token: action.payload.token,
        isAuth: action.payload.status || false
      };
    case UserActions.ActionTypes.LOGIN_START:
      return {
        ...state,
        error: null
      };
    case UserActions.ActionTypes.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case UserActions.ActionTypes.AUTO_LOGIN:
      return {
        ...state,
      };
    default:
      return state;
  }
}
