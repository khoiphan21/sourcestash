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

  /**
   * Tests for account creation
   */

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
