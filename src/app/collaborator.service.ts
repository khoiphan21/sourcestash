import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'; // needed for the 'throw' operator to work
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Account } from './classes/account';
import { Deferred } from './classes/deferred';
import { SERVER } from './classes/SERVER';
import { AppResponse } from './classes/response';

@Injectable()
export class CollaboratorService {

  constructor(
    private http: Http
  ) {
    this.getAllCollaborators('24039641').then(accounts => console.log(accounts));
  }

  /**
   * Update the list of collaborators for a certain stash
   * 
   * @param stash_id - the id of the stash to be updated
   * @param collaboratorIds - the ids of the collaborators
   */
  updateCollaboratorList(stash_id: string,
    collaboratorIds: string[]): Promise<AppResponse> {
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

  /**
   * Get all the collaborators for a certain stash
   * 
   * @param stash_id - the stash to retrieve all collaborators for
   */
  getAllCollaborators(stash_id: string): Promise<Account[]> {
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

}
