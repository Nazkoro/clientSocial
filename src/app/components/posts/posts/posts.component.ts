import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {BaseService} from '../../../services/base-service';
import {Router} from '@angular/router';
import {AuthService} from "../../../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {select, Store} from "@ngrx/store";
import {login} from "../../../store/admin-auth-store/store/admin-auth.actions";
import * as postsStore from '../../../store/posts-store/posts-store.selectors';
import {createPosts, getPosts, putLikePost} from "../../../store/posts-store/posts-store.actions";



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']

})
export class PostsComponent implements OnInit {
  posts: any
  comments: any
  postObj: any

  myForm = new FormGroup({
    post: new FormControl('' ),
    file: new FormControl(''),
    fileSource: new FormControl('')
  });
  loading$: Observable<boolean> = this.store$.pipe(select(postsStore.getLoading));
  loaded$: Observable<boolean> = this.store$.pipe(select(postsStore.getLoaded));
  posts$: Observable<any> = this.store$.pipe(select(postsStore.getPosts));

  serverError$: Observable<string> = this.store$.pipe(select(postsStore.getServerError));

  serverError = '';

  // subscription = new Subscription();

  constructor(private store$: Store, private router: Router, private baseService : BaseService <any>) { }

  ngOnInit(): void {
    this.store$.dispatch(getPosts());

  }

  // private getPosts(): void {
  //   this.subscription.add(
  //     this.store$.pipe(select(postsStore.getPosts))
  //       .subscribe(posts => this.posts = posts)
  //   );
  // }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }


  likePost( post ){
    this.store$.dispatch(putLikePost({post}))
    // this.store$.dispatch(getPosts());
    // this.baseService.updatelike(post).subscribe((data:any) => {
    //   console.log('return data',data)
    //   post.likes = data.likes
    // });
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
      this.store$.dispatch(createPosts({formData}))
        //this.store$.dispatch(getPosts());
    }
    this.myForm.reset()
  }
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe()
  //
  // }

}



















/////////////
//    posts: any
//    comments: any
//    postObj: any
//
//   myForm = new FormGroup({
//     post: new FormControl('' ),
//     file: new FormControl(''),
//     fileSource: new FormControl('')
//   });
//
//   constructor(private http: HttpClient,private baseService: BaseService<any>) { }
//   ngOnInit() {
//     this.baseService.getPosts().subscribe((data:any) => {
//       this.posts = data
//       console.log(this.posts)
//     });
//
//     // this.baseService.getComments().subscribe((data:any) => {
//     //   this.comments = data
//     //   console.log( this.comments)
//     // });
//   }
//   onFileChange(event) {
//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];
//       this.myForm.patchValue({
//         fileSource: file
//       });
//     }
//   }
//
//   increment( post ){
//     console.log("===post====", post)
//   // this.posts.forEach( (currentPost) => {
//   //   if(currentPost._id === id){
//   //     if(currentPost.likes.includes(JSON.parse(localStorage.getItem('id')))){
//   //       console.log('you likes this post earlier')
//   //        currentPost.likes = currentPost.likes.filter(currentLikeId => currentLikeId !== JSON.parse(localStorage.getItem('id')))
//   //       console.log(currentPost)
//   //     } else {
//   //       currentPost.likes.push(JSON.parse(localStorage.getItem('id')))
//   //       console.log(currentPost.likes)
//   //     }
//   //   }
//   //     this.baseService.putPost(model, id).subscribe((data:any) => {
//   //       this.posts = data
//   //       console.log('posts',this.posts)
//   //     });
//   // })
//   //   post.currentId = JSON.parse(localStorage.getItem('id'))
//     this.baseService.updatelike(post).subscribe((data:any) => {
//       console.log('return data',data)
//       post.likes = data.likes
//     });
//
//   }
//   submit()
//   {
//      this.postObj = {
//       desc: this.myForm.value.post,
//       // userId: JSON.parse(localStorage.getItem('id')),
//       //  token: JSON.parse(localStorage.getItem('token'))
//     }
//      if(this.myForm.value.file){
//        const formData = new FormData();
//        formData.append('file', this.myForm.get('fileSource').value);
//        formData.append('desc',  this.postObj.desc );
//        // formData.append('userId', this.postObj.userId)
//        // formData.append('token', this.postObj.token)
//        this.postObj.img = this.myForm.value.fileSource.name
//
//        this.baseService.createPost(formData)
//          .subscribe((data: any) => {
//             this.posts.push(data)
//              // this.posts.forEach(item => {
//              // })
//             this.postObj = {}
//           },
//           error => console.log(error)
//          )
//      }
//      // this.baseService.post(this.postObj)
//      //  .subscribe(
//      //    (data: any) => {
//      //      console.log(data)
//      //      this.posts.push(data)
//      //      console.log(this.posts)
//      //      this.postObj = {}
//      //    },
//      //    error => console.log(error)
//      //  );
//     this.myForm.reset()
//     // window.location.reload();
//     // this.myForm.value = null
//   }
//}
