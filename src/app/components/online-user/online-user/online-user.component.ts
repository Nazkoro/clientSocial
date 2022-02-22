import { Component, OnInit } from '@angular/core';
import {BaseService} from "../../../services/base-service";

@Component({
  selector: 'app-online-user',
  templateUrl: './online-user.component.html',
  styleUrls: ['./online-user.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class OnlineUserComponent implements OnInit {

  onlineUsers: any

  constructor(private baseService: BaseService<any>) { }
  ngOnInit(): void {

    this.baseService.getOnlineUsers().subscribe((data:any) => {
      console.log("online user",data)
      this.onlineUsers = data
    });
  }

}
