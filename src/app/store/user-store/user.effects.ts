import {Injectable} from '@angular/core';
import * as bookActions from './user.actions';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BaseService} from "../../services/base-service";
import {catchError, map, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs';
import {loadUserFailureAction, loadUserRequestAction, loadUserSuccessAction} from "./user.actions";

@Injectable()
export class userStoreEffects {
  constructor(private baseService: BaseService<any>, private actions$: Actions) {}

  loadUserRequestEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookActions.loadUserRequestAction),
      switchMap(action => {
        // const subject = "Book";
        return this.baseService.getUser().pipe(
          map((user) => {
            console.log("data send from BE",user)
            return bookActions.loadUserSuccessAction({user})
          }),
          catchError((error: any) => {
            return observableOf(bookActions.loadUserFailureAction({error}))
          })
        )
      })
    );
  })

  loadRequestEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookActions.loadRequestAction),
      switchMap(action => {
        // const subject = "Books";
        return this.baseService.getUsers().pipe(
          map((items: any[]) => {
            return bookActions.loadSuccessAction({items})
          }),
          catchError(error => {
            return observableOf(bookActions.loadFailureAction({error}))
          })
        )
      })
    );
  })



  updateRequestEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookActions.updateRequestAction),
      switchMap(({model}) => {
        return this.baseService.addUserInfo(model).pipe(
          map(({user}) => {
            return bookActions.updateSuccessAction({user})
          }),
          catchError(error => {
            return observableOf(bookActions.updateFailureAction({error}))
          })
        )
      })
    );
  })

  deleteRequestEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookActions.deleteRequestAction),
      switchMap(action => {
        return this.baseService.deleteUser(action.id).pipe(
          map((item: any) => {
            return bookActions.deleteSuccessAction({id: action.id})
          }),
          catchError(error => {
            return observableOf(bookActions.deleteFailureAction({error}))
          })
        )
      })
    );
  })

}
