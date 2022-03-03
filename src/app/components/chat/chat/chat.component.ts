import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {BaseService} from "../../../services/base-service";
import {io} from "socket.io-client";
import {BehaviorSubject} from "rxjs";
import {TestSubjectService} from "../../../services/TestSubjectService";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class ChatComponent implements OnInit{
  // newMessage: string;
  newMessage: any;
  messageList: string[] = [];

  onlineUsers:any[];
  arrivalMessage: any;
  user: any;
  conversations: any[];
  currentOpenChat: any;
  listOfMessages: any[];
  sendText: any;
  username: any;
  foundUser: any;

  socket = io('http://localhost:8900');
  public  message$: BehaviorSubject<string> = new BehaviorSubject(null);

  @ViewChild("myDiv") divView: ElementRef;

  constructor(private chatService: ChatService, private baseService: BaseService<any>,private testSubjectService: TestSubjectService) { }
 // отправлять пост запрос для создание чата между выбраными пользователями
  ngOnInit(): void {
    this.baseService.getUser().subscribe((data:any) => {
      this.user = data
      this.addUserAndGetUsers(data)
      console.log(this.user)
      this.chatService.getAllConversation(data._id).subscribe((data: any) => {
        this.conversations = data

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
      this.listOfMessages = [...this.listOfMessages, this.arrivalMessage]
      // let self = this;
      console.log("line 56 currentOpenChat", this.currentOpenChat._id);
      this.testSubjectService.sendMessage({...this.arrivalMessage,chatId: this.currentOpenChat._id});
      // console.log("ACTUAL MESSAGE", this.arrivalMessage)
      // this.message$.next(this.arrivalMessage)
        // this.listOfMessages = [...this.listOfMessages, message];

      // this.messageList.push(message);
      // this.message$.next(message);
    });

  }
  findUser(){
    console.log(this.username)
    this.chatService.getUserByUsername(this.username).subscribe((data: any) =>{
      console.log("RESULT FIND USER IN BD",data);
      this.foundUser = data;
    })
    this.username = '';
  }


  addArrivalMessage(){
      this.arrivalMessage &&
      this.currentOpenChat?.members.includes(this.arrivalMessage.sender) &&
      (this.listOfMessages = [...this.listOfMessages, this.arrivalMessage]);
  }

  // public sendMessage() {
  //   this.socket.emit('message', this.newMessage);
  //   this.newMessage = '';
  // }

  // public getNewMessage = () => {
  //   this.socket.on('message', (message) =>{
  //     this.messageList.push(message);
  //     // this.message$.next(message);
  //   });
  //    //return this.message$.asObservable();
  // };

  openConversation(conversation){
    this.currentOpenChat = conversation
    console.log("Беседа ", conversation)
    this.chatService.getInfoBetweenTwoUsers(conversation.members[0], conversation.members[1]).subscribe((data) => {
      this.testSubjectService.sendMessage(data);
      console.log(data)
    })
    this.chatService.getAllMessageBetweenUser(conversation._id).subscribe((data: any) => {
      this.listOfMessages = data;
    })
  }
  addNewConversationBetweenTwouser(){
    let obj = {
      senderId: this.user._id,
      receiverId: this.foundUser[0]._id,
    }
    this.chatService.addConversation(obj).subscribe((data) =>{
      this.conversations = [data,...this.conversations]
      console.log(data)
    })
  }

  addUserAndGetUsers(data){
    console.log("Data",data)
    this.socket.emit("addUser", data._id);
    this.socket.on("getUsers", (users) => {
      this.onlineUsers = this.user.followings.filter((f) => users.some((u) => u.userId === f))
      console.log("ONLINE", this.onlineUsers)
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

  // sendMessage() {
  //   this.chatService.sendMessage(this.newMessage);
  //   this.newMessage = '';
  // }

}
