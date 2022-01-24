import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as adminAuth from '../../../../store/admin-auth-store/store/admin-auth.selectors';
import {login} from '../../../../store/admin-auth-store/store/admin-auth.actions';

import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-login-block',
  templateUrl: './admin-login-block.component.html',
  styleUrls: ['./admin-login-block.component.css']
})
export class AdminLoginBlockComponent implements OnInit {

  loading$: Observable<boolean> = this.store$.pipe(select(adminAuth.getLoading));
  loaded$: Observable<boolean> = this.store$.pipe(select(adminAuth.getLoaded));
  serverError$: Observable<string> = this.store$.pipe(select(adminAuth.getServerError));

  serverError = '';

  constructor(private store$: Store, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(loginPayload: {email: string, password: string}) {
    this.store$.dispatch(login(loginPayload));
  }
  }

