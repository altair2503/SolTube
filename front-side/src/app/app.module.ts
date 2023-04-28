import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';

import { ProfileComponent } from './profile/profile.component';
import { ChanelComponent } from './chanel/chanel.component';

import { VideoPageComponent } from './video-page/video-page.component';
import { VideoItemComponent } from './video-item/video-item.component';

import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {AuthInterceptor} from "./Authinterceptor";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtService} from "./jwt.service";

@NgModule({
  declarations: [
    AppComponent,
    VideoPageComponent,
    HomeComponent,
    ProfileComponent,
    ChanelComponent,
    VideoItemComponent,
    SignUpComponent,
    SignInComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    JwtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
