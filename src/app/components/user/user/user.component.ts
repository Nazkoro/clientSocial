import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {BaseService} from '../../../services/base-service';
import {Router} from '@angular/router';
import {AuthService} from "../../../../auth/auth.service";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";
;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', '../../../../../css/style.css', '../../../../../css/bootstrap.min.css']
})
export class UserComponent implements OnInit {
   // user: any =  JSON.parse(localStorage.getItem('user'))
   user: any
   users: any
   posts: any
  post:any


  constructor(private baseService: BaseService<any>, private router: Router, private authService: AuthService,private http: HttpClient) { }


  ngOnInit(): void {
    this.baseService.getUsers().subscribe((data:any) => {
      this.users = data
      console.log('users',this.users)

    });
    this.baseService.getPosts().subscribe((data:any) => {
      this.posts = data
      console.log('posts',this.posts)
    });


    // this.authService.subject$.subscribe((value => {
    //     if (!value) {
    //       //  NEED DO REFACTORING !!!
    //       this.http.get(`${environment.url}/api/users/?userId=61cb0a081cb0c11fb0acf7a7&username=Nazar`).subscribe((data:any) => this.user=data)
    //
    //     } else {
    //       this.user = value.user
    //     }
    //   }
    //
    // ))
  }
  submit(value){
    console.log(value)
    this.post = {...value, userId: JSON.parse(localStorage.getItem('id'))}
    this.baseService.post(this.post)
      .subscribe(
        (data: any) => {this.posts = [...this.posts,...data];
          // this.done=true;
          },
        error => console.log(error)
      );
  }

}
