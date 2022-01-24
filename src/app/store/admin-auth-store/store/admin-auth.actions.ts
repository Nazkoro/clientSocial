import {createAction, props} from '@ngrx/store';

export const login = createAction(
  '[Admin Auth] login',
  props<{email: string, password: string}>()
);

export const loginSuccess = createAction(
  '[Admin Auth] login success',
  props<{accessToken: string}>()
);

export const loginFailed = createAction(
  '[Admin Auth] login failed',
  props<{serverError: string}>()
);

export const registr = createAction(
  '[Admin Auth] registr',
  props<{username: string, email: string, password: string}>()
);

