import { TestBed, inject } from '@angular/core/testing';

import { SourceService } from './source.service';
import { AccountService } from './account.service';
import { HttpModule } from '@angular/http';
import { GoogleApiService } from './google-api.service';

describe('SourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SourceService,
        AccountService,
        GoogleApiService
      ], 
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([SourceService], (service: SourceService) => {
    expect(service).toBeTruthy();
  }));

  it('should successfully add a source', done => {
    inject([SourceService], (service: SourceService) => {
      service.addNewSource(
        '',
        '200039057',
        '2296818568',
        'INFS3202',
        0,
        0,
        'root',
        'http://google.com',
        '',
        '',
        []
      ).then(source => {
        console.log(source);
        expect(source).toBeTruthy();
        done();
      }).catch(error => {
        console.log(error);
        done();
      })

    })();
  })
});
