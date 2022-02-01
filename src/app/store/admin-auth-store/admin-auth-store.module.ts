import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {AdminAuthEffects} from './store/admin-auth.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([AdminAuthEffects])
  ]
})
export class AdminAuthStoreModule { }
