import {Component, Input, OnInit} from '@angular/core';
import {BaseService} from '../../../services/base-service';
import {addComentInPost, putLikePost} from "../../../store/posts-store/posts-store.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class CommentComponent implements OnInit {
   @Input() currentPost: any ;
   text: any;

  constructor(private baseService: BaseService<any>,private store$: Store) { }

  ngOnInit(): void {
    console.log("currentPost", this.currentPost)
  }
  submit(){

    const objComment = {
      post: {
        ...this.currentPost
      },
      comment: {
        postId: this.currentPost._id,
        text: this.text,
      }
  }
    this.store$.dispatch(addComentInPost({objComment}));

    this.text = ""
  }

}
