import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfileComponent } from './page-profile.component';
import { HeaderComponent } from '../header/header.component';
import { StashComponent } from '../stash/stash.component';
import { SourcesComponent } from '../sources/sources.component';
import { AccountService } from '../account.service';
import { StashService } from '../stash.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleApiService } from '../google-api.service';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { SourceService } from '../source.service';

describe('PageProfileComponent', () => {
  let component: PageProfileComponent;
  let fixture: ComponentFixture<PageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PageProfileComponent,
        HeaderComponent,
        StashComponent,
        SourcesComponent,
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
    fixture = TestBed.createComponent(PageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
