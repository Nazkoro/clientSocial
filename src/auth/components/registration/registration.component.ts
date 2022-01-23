import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Subscription} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup | undefined;
  aSub: Subscription | undefined;
  errorRes: object | null = null;

  constructor(private authService: AuthService,  private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(
        null
      ),
      email: new FormControl(
        null
      ),
      password: new FormControl(
        null
      )
    });
  }


  submit(): void {
    this.aSub = this.authService.registration(this.form?.getRawValue()).subscribe(
      res =>
        this.router.navigate(['homepage']),
        // alert('Send email'),
      error => console.log(error.error)
    );
  }
/*  [Validators.required, Validators.minLength(4)
, [
    Validators.required, Validators.email, Validators.minLength(4)
, [Validators.required, Validators.minLength(4)]*/
//]
/*  submit(): void {
    this.aSub = this.authService.registration(this.form?.value).subscribe(
      res => alert('Send email'),
      error => console.log(error.error)
    );
  }*/
}
