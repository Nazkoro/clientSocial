import {Component, Input, OnInit} from '@angular/core';
import {BaseService} from '../../../services/base-service';
import {addComentInPost, putLikePost} from "../../../store/posts-store/posts-store.actions";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as userStore from "../../../store/user-store/user.selectors";
import {saveDataUser} from "../../../store/user-store/user.actions";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class CommentComponent implements OnInit {
   @Input() currentPost: any;
   text: any;
   username: string;
    user$: Observable<any> = this.store$.pipe(select(userStore.getLoginUser));
    constructor(private baseService: BaseService<any>, private store$: Store) { }

  ngOnInit(): void {
    this.user$.subscribe( val => this.username = val.username).unsubscribe()
  }
  relocateToPersonalPage(username){
    this.baseService.getUserByUsername(username).subscribe((data:any) => {
      this.store$.dispatch(saveDataUser(data[0]));
    });
  }

  submit(){
    const objComment = {
      post: {
        ...this.currentPost
      },
      comment: {
        postId: this.currentPost._id,
        text: this.text,
        username: this.username
      }
  }
    this.store$.dispatch(addComentInPost({objComment}));
    this.text = ""
  }
}
