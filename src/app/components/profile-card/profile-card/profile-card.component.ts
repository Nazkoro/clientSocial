import { Component, OnInit } from '@angular/core';
import {BaseService} from "../../../services/base-service";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class ProfileCardComponent implements OnInit {
   user: any;

  constructor(private baseService: BaseService<any>) { }

  ngOnInit(): void {
    this.baseService.getUser().subscribe((data:any) => {
      console.log(data)
      this.user = data
    });
  }

}
