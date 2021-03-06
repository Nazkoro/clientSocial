import { Injectable } from '@angular/core';
import {BehaviorSubject, concat, delay, Observable, retryWhen, take, throwError} from 'rxjs';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public  message$: BehaviorSubject<string> = new BehaviorSubject("")
  constructor(protected http: HttpClient) { }

  getAllConversation(id): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/conversation/${id}`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
  getAllGropConversation(id): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/multi-conversation/${id}`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }

  getAllMessageBetweenUser(id): Observable<[any]> {
    return this.http.get<[any]>(`${environment.url}/api/message/${id}`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
  getUserByUsername(username): Observable<[any]> {
    console.log("req.params.username",username)
    return this.http.get<[any]>(`${environment.url}/api/user/username/${username}`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }

  getInfoBetweenTwoUsers(id1, id2): Observable<[any]> {
    console.log("id1, id2",id1, id2)
    return this.http.get<[any]>(`${environment.url}/api/user/find/${id1}/${id2}`).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
  addMessage(model: any): Observable<any> {
    return this.http.post<any>(`${environment.url}/api/message`, model).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }

  addConversation(model: any): Observable<any> {
    return this.http.post<any>(`${environment.url}/api/conversation`, model).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }
  addGruopChat(model: any): Observable<any> {
    return this.http.post<any>(`${environment.url}/api/multi-conversation`, model).pipe(
      retryWhen((errors) =>{
        return concat(
          errors.pipe(delay(500),
            take(3)),
          throwError(new Error('Retry limit exceeded'))
        )
      })
    );
  }

  deleteConversation(id): Observable<any> {
    console.log(`${environment.url}/api/conversation/delete/${id}`)
    return this.http.delete<any>(`${environment.url}/api/conversation/delete/${id}`).pipe(
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
