import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {putLikePost} from "../../../store/posts-store/posts-store.actions";
import * as postsStore from '../../../store/posts-store/posts-store.selectors';
import {Store, select} from "@ngrx/store";
import {Observable} from "rxjs";
// import {getUpdatedPost} from "../../../store/posts-store/posts-store.selectors";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class PostComponent implements OnInit, OnDestroy {
 @Input() post: any
  // post2$: Observable<any> = this.store$.pipe(select(postsStore.updLikePost))
  posts$:any

  constructor(private store$: Store) { }

  ngOnInit(): void {
    console.log(111)
    // this.store$.select(postsStore.getUpdatedPost(this.post._id))
    //   .subscribe((post) => {
    //     this.post = post;
    //   });
  }

  onUpdateLike(likeAndPostId) {
    this.store$.dispatch(putLikePost({likeAndPostId}));

  }

  ngOnDestroy() {
    console.log(2222)
  }

}
