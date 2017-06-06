import { TestBed, inject } from '@angular/core/testing';

import { AccountService, LOCAL_STORAGE_KEY } from './account.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppResponse } from './classes/response';
import { Stash } from './classes/stash';
import { GoogleApiService } from './google-api.service';
import { Router } from '@angular/router';

let mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

describe('AccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountService,
        { provide: GoogleApiService, useValue: { initialize: jasmine.createSpy('initialize') } },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [
        HttpModule, BrowserModule, FormsModule
      ]
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
      email: 'john.doe.april.2017@gmail.com',
      firstName: 'Dummy',
      lastName: 'Account',
      password: '%Eh0BEBoFBxcZCRUIFCIlHC4CCg0MCwMTEhEPDgQYBiIMNGVaejIvSXVNRnc9'
    }));
  });

  it('should create a service successfully', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));

  /**
   * Tests for logging in
   */
  it('should successfully login if the details are correct', done => {
    inject([AccountService], (service: AccountService) => {
      service.login('john@example.com', 'whatever').then(response => {
        expect(response.success).toBeTruthy();
        done();
      }).catch(error => {
        fail('login failed');
        done();
      });
    })();
  });

  it('should throw an error if password is incorrect', done => {
    inject([AccountService], (service: AccountService) => {
      service.login('john@example.com', 'passwordd').then(response => {
        fail('an error should occur');
        done();
      }).catch(error => {
        expect(error).toBeTruthy();
        done();
      });
    })();
  });
  it('should throw an error if the email does not exist', done => {
    inject([AccountService], (service: AccountService) => {
      service.login('someemailthatdoesnotexist@mail.com', 'pass').then(response => {
        fail('error should be thrown')
        done();
      }).catch(error => {
        expect(error).toBeTruthy();
        done();
      });
    })();
  });

  /**
   * Tests for account creation
   */
  it('should throw an error if the email already exists', done => {
    inject([AccountService], (service: AccountService) => {
      service.createAccount({
        email: 'john@example.com',
        password: 'whatever'
      }).then(response => {
        fail('Expected error to occur');
        done();
      }).catch(error => {
        // Should get an error. 
        done();
      });
    })();
  });
  it('should successfully create an account with a new email', done => {
    inject([AccountService], (service: AccountService) => {
      service.createAccount({
        email: 'john5@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe4'
      }).then(response => {
        return service.deleteAccount('john5@example.com');
      }).then(response => {
        done();
      }).catch(error => {
        service.deleteAccount('john5@example.com');
        fail('error should not occur');
        done();
      });
    })();
  })

  /**
   * Tests for checking email
   */
  it('should return false for an existing email', done => {
    inject([AccountService], (service: AccountService) => {
      service.checkEmail('john@example.com').then((response: AppResponse) => {
        // Should have failed
        fail('Error should have occurred.');
        done();
      }).catch(error => {
        // Correct
        done();
      });
    })();
  });
  it('should return true for an impossible email', done => {
    inject([AccountService], (service: AccountService) => {
      service.checkEmail('johnblaskdflahalskdfjlamksdf@example.com')
        .then((response: AppResponse) => {
          expect(response.success).toBeTruthy();
          done();
        }).catch(error => {
          fail('Error should not occur.');
          done();
        });
    })();
  });

  /** 
   * Test for retrieving user ID
   */
  it('should retrieve the id for a user correctly', done => {
    inject([AccountService], (service: AccountService) => {
      service.getUserID('john4@example.com').then(id => {
        expect(id).toBe('6876777106');
        done();
      }).catch(error => {
        console.log(error);
        fail('error should not occur');
        done();
      });
    })();
  });

});
