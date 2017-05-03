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
import { SourceService } from './source.service';
import { StashpageComponent } from './stashpage/stashpage.component';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { GoogleApiService } from './google-api.service';
import { PopupComponent } from './popup/popup.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    StashComponent,
    SourcesComponent,
    ProfilepageComponent,
    LoginComponent,
    StashpageComponent,
    TabComponent,
    TabsComponent,
    WelcomepageComponent,
    PopupComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AccountService,
    StashService,
    SourceService,
    GoogleApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
