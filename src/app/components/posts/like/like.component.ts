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

  @Input() post: any;
  @Output() updateLike = new EventEmitter();

  constructor(private store$: Store) { }

  ngOnInit(): void {
  }

  likePost(){

    let likeAndPostId = {
      ...this.post,
      // likes : {
      //   ...this.post.likes,
      //   isLiked: !this.post.likes.isLiked,
      // },
    }
    this.updateLike.emit(likeAndPostId);

  }
  ngOnDestroy(){
  }
}
