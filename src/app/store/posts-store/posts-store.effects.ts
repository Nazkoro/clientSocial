import {Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createPosts,
  getPosts,
  PostCreated,
  PostLiked,
  PostsFailed,
  PostsSuccess,
  putLikePost
} from './posts-store.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {BaseService} from '../../../app/services/base-service'
import {of} from 'rxjs';


@Injectable()
export class PostsStoreEffects {


  getPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getPosts),
      switchMap(action => this.baseService.getPosts()
        .pipe(
        map(data => {
          console.log(data)
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
      switchMap(({post}) => this.baseService.updatelike(post)
        .pipe(
          map((post) => PostLiked({post})),
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
    // private adminAuthService: AdminAuthService,
    private baseService: BaseService<any>
  ) { }
}
