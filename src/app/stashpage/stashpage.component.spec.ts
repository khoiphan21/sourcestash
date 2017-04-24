import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StashpageComponent } from './stashpage.component';
import { HeaderComponent } from '../header/header.component';
import { SourceService } from '../source.service';
import { AccountService } from '../account.service';
import { HttpModule } from '@angular/http';
import { GoogleApiService } from '../google-api.service';

describe('StashpageComponent', () => {
  let component: StashpageComponent;
  let fixture: ComponentFixture<StashpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StashpageComponent,
        HeaderComponent
      ], 
      providers: [
        SourceService,
        AccountService,
        GoogleApiService
      ],
      imports: [
        HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StashpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
