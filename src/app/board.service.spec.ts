import { TestBed, inject } from '@angular/core/testing';

import { BoardService } from './board.service';
import { GoogleApiService } from './google-api.service';
import { AccountService } from './account.service';
import { Router } from '@angular/router';
import { Board } from './classes/board';
import { AppResponse } from './classes/response';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('BoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BoardService,
        { provide: GoogleApiService, useValue: { initialize: jasmine.createSpy('initialize') } },
        AccountService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ],
      imports: [
        HttpModule, BrowserModule, FormsModule
      ]
    });
  });

  it('should create a service', inject([BoardService], (service: BoardService) => {
    expect(service).toBeTruthy();
  }));

  it('should create a new board and then delete it', done => {
    inject([BoardService, AccountService], (service: BoardService, accountService: AccountService) => {
      let board = new Board('owner_id', 'board_id', 'Board Title');
      let email = 'john@example.com';
      let password = 'whatever';
      let board_id: string;
      accountService.login(email, password).then(() => {
        service.createBoard(board.title).then(createdBoard => {
          expect(createdBoard).toBeTruthy();
          expect(createdBoard.board_id).toBeTruthy();
          // expect(createdBoard.owner_id).toEqual(board.owner_id);
          expect(createdBoard.title).toEqual(board.title);

          // Now delete the board
          return service.deleteBoard(createdBoard);
        }).then((response: AppResponse) => {
          expect(response.success).toBeTruthy();
          done();
        }).catch(error => {
          console.log(error);
          fail('Error should not occur');
          done();
        });
      });
    })()
  });

  it('should update a board correctly', done => {
    inject([BoardService, AccountService], (service: BoardService, accountService: AccountService) => {
      let board = new Board('owner_id', 'board_id', 'title')
      let email = 'john@example.com';
      let password = 'whatever';
      accountService.login(email, password).then(() => {
        service.createBoard(board.title).then(createdBoard => {
          // Update the id of the board
          board.board_id = createdBoard.board_id;
          // Update the owner id of the board
          board.owner_id = accountService.getCurrentUserID();
          // Change the title of the board
          board.title = 'CHANGED TITLE';
          // Now update the board
          return service.updateBoard(board);
        }).then((updatedBoard: Board) => {
          expect(updatedBoard).toBeTruthy();
          expect(updatedBoard.title).toBe(board.title);

          // Now delete the board
          return service.deleteBoard(updatedBoard);
        }).then(() => {
          // Complete
          done()
        }).catch(error => {
          console.log(error);
          fail('Error should not occur');
          done();
        });
      });
    })();
  });

  it('should get all boards for a user', done => {
    inject([BoardService], (service: BoardService) => {
      let user_id = '1693158545179';
      service.getAllBoards(user_id).then(boards => {
        expect(boards).toBeTruthy();
        done();
      }).catch(error => {
        console.log(error);
        fail('Error should not occur');
        done();
      });
    })();
  });
});
