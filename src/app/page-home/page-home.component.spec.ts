import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHomeComponent } from './page-home.component';
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
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

let mockRouter = {
  navigate: jasmine.createSpy('navigate')
}

describe('PageHomeComponent', () => {
  let component: PageHomeComponent;
  let fixture: ComponentFixture<PageHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PageHomeComponent, 
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
        GoogleApiService,
        {provide: Router, useValue: mockRouter}
      ],
      imports: [
        HttpModule,
        BrowserModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
