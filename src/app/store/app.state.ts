import {adminAuthReducer, AdminAuthState} from "./admin-auth-store/store/admin-auth.reducer";
import {ActionReducerMap} from "@ngrx/store";
import {PostReducer, PostsState} from "./posts-store/posts-store.reducer";


export const reducers: ActionReducerMap<AppState> = {
  auth: adminAuthReducer,
  post: PostReducer,
  // settings: settingsReducer,
  // router: routerReducer
};
export interface AppState {
  auth: AdminAuthState;
  post: PostsState;
//??
}
