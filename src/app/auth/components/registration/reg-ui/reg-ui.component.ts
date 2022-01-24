import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reg-ui',
  templateUrl: './reg-ui.component.html',
  styleUrls: ['./reg-ui.component.css']
})
export class AdminRegistrationFormUiComponent implements OnInit {

  formGroup: FormGroup;

  @Input() formError = '';
  @Input() disabled: boolean;
  @Output() registr = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onFormChange() {
    this.formError = '';
  }

  onSubmit() {
    console.log(123,this.formGroup.value)
    this.registr.emit(this.formGroup.value);
  }

}
