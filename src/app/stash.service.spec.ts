import { TestBed, inject } from '@angular/core/testing';

import { StashService } from './stash.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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

  it('should ...', inject([StashService], (service: StashService) => {
    expect(service).toBeTruthy();
  }));
});
