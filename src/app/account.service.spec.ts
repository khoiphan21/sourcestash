import { TestBed, inject } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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

  it('should ...', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});
