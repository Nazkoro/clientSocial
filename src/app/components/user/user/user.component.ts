import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../../services/base-service';
import {getPosts} from "../../../store/posts-store/posts-store.actions";
import {Store} from "@ngrx/store";
import {saveDataUser, updateSuccessAction} from "../../../store/user-store/user.actions";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', '../../../../../css/style.css', '../../../../../css/bootstrap.min.css']
})
export class UserComponent implements OnInit {
   users: any

  constructor(private baseService: BaseService<any>,private store$: Store) { }
  ngOnInit(): void {
    console.log("8=======================0")
    this.baseService.getUsers().subscribe((data:any) => {
      console.log(data)
      this.users = data
    });
  }
  relocateToPersonalPage(user){
    console.log(user)
    this.store$.dispatch(saveDataUser(user));

  }

  addFriend(id){
    this.baseService.followOnUser({id:id}).subscribe((data:any) => {
      console.log(data)
    });
  }
}
