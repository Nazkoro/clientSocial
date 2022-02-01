import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {PostsStoreEffects} from './posts-store.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([PostsStoreEffects])
  ]
})
export class PostsStoreModule { }
