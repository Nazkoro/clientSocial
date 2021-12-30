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


  // get(): Observable<[T]> {
  //   return this.http.get<[T]>(`${environment.url}/timeline/${this.userId}`);
  // }
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

  post(model: T): Observable<T> {
    return this.http.post<T>(`${environment.url}/${this.url}/`, model);
  }

  put(model: T, id?: number): Observable<T> {
    return this.http.put<T>(`${environment.url}/${this.url}/${id}/`, model);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.url}/${this.url}/${id}/`);
  }
}
