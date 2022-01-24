import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { AdminRegistrationFormUiComponent} from "./reg-ui/reg-ui.component";
import {AdminRegistrationBlockComponent} from "./reg-block/reg-block.component";


@NgModule({
  declarations: [AdminRegistrationFormUiComponent, AdminRegistrationBlockComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminRegistrationBlockComponent
  ]
})
export class AdminRegistrationBlockModule { }
