import { Component, OnInit } from '@angular/core';
import {getSelectedUser} from "../../../store/user-store/user.selectors";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as userStore from "../../../store/user-store/user.selectors";
import {loadUserRequestAction} from "../../../store/user-store/user.actions";
import {login} from "../../../store/admin-auth-store/store/admin-auth.actions";

@Component({
  selector: 'app-timeline-about',
  templateUrl: './timeline-about.component.html',
  styleUrls: ['./timeline-about.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class TimelineAboutComponent implements OnInit {
  user$: Observable<any> = this.store$.pipe(select(userStore.getSelectedUser));
  // (select(getSelectedUser))
// .subscribe(user => console.log(user));
  private userInfo: any;
  constructor(private store$: Store) { }

  ngOnInit(): void {
    this.store$.dispatch(loadUserRequestAction());
    // this.user$.subscribe((user) => {
    //   console.log(user)
    //   this.userInfo = user
    // })


  }

}
