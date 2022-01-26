import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {POST_FEATURE_NAME, PostReducer} from './posts-store.reducer';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {PostsStoreEffects} from './posts-store.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    // StoreModule.forFeature(
    //   ADMIN_AUTH_FEATURE_NAME,
    //   adminAuthReducer
    // ),
    EffectsModule.forFeature([PostsStoreEffects])
  ]
})
export class PostsStoreModule { }
