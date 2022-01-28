import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from './auth/auth.module';
import { NotfoundComponent } from '../shared/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule ,ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptService} from './auth/token-intercept.service';
import { PostsComponent } from './components/posts/posts/posts.component';
import { UserComponent } from './components/user/user/user.component';
import { AboutGuard }   from './about.guard';
import { FooterComponent } from './components/footer/footer/footer.component';
import { HeaderComponent } from './components/header/header/header.component';
import { LeftmenuComponent } from './components/leftmenu/leftmenu/leftmenu.component';
import { HomepagesComponent } from './pages/homepages/homepages.component';
import {AuthInterceptor} from "./auth/auth.interceptor";
import { CommentComponent } from './components/comment/comment/comment.component';
import { OnlineUserComponent } from './components/online-user/online-user/online-user.component';
import { ProfileCardComponent } from './components/profile-card/profile-card/profile-card.component';
import { EditBasicInfoComponent } from './components/edit-basic-info/edit-basic-info/edit-basic-info.component';
import { ChatComponent } from './components/chat/chat/chat.component';
import { TimelineComponent } from './components/timeline/timeline/timeline.component';
import { TimelineAboutComponent } from './components/timeline-about/timeline-about/timeline-about.component';
import { TimelineAlbumComponent } from './components/timeline-album/timeline-album/timeline-album.component';
import { TimelineFriendsComponent } from './components/timeline-friends/timeline-friends/timeline-friends.component';
import { ChatpagesComponent } from './pages/chatpages/chatpages.component';
import { ContactComponent } from './components/contact/contact/contact.component';
import { MyNewsfeedComponent } from './pages/my-newsfeed/my-newsfeed.component';
import { MypostComponent } from './components/mypost/mypost/mypost.component';
import { StoreModule } from '@ngrx/store';
import {AdminAuthStoreModule} from './store/admin-auth-store/admin-auth-store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import {DEFAULT_ROUTER_FEATURENAME, routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {reducers} from "./store/app.state";
import {PostsStoreModule} from "./store/posts-store/posts-store.module";
import { LikeComponent } from './components/posts/like/like.component';
import { PostComponent } from './components/posts/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    PostsComponent,
    UserComponent,
    FooterComponent,
    HeaderComponent,
    LeftmenuComponent,
    HomepagesComponent,
    CommentComponent,
    OnlineUserComponent,
    ProfileCardComponent,
    EditBasicInfoComponent,
    ChatComponent,
    TimelineComponent,
    TimelineAboutComponent,
    TimelineAlbumComponent,
    TimelineFriendsComponent,
    ChatpagesComponent,
    ContactComponent,
    MyNewsfeedComponent,
    MypostComponent,
    LikeComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
    AdminAuthStoreModule,
    PostsStoreModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [AboutGuard,
    // {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
