import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SourceService } from '../source.service';
import { AccountService } from '../account.service';
import { GoogleApiService } from '../google-api.service';
import { Router } from '@angular/router';

import { SourceAddComponent } from './source-add.component';

describe('SourceAddComponent', () => {
  let component: SourceAddComponent;
  let fixture: ComponentFixture<SourceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceAddComponent ],
      providers: [
        SourceService,
        AccountService,
        {provide: GoogleApiService, useValue: {initialize: jasmine.createSpy('initialize')}},
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
    fixture = TestBed.createComponent(SourceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
