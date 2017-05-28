import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as _ from 'underscore';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'; // needed for the 'throw' operator to work

import { Stash } from './classes/stash';
import { ANGULAR2 } from './data/mockStash';
import { AppResponse } from './classes/response';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SERVER } from './classes/SERVER';
import { AccountService } from './account.service';
import { Account } from './classes/account';
import { Deferred } from './classes/deferred';

@Injectable()
export class StashService {

  constructor(private http: Http, private accountService: AccountService) {

  }

  /**
   * Create a stash based on the given parameters
   * the id will be generated by hashing the title
   * 
   * @param stash - the details of the stash (including title and description)
   */
  createStash(stash: Stash): Promise<AppResponse> {
    // Check for null arguments
    if (this.checkForNull([stash.author_id, stash.title, stash.description])) {
      return Promise.reject('Null arguments received.');
    }

    let deferred = new Deferred<AppResponse>();

    let options: RequestOptions;
    this.setupHeaderOptions(options);

    // Update the author_id of the stash to be created
    let userID: string = this.accountService.getCurrentUserID();
    let updatedStash = stash;
    updatedStash.author_id = userID;

    this.http.post(
      SERVER + '/stash/new',
      {
        stash: updatedStash
      },
      options
    ).subscribe(response => {
      deferred.resolve(new AppResponse(true, 'Stash created successfully.'));
    }, error => {
      deferred.reject('Error creating a stash');
    });

    return deferred.promise;
  }

  /**
   * Update a stash based on the given stash object
   * 
   * @param stash - the stash to be updated. Should already by populated 
   *                with new content
   */
  updateStash(stash: Stash): Promise<AppResponse> {
    // Check for null arguments
    if (this.checkForNull([
      stash.author_id, stash.stash_id, stash.title, stash.description
    ])) {
      return Promise.reject('Null arguments received.');
    }

    let deferred = new Deferred<AppResponse>();

    if (stash.author_id == null || stash.stash_id == null ||
      stash.description == null || stash.title == null
    ) {
      deferred.reject('Missing parameters from the stash.');
    } else {
      let options: RequestOptions;
      this.setupHeaderOptions(options);

      this.http.post(
        SERVER + '/stash/update',
        {
          stash: stash
        }
      ).subscribe(response => {
        deferred.resolve(new AppResponse(true, response.toString()));
      }, error => {
        deferred.reject(new AppResponse(false, error, error));
      });
    }

    return deferred.promise;
  }

  /**
   * Delete a stash. The stash_id must be present stash for it to be deleted.
   * 
   * @param stash - The stash to be deleted
   */
  deleteStash(stash: Stash): Promise<AppResponse> {
    // Check for null arguments
    if (this.checkForNull([stash.stash_id, stash.title, stash.description])) {
      return Promise.reject('Null arguments received.');
    }

    let deferred = new Deferred<AppResponse>();

    let options: RequestOptions;
    this.setupHeaderOptions(options);

    this.http.post(
      SERVER + '/stash/delete',
      {
        stash: stash
      }
    ).subscribe(response => {
      deferred.resolve(new AppResponse(true, 'Stash successfully deleted.'));
    }, error => {
      deferred.reject(error);
    })

    return deferred.promise;
  }

  /**
   * Retrieve all the stashes for a given user
   * 
   * @param userEmail - The email of the user whose stashes are to be retrieved
   */
  getAllStashes(): Promise<Stash[]> {
    let user: Account = this.accountService.getCurrentUser();

    // Check for null arguments
    if (this.checkForNull([user.email])) {
      return Promise.reject('Null arguments received.');
    }

    let deferred = new Deferred<Stash[]>();

    let options: RequestOptions;
    this.setupHeaderOptions(options);

    this.http.get(
      SERVER + '/stashes/all/' + user.email,
      options
    ).subscribe(response => {
      // Attempt to convert the response to the array of stashes
      let stashes: Stash[] = response.json();

      deferred.resolve(stashes);
    }, error => {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  /**
   * Get all stashes that this user is a collaborator of
   */
  getAllSharedStashes(): Promise<Stash[]> {
    let user: Account = this.accountService.getCurrentUser();

    // Check for null arguments
    if (this.checkForNull([user.email])) {
      return Promise.reject('Null arguments received.');
    }
    
    let deferred = new Deferred<Stash[]>();

    let options: RequestOptions;
    this.setupHeaderOptions(options);

    // Now retrieve the user id from the server
    this.accountService.getUserID(user.email).then(user_id => {
      this.http.post(
        SERVER + '/stashes/shared/all',
        {
          user_id: user_id
        },
        options
      ).subscribe(response => {
        // Cast the response to a stash
        let stashes = response.json();
        deferred.resolve(stashes);
      }, error => {
        deferred.reject(error);
      })
    })

    return deferred.promise;
  }

  /**
   * Get the information of a specific stash.
   * 
   * @param stash_id - The id of the stash to be retrieved
   */
  getStash(stash_id: string): Promise<Stash> {
    // Check for null arguments
    if (this.checkForNull([stash_id])) {
      return Promise.reject('Null arguments received.');
    }
    
    let deferred = new Deferred<Stash>();

    let options: RequestOptions;
    this.setupHeaderOptions(options);

    this.http.get(
      SERVER + '/stash/' + stash_id,
      options
    ).subscribe(response => {
      // Cast the response to a stash
      let stash = response.json();
      deferred.resolve(stash);
    }, error => {
      deferred.reject(error);
    })

    return deferred.promise;
  }

  /******************
    * HELPER METHODS
    *****************/
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
  setupHeaderOptions(options: RequestOptions) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    options = new RequestOptions({ headers: headers });
  }
}
