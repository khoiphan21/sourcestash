import { TestBed, inject } from '@angular/core/testing';

import { LinkService } from './link.service';
import { HttpModule } from '@angular/http';
import { AccountService } from './account.service';
import { GoogleApiService } from './google-api.service';
import { Router } from '@angular/router';

describe('LinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LinkService,
        AccountService,
        { provide: GoogleApiService, useValue: { initialize: jasmine.createSpy('initialize') } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([LinkService], (service: LinkService) => {
    expect(service).toBeTruthy();
  }));

  it('should create a link and then delete it', done => {
    inject([LinkService], (service: LinkService) => {

    })();
  })

  it('should update a link successfully', done => {
    inject([LinkService], (service: LinkService) => {

    })();
  })

  it('should retrieve all links for a card successfully', done => {
    inject([LinkService], (service: LinkService) => {

    })();
  })
});
