import {createReducer, on} from '@ngrx/store';
import {getPosts, PostsSuccess, PostsFailed, PostCreated, putLikePost, PostLiked} from './posts-store.actions';

export const POST_FEATURE_NAME = 'post';

export interface Post {
  _id: string;
  userId: string;
  username: string;
  desc: string;
  img: string;
  likes: {
    isLiked: boolean,
    count: number
  };
  coments: [];
}

export interface PostsState {
  loading: boolean;
  loaded: boolean;
  serverError: string;
  selectedPost: any;
  posts?: Post[];

  // likes: Post["likes"];
}

const initialState: PostsState = {
  loaded: true,
  loading: false,
  selectedPost: null,
  serverError: '',
  posts: undefined,
  // likes: undefined,
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

  on(PostLiked, (state, {likes}) => {
  console.log("salam popalam", likes)
    const currentPost = state.posts.find(x=> x._id === likes._id)
    // isLiked? likes.count + 1 : likes.count
   return currentPost.likes = likes
//     return {
//     ...state,
//       currentPost.likes: ,
// /*    posts: [post, ...state.posts],*/
//   }
  }),

  // on(PostLiked, (state, {post}) => {
  //   console.log(post)
  //   return {
  //     ...state,
  //     selectedPost: post,
  //     /*    posts: [post, ...state.posts],*/
  //   }}),

  on(PostsFailed, (state, {serverError}) => ({
    ...state,
    postsData: null,
    loaded: true,
    loading: false,
    serverError
  }))
);
