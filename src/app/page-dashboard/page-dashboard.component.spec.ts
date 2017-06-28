import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDashboardComponent } from './page-dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { CardComponent } from '../card/card.component';
import { BoardComponent } from '../board/board.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AutofocusDirective } from '../directives/autofocus.directive';
import { AccountService } from '../account.service';
import { GoogleApiService } from '../google-api.service';
import { Router } from '@angular/router';

let mockRouter = {
  navigate: jasmine.createSpy('navigate')
}

describe('PageDashboardComponent', () => {
  let component: PageDashboardComponent;
  let fixture: ComponentFixture<PageDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PageDashboardComponent,
        HeaderComponent,
        BoardComponent,
        CardComponent,
        AutofocusDirective
      ],
      providers: [
        AccountService,
        {provide: GoogleApiService, useValue: {initialize: jasmine.createSpy('initialize')}},
        {provide: Router, useValue: mockRouter}
      ],
      imports: [
        FormsModule, HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
