import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as userActions from './user.action';

interface UserState {
  maskUserName: boolean;
  currentUser: string;
  password: string;
}

const initialUserState: UserState = {
  maskUserName: null,
  password: null,
  currentUser: null,
};

//Creating a selector
const getuserFeatureSelector = createFeatureSelector<UserState>('User');

//create selector for maskerUsername flag
export const getMaskerUserName = createSelector(
    getuserFeatureSelector,
  (user) => user.maskUserName
);

//create selector for currentUser flag
export const getCurrentUser = createSelector(
    getuserFeatureSelector,
  (user) => user.currentUser
);

export const maskUserNameReducer = createReducer<UserState>(
  initialUserState,
  on(userActions.toggleMaskUserName, (state) => {
    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
