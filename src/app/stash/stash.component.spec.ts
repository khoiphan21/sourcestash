import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StashComponent } from './stash.component';
import { SourcesComponent } from '../sources/sources.component';
import { StashService } from '../stash.service';
import { AccountService } from '../account.service';
import { HttpModule } from '@angular/http';
import { GoogleApiService } from '../google-api.service';
import { Router } from '@angular/router';
import { SourceService } from '../source.service';
import { Component } from '@angular/core';
import { Stash } from '../classes/stash';

describe('StashComponent', () => {
  let component: StashWrapperComponent;
  let fixture: ComponentFixture<StashWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StashComponent,
        SourcesComponent,
        StashWrapperComponent
      ],
      providers: [
        StashService,
        AccountService,
        SourceService,
        GoogleApiService,
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}}
      ],
      imports: [
        HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StashWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'stash-wrapper',
  template: '<app-stash [stash]="stash"></app-stash>'
})
class StashWrapperComponent {
  stash: Stash = new Stash('Title', 'Description');
}
