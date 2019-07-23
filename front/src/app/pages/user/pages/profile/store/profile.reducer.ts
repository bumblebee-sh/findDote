import {UserModel} from '@app/shared/models';

import * as ProfileActions from './profile.actions';

export interface State extends UserModel {

}

const initState: State =  {
  id: '5d29e7cf3dfc1f0462e04eb6',
  email: 'q@q',
  userType: null
};

export function ProfileReducer(state: State = initState, action: ProfileActions.ProfileActions) {
  switch (action.type) {
    case ProfileActions.ActionTypes.UPDATE_USER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
