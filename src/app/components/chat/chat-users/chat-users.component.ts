import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css','../../../../../css/ionicons.min.css','../../../../../css/font-awesome.min.css']
})
export class ChatUsersComponent implements OnInit {
  @Input() users: any

  constructor() { }

  ngOnInit(): void {
  }

}
