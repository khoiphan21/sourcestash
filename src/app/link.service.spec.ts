import { TestBed, inject } from '@angular/core/testing';

import { LinkService } from './link.service';
import { HttpModule } from '@angular/http';
import { AccountService } from './account.service';
import { GoogleApiService } from './google-api.service';
import { Router } from '@angular/router';
import { Link } from './classes/link';

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
      let title = 'Link Title';
      let stackingOrder = 0
      service.createLink(title, stackingOrder, 0, 0).then((link: Link) => {
        expect(link).toBeTruthy();
        expect(link.title).toBe(title);
        return service.deleteLink(link.link_id);
      }).then(response => {
        expect(response.success).toBeTruthy();
        done();
      }).catch(error => {
        fail('Error occurred while trying to create and delete a link');
        done();
      })
    })();
  })

  it('should update a link successfully', done => {
    inject([LinkService], (service: LinkService) => {
      let title = 'Link Title';
      let changedTitle = 'Changed Title';
      let stackingOrder = 0
      service.createLink(title, stackingOrder, 0, 0).then((link: Link) => {
        expect(link).toBeTruthy();
        expect(link.title).toBe(title);
        
        // Now change the link's title
        link.title = changedTitle;

        return service.updateLink(link);
      }).then((link: Link) => {
        expect(link.title).toBe(changedTitle);
        // now delete the link
        return service.deleteLink(link.link_id);
      }).then(() => {
        done();
      }).catch(error => {
        fail('Error trying to update a link');
        done();
      });
    })();
  })

  it('should retrieve all links for a card successfully', done => {
    inject([LinkService], (service: LinkService) => {
      let card_id = 'abcd';
      service.getLinkForCard(card_id).then((links: Link[]) => {
        expect(links).toBeTruthy();
        done();
      }).catch(error => {
        fail('Error trying to retrieve links for a card');
        done();
      })
    })();
  })
});
