import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContactComponent } from './page-contact.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AccountService } from '../account.service';
import { GoogleApiService } from '../google-api.service';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

describe('PageContactComponent', () => {
  let component: PageContactComponent;
  let fixture: ComponentFixture<PageContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageContactComponent,
        HeaderComponent,
        FooterComponent
      ], providers: [
        AccountService,
        {provide: GoogleApiService, useValue: {initialize: jasmine.createSpy('initialize')}},
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}}
      ], imports: [
        HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
