import {Component, OnInit} from '@angular/core';
import {loadUserRequestAction} from "./store/user-store/user.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-app';

  constructor( private router: Router) {
  }

  ngOnInit(): void {
    // this.router.navigate(['login'])
  }
}
