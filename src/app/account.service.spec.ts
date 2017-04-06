import { TestBed, inject } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppResponse } from './classes/response';

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
  it('should successfully login if the details are correct', inject([AccountService], (service: AccountService) => {
    service.login('john@example.com', 'password').subscribe(
      response => {
        expect(response.success).toBeTruthy();
      }, error => {
        fail('error should not happen');
      }
    )
  }));
  it('should throw an error if password is incorrect', inject([AccountService], (service: AccountService) => {
    service.login('john@example.com', 'passwordd').subscribe(
      response => fail('an error should occur'),
      error => expect(error).toBeTruthy()
    )
  }))
  it('should throw an error if the email does not exist', inject([AccountService], (service: AccountService) => {
    service.login('someemailthatdoesnotexist@mail.com', 'pass').subscribe(
      response => fail('error should be thrown'),
      error => expect(error).toBeTruthy()
    )
  }))


  /**
   * Tests for account creation
   */
  it('should throw an error if the email already exists', inject([AccountService], (service: AccountService) => {
    service.createAccount({
      email: 'john@example.com',
      password: 'whatever'
    }).subscribe(response => {
      fail('Expected error to occur');
    }, error => {
      // Should get an error. 
    })
  }));

  /**
   * Tests for checking email
   */
  it('should return false for an existing email', inject([AccountService], (service: AccountService) => {
    service.checkEmail('john@example.com').subscribe(
      (response: AppResponse) => {
        expect(response.success).toBeFalsy();
      }, error => {
        throw error;
      }
    );
  }));
  it('should return true for an impossible email', inject([AccountService], (service: AccountService) => {
    service.checkEmail('johnblaskdflahalskdfjlamksdf@example.com').subscribe(
      (response: AppResponse) => {
        expect(response.success).toBeTruthy();
      }, error => {
        throw error;
      }
    )
  }));
});
