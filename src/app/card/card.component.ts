import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  isCreateShown: boolean = true;
  isEditShown: boolean = true;
  isFormShown: boolean = false;

  constructor() { }

  ngOnInit() {
  }

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
