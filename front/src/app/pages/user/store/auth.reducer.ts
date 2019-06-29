import {UserModel} from '@app/shared/models';
import * as UserActions from './auth.actions';

export interface IState {
  user: UserModel;
  token: string;
  isAuth: boolean;
}

const initState: IState =  {
  user: null,
  token: null,
  isAuth: false
};

export function AuthReducer(state: IState = initState, action: UserActions.AuthActions) {
  switch (action.type) {
    case (UserActions.LOG_IN):
      return {
        ...state,
        isAuth: true,
        ...action.payload
      };
    case (UserActions.LOG_OUT):
      return {
        ...state,
        user: null,
        token: null,
        isAuth: false,
      };
    case (UserActions.SET_TOKEN):
      return {
        ...state,
        user: null,
        token: action.payload.token,
        isAuth: action.payload.status || false
      };
    default:
      return state;
  }
}
