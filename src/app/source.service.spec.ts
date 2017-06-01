import { TestBed, inject } from '@angular/core/testing';

import { SourceService } from './source.service';
import { AccountService } from './account.service';
import { HttpModule } from '@angular/http';
import { GoogleApiService } from './google-api.service';
import { Router } from '@angular/router';
import { Source } from './classes/source';
import { AppResponse } from './classes/response';

import * as _ from 'underscore';
import { PageProfileComponent } from './page-profile/page-profile.component';

describe('SourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SourceService,
        AccountService,
        {provide: GoogleApiService, useValue: {initialize: jasmine.createSpy('initialize')}},
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
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
      service.getSourcesForStash('2671055').then((sources: Source[]) => {
        expect(sources.length).toBeTruthy();

        // If length if more than 0, check tags
        if (sources.length > 0) {
          expect(sources[0].tags.length).toBeTruthy();
        }
        
        done();
      }).catch(error => {
        fail('error should not be thrown.');
        done();
      })

    })();
  }, 10000);

  it('should not be able to update a non-existing source', done => {
    inject([SourceService], (service: SourceService) => {
      let source = new Source(
        'NON-EXISTENT SOURCE ID',
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
      );
      service.updateSource(source).then(response => {
        fail('error should have occurred');
        done();
      }).catch((error: AppResponse) => {
        expect(error.error.status).toBe(400);
        done();
      })

    })();
  }, 10000);

  it('should update a source correctly', done => {
    inject([SourceService], (service: SourceService) => {
      let stash_id = '2671055';
      let source = new Source(
        '242267', '1947116927', stash_id, '2296818568', 'INFS3202', 0, 0,
        'root', 'http://google.com', '', '', ['tag 1', 'tag 2']
      );
      // setup the copy source
      let sourceCopy = new Source(
        '242267', '1947116927', stash_id, '2296818568',
        'SourceCopyTitle', // changed
        100, // changed
        100, // changed
        'root',
        'http://google.comm', // changed
        'description', // changed
        'beginner', // changed
        ['tag 3', 'tag 4'] // changed
      )
      // Add a source first
      service.addNewSource(
        source.parent_id, source.stash_id, source.author_id, source.title,
        source.xPosition, source.yPosition, source.type, source.hyperlink,
        source.description, source.difficulty, source.tags
      ).then(databaseSource => {
        // update the source id
        source.source_id = databaseSource.source_id;
        sourceCopy.source_id = databaseSource.source_id;

        expect(databaseSource).toBeTruthy();

        // Try to update the source
        return service.updateSource(sourceCopy);
      }).then((response: AppResponse) => {
        expect(response.success).toBeTruthy();

        // Now try to retrieve the source and check details
        return service.getSourcesForStash(stash_id)
      }).then((sources: Source[]) => {
        _.each(sources, (databaseSource: Source) => {
          if (databaseSource.source_id === sourceCopy.source_id) {
            expect(databaseSource.description).toBe(sourceCopy.description);
          }
        });
        
        return service.deleteSource(sourceCopy.source_id);
      }).then((response: AppResponse) => {
        expect(response.success).toBeTruthy();
        done();
      }).catch(error => {
        fail(new AppResponse(false, 'error should not have occurred', error));
        done();
      })
    })();
  }, 10000);

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
  }, 10000);

  it('should successfully add a source and then delete it', done => {
    inject([SourceService], (service: SourceService) => {
      let source_id: string;

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
        expect(source).toBeTruthy();
        expect(source.source_id).toBeTruthy();

        // Now attempt to delete the source
        service.deleteSource(source.source_id).then(response => {
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
  }, 10000);

  it('should retrieve tags for a source', done => {
    inject([SourceService], (service: SourceService) => {
      let source_id = '1993942511';
      let mockSource: Source = new Source(
        source_id, '', '', '', '', 0, 0, '', '', '', '', null
      );
      service.getTagsForSource(mockSource).then(newSource => {
        expect(newSource.tags).toBeTruthy();
        done();
      }).catch(error => {
        fail('error should not occur');
        done();
      });
    })();
  }, 10000);

});
