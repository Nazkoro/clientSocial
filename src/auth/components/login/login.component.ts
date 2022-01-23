import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Subject, Subscription, BehaviorSubject } from 'rxjs';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy {
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
    console.log('this.form',this.form)
    this.aSub = this.authService.login(this.form.getRawValue()).subscribe(
      res => {
        // this.subject$.next(res);
        // console.log(res);
        // this.form = null

        this.router.navigate(['homepage']);

      },
      error => this.errorRes = error
    );
    this.form.reset()
  }

  recoverPassword(){
    const email = prompt("Введите email")
    console.log(email)
    const emailObj = {
      email :email
    }
    this.authService.postEmail(emailObj).subscribe(
      res => {
        console.log(111,res)
        // this.router.navigate(['homepage']);

      },
      error => this.errorRes = error
    );

  }
  ngOnDestroy() {
    // this.form = null
  }
}

