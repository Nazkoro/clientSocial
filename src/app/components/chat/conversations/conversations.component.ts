import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseService} from "../../../services/base-service";
import {TestSubjectService} from "../../../services/TestSubjectService";

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css' ,'../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class ConversationsComponent implements OnInit, OnDestroy {
  @Input() conversation: any
  @Input() user: any
  currentuser: any;

  message: any;
  subscription: any;



// нужно отписаться чтобы не выгружать память

  constructor(private baseService: BaseService<any>, private testSubjectService: TestSubjectService) {
    this.subscription = this.testSubjectService.getMessage().subscribe(message => {
      this.message = message;
      console.log("incinversation component ", message)
    });
  }


  ngOnInit(): void {
   const friendId =  this.conversation.members.find((m) => m!== this.user._id);
    this.baseService.getChatUser(friendId).subscribe((data:any) => {
      // console.log(data)
      this.currentuser = data
    })
    console.log("conversation", this.conversation)
    // getChatUser
   // const getuser = baseService
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
