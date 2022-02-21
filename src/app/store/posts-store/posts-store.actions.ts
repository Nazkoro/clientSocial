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


export const addComentInPost = createAction(
  '[post] Comment ',
  props<{objComment}>()
);

export const addedComentInPost = createAction(
  '[get] Comment',
  props<{post: any}>()
);

export const deletePosts = createAction(
  '[delete] Post ',
  props<{post}>()
);

export const PostDeleted = createAction(
  '[get] Post deleted',
  props<{post: any}>()
);

