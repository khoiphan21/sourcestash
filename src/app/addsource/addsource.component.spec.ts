import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsourceComponent } from './addsource.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SourceService } from '../source.service';
import { AccountService } from '../account.service';
import { GoogleApiService } from '../google-api.service';
import { Router } from '@angular/router';

describe('AddsourceComponent', () => {
  let component: AddsourceComponent;
  let fixture: ComponentFixture<AddsourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsourceComponent ],
      providers: [
        SourceService,
        AccountService,
        GoogleApiService,
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}}
      ],
      imports: [
        FormsModule,
        HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
