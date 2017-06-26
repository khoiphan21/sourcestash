import { Component, OnInit } from '@angular/core';
import * as Draggable from 'draggable';
import { element } from 'protractor';

@Component({
  selector: 'app-page-board',
  templateUrl: './page-board.component.html',
  styleUrls: ['./page-board.component.scss']
})
export class PageBoardComponent implements OnInit {

  isCreateShown: boolean = true;
  isFormShown: boolean = false;

  constructor() { }

  ngOnInit() {
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
}
