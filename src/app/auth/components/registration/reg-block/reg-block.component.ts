import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as adminAuth from '../../../../store/admin-auth-store/store/admin-auth.selectors';
import {registr} from '../../../../store/admin-auth-store/store/admin-auth.actions';

@Component({
  selector: 'app-reg-block',
  templateUrl: './reg-block.component.html',
  styleUrls: ['./reg-block.component.css']
})
export class AdminRegistrationBlockComponent implements OnInit {

  loading$: Observable<boolean> = this.store$.pipe(select(adminAuth.getLoading));
  loaded$: Observable<boolean> = this.store$.pipe(select(adminAuth.getLoaded));
  serverError$: Observable<string> = this.store$.pipe(select(adminAuth.getServerError));

  serverError = '';

  constructor(private store$: Store) { }

  ngOnInit(): void {
  }

  onRegistr(loginPayload: {username: string, email: string, password: string}) {
    this.store$.dispatch(registr(loginPayload));
  }
}
