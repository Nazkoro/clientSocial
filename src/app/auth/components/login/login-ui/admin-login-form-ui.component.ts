import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../auth.service";

@Component({
  selector: 'app-admin-login-form-ui',
  templateUrl: './admin-login-form-ui.component.html',
  styleUrls: ['./admin-login-form-ui.component.css']
})
export class AdminLoginFormUiComponent implements OnInit {

  formGroup: FormGroup;

  @Input() formError = '';
  @Input() disabled: boolean;
  @Output() login = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onFormChange() {
    this.formError = '';
  }

  onSubmit() {
    this.login.emit(this.formGroup.value);
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
      },
      error => console.log(error)
    );

  }


}
