import {createAction, props} from '@ngrx/store';

export const getPosts = createAction(
  '[get] Post'
);
export const createPosts = createAction(
  '[get] Post',
  props<{formData}>()
);

export const PostsSuccess = createAction(
  '[get] Post success',
  props<{ data }>()
);

export const PostsFailed = createAction(
  '[get] Post failed',
  props<{serverError: string}>()
);

export const PostCreated = createAction(
  '[get] Post created',
  props<{post: any}>()
);
