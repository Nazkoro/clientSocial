
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Subject, Subscription, BehaviorSubject } from 'rxjs';
import {AuthService} from '../../auth.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit , OnDestroy {
  formData: any;
  form: FormGroup | undefined;
  aSub: Subscription | undefined;
  errorRes: object | null = null;
  token: any;
  constructor(private authService: AuthService,
              private router: Router, private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.token = this.activateRoute.snapshot.queryParams['token'];
    localStorage.setItem("token",this.token)
    console.log(this.token)
    this.activateRoute.snapshot.queryParams=null
    console.log(this.activateRoute)


    this.form = new FormGroup({
      password: new FormControl(
        null
      )
    });
  }
  submit(): void {
    const newPass = {
      password: this.form?.value.password
    }

    this.aSub = this.authService.newPassword(newPass).subscribe(
      res => {
        console.log(res)
        // this.subject$.next(res);
        // console.log(res);
        // this.form = null

        this.router.navigate(['homepage'])
          // {
          //   queryParams:{
          //     'token': this.token,
          //
          //   }
          // });

      },
      error => this.errorRes = error
    );
    this.form.reset()
  }
  ngOnDestroy() {
    // this.form = null
  }
}
