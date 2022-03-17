import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../../services/base-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', '../../../../../css/style.css', '../../../../../css/bootstrap.min.css']
})
export class UserComponent implements OnInit {
   users: any

  constructor(private baseService: BaseService<any>) { }
  ngOnInit(): void {
    this.baseService.getUsers().subscribe((data:any) => {
      this.users = data
    });
  }

  addFriend(id){
    this.baseService.followOnUser({id:id}).subscribe((data:any) => {
      console.log(data)
    });
  }
}
