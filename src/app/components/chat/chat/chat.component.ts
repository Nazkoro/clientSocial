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
  checkedChat = false;
  disabled = false;


  onlineUsers:any[];
  arrivalMessage: any;
  user: any;
  conversations: any[];
  groupConversations: any[];
  currentOpenChat: any;
  listOfMessages: any[];
  sendText: any;
  username: any;
  foundUser: any = " ";
  userConversationExist: boolean = false;


  socket = io('http://localhost:8900');
  // public  message$: BehaviorSubject<string> = new BehaviorSubject(null);

  @ViewChild("myDiv") divView: ElementRef;

  constructor(private chatService: ChatService, private baseService: BaseService<any>,private testSubjectService: TestSubjectService) { }

  ngOnInit(): void {

    this.baseService.getUser().subscribe((user:any) => {
      this.user = user
      this.addUserAndGetUsersSocket(user)
      this.chatService.getAllConversation(user._id).subscribe((conversations: any) => {
        this.conversations = conversations
      })
      this.chatService.getAllGropConversation(user._id).subscribe((groupConversations: any) => {
        this.groupConversations = groupConversations
        console.log("groupConversations",groupConversations)
      })
    });

    this.socket.on('getMessage', (message) =>{
      this.arrivalMessage = {
        sender: message.senderId,
        text: message.text,
        coverPicture: message.coverPicture,
        username: message.username,

        createdAt: Date.now(),
      }
      console.log(message);
      this.listOfMessages = [...this.listOfMessages, this.arrivalMessage]
      // this.testSubjectService.sendMessage({...this.arrivalMessage,chatId: this.currentOpenChat._id});
    });
  }

  onChat(users) {
    console.log("happy users", users);
    const listUsers = [this.user, ...users];
    this.chatService.addGruopChat(listUsers).subscribe((data) =>{
      this.groupConversations = [data,...this.groupConversations];
      // this.conversations = [data,...this.conversations];
      console.log(data);
    })
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

  addUserAndGetUsersSocket(data){
    this.socket.emit("addUser", data._id);
    this.socket.on("getUsers", (users) => {
      this.onlineUsers = this.user.followings.filter((f) => users.some((u) => u.userId === f))
    });
  }

  soketSendMessage(){
    if(!this.checkedChat){
      const receiverId = this.currentOpenChat.members.find((member) => member !== this.user._id);

      this.socket.emit("sendMessage", {
        senderId: this.user._id,
        receiverId,
        text:  this.sendText,
        coverPicture: this.user.coverPicture,
        username: this.user.username,
      });
    } else if (this.checkedChat){

      this.socket.emit("sendMessageToRoom", {
        senderId: this.user._id,
        roomId: this.currentOpenChat._id,
        text:  this.sendText,
        coverPicture: this.user.coverPicture,
        username: this.user.username,
      });

    }

  }

  handleSubmit(){
    const message = {
      sender: this.user._id,
      text: this.sendText,
      conversationId: this.currentOpenChat._id
    }
    this.soketSendMessage()
    console.log("this.listOfMessages", this.listOfMessages)
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
