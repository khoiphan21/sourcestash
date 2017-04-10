import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'; // needed for the 'throw' operator to work

import { Stash } from './classes/stash';
import { ANGULAR2 } from './data/mockStash';
import { AppResponse } from './classes/response';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

/**
  * SERVER DEVELOPMENT LINKS
  */
const DEVELOPMENT_SERVER: string = 'http://localhost:8080';
const PRODUCTION_SERVER: string = 'https://application-server-dot-source-stash.appspot.com';
const SERVER: string = DEVELOPMENT_SERVER;

@Injectable()
export class StashService {

  constructor(private http: Http) {

  }



  /**
   * Create a stash based on the given parameters
   * the id will be generated by hashing the title
   * 
   * @param stashDetails - the details of the stash (including id, title and description)
   */
  createStash(stashDetails: Stash): Promise<Response> {
    return Promise.resolve(null);
  }

  /**
   * 
   * @param title  the title of the stash
   */
  getStashInformation(title: string): Promise<Stash> {
    return Promise.resolve(ANGULAR2[0]);
  }

  /**
   * Retrieve all the stashes for a given user
   * 
   * @param userEmail - The email of the user whose stashes are to be retrieved
   */
  getAllStashes(userEmail: string): Observable<Stash[]> {
    let options: RequestOptions;
    this.setupHeaderOptions(options);

    return this.http.get(
      SERVER + '/stashes/all/' + userEmail,
      options
    ).map(response => {
      // Attempt to convert the response to the array of stashes
      let stashes: Stash[] = response.json();
      console.log(stashes);

      return stashes;
    }).catch(error => {
      console.log(error);
      return Observable.throw(error);
    })
  }

  /**
   * 
   * @param stashID - The id of the stash to be retrieved
   */
  getStash(stashID: string): Observable<Stash> {
    let options: RequestOptions;
    this.setupHeaderOptions(options);

    return this.http.get(
      SERVER + '/stash/' + stashID,
      options
    ).map(response => {
      // Cast the response to a stash
      let stash: Stash = response.json();
      console.log(stash);

      return stash;
    }).catch(error => {
      return Observable.throw(error);
    })

  }

  /**
   * HELPER METHODS
   */
  setupHeaderOptions(options: RequestOptions) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    options = new RequestOptions({ headers: headers });
  }
}
