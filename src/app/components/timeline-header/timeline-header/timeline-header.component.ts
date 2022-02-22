import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import * as userStore from "../../../store/user-store/user.selectors";
import {login} from "../../../store/admin-auth-store/store/admin-auth.actions";

@Component({
  selector: 'app-timeline-header',
  templateUrl: './timeline-header.component.html',
  styleUrls: ['./timeline-header.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class TimelineHeaderComponent implements OnInit {
  @Input() info: any
  infoAbooutuser$: Observable<any> = this.store$.pipe(select(userStore.getSelectedUser));
  constructor(private store$: Store) { }

  ngOnInit(): void {
    console.log("render header")
    console.log(this.info)
    this.infoAbooutuser$.subscribe(val => console.log(val))
  }

}
