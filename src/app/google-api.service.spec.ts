import { TestBed, inject } from '@angular/core/testing';

import { GoogleApiService } from './google-api.service';
import { Http, HttpModule } from '@angular/http';

describe('GoogleApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoogleApiService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([GoogleApiService], (service: GoogleApiService) => {
    expect(service).toBeTruthy();
  }));
});
