import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'; // needed for the 'throw' operator to work
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import * as _ from 'underscore';

import { Account } from './classes/account';
import { Deferred } from './classes/deferred';
import { SERVER } from './classes/SERVER';
import { AppResponse } from './classes/response';
import { StashService } from './stash.service';
import { Stash } from './classes/stash';

@Injectable()
export class CollaboratorService {

  constructor(
    private http: Http,
    private stashService: StashService
  ) {
  }

  /**
   * Update the list of collaborators for a certain stash
   * 
   * @param stash_id - the id of the stash to be updated
   * @param collaboratorIds - the ids of the collaborators
   */
  updateCollaboratorList(stash_id: string,
    collaboratorIds: string[]): Promise<AppResponse> {
    // Check for null args
    if (this.checkForNull([stash_id, collaboratorIds])) {
      return Promise.reject('Null arguments received');
    }

    let deferred = new Deferred<AppResponse>();

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    // Make API call
    this.http.post(
      SERVER + '/collaborator/update',
      { stash_id: stash_id, collaborators: collaboratorIds },
      options
    ).subscribe(response => {
      if (response.status == 200) {
        deferred.resolve(new AppResponse(true, 'Successfully updated collaborator list'));
      } else {
        deferred.resolve(new AppResponse(false, 'Failed to update collaborator list', response));
      }
    }, error => {
        deferred.reject(error);
    })

    return deferred.promise;
  }

  removeCollaborator(stash_id: string, collaborator_id: string) {
    // Check for null args
    if (this.checkForNull([stash_id, collaborator_id])) {
      return Promise.reject('Null arguments received.');
    }

    let deferred = new Deferred<AppResponse>();

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    // Make API call
    this.http.post(
      SERVER + '/collaborator/remove',
      { stash_id: stash_id, collaborator_id: collaborator_id },
      options
    ).subscribe(response => {
      if (response.status == 200) {
        deferred.resolve(new AppResponse(true, 'Successfully removed collaborator'));
      } else {
        deferred.resolve(new AppResponse(false, 'Failed to remove collaborator', response));
      }
    }, error => {
        deferred.reject(error);
    })

    return deferred.promise;
  }

  addCollaborator(stash_id: string, collaborator_id: string): Promise<AppResponse> {
    // Check for null args
    if (this.checkForNull([stash_id, collaborator_id])) {
      return Promise.reject('Null arguments received.');
    }
    
    let deferred = new Deferred<AppResponse>();
    
    let collaboratorIDDictionary = {};

    // First check if the collaborator is the owner of the stash
    this.stashService.getStash(stash_id).then((stash: Stash) => {
      if (stash.author_id === collaborator_id) {
        deferred.reject('This user is already the owner of the stash.');
      } else {
        return this.getAllCollaborators(stash_id);
      }
    }).then((collaborators: Account[]) => {
      _.each(collaborators, (collaborator: Account) => {
        collaboratorIDDictionary[collaborator.user_id] = true;
      });
      // Now check if the collaborator already exists
      if (collaboratorIDDictionary[collaborator_id] == true) {
        deferred.reject('This user is already a collaborator!');
      } else {
        collaboratorIDDictionary[collaborator_id] = true;
        // Get the array of collaborator ids
        let collaboratorIDs = _.allKeys(collaboratorIDDictionary);
        // Make call to API to update the list
        return this.updateCollaboratorList(stash_id, collaboratorIDs)
      }
    }).then((response: AppResponse) => {
      if (response.success) {
        deferred.resolve(response);
      } else {
        deferred.reject(response);
      }
    }).catch(error => {
      deferred.reject(error);
    })

    return deferred.promise;
  }

  /**
   * Get all the collaborators for a certain stash
   * 
   * @param stash_id - the stash to retrieve all collaborators for
   */
  getAllCollaborators(stash_id: string): Promise<Account[]> {
    // Check for null args
    if (this.checkForNull([stash_id])) {
      return Promise.reject('Null arguments received.');
    }
    
    let deferred = new Deferred<Account[]>();

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(
      SERVER + '/collaborators/get',
      {
        stash_id: stash_id
      },
      options
    ).subscribe(response => {
      // The response is only the ids of the users.
      let user_ids: string[] = response.json();
      // Check whether the list of users is empty
      if (user_ids.length == 0) {
        deferred.resolve([]);
      } else {
        // now need to retrieve all user info for each of the collab
        // map is convenient to return array of promises to use with Promise.all()
        Promise.all(user_ids.map(user_id => {
          // Deferred is needed cuz of stupid Observables
          let miniDeferred = new Deferred<Account>();
          // Make the call to the API
          this.http.post(
            SERVER + '/user/info', { user_id: user_id }, options
          ).subscribe(userInfo => {
            miniDeferred.resolve(userInfo.json());
          }, error => {
            miniDeferred.reject(error);
          });
          // Return the promise object
          return miniDeferred.promise;
        })).then(accounts => {
          deferred.resolve(accounts)
        }).catch(error => {
          deferred.reject(error);
        })
      }
    }, error => {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  /*****************
   * HELPER METHODS
   ****************/
  /**
   * Check the arguments to see if any is null.
   * 
   * @param args - the array of arguments to be checked
   * @return true if any of the argument is null, false otherwise
   */
  checkForNull(args: any[]): boolean {
    let flag: boolean = false;

    _.each(args, arg => {
      if (arg == null) {
        flag = true;
      }
    })

    return flag;
  }

}
