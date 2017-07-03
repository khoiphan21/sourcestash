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

  createBoard(title: string): Promise<Board> {
    let deferred = new Deferred<Board>();

    let options: RequestOptions;
    Helper.setupHeaderOptions(options);

    // Update the owner_id of the board to be created
    let user_id: string = this.accountService.getCurrentUserID();

    if (Helper.checkForNull([title])) {
      return Promise.reject('Error occurred: empty title received.');
    }

    this.http.post(
      SERVER + '/board/new',
      {
        board: {
          owner_id: user_id,
          title: title
        }
      },
      options
    ).subscribe(response => {
      let board: Board = response.json();
      deferred.resolve(board);
    }, error => {
      deferred.reject('Error creating a board');
    });

    return deferred.promise;
  }

  getAllBoards(user_id: string): Promise<Board[]> {
    let deferred = new Deferred<Board[]>();

    let options: RequestOptions;
    Helper.setupHeaderOptions(options);

    if (Helper.checkForNull([user_id])) {
      return Promise.reject('Error occurred: empty values received.');
    }
    
    this.http.post(
      SERVER + '/board/all',
      {owner_id: user_id},
      options
    ).subscribe(response => {
      let boards: Board[] = response.json();
      deferred.resolve(boards);
    }, error => {
      console.log(error);
      deferred.reject('Unable to update the board');
    })
    
    return deferred.promise;
  }

  /**
   * Update a board, returning the board with the new values
   * 
   * @param board - the new values of the board
   */
  updateBoard(board: Board): Promise<Board> {
    let deferred = new Deferred<Board>();

    let options: RequestOptions;
    Helper.setupHeaderOptions(options);

    if (Helper.checkForNull([board.board_id, board.owner_id, board.title])) {
      return Promise.reject('Error occurred: empty values received.');
    }

    this.http.post(
      SERVER + '/board/update',
      {board: board},
      options
    ).subscribe(response => {
      let board: Board = response.json();
      deferred.resolve(board);
    }, error => {
      console.log(error);
      deferred.reject('Unable to update the board');
    })

    return deferred.promise;
  }

  deleteBoard(board: Board): Promise<AppResponse> {
    let deferred = new Deferred<AppResponse>();

    let options: RequestOptions;
    Helper.setupHeaderOptions(options);

    if (Helper.checkForNull([board.board_id, board.owner_id, board.title])) {
      return Promise.reject('Error occurred: empty values received.');
    }

    this.http.post(
      SERVER + '/board/delete',
      {board: board},
      options
    ).subscribe(response => {
      deferred.resolve(new AppResponse(true, 'Board successfully deleted'));
    }, error => {
      console.log(error);
      deferred.reject('Unable to delete a board');
    });

    return deferred.promise;
  }

  getBoardTitle(board_id: string): Promise<string>{
    let deferred = new Deferred<string>();
    let options: RequestOptions;
    Helper.setupHeaderOptions(options);

    if (Helper.checkForNull([board_id])){
      return Promise.reject('Error occured: empty values received.');
    }

    this.http.post(
      SERVER + '/board/gettitle',
      {board_id: board_id},
      options
    ).subscribe(response => {
      let titleObject = response.json();
      deferred.resolve(titleObject.title);
    }, error => {
      console.log(error);
      deferred.reject('Unable to get the board title');
    });

    return deferred.promise;
  }
}
