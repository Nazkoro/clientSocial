import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseService} from "../../../services/base-service";
import {TestSubjectService} from "../../../services/TestSubjectService";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  @Input() message: any;
  @Input() own: any;

  users: any;
  subscription: any;
  url: any;


  constructor(private baseService: BaseService<any>, private testSubjectService: TestSubjectService) {

    // this.subscription = this.testSubjectService.getMessage().subscribe(data => {
    //   this.users = data;
    //   console.log("message component ", data)
    // });
  }

  ngOnInit(): void {
    this.url = this.message?.sender?.username? this.message.sender : this.message;
    console.log("=================================================================")
    console.log("this.message", this.message)
    console.log("this.message.sender", this.message.sender)
    console.log("this.url", this.url)
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
