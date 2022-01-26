import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BaseService} from "../../../services/base-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css','../../../../../css/style.css', '../../../../../css/bootstrap.min.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,private baseService: BaseService<any>) { }

  ngOnInit(): void {
  }
  logout(){
  localStorage.clear()
    this.router.navigate(['']);
    this.baseService.logoutUser({}).subscribe((data:any) => {

      // console.log(data)
    });
  }

}
