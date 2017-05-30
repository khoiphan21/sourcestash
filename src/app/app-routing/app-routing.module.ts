import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';

import { PageHomeComponent } from '../page-home/page-home.component';
import { PageProfileComponent } from '../page-profile/page-profile.component';
import { PageWelcomeComponent } from '../page-welcome/page-welcome.component';
import { PageLoginComponent } from '../page-login/page-login.component';
import { PageStashComponent } from '../page-stash/page-stash.component';
import { PageWelcomeNewComponent } from '../page-welcome-new/page-welcome-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: PageWelcomeComponent},
  { path: 'welcome-new', component: PageWelcomeNewComponent},
  { path: 'login', component: PageLoginComponent},
  { path: 'home', component: PageHomeComponent },
  { path: 'stashpage/:stashid', component: PageStashComponent},
  { path: 'profilepage', component: PageProfileComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
