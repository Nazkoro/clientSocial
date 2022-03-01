import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {BaseService} from "../../../services/base-service";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class ChatComponent implements OnInit , AfterViewInit, AfterViewChecked {
  // newMessage: string;
  // messageList: string[] = [];
  user: any;
  conversations: any;
  currentOpenChat: any;
  listOfMessages: any;
  sendText: any;
  @ViewChild("myDiv") divView: ElementRef;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;




  constructor(private chatService: ChatService, private baseService: BaseService<any>) { }


  ngOnInit(): void {
    this.baseService.getUser().subscribe((data:any) => {
      this.user = data
      this.chatService.getAllConversation(data._id).subscribe((data: any) => {
        this.conversations = data
      })
    });

    // this.scrollToBottom();

    // this.chatService.getAllConversation(this.user._id).subscribe((data: any) => {
    //   console.log(data)
    // })

    // this.chatService.getNewMessage().subscribe((message: string) => {
    //   this.messageList.push(message);
    // })
  // @ViewChild(this.chatService.socket) soket2: ElementRef;
  //
  //   console.log()

  }


  ngAfterViewInit(){
    // console.log("afterinit");
    // setTimeout(() => {
    //   console.log(this.divView);
    //   this.divView.nativeElement.innerHTML = "Hello Angular 10!";
    // }, 300);
    // console.log(this.divView);
    // this.divView.nativeElement.scrollIntoView({block: "end",behavior: "smooth"});
  }

  ngAfterViewChecked() {
    // this.scrollToBottom();
  }

  openConversation(conversation){
    this.currentOpenChat = conversation
    this.chatService.getAllMessageBetweenUser(conversation._id).subscribe((data: any) => {
      this.listOfMessages = data;
    })
  }

  handleSubmit(){

    const message = {
      sender: this.user._id,
      text: this.sendText,
      conversationId: this.currentOpenChat._id
    }
    this.sendText = "";
    try {
      this.chatService.addMessage(message).subscribe((data: any) => {
        this.listOfMessages = [...this.listOfMessages, data]
        console.log(this.divView);
        this.divView.nativeElement.scrollIntoView({block: "end",behavior: "smooth"});
      })
    } catch (err) {
      console.log(err)}
  }

  // scrollToBottom(): void {
  //   try {
  //     this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  //   } catch(err) { }
  // }






  sendMessage() {
    // this.chatService.sendMessage(this.newMessage);
    // this.newMessage = '';
  }

}
