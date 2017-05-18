import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { PageHomeComponent } from '../page-home/page-home.component';
import { PageProfileComponent } from '../page-profile/page-profile.component';
import { PageWelcomeComponent } from '../page-welcome/page-welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: PageWelcomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: PageHomeComponent },
  { path: 'profilepage', component: PageProfileComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
