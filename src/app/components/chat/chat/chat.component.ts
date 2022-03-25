import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {BaseService} from "../../../services/base-service";
import {io} from "socket.io-client";
import {TestSubjectService} from "../../../services/TestSubjectService";

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
  listOfUnreadMessages: any[] = [];
  collectionUnreadMessage: any = new Map();
  sendText: any;
  username: any;
  foundUser: any = " ";
  userConversationExist: boolean = false;


  socket = io('http://localhost:8900');

  @ViewChild("myDiv") divView: ElementRef;

  constructor(private chatService: ChatService, private baseService: BaseService<any>,private testSubjectService: TestSubjectService) { }

  ngOnInit(): void {

    this.baseService.getUser().subscribe((user:any) => {
      this.user = user
      this.addUserAndGetUsersSocket(user)
      this.chatService.getAllConversation(user._id).subscribe((conversations: any) => {
        this.conversations = conversations
        console.log("conversations",conversations)
      })
      this.chatService.getAllGropConversation(user._id).subscribe((groupConversations: any) => {
        this.groupConversations = groupConversations
        console.log("groupConversations",groupConversations)
      })
    });

      this.soketGetMessage()
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
    console.log("Беседа line 83 OPEN CHAT", conversation)
    this.chatService.getAllMessageBetweenUser(conversation._id).subscribe((data: any) => {
      this.listOfMessages = data;
    })
  }

  deleteConversation(dropConv){
    this.conversations = this.conversations.filter((currentConv) => currentConv._id != dropConv._id)
    this.listOfMessages = [];
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

  soketGetMessage(){
    this.socket.on('getMessage', (message) =>{
      // console.log("    this.socket.on('getMessage', (message) =", message)
      //
      // console.log("message.roomId = ",message.roomId,"currentOpenChat = ", this.currentOpenChat)
      //если айди комнаты и чата совпадают то вывожу колво всех непрочитаных смс
      if(message.roomId._id === this.currentOpenChat._id ){
      //   console.log("mesage dont show", this.collectionUnreadMessage.get( message?.roomId?._id));
      //   console.log("number of unread message", this.listOfUnreadMessages.length)
      //   console.log("message", message);
        this.arrivalMessage = {
          sender: message.senderId,
          text: message.text,
          coverPicture: message.coverPicture,
          username: message.username,
          countMessage: message.countMessage,
          createdAt: Date.now(),
        }
        this.listOfMessages = [...this.listOfMessages, this.arrivalMessage]
        this.divView.nativeElement.scrollIntoView({block: "end",behavior: "smooth"});
        this.listOfUnreadMessages = [];

      }

      else {
        this.testSubjectService.sendMessage(message)
        // console.log("message", message);
        // this.listOfUnreadMessages.push(message);
        // this.collectionUnreadMessage.set(message.roomId._id, message);
        //
        // console.log(" mesage in colletction", this.collectionUnreadMessage.get( message?.roomId?._id));
        // console.log("array lol kek",  this.listOfUnreadMessages);
      }
    });

  }

  soketSendMessage(model = null){
    console.log("line 152 show model", model)
    let roomId = this.currentOpenChat;
    console.log("line 154 roomId ", this.currentOpenChat)
    let clearCountMessage = false;
    if(model){
      console.log("---model--- line 155 ==", model)
      roomId = model.roomId;
      clearCountMessage = model.clearCountMessage;
    }
    console.log("line 161", roomId)
    //,clearCountMessage2 = false, roomId2 = this.currentOpenChat
//десрутуризовать обьект
    if(!this.checkedChat){
      const receiverId = this.currentOpenChat.members.find((member) => member !== this.user._id);

      this.socket.emit("sendMessage", {
        senderId: this.user._id,
        receiverId,
        text:  this.sendText,
        coverPicture: this.user.coverPicture,
        username: this.user.username,
        roomId: roomId,
        clearCountMessage: clearCountMessage
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
    // console.log("this.listOfMessages", this.listOfMessages)
    this.sendText = "";

    try {
      this.chatService.addMessage(message).subscribe((data: any) => {
        // console.log(data)
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
