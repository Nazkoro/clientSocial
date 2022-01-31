import {createFeatureSelector, createSelector} from '@ngrx/store';
import {POST_FEATURE_NAME, PostsState} from './posts-store.reducer';

const getFeature = createFeatureSelector<PostsState>(POST_FEATURE_NAME);

export const getLoading = createSelector(
  getFeature,
  // (state) => state.auth,
  state => state.loading
);

export const getLoaded = createSelector(
  getFeature,
  state => state.loaded
);

export const getServerError = createSelector(
  getFeature,
  state => state.serverError
);

export const getPosts = createSelector(
  getFeature,
  state => state.posts
);

export const createPosts = createSelector(
  getFeature,
  state => state.posts
);
//испрваить
export const updLikePost = createSelector(
  getFeature,
   state => state.posts
);

// export const getUpdatedPost = (id) => createSelector(getPosts, (allPosts) => {
//   if (allPosts) {
//     return allPosts.find(post => {
//       return post._id === id;
//     });
//   } else {
//     return {};
//   }
// });

// export const updLikePost = createSelector(
//   getFeature,
//   // state => state.posts
//   state => state.selectedPost
// );
