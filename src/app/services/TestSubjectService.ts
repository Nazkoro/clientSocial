import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TestSubjectService {

  private subject = new Subject<any>();

  sendMessage(message: any): void {
    this.subject.next(message );
  }

  // clearMessage(): void {
  //   this.subject.next();
  // }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
