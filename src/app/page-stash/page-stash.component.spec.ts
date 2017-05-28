import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageStashComponent } from './page-stash.component';
import { HeaderComponent } from '../header/header.component';
import { SourceService } from '../source.service';
import { AccountService } from '../account.service';
import { HttpModule } from '@angular/http';
import { GoogleApiService } from '../google-api.service';
import { CollapsibleModule } from 'angular2-collapsible';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SourceEditComponent } from '../source-edit/source-edit.component';
import { StashService } from '../stash.service';
import { StashEditComponent } from '../stash-edit/stash-edit.component';
import { SourceAddComponent } from '../source-add/source-add.component';
import { StashAddComponent } from '../stash-add/stash-add.component';
import { SourceViewComponent } from '../source-view/source-view.component';
import { CollaboratorService } from '../collaborator.service';

let mockRoute = {
  params: {
    subscribe: jasmine.createSpy('subscribe'),
    map: function() {
      return {
        subscribe: jasmine.createSpy('subscribe')
      }
    }
  }
}

describe('PageStashComponent', () => {
  let component: PageStashComponent;
  let fixture: ComponentFixture<PageStashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageStashComponent,
        HeaderComponent,
        SourceViewComponent,
        StashAddComponent,
        SourceAddComponent,
        FooterComponent,
        SourceEditComponent,
        StashEditComponent,
        HeaderComponent
      ], 
      providers: [
        SourceService,
        StashService,
        AccountService,
        GoogleApiService,
        CollaboratorService,
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
    fixture = TestBed.createComponent(PageStashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
