import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {BaseService} from '../../../services/base-service';
import {Router} from '@angular/router';
import {AuthService} from "../../../../auth/auth.service";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";
;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
   // user: any =  JSON.parse(localStorage.getItem('user'))
   user: any


  constructor(private baseService: BaseService<any>, private router: Router, private authService: AuthService,private http: HttpClient) { }


  ngOnInit(): void {
    this.authService.subject$.subscribe((value => {
        if (!value) {
          //  NEED DO REFACTORING !!!
          this.http.get(`${environment.url}/api/users/?userId=61cb0a081cb0c11fb0acf7a7&username=Nazar`).subscribe((data:any) => this.user=data)

        } else {
          this.user = value
        }
      }

    ))
  }

}
