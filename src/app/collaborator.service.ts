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
  ) { }

  /**
   * Update the list of collaborators for a certain stash
   * 
   * @param stash_id - the id of the stash to be updated
   * @param collaboratorEmails - the email of the collaborators
   */
  updateCollaboratorList(stash_id: string,
    collaboratorEmails: string[]): Promise<AppResponse> {
    let deferred = new Deferred<AppResponse>();

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    // Get the actual ids of the collaborators from their emails

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
      }

    }, error => {
      deferred.reject(error);
    });

    return deferred.promise;
  }

}