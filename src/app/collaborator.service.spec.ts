import { TestBed, inject } from '@angular/core/testing';

import * as _ from 'underscore';

import { CollaboratorService } from './collaborator.service';
import { HttpModule } from '@angular/http';
import { AccountService } from './account.service';
import { StashService } from './stash.service';
import { Account } from './classes/account';
import { GoogleApiService } from './google-api.service';
import { Router } from '@angular/router';
import { Stash } from './classes/stash';

describe('CollaboratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollaboratorService,
        StashService,
        AccountService,
        GoogleApiService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should create a service.', inject([CollaboratorService], (service: CollaboratorService) => {
    expect(service).toBeTruthy();
  }));

  it('should retrieve collaborators', done => {
    inject([CollaboratorService], (service: CollaboratorService) => {
      service.getAllCollaborators('2671055').then((collaborators: Account[]) => {
        expect(collaborators).toBeTruthy();
        done();
      }).catch(error => {
        console.log(error);
        fail('error should not occur.');
      });
    })();
  });

  /**
   * Tests for adding new collaborators
   */
  it('should add a new collaborator and then delete it', done => {
    inject([CollaboratorService], (service: CollaboratorService) => {
      let testStashID: string = '2671055';
      let testUserID: string = '6876777106';
      service.addCollaborator(testStashID, testUserID).then(response => {
        expect(response.success).toBeTruthy();
        return service.removeCollaborator(testStashID, testUserID);
      }).then(response => {
        expect(response.success).toBeTruthy();
        done();
      }).catch(error => {
        console.log(error);
        fail('Error should not occur');
        done();
      })
    })();
  }, 10000);
  it('should not be able to add an ownwer as a collaborator', done => {
    inject([CollaboratorService], (service: CollaboratorService) => {
      let testStashID: string = '24039641';
      let stashOwnerID: string = '3656220637652272'
      service.addCollaborator(testStashID, stashOwnerID).then(response => {
        fail('Expected error to occur');
        done();
      }).catch(error => {
        // pass
        done();
      })
    })();
  })

  /**
   * Test for updating a list of collaborators
   */
  it('should update a list of collaborators', done => {
    inject([CollaboratorService], (service: CollaboratorService) => {
      let testStashID: string = '24039641';
      let testUserID: string = '6876777106';
      let originalLength: number;
      service.getAllCollaborators(testStashID).then((collaborators: Account[]) => {
        let collaboratorIds: string[] = [];
        _.each(collaborators, (user: Account) => {
          collaboratorIds.push(user.user_id);
        });
        // Store the original length for checking
        originalLength = collaborators.length;
        // Add the new id
        collaboratorIds.push(testUserID);
        // Now attempt to update the list
        return service.updateCollaboratorList(testStashID, collaboratorIds);
      }).then(response => {
        expect(response.success).toBeTruthy();
        // Now try to retrieve the list of stashes
        return service.getAllCollaborators(testStashID);
      }).then((collaborators: Account[]) => {
        expect(collaborators.length).toEqual(originalLength + 1);
        // now remove the collaborator from the list
        return service.removeCollaborator(testStashID, testUserID);
      }).then(response => {
        expect(response.success).toBeTruthy();
        done();
      }).catch(error => {
        console.log(error);
        fail('Error should not occur');
        done();
      })

    })();
  }, 10000);

});
