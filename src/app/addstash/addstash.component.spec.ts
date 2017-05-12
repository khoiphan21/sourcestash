import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstashComponent } from './addstash.component';
import { FormsModule } from '@angular/forms';
import { StashService } from '../stash.service';
import { HttpModule } from '@angular/http';
import { AccountService } from '../account.service';
import { GoogleApiService } from '../google-api.service';
import { Router } from '@angular/router';

let mockRouter = {
  navigate: jasmine.createSpy('navigate')
}

describe('AddstashComponent', () => {
  let component: AddstashComponent;
  let fixture: ComponentFixture<AddstashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstashComponent ],
      imports: [
        FormsModule,
        HttpModule
      ],
      providers: [
        StashService,
        AccountService,
        GoogleApiService,
        {provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
