import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';
import { HeaderComponent } from '../header/header.component';
import { StashComponent } from '../stash/stash.component';
import { SourcesComponent } from '../sources/sources.component';
import { StashService } from '../stash.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AccountService } from '../account.service';
import { GoogleApiService } from '../google-api.service';
import { AddstashComponent } from '../addstash/addstash.component';
import { AddsourceComponent } from '../addsource/addsource.component';
import { ViewsourceComponent } from '../viewsource/viewsource.component';
import { FooterComponent } from '../footer/footer.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HomepageComponent, 
        HeaderComponent,
        StashComponent,
        SourcesComponent,
        AddstashComponent,
        AddsourceComponent,
        ViewsourceComponent,
        FooterComponent
      ],
      providers: [
        StashService,
        AccountService,
        GoogleApiService
      ],
      imports: [
        HttpModule,
        BrowserModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
