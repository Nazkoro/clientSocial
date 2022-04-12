import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../../services/base-service';

import {HttpClient} from "@angular/common/http";
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class MypostComponent implements OnInit {
  posts: any
  comments: any
  postObj: any

  myForm = new FormGroup({
    post: new FormControl('' ),
    file: new FormControl(''),
    fileSource: new FormControl('')
  });

  constructor(private http: HttpClient,private baseService: BaseService<any>) { }
  ngOnInit() {
  this.getPost()

  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }
  getPost(){
    this.baseService.getMyPosts().subscribe((data:any) => {
      // let arr = data.flat()
      // console.log("only this user post", data)
      this.posts = data
    });
  }

  increment( post ){
    this.baseService.updatelike(post).subscribe((data:any) => {
      post.likes = data.likes
    });
  }
  submit() {
    this.postObj = {
      desc: this.myForm.value.post,
    }
    if(this.myForm.value.file){
      const formData = new FormData();
      formData.append('file', this.myForm.get('fileSource').value);
      formData.append('desc',  this.postObj.desc );
      this.postObj.img = this.myForm.value.fileSource.name

      this.baseService.createPost(formData)
        .subscribe((data: any) => {
            console.log(data)
            this.posts.push(...data)
            this.postObj = {}
          },
          error => console.log(error)
        )
    }
    this.myForm.reset()
  }
}
