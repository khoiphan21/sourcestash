import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'; // needed for the 'throw' operator to work
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import * as _ from 'underscore';

import { Card } from './classes/card';
// import { SOURCES } from './data/mockSources';
import { AccountService } from './account.service';
import { AppResponse } from './classes/response';
import { SERVER } from './classes/SERVER';
import { Deferred } from './classes/deferred';

@Injectable()
export class CardService {

  constructor(
    private accountService: AccountService,
    private http: Http
  ) { }

  /**
     * Test for retrieving all the cards for a certain board
     * 
     * @param boardId - the stash for which all the sources will be retrieved
    */
  getCardForBoard(board_id): Promise<Card[]> {
    // Check for null args
    if (this.checkForNull([board_id])) {
      return Promise.reject('Null arguments received');
    }

    let headers = new Headers({
      'Content-Type': 'applucation/json'
    });
    let options = new RequestOptions({ headers: headers});

    // The deferred promise
    let deferred = new Deferred<Card[]>(); 

    /**
     * Make a call to the server to get the array of cards
     * To call a server you need "this.http.post(url,params,options)"
     */
    this.http.post(
      // url
      SERVER + '/source/all/' + board_id,
      // parameters
      {
        board_id: board_id
      },
      // Options
      options
    ).subscribe(response => {
      deferred.resolve(response.json());
    }, error => {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  /*****************
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

}
