import {Component, Input, OnInit} from '@angular/core';
import {BaseService} from '../../../services/base-service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class CommentComponent implements OnInit {
   @Input() currentPost: any ;
   text: any;


  constructor(private baseService: BaseService<any>) { }

  ngOnInit(): void {


  }
  submit(){
    console.log(this.text);
    console.log("111",this.currentPost)
    const objComment = {
      postId: this.currentPost._id,
      text: this.text
  }
    this.baseService.createComment(objComment).subscribe((data:any) => {
      console.log('return data',data)

    });
    this.text = ""

  }



}