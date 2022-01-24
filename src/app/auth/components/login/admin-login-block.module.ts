import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminLoginFormUiComponent} from "./login-ui/admin-login-form-ui.component";
import {AdminLoginBlockComponent} from "./login-block/admin-login-block.component";

@NgModule({
  declarations: [AdminLoginFormUiComponent, AdminLoginBlockComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminLoginBlockComponent
  ]
})
export class AdminLoginBlockModule { }
