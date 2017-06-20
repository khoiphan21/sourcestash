import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { StashService } from '../stash.service';
import { HttpModule } from '@angular/http';
import { AccountService } from '../account.service';
import { GoogleApiService } from '../google-api.service';
import { Router } from '@angular/router';

import { StashAddComponent } from './stash-add.component';
import { AutofocusDirective } from '../directives/autofocus.directive';

let mockRouter = {
  navigate: jasmine.createSpy('navigate')
}

describe('StashAddComponent', () => {
  let component: StashAddComponent;
  let fixture: ComponentFixture<StashAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StashAddComponent,
        AutofocusDirective
      ],
      imports: [
        FormsModule,
        HttpModule
      ],
      providers: [
        StashService,
        AccountService,
        {provide: GoogleApiService, useValue: {initialize: jasmine.createSpy('initialize')}},
        {provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StashAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
