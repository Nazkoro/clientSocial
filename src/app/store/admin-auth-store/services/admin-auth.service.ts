import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  subject$ = new BehaviorSubject( null);

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(body: {email: string, password: string}) {
    return this.httpClient.post<{accessToken: string}>(
      `${environment.url}/api/auth/login`,
      body
    ).pipe(
      tap(
        (user) =>{
          this.subject$.next(user)
          localStorage.setItem('token', user.accessToken);
          console.log(localStorage.getItem('token'))
          this.router.navigate(['homepage'])
        }
      )
    );
  }

  registr(body: {username: string,email: string, password: string}) {
    return this.httpClient.post<{accessToken: string}>(
      `${environment.url}/api/auth/registration`,
      body
    ).pipe(
      tap(
        (user) =>{
          localStorage.setItem('token', user.accessToken);
          console.log(user)
        }
      )
    );
  }
}
