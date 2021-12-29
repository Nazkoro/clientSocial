// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
//
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
//
// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from '../auth/auth.module';
// import { ProfileModule } from '../profile/profile.module';
import { NotfoundComponent } from '../shared/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptService} from '../auth/token-intercept.service';
import { PostsComponent } from './components/posts/posts/posts.component';
import { UserComponent } from './components/user/user/user.component';
import { AboutGuard }   from './about.guard';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    PostsComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    // ProfileModule,
    BrowserAnimationsModule
  ],
  providers: [AboutGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }