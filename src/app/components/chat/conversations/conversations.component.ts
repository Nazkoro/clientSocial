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



  constructor(private baseService: BaseService<any>, private testSubjectService: TestSubjectService) {
    // this.subscription = this.testSubjectService.getMessage().subscribe(message => {
    //   this.message = message;
    //   console.log("incinversation component ", message)
    // });
  }


  ngOnInit(): void {
   const friendId =  this.conversation.members.find((m) => m!== this.user._id);
    this.baseService.getChatUser(friendId).subscribe((data:any) => {
      this.currentuser = data
    })

  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
