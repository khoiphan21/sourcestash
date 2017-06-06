import { TestBed, inject } from '@angular/core/testing';

import { StashService } from './stash.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Stash } from './classes/stash';
import { AppResponse } from './classes/response';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { GoogleApiService } from './google-api.service';

describe('StashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StashService,
        { provide: GoogleApiService, useValue: { initialize: jasmine.createSpy('initialize') } },
        AccountService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ],
      imports: [
        HttpModule, BrowserModule, FormsModule
      ]
    });
  });

  it('should create a StashService', inject([StashService], (service: StashService) => {
    expect(service).toBeTruthy();
  }));

  /**
   * Tests for stash creation
   */
  it('should create a new stash and successfully delete it', done => {
    inject([StashService, AccountService], (service: StashService, accountService: AccountService) => {
      let stash: Stash = {
        stash_id: '302221',
        title: 'Stash #1',
        description: 'Some Description'
      };
      let email = 'john@example.com';
      let password = 'whatever';
      accountService.login(email, password).then(() => {
        // Wait for a few seconds for the app to update user id
        setTimeout(() => {
          service.createStash(stash).then((response: AppResponse) => {
            expect(response.success).toBe(true);

            // Now attempt to delete the stash
            service.deleteStash(stash).then(
              response => done(), // successful
              error => {
                console.log(error);
                fail('Error should not occur');
                done();
              }
            )
          }).catch(error => {
            // still attempt to delete the stash anyway
            fail('Error should not be thrown');
            service.deleteStash(stash)
            done();
          });
        }, 2000)
      }).catch(error => {
        fail('error trying to login');
        done();
      });
    })();
  });

  /**
   * Tests for updating a stash
   */
  it('should update a stash successfully', done => {
    inject([StashService], (service: StashService) => {
      let stashID = '200039057';
      let user_id = '2296818568';
      let description: string = '' + (Math.random() * 1000);
      let stash: Stash = {
        stash_id: stashID,
        author_id: user_id,
        title: 'First Stash',
        description: description
      }
      service.updateStash(stash).then(
        (response: AppResponse) => {
          expect(response.success).toBeTruthy();

          return service.getStash(stashID);
        }
      ).then((stash: Stash) => {
        expect(stash.description).toBe(description);
        done();
      });
    })();
  })

  /**
   * Tests for retrieving stashes
   */
  it('should retrieve the test stash correctly', done => {
    inject([StashService], (service: StashService) => {
      let stashID = '200039057';
      service.getStash(stashID).then(
        (stash: Stash) => {
          expect(stash.stash_id).toBe(stashID);
          done();
        }
      );
    })();
  });
  it('should retrieve the stashes for a user', done => {
    inject([StashService], (service: StashService) => {
      let email = 'john@example.com';
      service.getAllStashes().then((stashes: Stash[]) => {
        expect(stashes).toBeTruthy();
        done();
      }).catch(error => {
        fail('error should not be thrown');
        done();
      });
    })();
  });
  it('should return an empty array for a user without a stash', done => {
    inject([StashService, AccountService], (service: StashService, accountService: AccountService) => {
      // Login with the correct user first
      let email = 'john4@example.com';
      let password = 'password';
      accountService.login(email, password).then(() => {
        service.getAllStashes().then((stashes: Stash[]) => {
          expect(stashes.length).toBe(0);
          done();
        }).catch(error => {
          fail('error should not be thrown');
          done();
        });
      });
    })();
  });
  it('should get all shared stashes for a user', done => {
    inject([StashService, AccountService], (service: StashService, accountService: AccountService) => {
      // Login with the correct user first
      let email = 'john4@example.com';
      let password = 'password';
      accountService.login(email, password).then(() => {
        service.getAllSharedStashes().then((stashes: Stash[]) => {
          expect(stashes).toBeTruthy();
          done();
        }).catch(error => {
          fail('error should not be thrown');
          done();
        });
      });
    })();
  })
});
