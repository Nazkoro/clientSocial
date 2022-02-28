import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {BaseService} from "../../../services/base-service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class ChatComponent implements OnInit {
  // newMessage: string;
  // messageList: string[] = [];
  user: any;
  conversations: any;
  currentOpenChat: any;
  listOfMessages: any;
  sendText: any;

  constructor(private chatService: ChatService, private baseService: BaseService<any>) { }

  ngOnInit(): void {
    this.baseService.getUser().subscribe((data:any) => {
      // console.log(data)
      this.user = data
      console.log("data._id", data._id)
      this.chatService.getAllConversation(data._id).subscribe((data: any) => {
        console.log(data)
        this.conversations = data
      })
    });
    // this.chatService.getAllConversation(this.user._id).subscribe((data: any) => {
    //   console.log(data)
    // })

    // this.chatService.getNewMessage().subscribe((message: string) => {
    //   this.messageList.push(message);
    // })
  }
  openConversation(conversation){
    this.currentOpenChat = conversation
    this.chatService.getAllMessageBetweenUser(conversation._id).subscribe((data: any) => {
      console.log("all message:" ,data)
      this.listOfMessages = data;
      // this.conversations = data
    })

    console.log(conversation)
  }

  handleSubmit(){
    console.log(this.sendText);

    const message = {
      sender: this.user._id,
      text: this.sendText,
      conversationId: this.currentOpenChat._id
    }
    console.log("message", message)
    this.sendText = "";
    try {
      this.chatService.addMessage(message).subscribe((data: any) => {
        console.log("add mesage" ,data)
        this.listOfMessages = [...this.listOfMessages, data]
        // this.conversations = data
      })
    } catch (err) {
      console.log(err)}
  }






  sendMessage() {
    // this.chatService.sendMessage(this.newMessage);
    // this.newMessage = '';
  }

}
