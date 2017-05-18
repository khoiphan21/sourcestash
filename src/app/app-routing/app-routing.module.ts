import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { StashpageComponent } from '../stashpage/stashpage.component';
import { WelcomepageComponent } from '../welcomepage/welcomepage.component';
import { AddstashComponent } from '../addstash/addstash.component';
import { PageHomeComponent } from '../page-home/page-home.component';
import { PageProfileComponent } from '../page-profile/page-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomepageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: PageHomeComponent },
  { path: 'stashpage/:stashid', component: StashpageComponent},
  { path: 'profilepage', component: PageProfileComponent},
  { path: 'addstash', component: AddstashComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
