import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StashEditComponent } from './stash-edit.component';
import { StashService } from '../stash.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AccountService } from '../account.service';
import { GoogleApiService } from '../google-api.service';
import { Router } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Stash } from '../classes/stash';

describe('StashEditComponent', () => {
  let component: TestComponentWrapper;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StashEditComponent, TestComponentWrapper
      ],
      providers: [
        StashService,
        AccountService,
        GoogleApiService,
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}}
      ],
      imports: [
        FormsModule,
        HttpModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/**
 * This is to create a wrapper component, that will pass in some inputs for the 
 * component being tested
 */
@Component({
  selector: 'test-component-wrapper',
  template: '<app-stash-edit [stash]="stash"></app-stash-edit>'
})
class TestComponentWrapper {
  stash: Stash = new Stash('Stash Title', 'Stash Description');
}

