import {createReducer, on} from '@ngrx/store';
import {getPosts, PostsSuccess, PostsFailed, PostCreated} from './posts-store.actions';

export const POST_FEATURE_NAME = 'post';

// export interface Post {
//   posts: [];
// posts: [];
// }

export interface PostsState {
  loading: boolean;
  loaded: boolean;
  serverError: string;
  posts?: any[];
}

const initialState: PostsState = {
  loaded: true,
  loading: false,
  serverError: '',
  posts: undefined
};

export const PostReducer = createReducer(
  initialState,
  on(getPosts, state => ({
    ...state,
    loading: true
  })),

  on(PostsSuccess, (state, {data}) => ({
    ...state,
    posts: data,
    loaded: true,
    loading: false,
    serverError: ''
  })),
  on(PostCreated, (state, {post}) => ({
    ...state,
    posts: [post, ...state.posts],
  })),
  on(PostsFailed, (state, {serverError}) => ({
    ...state,
    postsData: null,
    loaded: true,
    loading: false,
    serverError
  }))
);
