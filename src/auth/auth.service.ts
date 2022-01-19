import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Login, Registration, Token, Verify} from './models';
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

   subject$ = new BehaviorSubject( null);

  constructor(private http: HttpClient) {
  }

  login(model: Login): Observable<any> {
    return this.http.post<any>(`${environment.url}/api/auth/login`, model)
      .pipe(
        tap(
          (user) =>{
            this.subject$.next(user)
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('id', JSON.stringify(user.user.id));
          }
          // (token: Token) => {
          //   this.setToken(token.access);
          //   localStorage.setItem('token', token.access);
          // }
        )
      );
  }

  registration(model: Registration): Observable<any> {
    return this.http.post<any>(`${environment.url}/api/auth/registration`, model)
      .pipe(
        tap(
          (user) =>{
            this.subject$.next(user)
            localStorage.setItem('token', user.accessToken);
          }
        )
    );
  }
  postEmail(email){
    console.log("email su", email)
    return this.http.post<any>(`${environment.url}/api/auth/email`, email)
      .pipe(
        tap(
          (data) =>{
            console.log(data)
            // this.subject$.next(data)
            // localStorage.setItem('data', data);
          }
        )
      );
  }
  newPassword(password): Observable<any> {
    return this.http.put<any>(`${environment.url}/api/auth/password`, password)
      .pipe(
        tap(
          (data) =>{
            console.log(data)
            // this.subject$.next(data)
            // localStorage.setItem('data', data);
          }
        )
      );

  }







  verify(model: Verify): Observable<any> {
    return this.http.post<any>(`${environment.url}/auth/users/activation/`, model);
  }

  isAuth(): boolean {
    this.setToken(this.getToken());
    return !!this.token;
  }

  getToken(): string {
    // @ts-ignore
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    this.token = token;
  }
}



/*import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Login, Registration, Token, Verify} from './models';
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) {
  }

  login(model: Login): Observable<Token> {
    return this.http.post<Token>(`${environment.url}/auth/jwt/create/`, model)
      .pipe(
        tap(
          (token: Token) => {
            this.setToken(token.access);
            localStorage.setItem('token', token.access);
          }
        )
      );
  }

  registration(model: Registration): Observable<any> {
    return this.http.post<any>(`${environment.url}/auth/users/`, model);
  }

  verify(model: Verify): Observable<any> {
    return this.http.post<any>(`${environment.url}/auth/users/activation/`, model);
  }

  isAuth(): boolean {
    this.setToken(this.getToken());
    return !!this.token;
  }

  getToken(): string {
    // @ts-ignore
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    this.token = token;
  }
}*/
