import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBoardComponent } from './page-board.component';
import { HeaderComponent } from '../header/header.component';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AutofocusDirective } from '../directives/autofocus.directive';
import { AccountService } from '../account.service';
import { GoogleApiService } from '../google-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from '../card.service';
import { HttpModule } from '@angular/http';

let mockRoute = {
  params: {
    subscribe: jasmine.createSpy('subscribe'),
    map: function() {
      return {
        subscribe: jasmine.createSpy('subscribe')
      }
    }
  }
}

describe('PageBoardComponent', () => {
  let component: PageBoardComponent;
  let fixture: ComponentFixture<PageBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PageBoardComponent,
        HeaderComponent,
        CardComponent,
        AutofocusDirective
        ], providers: [
          CardService,
          AccountService,
        {provide: GoogleApiService, useValue: {initialize: jasmine.createSpy('initialize')}},
        {provide: ActivatedRoute, useValue: mockRoute},
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}}
        ],imports: [
        FormsModule, BrowserModule, HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
