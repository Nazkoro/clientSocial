import {createAction, props} from "@ngrx/store";

export const loadUserRequestAction = createAction(
  '[User] Load User  Request',
);

export const loadUserSuccessAction = createAction(
  '[User] Load User  Failure'  ,
  props<{ user }>()
);

export const loadUserFailureAction = createAction(
  '[User] Load User Success',
  props<{ error: string }>()
);

///////

export const loadRequestAction = createAction(
  '[User] Load Request'
);

export const loadFailureAction = createAction(
  '[User] Load Failure',
  props<{ error: string }>()
);

export const loadSuccessAction = createAction(
  '[User] Load Success',
  props<{ items: any[] }>()
);

////////

export const saveRequestAction = createAction(
  '[User] Save',
  props<{ item: any }>()
);

export const saveFailureAction = createAction(
  '[User] Save Failure',
  props<{ error: string }>()
);

export const saveSuccessAction = createAction(
  '[User] Save SUCCESS',
  props<{ item: any }>()
);

///

export const updateRequestAction = createAction(
  '[User] update',
  props<{ model }>()
);

export const updateFailureAction = createAction(
  '[User] update Failure',
  props<{ error: string }>()
);

export const updateSuccessAction = createAction(
  '[User] update Failure',
  props<{ user }>()
);

////

export const deleteRequestAction = createAction(
  '[User] delete',
  props<{ id: number }>()
);

export const deleteFailureAction = createAction(
  '[User] delete Failure',
  props<{ error: string }>()
);

export const deleteSuccessAction = createAction(
  '[User] delete Success',
  props<{ id: number }>()
);
