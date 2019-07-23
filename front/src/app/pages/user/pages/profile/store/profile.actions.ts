import {UserModel} from '@app/shared/models';
import { Action } from '@ngrx/store';


export enum ActionTypes {
  UPDATE_USER = '[Profile] Update User',
}

export class UpdateUser implements Action {
  readonly type = ActionTypes.UPDATE_USER;
  constructor(public payload: UserModel) {}
}

export type ProfileActions = UpdateUser;
