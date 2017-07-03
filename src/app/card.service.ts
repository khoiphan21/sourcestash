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
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    // The deferred promise
    let deferred = new Deferred<Card[]>();

    /**
     * Make a call to the server to get the array of cards
     * To call a server you need "this.http.post(url,params,options)"
     */
    this.http.post(
      // url
      SERVER + '/card/all',
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

  /**
   * Add a new card to the remote database. 
   * 
   * @param board_id - the id of the stash this source belongs
   * @param title - the title of the source
   * @param x_location - the relative x position of the source
   * @param y_location - the relative y position of the source
   * @return return a card object with an id generated
   */  
  addNewCard(board_id: string, title: string, x_location: number, y_location: number): Promise<Card>{
    // Check for null args
    if(this.checkForNull([board_id, title, x_location, y_location])){
      return Promise.reject('Null arguments received');
    }

    // Setting up
    let deferred = new Deferred<Card>();

    // Calling server
    this.http.post(
      SERVER + '/card/new',
      {
        card: {
          board_id: board_id,
          title: title,
          x_location: x_location, 
          y_location: y_location
        }
      }
    ).subscribe(response => {
    if (response.status != 201){
      deferred.reject('Failed to create a new card');
    } else {
      deferred.resolve(response.json());
    }
  }, error => {
    deferred.reject(error);
  });

  return deferred.promise;
}

  /**
   * @param card - the card which is going to be updated
   */
  updateCard(card: Card): Promise<AppResponse> {
    // Check for mull args
    if (this.checkForNull([card])){
      return Promise.reject('Null arguments received');
    }
    
    // Setting up
    let deferred = new Deferred<AppResponse>();
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers});   

    // Making call to the server
    this.http.post(
      SERVER + '/card/update',
      {
        card: card
      },
      options
    ).subscribe( response => {
      if (response.status == 200) {
        deferred.resolve(new AppResponse(true, response.text()))
      } else {
        deferred.reject(new AppResponse(false, response.text()));
      }
    }, error => {
      deferred.reject(new AppResponse(false, error, error));
    })

    return deferred.promise;
  }

  /**
  * @param card_id - the card which is going to be delete
  */
  deleteCard(card_id: string): Promise<AppResponse> {
    // Check for null args
    if(this.checkForNull([card_id])) {
      return Promise.reject('Null arguments received');
    }

    // Setting up
    let deferred = new Deferred<AppResponse>();
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers});

    // Call the server
    this.http.post(
      SERVER + '/card/delete',
      {
        card_id: card_id
      },
      options
    ).subscribe(response => {
      if (response.status == 200) {
        deferred.resolve(new AppResponse(true, 'Deleted Successfully'));
      } else {
        deferred.reject(response.text());
      }
    }, error => {
      deferred.reject(error);
    })
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
