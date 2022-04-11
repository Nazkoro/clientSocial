import { Component, OnInit } from '@angular/core';
import {getSelectedUser} from "../../../store/user-store/user.selectors";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as userStore from "../../../store/user-store/user.selectors";
import {loadUserRequestAction} from "../../../store/user-store/user.actions";


@Component({
  selector: 'app-timeline-about',
  templateUrl: './timeline-about.component.html',
  styleUrls: ['./timeline-about.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class TimelineAboutComponent implements OnInit {
  user$: Observable<any> = this.store$.pipe(select(userStore.getSelectedUser));
  info: any;

  constructor(private store$: Store) { }

  ngOnInit(): void {
    console.log("render about")
    this.user$.subscribe(val => {
      console.log("from store", val)
      this.info = val
    })
    // this.store$.dispatch(loadUserRequestAction());

  }

}
