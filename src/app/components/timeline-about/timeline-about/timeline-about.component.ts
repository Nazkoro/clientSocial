import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as userStore from "../../../store/user-store/user.selectors";

@Component({
  selector: 'app-timeline-about',
  templateUrl: './timeline-about.component.html',
  styleUrls: ['./timeline-about.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class TimelineAboutComponent implements OnInit {
  user$: Observable<any> = this.store$.pipe(select(userStore.getSelectedUser));
  userLogged$: Observable<any> = this.store$.pipe(select(userStore.getLoginUser));
  info: any;

  constructor(private store$: Store) { }

  ngOnInit(): void {
    this.user$.subscribe(val => {
      this.info = val
    })
    this.userLogged$.subscribe((val) => {
      console.log("userLogged$", val)
    })
    // this.store$.dispatch(loadUserRequestAction());

  }

}
