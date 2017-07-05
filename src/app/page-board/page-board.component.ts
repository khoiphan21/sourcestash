import { Component, OnInit, Output, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Draggable from 'draggable';
import { element } from 'protractor';
import { CardService } from '../card.service';
import { Card } from '../classes/card';
import { AccountService } from '../account.service';
import { Board } from '../classes/board';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-page-board',
  templateUrl: './page-board.component.html',
  styleUrls: ['./page-board.component.scss']
})
export class PageBoardComponent implements OnInit {

  // variable to control tab
  isCreateShown: boolean = true;
  isFormShown: boolean = false;

  // model of the board
  cards: Card[];
  board_id: string;
  title: string;

  // Details of the board
  board: Board;
  owner: Account;
  
  // Properties of the new source
  private card = {
    board_id: '',
    title: '',
    x_location: 100,
    y_location: 100,
  }

  constructor(
    private boardService: BoardService,
    private cardService: CardService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // for testing purpose
    this.route.params.map(params => {
      this.board_id = params['boardid'];
      // Refresh everything
      this.getTitle();
      this.refreshCard();
    }).subscribe();
  }

  switchTo(page: string) {
    if (page == 'form') {
      this.isCreateShown = false;
      this.isFormShown = true;
    } else if (page == 'create') {
      this.isCreateShown = true;
      this.isFormShown = false;
    }
  }

  addCard() {
    let isInputValid: boolean = true;

    // Check if inputs are valid
    if (isInputValid) {
      // Make a request to the server
      this.cardService.addNewCard(
        this.board_id,
        this.card.title,
        this.card.x_location,
        this.card.y_location,
      ).then(() => {
        // Update the board
        this.refreshCard();
      })
    } else {
      alert('Inputs not valid!');
    }
  }

  /**
   * Call the server to reload all the cards
   */
  refreshCard() {
    this.cardService.getCardForBoard(this.board_id).then(cards => {
      // Retrieve the card for the board
      this.cards = cards;
      // this.changeDetector.detectChanges();
    });
  }

  getTitle(){
    this.boardService.getBoardTitle(this.board_id).then((title: string) => {
      this.title = title;
    console.log(this.title);
    });
  }
  
  /**
   * Call the server to retrieve the newest information about the board
   */
  // refreshBoard() {
  //   this.boardService.getBoard(this.board_id).then((board: Board) => {
  //     this.board = board;
  //     // Retrieve the details of the owner of the board
  //     return this.accountService.getUserInformation(board.owner_id);
  //   }).then(owner => {
  //     this.owner = owner;
  //   }).catch(error => {
  //     console.log(error);
  //   });
  // }
}
