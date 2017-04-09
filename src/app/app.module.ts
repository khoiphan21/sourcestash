import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { StashComponent } from './stash/stash.component';
import { SourcesComponent } from './sources/sources.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { AccountService } from './account.service';
import { StashService } from './stash.service';
import { LoginComponent } from './login/login.component';
import { Ng2TabComponent } from 'ng2-tab'

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    StashComponent,
    SourcesComponent,
    ProfilepageComponent,
    LoginComponent,
    Ng2TabComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AccountService,
    StashService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
