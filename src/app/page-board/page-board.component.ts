import { Component, OnInit, Output, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Draggable from 'draggable';
import { element } from 'protractor';
import { CardService } from '../card.service';
import { Card } from '../classes/card';
import { AccountService } from '../account.service';
import { Board } from '../classes/board';

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
    private cardService: CardService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // for testing purpose
    this.route.params.map(params => {
      this.board_id = params['boardid'];

      // Refresh everything
      this.refresh();
    }).subscribe();
    // let element: HTMLCollectionOf<Element> = document.getElementsByClassName('card');
    // let options = {
    //   grid: 10,
    //   setCursor: true,
    //   onDrag:
    // };
    // new Draggable(element, options);
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
        this.card.board_id,
        this.card.title,
        this.card.x_location,
        this.card.y_location,
      ).then(() => {
        // Emit to update the board
        // maybe i dont need to emit ? update straight ?
        // this.onUpdate.emit();
        this.cardService.getCardForBoard(this.board_id)
      })
    } else {
      alert('Inputs not valid!');
    }
  }

  refresh() {
    // Refresh the sources
    this.refreshCard();
    // Retrieve the information of the board from the server
    // this.refreshBoard();
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
