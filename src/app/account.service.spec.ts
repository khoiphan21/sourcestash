import { TestBed, inject } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppResponse } from './classes/response';
import { Stash } from './classes/stash';

describe('AccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountService
      ],
      imports: [
        HttpModule, BrowserModule, FormsModule
      ]
    });
  });

  it('should create a service successfully', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));

  /**
   * Tests for logging in
   */
  it('should successfully login if the details are correct', done => {
    inject([AccountService], (service: AccountService) => {
      service.login('john@example.com', 'whatever').subscribe(
        response => {
          expect(response.success).toBeTruthy();
          done();
        }, error => {
          console.log('failed to log in for testing');
          fail('login failed');
          done();
        }
      )
    })();
  });

  it('should throw an error if password is incorrect', done => {
    inject([AccountService], (service: AccountService) => {
      service.login('john@example.com', 'passwordd').subscribe(
        response => {
          fail('an error should occur');
          done();
        },
        error => {
          expect(error).toBeTruthy();
          done();
        }
      )
    })();
  });
  it('should throw an error if the email does not exist', done => {
    inject([AccountService], (service: AccountService) => {
      service.login('someemailthatdoesnotexist@mail.com', 'pass').subscribe(
        response => {
          fail('error should be thrown')
          done();
        },
        error => {
          expect(error).toBeTruthy();
          done();
        }
      )
    })();
  })


  /**
   * Tests for account creation
   */
  it('should throw an error if the email already exists', done => {
    inject([AccountService], (service: AccountService) => {
      service.createAccount({
        email: 'john@example.com',
        password: 'whatever'
      }).subscribe(response => {
        fail('Expected error to occur');
        done();
      }, error => {
        // Should get an error. 
        done();
      })
    })();
  });
  it('should successfully create an account with a new email', done => {
    inject([AccountService], (service: AccountService) => {
      service.createAccount({
        email: 'john@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe'
      });
      done();
    })();
  })

  /**
   * Tests for checking email
   */
  it('should return false for an existing email', done => {
    inject([AccountService], (service: AccountService) => {
      service.checkEmail('john@example.com').subscribe(
        (response: AppResponse) => {
          expect(response.success).toBeFalsy();
          done();
        }, error => {
          fail('Error should not occur.');
          done();
        }
      );
    })();
  });
  it('should return true for an impossible email', done => {
    inject([AccountService], (service: AccountService) => {
      service.checkEmail('johnblaskdflahalskdfjlamksdf@example.com').subscribe(
        (response: AppResponse) => {
          expect(response.success).toBeTruthy();
          done();
        }, error => {
          fail('Error should not occur.');
          done();
        }
      )
    })();
  });

  /**
   * Tests for retrieving stashes
   */
  it('should retrieve the test stash correctly', done => {
    inject([AccountService], (service: AccountService) => {
      let stashID = '200039057';
      service.getStash(stashID).subscribe(
        (stash: Stash) => {
          expect(stash.id).toBe(stashID);
        }
      )
    })();
  });
  it('should retrieve the stashes for a user', done => {
    inject([AccountService], (service: AccountService) => {
      let userID = '2296818568';
      service.getAllStashes(userID).subscribe(
        (stashes: Stash[]) => {
          expect(stashes).toBeTruthy();
        }
      )
    })();
  });
});
