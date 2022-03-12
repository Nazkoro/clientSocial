import {Component, Input, OnInit} from '@angular/core';
import {BaseService} from "../../../services/base-service";

@Component({
  selector: 'app-group-conversation',
  templateUrl: './group-conversation.component.html',
  styleUrls: ['./group-conversation.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class GroupConversationComponent implements OnInit {
  @Input() conversation: any
  @Input() user: any
  currentuser: any;

  message: any;
  subscription: any;

  constructor(private baseService: BaseService<any>) { }

  ngOnInit(): void {
    console.log("GROUP CHAT", this.conversation)
    // const friendId =  this.conversation.members.find((m) => m!== this.user._id);
    // this.baseService.getChatUser(friendId).subscribe((data:any) => {
    //   this.currentuser = data
    // })
  }

}
