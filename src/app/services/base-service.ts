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
  // user: any =  JSON.parse(localStorage.getItem('user'))
  // userId: any = this.user._id

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



  // putPost(model: any, id: any): Observable<any> {
  //   return this.http.put<any>(`${environment.url}/${id}/like`, model);
  // }


  addUserInfo(model: any): Observable<any> {
    return this.http.put<any>(`${environment.url}/api/user/add-info`, model);
  }
  updatelike(model: any): Observable<any> {
    return this.http.put<any>(`${environment.url}/api/posts/like`, model);
  }
  followOnUser(model: any): Observable<any> {
    return this.http.put<any>(`${environment.url}/api/user/follow`, model);
  }
  unfollowOnUser(model: any): Observable<any> {
    return this.http.put<any>(`${environment.url}/api/user/unfollow`, model);
  }

  // get(params?: HttpParams): Observable<[T]> {
  //   return this.http.get<[T]>(`${environment.url}/timeline/`, {params: params});
  // }
  //
  // get_list(id: number, params?: HttpParams): Observable<[T]> {
  //   return this.http.get<[T]>(`${environment.url}/${this.url}/${id}`, {params: params});
  // }
  //
  // get_single(id: number): Observable<T> {
  //   return this.http.get<T>(`${environment.url}/${this.url}/${id}/`);
  // }

  createPost(model: any): Observable<any> {
    console.log(model)
    return this.http.post<T>(`${environment.url}/api/posts/upload`, model);
  }
  createComment(model: any): Observable<any> {
    console.log(model)
    return this.http.post<T>(`${environment.url}/api/comment/create`, model);
  }


  // put(model: T, id?: number): Observable<T> {
  //   return this.http.put<T>(`${environment.url}/${this.url}/${id}/`, model);
  // }
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
