import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceEditComponent } from './source-edit.component';
import { SourceService } from '../source.service';
import { AccountService } from '../account.service';
import { GoogleApiService } from '../google-api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

describe('SourceEditComponent', () => {
  let component: SourceEditComponent;
  let fixture: ComponentFixture<SourceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceEditComponent ],
      providers: [
        SourceService,
        AccountService,
        GoogleApiService,
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}}
      ],
      imports: [
        FormsModule,
        HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
