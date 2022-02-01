import {NgModule} from '@angular/core';
import {Routes, RouterModule, ActivatedRoute} from '@angular/router';
import {NotfoundComponent} from '../shared/notfound.component';
import {AppComponent} from './app.component';
import {AuthRoutingModule} from './auth/auth-routing.module';
import {UserComponent} from "./components/user/user/user.component";
import { AboutGuard }   from './about.guard';
import {HomepagesComponent} from "./pages/homepages/homepages.component";
import {RecoverPasswordComponent} from "./auth/components/recover-password/recover-password.component";
import {EditBasicInfoComponent} from "./components/edit-basic-info/edit-basic-info/edit-basic-info.component";
import {TimelineComponent} from "./components/timeline/timeline/timeline.component";
import {TimelineAboutComponent} from "./components/timeline-about/timeline-about/timeline-about.component";
import {TimelineAlbumComponent} from "./components/timeline-album/timeline-album/timeline-album.component";
import {TimelineFriendsComponent} from "./components/timeline-friends/timeline-friends/timeline-friends.component";
import {ChatComponent} from "./components/chat/chat/chat.component";
import {ChatpagesComponent} from "./pages/chatpages/chatpages.component";
import {ContactComponent} from "./components/contact/contact/contact.component";
import {MyNewsfeedComponent} from "./pages/my-newsfeed/my-newsfeed.component";

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
    path: 'recovery-password', component: RecoverPasswordComponent,
  },
  {
    path: 'add-info', component: EditBasicInfoComponent,
  },
  {
    path: 'timeline', component: TimelineComponent,
  },
  {
    path: 'timeline-about', component: TimelineAboutComponent,
  },
  {
    path: 'timeline-album', component: TimelineAlbumComponent,
  },
  {
    path: 'timeline-friends', component: TimelineFriendsComponent,
  },
  {
    path: 'chat', component: ChatpagesComponent,
  },
  {
    path: 'my-newsfeed', component: MyNewsfeedComponent,
  },
  {
    path: 'contact', component: ContactComponent,
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
