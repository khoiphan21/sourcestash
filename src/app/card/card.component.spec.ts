import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CardService } from '../card.service';
import { AccountService } from '../account.service';
import { GoogleApiService } from '../google-api.service';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent
      ], providers: [
        CardService,
        AccountService,
        { provide: GoogleApiService, useValue: { initialize: jasmine.createSpy('initialize') } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ], imports: [
        FormsModule, BrowserModule, HttpModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
