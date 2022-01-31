import {createAction, props} from '@ngrx/store';

export const getPosts = createAction(
  '[get] Post'
);

export const PostsSuccess = createAction(
  '[get] Post success',
  props<{ data }>()
);

export const PostsFailed = createAction(
  '[get] Post failed',
  props<{serverError: string}>()
);

export const createPosts = createAction(
  '[post] Post ',
  props<{formData}>()
);

export const PostCreated = createAction(
  '[get] Post created',
  props<{post: any}>()
);

export const putLikePost = createAction(
  '[put] Like ',
  props<{likeAndPostId}>()
);

export const PostLiked = createAction(
  '[get] Post liked',
  props<{post: any}>()
);
// export const putLikePost = createAction(
//   '[put] Like ',
//   props<{post}>()
// );
//
// export const PostLiked = createAction(
//   '[get] Post liked',
//   props<{post: any}>()
// );
