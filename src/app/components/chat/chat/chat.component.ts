import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {BaseService} from "../../../services/base-service";
import {io} from "socket.io-client";
import {BehaviorSubject} from "rxjs";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class ChatComponent implements OnInit , AfterViewInit, AfterViewChecked {
  // newMessage: string;
  newMessage: any;
  messageList: string[] = [];

  onlineUsers:any[];
  arrivalMessage: any;
  user: any;
  conversations: any;
  currentOpenChat: any;
  listOfMessages: any;
  sendText: any;

  socket = io('http://localhost:8900');
  // public  message$: BehaviorSubject<string> = new BehaviorSubject("")

  @ViewChild("myDiv") divView: ElementRef;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private chatService: ChatService, private baseService: BaseService<any>) { }

  ngOnInit(): void {
    this.baseService.getUser().subscribe((data:any) => {
      this.user = data
      this.chatService.getAllConversation(data._id).subscribe((data: any) => {
        this.conversations = data
        this.addUserAndGetUsers(data)
      })
    });

//как сделать проверку на то что User поменялся?
    this.socket.on('getMessage', (message) =>{
      console.log(message);
      this.arrivalMessage = {
        sender: message.senderId,
        text: message.text,
        createdAt: Date.now(),
      }
      console.log(this.arrivalMessage)
        // this.listOfMessages = [...this.listOfMessages, message];

      // this.messageList.push(message);
      // this.message$.next(message);
    });

  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes)
  // }

  ngAfterViewInit(){
    // this.arrivalMessage &&
    // this.currentOpenChat?.members.includes(this.arrivalMessage.sender) &&
    // (this.listOfMessages = [...this.listOfMessages, this.arrivalMessage]);
    // setMessages((prev) => [...prev, this.arrivalMessage]);
  }

  addArrivalMessage(){
      this.arrivalMessage &&
      this.currentOpenChat?.members.includes(this.arrivalMessage.sender) &&
      (this.listOfMessages = [...this.listOfMessages, this.arrivalMessage]);
  }

  ngAfterViewChecked() {
  }

  public sendMessage() {
    this.socket.emit('message', this.newMessage);
    this.newMessage = '';
  }

  // public getNewMessage = () => {
  //   this.socket.on('message', (message) =>{
  //     this.messageList.push(message);
  //     // this.message$.next(message);
  //   });
  //    //return this.message$.asObservable();
  // };

  openConversation(conversation){
    this.currentOpenChat = conversation
    this.chatService.getAllMessageBetweenUser(conversation._id).subscribe((data: any) => {
      this.listOfMessages = data;
    })
  }

  addUserAndGetUsers(data){
    console.log("Data",data)
    this.socket.emit("addUser", data[0]._id);
    this.socket.on("getUsers", (users) => {
      this.onlineUsers = this.user.followings.filter((f) => users.some((u) => u.userId === f))

    });
  }

  soketSendMessage(){
    const receiverId = this.currentOpenChat.members.find(
      (member) => member !== this.user._id
    );

    this.socket.emit("sendMessage", {
      senderId: this.user._id,
      receiverId,
      text:  this.sendText,
    });
  }

  handleSubmit(){
    const message = {
      sender: this.user._id,
      text: this.sendText,
      conversationId: this.currentOpenChat._id
    }
    this.soketSendMessage()

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

  // sendMessage() {
  //   this.chatService.sendMessage(this.newMessage);
  //   this.newMessage = '';
  // }

}
