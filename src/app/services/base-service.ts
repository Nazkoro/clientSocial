import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';


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
    return this.http.get<[any]>(`${environment.url}/api/users`);
  }
  getPosts(): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/posts`);
  }
/*  get(params?: HttpParams): Observable<[T]> {
    return this.http.get<[T]>(`${environment.url}/timeline/`, {params: params});
  }*/

/*
  get_list(id: number, params?: HttpParams): Observable<[T]> {
    return this.http.get<[T]>(`${environment.url}/${this.url}/${id}`, {params: params});
  }

  get_single(id: number): Observable<T> {
    return this.http.get<T>(`${environment.url}/${this.url}/${id}/`);
  }
*/

  post(model: any): Observable<any> {
    console.log(model)
    return this.http.post<T>(`${environment.url}/api/createpost`, model);
  }

  put(model: T, id?: number): Observable<T> {
    return this.http.put<T>(`${environment.url}/${this.url}/${id}/`, model);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.url}/${this.url}/${id}/`);
  }
}
