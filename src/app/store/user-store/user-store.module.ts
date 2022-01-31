import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {userStoreEffects} from "./user.effects";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([userStoreEffects])
  ]
})
export class UserStoreModule { }
