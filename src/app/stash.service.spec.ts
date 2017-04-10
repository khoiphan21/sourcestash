import { TestBed, inject } from '@angular/core/testing';

import { StashService } from './stash.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Stash } from './classes/stash';
import { AppResponse } from './classes/response';

describe('StashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StashService
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
  it('should create a new stash and successfully delete it', done =>{
    inject([StashService], (service: StashService) => {
      let stash: Stash = {
        stashID: '302221',
        title: 'Stash #1',
        description: 'Some Description',
        authorID: '123456789'
      };
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
          fail('Error should not be thrown');
          done();
        }
      )
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
          expect(stash.stashID).toBe(stashID);
          done();
        }
      );
    })();
  });
  it('should retrieve the stashes for a user', done => {
    inject([StashService], (service: StashService) => {
      let email = 'john@example.com';
      service.getAllStashes(email).subscribe(
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
    inject([StashService], (service: StashService) => {
      let email = 'john4@example.com';
      service.getAllStashes(email).subscribe(
        (stashes: Stash[]) => {
          expect(stashes.length).toBe(0);
          done();
        }, error => {
          fail('error should not be thrown');
          done();
        }
      );
    })();
  });
  it('should throw an error if requesting for a nonexistent user', done => {
    inject([StashService], (service: StashService) => {
      let email = 'nonexistentuser@impossible.email.com';
      service.getAllStashes(email).subscribe(
        (stashes: Stash[]) => {
          fail('Error should have been thrown');
          done();
        }, error => {
          // Pass
          done();
        }
      );
    })();
  });
});
