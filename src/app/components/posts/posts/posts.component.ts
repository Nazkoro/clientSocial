import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {BaseService} from '../../../services/base-service';
import {Router} from '@angular/router';
import {AuthService} from "../../../../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']

})
export class PostsComponent implements OnInit {

/*  posts: any
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

  }*/
   posts: any
   postObj: any

  myForm = new FormGroup({
    post: new FormControl('' ),
    file: new FormControl(''),
    fileSource: new FormControl('')
  });

  constructor(private http: HttpClient,private baseService: BaseService<any>) { }
  ngOnInit() {
    this.baseService.getPosts().subscribe((data:any) => {
      this.posts = data
      console.log('posts',this.posts)
    });
  }
  //
  // get f(){
  //   return this.myForm.controls;
  // }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }
  increment(count){
    console.log(count)
    console.log('count',count+1)
    return count

  }

  submit()
  {
     this.postObj = {
      desc: this.myForm.value.post,
      userId: JSON.parse(localStorage.getItem('id'))
    }
     if(this.myForm.value.file){
       //this.myForm.value.fileSource.name = Date.now()
       const formData = new FormData();
       formData.append('file', this.myForm.get('fileSource').value);
       formData.append('desc',  this.postObj.desc );
       formData.append('userId', this.postObj.userId)
       console.log('formData',formData)
       console.log('this.myForm', this.myForm)
       this.postObj.img = this.myForm.value.fileSource.name

       this.http.post('http://localhost:4000/api/upload', formData)
         .subscribe((data: any) => {
            console.log(data)
            this.posts.push(data)
            console.log(this.posts)
             this.posts.forEach(item => {
               console.log(item.likes)
             })
            this.postObj = {}
          },
          error => console.log(error)
         )
     }
     // this.baseService.post(this.postObj)
     //  .subscribe(
     //    (data: any) => {
     //      console.log(data)
     //      this.posts.push(data)
     //      console.log(this.posts)
     //      this.postObj = {}
     //    },
     //    error => console.log(error)
     //  );
    this.myForm.reset()
    // window.location.reload();
    // this.myForm.value = null
  }
}
