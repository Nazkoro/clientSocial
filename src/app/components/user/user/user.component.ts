import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../../services/base-service';
import {Router} from '@angular/router';
import {AuthService} from "../../../auth/auth.service";
import {HttpClient} from '@angular/common/http';
;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', '../../../../../css/style.css', '../../../../../css/bootstrap.min.css']
})
export class UserComponent implements OnInit {
   user: any
   users: any
   posts: any
  post:any = {
     desc: ""
  }

  constructor(private baseService: BaseService<any>, private router: Router, private authService: AuthService,private http: HttpClient) { }
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
