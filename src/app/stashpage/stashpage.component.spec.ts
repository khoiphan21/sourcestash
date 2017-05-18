import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StashpageComponent } from './stashpage.component';
import { HeaderComponent } from '../header/header.component';
import { SourceService } from '../source.service';
import { AccountService } from '../account.service';
import { HttpModule } from '@angular/http';
import { GoogleApiService } from '../google-api.service';
import { ViewsourceComponent } from '../viewsource/viewsource.component';
import { AddstashComponent } from '../addstash/addstash.component';
import { CollapsibleModule } from 'angular2-collapsible';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SourceEditComponent } from '../source-edit/source-edit.component';
import { StashService } from '../stash.service';
import { StashEditComponent } from '../stash-edit/stash-edit.component';
import { SourceAddComponent } from '../source-add/source-add.component';

let mockRoute = {
  params: {
    subscribe: jasmine.createSpy('subscribe')
  }
}

describe('StashpageComponent', () => {
  let component: StashpageComponent;
  let fixture: ComponentFixture<StashpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StashpageComponent,
        HeaderComponent,
        ViewsourceComponent,
        AddstashComponent,
        SourceAddComponent,
        FooterComponent,
        SourceEditComponent,
        StashEditComponent
      ], 
      providers: [
        SourceService,
        StashService,
        AccountService,
        GoogleApiService,
        {provide: ActivatedRoute, useValue: mockRoute},
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}}
      ],
      imports: [
        HttpModule,
        CollapsibleModule,
        FormsModule,
        BrowserAnimationsModule
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
