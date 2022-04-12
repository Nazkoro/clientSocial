import {createFeatureSelector, createSelector} from '@ngrx/store';
import {USER_FEATURE_NAME, UserState} from "./user.reducer";


const getFeature = createFeatureSelector<UserState>(USER_FEATURE_NAME);

export const getUsers = createSelector(
  getFeature,
  state => state.users
);

export const getUser = createSelector(
  getFeature,
  (state, id: number) => state.users.filter(x=> x.id === id)
);

export const getSelectedUser = createSelector(
  getFeature,
  state => state.selectedUser
);

export const getLoginUser = createSelector(
  getFeature,
  state => state.loginUser
);

export const getUserError = createSelector(
  getFeature,
  state => state.error
);

export const getUserIsLoading = createSelector(
  getFeature,
  state => state.isLoading
);
