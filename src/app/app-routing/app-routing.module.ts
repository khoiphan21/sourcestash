import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HomepageComponent } from '../homepage/homepage.component';
import { ProfilepageComponent } from '../profilepage/profilepage.component';
import { LoginComponent } from '../login/login.component';
import { StashpageComponent } from '../stashpage/stashpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomepageComponent },
  { path: 'stashpage', component: StashpageComponent},
  { path: 'profilepage', component: ProfilepageComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
