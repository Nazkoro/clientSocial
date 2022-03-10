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


  constructor(private baseService: BaseService<any>, private testSubjectService: TestSubjectService) {
    // this.subscription = this.testSubjectService.getMessage().subscribe(data => {
    //   this.users = data;
    //   console.log("message component ", data)
    // });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
