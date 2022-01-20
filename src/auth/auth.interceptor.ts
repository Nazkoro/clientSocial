import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {catchError, EMPTY, Observable, switchMap, throwError} from 'rxjs';
import {tap} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  isRefreshing = false;

  constructor(private authService: AuthService,) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    if (!this.isRefreshing) {
      authReq = req.clone( { setHeaders: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
        withCredentials: true
      });
    }

    return next.handle(authReq).pipe(
      catchError((err) => {
        if (err.status === 401) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;

            return this.authService.refreshToken().pipe(
              switchMap((res) => {
                this.isRefreshing = false;
                localStorage.setItem('token', res.accessToken);
                return next.handle(authReq);
              })
            )
          } else {
            this.isRefreshing = false;
            localStorage.removeItem('token');
          }

        }

        return throwError(err);
      })
    )
  }
}

// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor, HttpResponse, HttpErrorResponse
// } from '@angular/common/http';
// import {catchError, EMPTY, Observable, switchMap} from 'rxjs';
// import {tap} from "rxjs/operators";
// import {AuthService} from "./auth.service";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthInterceptor implements HttpInterceptor {
//   isRefreshing = false;
//
//   constructor(private authService: AuthService,) {}
//
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     let authReq = req;
//     if (!this.isRefreshing) {
//       authReq = req.clone( { setHeaders: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }});
//     }
//
//     return next.handle(authReq).pipe(
//         catchError((err) => {
//           if (err.status === 401 && !this.isRefreshing) {
//             this.isRefreshing = true;
//
//             return this.authService.refreshToken().pipe(
//               switchMap((res) => {
//                 this.isRefreshing = false;
//                 localStorage.setItem('token', res.accessToken);
//                 return next.handle(authReq)
//               }),
//               catchError((err) => {
//                 console.log(err, 11)
//                 this.isRefreshing = false;
//                 localStorage.removeItem('token');
//                 return EMPTY;
//               })
//             )
//           }
//           console.log(222)
//           return EMPTY;
//         })
//     )
//   }
// }


// import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from "rxjs";
// import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
// import {TokenService} from "../services/token.service";
// import {NgModule} from "@angular/core";
// import {AuthService} from "../auth/auth.service";
// import {Router} from "@angular/router";
// import {RefreshDto} from "../auth/dto/refresh.dto";
//
// @NgModule()
// export class AuthInterceptorService implements HttpInterceptor {
//
//   private isRefreshing = false;
//   private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
//
//   constructor(private readonly tokenService: TokenService,
//               private readonly authService: AuthService,
//               private readonly router: Router) {
//   }
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
//     let authReq = request;
//     const token = this.tokenService.getAccessTokenFromLocalStorage();
//     if (token != null) {
//       authReq = this.addTokenHeader(request, token);
//     }
//
//     return next.handle(authReq).pipe(
//       catchError(err => {
//         if (err instanceof HttpErrorResponse) {
//           if (err.status === 401) {
//             return this.handle401Error(authReq, next);
//           }
//         }
//         return throwError(err);
//       }));
//   }
//
//   private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
//     if (!this.isRefreshing) {
//       this.isRefreshing = true;
//       this.refreshTokenSubject.next(null);
//       const token = this.tokenService.getRefreshTokenFromLocalStorage();
//
//       if (token === null) {
//         this.router.navigate(['auth/login'])
//         return throwError(new Error('Refresh token doesnt exist'));
//       }
//
//       const refresh: RefreshDto = {
//         refreshToken: token,
//       }
//
//       if (token)
//         return this.authService.refresh(refresh).pipe(
//           switchMap((token: any) => {
//             this.isRefreshing = false;
//
//             this.tokenService.setDataInLocalStorage(token);
//             this.refreshTokenSubject.next(token.accessToken);
//
//             return next.handle(this.addTokenHeader(request, token.accessToken));
//           }),
//           catchError((err) => {
//             this.isRefreshing = false;
//             this.router.navigate(['auth/login']);
//             return throwError(err);
//           })
//         );
//     }
//
//     return this.refreshTokenSubject.pipe(
//       filter(token => token !== null),
//       take(1),
//       switchMap((token) => next.handle(this.addTokenHeader(request, token)))
//     );
//   }
//
//   private addTokenHeader(request: HttpRequest<any>, token: string) {
//     return request.clone({
//       setHeaders: {Authorization: `Bearer ${token}`}
//     });
//   }
// }
