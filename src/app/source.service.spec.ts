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

  it('should successfully retrieve all sources for the test stash', done => {
    inject([SourceService], (service: SourceService) => {
      let stash_id = 
      service.getSourcesForStash('200039057').then(sources => {
        expect(sources.length).toBe(2);
        done();
      }).catch(error => {
        fail('error should not be thrown.');
        done();
      })

    })();
  })

  it('should successfully add a source and then delete it', done => {
    inject([SourceService], (service: SourceService) => {
      let source_id = '242267';
      
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
        [
          'tag 1',
          'tag 2'
        ]
      ).then(source => {
        console.log(source);
        expect(source).toBeTruthy();
        
        // Now attempt to delete the source
        service.deleteSource(source_id).then(response => {
          expect(response.success).toBeTruthy();
          done();
        }).catch(error => {
          fail('Error should not occur when deleting a source');
          done();
        });
      }).catch(error => {
        console.log(error);
        fail('error received when trying to add a source');
        // Still try to delete the source anyway
        service.deleteSource(source_id);
        done();
      })

    })();
  })
});
