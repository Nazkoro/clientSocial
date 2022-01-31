import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class ChatComponent implements OnInit {
  newMessage: string;
  messageList: string[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

}