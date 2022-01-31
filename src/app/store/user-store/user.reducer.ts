import { createReducer, on } from '@ngrx/store';
import * as BookActionTypes from './user.actions';

// export interface User {
//   _id: string;
//   desc: string;
//   img: string;
//   likes: [];
//   coments: [];
// }
export const USER_FEATURE_NAME = 'user';

export interface UserState {
  selectedUser: any,
  users: any[],
  isLoading?: boolean;
  error?: any;
}

export const initialState: UserState =
  {
    selectedUser: null,
    users: [],
    isLoading: false,
    error: null
  };
export const userReducer = createReducer(
  initialState,
  on(BookActionTypes.loadUserRequestAction, (state) => ({
    ...state,
    isLoading: true
  })),

  on(BookActionTypes.loadUserSuccessAction, (state, { user }) => ({
    ...state,
    isLoading: false,
    selectedUser: user
  })),

  on(BookActionTypes.loadUserFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),

  on(BookActionTypes.loadRequestAction, state => ({
    ...state,
    isLoading: true
  })),

  on(BookActionTypes.loadSuccessAction, (state, { items }) => ({
    ...state,
    isLoading: false,
    users: items
  })),

  on(BookActionTypes.loadFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),


  on(BookActionTypes.updateRequestAction, state => ({
    ...state,
    isLoading: true
  })),

  on(BookActionTypes.updateSuccessAction, (state, { user }) => ({
    ...state,
    isLoading: false,
    selectedUser: user,
    error: null
  })),

  on(BookActionTypes.updateFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),

  on(BookActionTypes.deleteRequestAction, state => ({
    ...state,
    isLoading: true
  })),

  on(BookActionTypes.deleteSuccessAction, (state, { id }) => ({
    ...state,
    isLoading: false,
    users: state.users.filter(x => x.id != id)
  })),

  on(BookActionTypes.deleteFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  }))
);
