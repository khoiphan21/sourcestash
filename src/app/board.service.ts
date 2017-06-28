import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import * as _ from 'underscore';

import { Deferred } from './classes/deferred';
import { Board } from './classes/board';
import { AppResponse } from './classes/response';
import { Helper } from './classes/helper';
import { AccountService } from './account.service';
import { SERVER } from './classes/SERVER';

@Injectable()
export class BoardService {

  constructor(
    private http: Http,
    private accountService: AccountService
  ) { }

  createBoard(board: Board): Promise<Board> {
    let deferred = new Deferred<Board>();

    let options: RequestOptions;
    Helper.setupHeaderOptions(options);

    // Update the owner_id of the board to be created
    let user_id: string = this.accountService.getCurrentUserID();
    let updatedBoard = board;
    updatedBoard.owner_id = user_id;

    if (Helper.checkForNull([updatedBoard.title])) {
      return Promise.reject('Error occurred: empty title received.');
    }

    this.http.post(
      SERVER + '/board/new',
      {board: updatedBoard},
      options
    ).subscribe(response => {
      deferred.resolve(response.json());
    }, error => {
      deferred.reject('Error creating a board');
    });

    return deferred.promise;
  }

  getAllBoards(user_id: string): Promise<Board[]> {
    return Promise.reject('Not implemented');    
  }

  /**
   * Update a board, returning the board with the new values
   * 
   * @param board - the new values of the board
   */
  updateBoard(board: Board): Promise<Board> {
    return Promise.reject('Not implemented');
  }

  deleteBoard(board: Board): Promise<AppResponse> {
    return Promise.reject('Not implemented');
  }

}
