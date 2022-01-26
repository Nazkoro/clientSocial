import {Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {login, loginFailed, loginSuccess , registr } from './admin-auth.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AdminAuthService} from './admin-auth.service';
import {of} from 'rxjs';

@Injectable()
export class AdminAuthEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(action => this.adminAuthService.login({
      email: action.email,
      password: action.password
    }).pipe(
      map(loginSuccessData => loginSuccess(loginSuccessData)),
      catchError(
        error => of(loginFailed({
          serverError: error.message
        }))
      )
    ))
  ));

  registr$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registr),
      switchMap(action => this.adminAuthService.registr({
        username: action.username,
        email: action.email,
        password: action.password
      }).pipe(
        map(loginSuccessData => loginSuccess(loginSuccessData)),
        catchError(
          error => of(loginFailed({
            serverError: error.message
          }))
        )
      ))
    );
  });

  constructor(
    private actions$: Actions,
    private adminAuthService: AdminAuthService
  ) { }
}
