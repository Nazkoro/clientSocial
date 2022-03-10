import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {BaseService} from "../../../services/base-service";
import {io} from "socket.io-client";
import {BehaviorSubject} from "rxjs";
import {TestSubjectService} from "../../../services/TestSubjectService";
import {login} from "../../../store/admin-auth-store/store/admin-auth.actions";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class ChatComponent implements OnInit{
  onlineUsers:any[];
  arrivalMessage: any;
  user: any;
  conversations: any[];
  currentOpenChat: any;
  listOfMessages: any[];
  sendText: any;
  username: any;
  foundUser: any = " ";
  userConversationExist: boolean = false;

  //передавать масив пользователя вместе с сообщение в message component

  socket = io('http://localhost:8900');
  public  message$: BehaviorSubject<string> = new BehaviorSubject(null);

  @ViewChild("myDiv") divView: ElementRef;

  constructor(private chatService: ChatService, private baseService: BaseService<any>,private testSubjectService: TestSubjectService) { }

  ngOnInit(): void {

    this.baseService.getUser().subscribe((data:any) => {
      this.user = data
      this.addUserAndGetUsers(data)
      console.log("addUserAndGetUsers", data)
      this.chatService.getAllConversation(data._id).subscribe((data: any) => {
        this.conversations = data
        console.log("conversations",data)
      })
    });


    this.socket.on('getMessage', (message) =>{
      this.arrivalMessage = {
        sender: message.senderId,
        text: message.text,
        createdAt: Date.now(),
      }
      console.log(message);
      this.listOfMessages = [...this.listOfMessages, this.arrivalMessage]
      // this.testSubjectService.sendMessage({...this.arrivalMessage,chatId: this.currentOpenChat._id});
    });
  }

  addGroupChat(){

  }
  onChat(users) {
    console.log("happy users", users)
    // this.store$.dispatch(login(loginPayload));
  }

  findUser(){
    this.chatService.getUserByUsername(this.username).subscribe((data: any) =>{
      console.log(data)
      this.foundUser = data;
      this.conversations?.forEach((conversation) => {
        if(conversation.members.includes(data[0]?._id)){
          this.userConversationExist = true;
          this.foundUser = "chat already exists";
        }
      })
    })
    this.username = '';
  }



  openConversation(conversation){
    this.currentOpenChat = conversation
    console.log("Беседа ", conversation)
    // this.chatService.getInfoBetweenTwoUsers(conversation.members[0], conversation.members[1]).subscribe((data) => {
    //   this.testSubjectService.sendMessage(data);
    //   console.log("line 70 array users",data)
    // })
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

      this.conversations = [data,...this.conversations];
      console.log(data);
    })
    this.foundUser = ' ';
  }

  addUserAndGetUsers(data){
    this.socket.emit("addUser", data._id);
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
        console.log(data)
        this.listOfMessages = [...this.listOfMessages, data]
        this.divView.nativeElement.scrollIntoView({block: "end",behavior: "smooth"});
      })
    } catch (err) {
      console.log(err)}
  }

  // addArrivalMessage(){
  //     this.arrivalMessage &&
  //     this.currentOpenChat?.members.includes(this.arrivalMessage.sender) &&
  //     (this.listOfMessages = [...this.listOfMessages, this.arrivalMessage]);
  // }
}
