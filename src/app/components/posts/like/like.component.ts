import {Component, OnInit,OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {putLikePost} from "../../../store/posts-store/posts-store.actions";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as postsStore from "../../../store/posts-store/posts-store.selectors";

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class LikeComponent implements OnInit {
  // likeFlag: boolean = false;

  @Input() post: any;
  @Output() updateLike = new EventEmitter();

  constructor(private store$: Store) { }

  ngOnInit(): void {
  }

  likePost(){
    // this.likeFlag=!this.likeFlag;
    // let changeCount = this.likeFlag? this.post.likes.count + 1 : this.post.likes.count
    // console.log(this.likeFlag)
    let likeAndPostId = {
      ...this.post,
      likes : {
        ...this.post.likes,
        isLiked: !this.post.likes.isLiked,
      },
    }
    console.log(likeAndPostId)
    // let likes = {
    //   ...this.like,
    //   isLiked: this.likeFlag,
    // }
    this.updateLike.emit(likeAndPostId);
    // this.store$.dispatch(putLikePost({post}));

  }
  ngOnDestroy(){
    console.log("DROP POST FROM TIMELINE")
  }
}
