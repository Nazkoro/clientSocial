import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {BaseService} from '../../../services/base-service';
import {Router} from '@angular/router';
import {AuthService} from "../../../../auth/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']

})
export class PostsComponent implements OnInit {

  posts: any
  post:any = {
    desc: ""
  }


  constructor(private baseService: BaseService<any>, private router: Router, private authService: AuthService,private http: HttpClient) { }


  ngOnInit(): void {
    this.baseService.getPosts().subscribe((data:any) => {
      this.posts = data
      console.log('posts',this.posts)
    });

  }
  submit(value){
    console.log(value)
    this.post = {...value, userId: JSON.parse(localStorage.getItem('id'))}
    this.baseService.post(this.post)
      .subscribe(

        (data: any) => {
          console.log(data)
          this.posts.push(data)
          console.log(this.posts)
          this.post.desc = ""
        },
        error => console.log(error)
      );

  }



}
