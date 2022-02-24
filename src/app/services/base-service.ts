import {HttpClient, HttpParams} from '@angular/common/http';
import {concat, delay, Observable, retryWhen, take, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {tap} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  protected url: string | undefined;
  protected params: HttpParams | undefined;
  constructor(protected http: HttpClient) {
  }

  getUsers(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/user`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
  getUser(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/user/account`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
  getOnlineUsers(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/user/online`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
  getPosts(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/posts`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
  getMyPosts(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/posts/my-post`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
  getComments(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/comment/print`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
  getMyFriends(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/user/friends`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }


  addUserInfo(model: any): Observable<any> {
    return this.http.put<any>(`${environment.url}/api/user/add-info`, model).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
  updatelike(model: any): Observable<any> {
    console.log("baseService", model)
    return this.http.put<any>(`${environment.url}/api/posts/like`, model,{
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).
    pipe(tap((data) => {
        console.log(data)
      }),
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
  followOnUser(model: any): Observable<any> {
    return this.http.put<any>(`${environment.url}/api/user/follow`, model).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
  unfollowOnUser(model: any): Observable<any> {
    return this.http.put<any>(`${environment.url}/api/user/unfollow`, model).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }



  createPost(model: any): Observable<any> {
    console.log(model)
    return this.http.post<T>(`${environment.url}/api/posts/upload`, model).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
  createComment(model: any): Observable<any> {
    console.log(model)
    return this.http.post<T>(`${environment.url}/api/comment/create`, model).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }

  logoutUser(model): Observable<any> {
    console.log()
    return this.http.post<T>(`${environment.url}/api/auth/logout`, model).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }


  deletePosts(model): Observable<any> {
    console.log(model)
    return this.http.delete<any>(`${environment.url}/api/posts/delete/${model._id}`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.url}/${this.url}/${id}/`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.url}/api/user/${id}/`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
}
