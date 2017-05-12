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
        GoogleApiService,
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
      accountService.login(email, password).subscribe(() => {
        // Wait for a few seconds for the app to update user id
        setTimeout(() => {
          service.createStash(stash).subscribe(
            (response: AppResponse) => {
              expect(response.success).toBe(true);

              // Now attempt to delete the stash
              service.deleteStash(stash).subscribe(
                response => done(), // successful
                error => {
                  console.log(error);
                  fail('Error should not occur');
                  done();
                }
              )
            }, error => {
              // still attempt to delete the stash anyway
              fail('Error should not be thrown');
              service.deleteStash(stash)
              done();
            }
          )
        }, 2000)
      }, error => {
        fail('error trying to login');
        done();
      })

    })();
  })

  /**
   * Tests for retrieving stashes
   */
  it('should retrieve the test stash correctly', done => {
    inject([StashService], (service: StashService) => {
      let stashID = '200039057';
      service.getStash(stashID).subscribe(
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
      service.getAllStashes().subscribe(
        (stashes: Stash[]) => {
          expect(stashes).toBeTruthy();
          done();
        }, error => {
          fail('error should not be thrown');
          done();
        }
      );
    })();
  });
  it('should return an empty array for a user without a stash', done => {
    inject([StashService, AccountService], (service: StashService, accountService: AccountService) => {
      // Login with the correct user first
      let email = 'john4@example.com';
      let password = 'password';
      accountService.login(email, password).subscribe(() => {
        service.getAllStashes().subscribe(
          (stashes: Stash[]) => {
            expect(stashes.length).toBe(0);
            done();
          }, error => {
            fail('error should not be thrown');
            done();
          }
        );
      });
    })();
  });
});
