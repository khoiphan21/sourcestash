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

  it('should create a service.', inject([SourceService], (service: SourceService) => {
    expect(service).toBeTruthy();
  }));

  it('should successfully retrieve all sources for the test stash', done => {
    inject([SourceService], (service: SourceService) => {
      service.getSourcesForStash('2671055').then(sources => {
        expect(sources.length).toBe(2);
        done();
      }).catch(error => {
        fail('error should not be thrown.');
        done();
      })

    })();
  });

  it('should update the location of a source successfully', done => {
    inject([SourceService], (service: SourceService) => {
      service.updateSourcePosition('8013377', 100, 100).then(response => {
        expect(response.success).toBe(true);
        done();
      }).catch(error => {
        fail('Error occurred when trying to update source position');
        done();
      })
    })();
  })

  it('should successfully add a source and then delete it', done => {
    inject([SourceService], (service: SourceService) => {
      let source_id = '242267';
      
      service.addNewSource(
        '1947116927',
        '2671055',
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
