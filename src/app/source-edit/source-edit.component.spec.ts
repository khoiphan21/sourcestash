import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceEditComponent } from './source-edit.component';
import { SourceService } from '../source.service';
import { AccountService } from '../account.service';
import { GoogleApiService } from '../google-api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Stash } from '../classes/stash';
import { Source } from '../classes/source';

describe('SourceEditComponent', () => {
  let component: SourceEditWrapper;
  let fixture: ComponentFixture<SourceEditWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SourceEditComponent,
        SourceEditWrapper
      ],
      providers: [
        SourceService,
        AccountService,
        {provide: GoogleApiService, useValue: {initialize: jasmine.createSpy('initialize')}},
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
    fixture = TestBed.createComponent(SourceEditWrapper);
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
  selector: 'source-edit-wrapper',
  template: '<app-source-edit [source]="source"></app-source-edit>'
})
class SourceEditWrapper {
  source: Source = new Source(
    '','','','','',0,0,'','','','',[
      'tag1', 'tag2'
    ]
  );
}

