import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { VideoPageComponent } from "./video-page/video-page.component";
import { ProfileComponent } from "./profile/profile.component";
import { ChanelComponent } from "./chanel/chanel.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'watch', component: VideoPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'chanel', component: ChanelComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
