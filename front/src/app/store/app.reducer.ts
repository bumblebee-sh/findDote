import {ActionReducerMap} from '@ngrx/store';
import * as fromUserReducer from "@app/pages/user/store/user.reducer";

export interface IAppState {
  UserStore: fromUserReducer.IState;
}

export const reducers: ActionReducerMap<IAppState> = {
  UserStore: fromUserReducer.UserReducer
};
