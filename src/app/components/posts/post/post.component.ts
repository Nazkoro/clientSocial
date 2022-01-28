import { Component, OnInit , Input} from '@angular/core';
import {putLikePost} from "../../../store/posts-store/posts-store.actions";
import * as postsStore from '../../../store/posts-store/posts-store.selectors';
import {Store, select} from "@ngrx/store";
import {Observable} from "rxjs";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class PostComponent implements OnInit {
 @Input() post: any
  post2$: Observable<any> = this.store$.pipe(select(postsStore.updLikePost))


  constructor(private store$: Store) { }

  ngOnInit(): void {
  }

  onUpdateLike(likeAndPostId) {
    console.log(likeAndPostId)
    this.store$.dispatch(putLikePost({likeAndPostId}));

  }

}
