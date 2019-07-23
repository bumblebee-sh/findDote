import {ActionReducerMap} from '@ngrx/store';
import * as fromUserReducer from '@app/core/auth/store/auth.reducer';
import * as fromProfileReducer from '@app/pages/user/pages/profile/store/profile.reducer';

export interface IAppState {
  UserStore: fromUserReducer.IState;
  ProfileStore: fromProfileReducer.State;
}

export const reducers: ActionReducerMap<IAppState> = {
  UserStore: fromUserReducer.AuthReducer,
  ProfileStore: fromProfileReducer.ProfileReducer,
};
