import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {BaseService} from '../../../services/base-service';
import {Router} from '@angular/router';
;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
   user: any =  JSON.parse(localStorage.getItem('user'))

  constructor(private baseService: BaseService<any>, private router: Router) { }


  ngOnInit(): void {

  }

}
