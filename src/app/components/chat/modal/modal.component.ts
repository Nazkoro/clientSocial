import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BaseService} from "../../../services/base-service";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() currentUser: any;
  @Output() chat = new EventEmitter();
  // toppings = new FormControl();
  // toppingList: any[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  users = new FormControl();
  usersList: any[] ;


  constructor(private baseService: BaseService<any>) { }

  ngOnInit(): void {
    console.log("currentUser", this.currentUser)
    this.baseService.getUsers().subscribe((data) =>{
      this.usersList = data.filter((user) => user._id !== this.currentUser._id)
    })

  }

  send(){
    console.log("currentUser", this.currentUser)
    this.chat.emit(this.users.value);
    this.users.reset()
  }

}
