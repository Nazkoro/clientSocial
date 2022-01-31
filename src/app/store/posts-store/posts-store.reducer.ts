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

  on(PostLiked, (state, {post}) => {
  console.log("`1salam popalam", post)
    // const currentPost = state.posts.find(x=> x._id === post._id)
    const index = state.posts.findIndex(x=> x._id === post._id)
    console.log("state.posts",state.posts)
    const leftArr = state.posts.slice(0, index)
    const rightArr = state.posts.slice(index + 1,  state.posts.length)
    const updpost = leftArr.concat(post).concat(rightArr)
    console.log("TOPupdpost",updpost);


    // console.log("`2currentPost",currentPost)
    // isLiked? likes.count + 1 : likes.count
    // currentPost.likes = post.likes;


  return {...state, posts : updpost};
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
