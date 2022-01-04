// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
//
// const routes: Routes = [];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotfoundComponent} from '../shared/notfound.component';
import {AppComponent} from './app.component';
import {AuthRoutingModule} from '../auth/auth-routing.module';
import {UserComponent} from "./components/user/user/user.component";
// import {ProfileRoutingModule} from '../profile/profile-routing.module';
import { AboutGuard }   from './about.guard';
import {HomepagesComponent} from "./pages/homepages/homepages.component";

const routes: Routes = [
  {
    path: '', component: AppComponent,
  },
  {
    path: 'user', component: UserComponent,
  },
  {
    path: 'homepage', component: HomepagesComponent,
  },
  {
    path: '**', component: NotfoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    // ProfileRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
