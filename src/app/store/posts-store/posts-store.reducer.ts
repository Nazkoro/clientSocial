import {createReducer, on} from '@ngrx/store';
import {
  getPosts,
  PostsSuccess,
  PostsFailed,
  PostCreated,
  putLikePost,
  PostLiked,
  addedComentInPost, deletePosts, PostDeleted
} from './posts-store.actions';

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
    posts: [...post, ...state.posts],
  })),

  on(PostLiked, (state, {post}) => {
    console.log("postlIKED", post);
    // console.log("state.posts", state.posts)
    // console.log("state.posts[0]._id", state.posts[0]._id)
    // console.log("post", post)
    // console.log(state.posts[0]._id === post._id);
    const index = state.posts.findIndex(x=> x._id == post[0]._id)
    const leftArr = state.posts.slice(0, index)
    const rightArr = state.posts.slice(index + 1,  state.posts.length)
    const updpost = leftArr.concat(post[0]).concat(rightArr)
  return {...state, posts : updpost};
  }),

  on(addedComentInPost, (state, {post}) => {
    const index = state.posts.findIndex(x=> x._id === post._id)
    const leftArr = state.posts.slice(0, index)
    const rightArr = state.posts.slice(index + 1,  state.posts.length)
    const updpost = leftArr.concat(post).concat(rightArr)
    return {...state, posts : updpost};
  }),


  on(PostsFailed, (state, {serverError}) => ({
    ...state,
    postsData: null,
    loaded: true,
    loading: false,
    serverError
  })),

  on(deletePosts, (state, {post}) => ({
    ...state,
    posts: [...state.posts],
  })),

  on(PostDeleted, (state, {post}) => {
    console.log("DELETE", post)
    const index = state.posts.findIndex(x=> x._id === post._id)
    const leftArr = state.posts.slice(0, index)
    const rightArr = state.posts.slice(index + 1,  state.posts.length)
    const updpost = leftArr.concat(rightArr)
    return {...state, posts : updpost};
  }),


);
