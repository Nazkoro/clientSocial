import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
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
    return this.http.get<[any]>(`${environment.url}/api/user`);
  }
  getUser(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/user/account`);
  }
  getOnlineUsers(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/user/online`);
  }
  getPosts(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/posts`).pipe(
      tap(
        (user) =>{
          console.log(user)
        }
      )
    );
  }
  getMyPosts(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/posts/my-post`);
  }
  getComments(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/comment/print`);
  }
  getMyFriends(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/user/friends`);
  }


  addUserInfo(model: any): Observable<any> {
    return this.http.put<any>(`${environment.url}/api/user/add-info`, model);
  }
  updatelike(model: any): Observable<any> {
    console.log("baseService", model)
    return this.http.put<any>(`${environment.url}/api/posts/like`, model,{
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).pipe(
      tap(
        (likes) =>{
          console.log("likes",likes)
        }
      )
    );
  }
  followOnUser(model: any): Observable<any> {
    return this.http.put<any>(`${environment.url}/api/user/follow`, model);
  }
  unfollowOnUser(model: any): Observable<any> {
    return this.http.put<any>(`${environment.url}/api/user/unfollow`, model);
  }



  createPost(model: any): Observable<any> {
    console.log(model)
    return this.http.post<T>(`${environment.url}/api/posts/upload`, model);
  }
  createComment(model: any): Observable<any> {
    console.log(model)
    return this.http.post<T>(`${environment.url}/api/comment/create`, model);
  }

  logoutUser(model): Observable<any> {
    console.log()
    return this.http.post<T>(`${environment.url}/api/auth/logout`, model);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.url}/${this.url}/${id}/`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.url}/api/user/${id}/`);
  }
}
