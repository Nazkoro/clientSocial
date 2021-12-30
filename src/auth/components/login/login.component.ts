// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }

import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Subject, Subscription, BehaviorSubject } from 'rxjs';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData: any;
  form: FormGroup | undefined;
  aSub: Subscription | undefined;
  errorRes: object | null = null;
  // subject$ = new Subject();
  // subject$ = new BehaviorSubject( {});
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(
        null
      ),
      password: new FormControl(
        null
      )
    });
  }
  submit(): void {
    // this.formData = new FormData();
    // this.formData.append('email', this.form?.value.email);
    // this.formData.append('password', this.form?.value.password);
    // console.log(this.form.getRawValue())
    this.aSub = this.authService.login(this.form.getRawValue()).subscribe(
      res => {
        // this.subject$.next(res);
        // console.log(res);
        this.router.navigate(['user']);
      },
      error => this.errorRes = error
    );
  }

}

// , [Validators.required, Validators.minLength(3)]
//   , [Validators.required]
