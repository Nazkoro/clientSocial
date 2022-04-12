import {Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addComentInPost, addedComentInPost,
  createPosts, deletePosts,
  getPosts,
  PostCreated, PostDeleted,
  PostLiked,
  PostsFailed,
  PostsSuccess,
  putLikePost
} from './posts-store.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {BaseService} from '../../../app/services/base-service'
import {of} from 'rxjs';
import {Store} from "@ngrx/store";


@Injectable()
export class PostsStoreEffects {


  getPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getPosts),
      switchMap(action => this.baseService.getPosts()
        .pipe(
        map(data => {
          return PostsSuccess({data})
        }),
        catchError(
          error => of(PostsFailed({
            serverError: error.message
          }))
        )
      ))
    );
  });

  postPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createPosts),
      switchMap(({formData}) => this.baseService.createPost(formData)
        .pipe(
          map((post) => PostCreated({post})),
          catchError(
            error => of(PostsFailed({
              serverError: error.message
            }))
          )
        ))
    );
  });

  putLikePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(putLikePost),
      switchMap(({likeAndPostId}) => this.baseService.updatelike(likeAndPostId)
        .pipe(
          map((post) => {
            return PostLiked({post})
          }
          ),
          catchError(
            error => of(PostsFailed({
              serverError: error.message
            }))
          )
        ))
    );
  });

  addCommentPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addComentInPost),
      switchMap(({objComment}) => this.baseService.createComment(objComment)
        .pipe(
          map((post) => {
              return addedComentInPost({post})
            }
          ),
          catchError(
            error => of(PostsFailed({
              serverError: error.message
            }))
          )
        ))
    );
  });

  deletePosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePosts),
      switchMap(({post}) => this.baseService.deletePosts(post)
        .pipe(
          map((post) => PostDeleted({post})),
          catchError(
            error => of(PostsFailed({
              serverError: error.message
            }))
          )
        ))
    );
  });

  constructor(
    private actions$: Actions,
    private baseService: BaseService<any>,
    private store: Store
  ) { }
}
