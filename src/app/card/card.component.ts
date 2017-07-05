import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../classes/card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Output() onUpdate = new EventEmitter<boolean>();

  @Input()
  card: Card;
  @Input()
  boardID: string;
  // For model
  cardTitle: string;

  isCreateShown: boolean = true;
  isEditIconShown: boolean = true;
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
      this.isFormShown = true;
      this.isEditIconShown = false;
    } else if (page == 'create') {
      this.isCreateShown = true;
      this.isFormShown = false;
      this.isEditIconShown = true;
    }
  }

  editMode(mode: string){
    if (mode == 'on'){
        this.isEditShown = false;
        this.isEditIconShown = false;
    }
    if (mode == 'off'){
        this.isEditShown = true;
        this.isEditIconShown = true;
    }
  }

  deleteCard() {
    this.cardService.deleteCard(this.card.card_id).then(response => {
      if (response.success) {
        this.onUpdate.emit();
      } else {
        alert('Failed to delete source');
      }
    }).catch(error => {
      console.log(error);
      alert('Failed to delete source');
    })
  }
}
