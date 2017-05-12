import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepageComponent } from './profilepage.component';
import { HeaderComponent } from '../header/header.component';
import { StashComponent } from '../stash/stash.component';
import { SourcesComponent } from '../sources/sources.component';
import { AccountService } from '../account.service';
import { StashService } from '../stash.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { TabsComponent } from '../tabs/tabs.component';
import { TabComponent } from '../tab/tab.component';
import { GoogleApiService } from '../google-api.service';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { SourceService } from '../source.service';

describe('ProfilepageComponent', () => {
  let component: ProfilepageComponent;
  let fixture: ComponentFixture<ProfilepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ProfilepageComponent,
        HeaderComponent,
        StashComponent,
        SourcesComponent,
        TabsComponent,
        TabComponent,
        FooterComponent
      ],
      providers: [
        AccountService,
        StashService,
        GoogleApiService,
        SourceService,
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}}
      ],
      imports: [
        HttpModule,
        BrowserModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
