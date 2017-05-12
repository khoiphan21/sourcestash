import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StashComponent } from './stash.component';
import { SourcesComponent } from '../sources/sources.component';
import { StashService } from '../stash.service';
import { AccountService } from '../account.service';
import { HttpModule } from '@angular/http';
import { GoogleApiService } from '../google-api.service';
import { Router } from '@angular/router';
import { SourceService } from '../source.service';

describe('StashComponent', () => {
  let component: StashComponent;
  let fixture: ComponentFixture<StashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StashComponent,
        SourcesComponent
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
    fixture = TestBed.createComponent(StashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
