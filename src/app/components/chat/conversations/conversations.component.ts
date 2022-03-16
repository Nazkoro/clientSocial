import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BaseService} from "../../../services/base-service";
import {TestSubjectService} from "../../../services/TestSubjectService";
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css' ,'../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class ConversationsComponent implements OnInit, OnDestroy {
  @Input() conversation: any
  @Input() user: any
  @Output() deleteConv = new EventEmitter();
  currentuser: any;
  message: any;
  subscription: any;


  constructor(private baseService: BaseService<any>, private testSubjectService: TestSubjectService, private chatService: ChatService) {
    this.subscription = this.testSubjectService.getMessage().subscribe(message => {
      if(message.roomId._id === this.conversation._id){
        this.message = message;
        console.log("conversation component ", message)
      }
    })
  }

  ngOnInit(): void {
   const friendId =  this.conversation.members.find((m) => m!== this.user._id);
    this.baseService.getChatUser(friendId).subscribe((data:any) => {
      this.currentuser = data
    })
  }
  removeConversation(deleteCurrent){
  this.chatService.deleteConversation(deleteCurrent).subscribe((data) => {
    console.log(data);
  })
    this.deleteConv.emit(deleteCurrent)


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
