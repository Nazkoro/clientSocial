import { Component, OnInit } from '@angular/core';
import {BaseService} from "../../../services/base-service";

@Component({
  selector: 'app-timeline-friends',
  templateUrl: './timeline-friends.component.html',
  styleUrls: ['./timeline-friends.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class TimelineFriendsComponent implements OnInit {
  friends: any[]

  constructor(private baseService: BaseService<any>) { }

  ngOnInit(): void {
    this.baseService.getMyFriends().subscribe((data:any) => {
      console.log(data)
      this.friends = data
    });
  }

}
