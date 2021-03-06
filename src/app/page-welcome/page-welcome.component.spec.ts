import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWelcomeComponent } from './page-welcome.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { AccountService } from '../account.service';
import { GoogleApiService } from '../google-api.service';
import { CollaboratorService } from '../collaborator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

let mockRoute = {
  fragment: {
    subscribe: function() {}
  }
}

describe('PageWelcomeComponent', () => {
  let component: PageWelcomeComponent;
  let fixture: ComponentFixture<PageWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PageWelcomeComponent,
        FooterComponent,
        HeaderComponent
      ],
      providers: [
        AccountService,
        {provide: GoogleApiService, useValue: {initialize: jasmine.createSpy('initialize')}},
        CollaboratorService,
        {provide: ActivatedRoute, useValue: mockRoute},
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}}
      ],
      imports: [
        HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
