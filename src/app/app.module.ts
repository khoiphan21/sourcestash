import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- import required BrowserAnimationsModule
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CollapsibleModule } from 'angular2-collapsible'; // <-- import the module

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { StashComponent } from './stash/stash.component';
import { SourcesComponent } from './sources/sources.component';
import { AccountService } from './account.service';
import { StashService } from './stash.service';
import { LoginComponent } from './login/login.component';
import { SourceService } from './source.service';
import { StashpageComponent } from './stashpage/stashpage.component';
import { GoogleApiService } from './google-api.service';
import { FooterComponent } from './footer/footer.component';
import { ViewsourceComponent } from './viewsource/viewsource.component';
import { SourceEditComponent } from './source-edit/source-edit.component';
import { StashEditComponent } from './stash-edit/stash-edit.component';
import { CollaboratorService } from './collaborator.service';
import { SourceAddComponent } from './source-add/source-add.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { StashAddComponent } from './stash-add/stash-add.component';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PageWelcomeComponent } from './page-welcome/page-welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StashComponent,
    SourcesComponent,
    LoginComponent,
    StashpageComponent,
    FooterComponent,
    StashAddComponent,
    ViewsourceComponent,
    SourceAddComponent,
    SourceEditComponent,
    StashEditComponent,
    SourceAddComponent,
    PageHomeComponent,
    StashAddComponent,
    PageProfileComponent,
    PageWelcomeComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CollapsibleModule,
    BrowserAnimationsModule
  ],
  providers: [
    AccountService,
    StashService,
    SourceService,
    GoogleApiService,
    CollaboratorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
