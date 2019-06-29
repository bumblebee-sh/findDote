import {ActionReducerMap} from '@ngrx/store';
import * as fromUserReducer from '@app/core/auth/store/auth.reducer';

export interface IAppState {
  UserStore: fromUserReducer.IState;
}

export const reducers: ActionReducerMap<IAppState> = {
  UserStore: fromUserReducer.AuthReducer
};
