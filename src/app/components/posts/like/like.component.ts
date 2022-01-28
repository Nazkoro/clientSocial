import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
  likeFlag: boolean = false;
  @Input() like: any;
  @Input() postId: any;
  @Output() updateLike = new EventEmitter();

  constructor(private store$: Store) { }

  ngOnInit(): void {
  }

  likePost(){
    this.likeFlag=!this.likeFlag;
    let changeCount = this.likeFlag? this.like.count + 1 : this.like.count

    let likeAndPostId = {
      likes : {
        count: changeCount,
        isLiked: this.likeFlag,
      },
      _id: this.postId,
    }
    // let likes = {
    //   ...this.like,
    //   isLiked: this.likeFlag,
    // }
    this.updateLike.emit(likeAndPostId);
    // this.store$.dispatch(putLikePost({post}));

  }
}
