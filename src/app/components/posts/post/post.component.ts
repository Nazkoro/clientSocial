import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {deletePosts, putLikePost} from "../../../store/posts-store/posts-store.actions";
import {Store,} from "@ngrx/store";



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class PostComponent implements OnInit, OnDestroy {
 @Input() post: any

  constructor(private store$: Store) { }

  ngOnInit(): void {
     console.log("POST COMPONENT", this.post)
  }

  removePost(post){
    console.log(post)
    this.store$.dispatch(deletePosts({post}));
  }

  onUpdateLike(likeAndPostId) {
    this.store$.dispatch(putLikePost({likeAndPostId}));
  }

  ngOnDestroy() {
    console.log(2222)
  }

}
