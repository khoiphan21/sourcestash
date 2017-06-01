import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PageLoginComponent } from './page-login.component';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../account.service';
import { HttpModule } from '@angular/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { GoogleApiService } from '../google-api.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LoadingComponent } from '../loading/loading.component';

describe('PageLoginComponent', () => {
  let component: PageLoginComponent;
  let fixture: ComponentFixture<PageLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageLoginComponent,
        FooterComponent,
        HeaderComponent,
        LoadingComponent
      ],
      providers: [
        AccountService,
        {provide: GoogleApiService, useValue: {initialize: jasmine.createSpy('initialize')}},
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}}
      ], 
      imports: [
        HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
