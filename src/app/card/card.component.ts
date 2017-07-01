import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../classes/card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  card: Card;
  @Input()
  boardID: string;
  // For model
  cardTitle: string;

  isCreateShown: boolean = true;
  isEditShown: boolean = true;
  isFormShown: boolean = false;

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit() {
  }

  // addCard(){
  //   // Make call to API for adding a board
  //   this.cardService.addNewCard(,this.cardTitle, 0, 0)
  // }

  switchTo(page: string) {
    if (page == 'form') {
      this.isCreateShown = false;
      this.isEditShown = false;
      this.isFormShown = true;
    } else if (page == 'create') {
      this.isCreateShown = true;
      this.isEditShown = true;
      this.isFormShown = false;
    }
  }

}
