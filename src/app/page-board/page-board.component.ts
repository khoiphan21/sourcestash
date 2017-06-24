import { Component, OnInit } from '@angular/core';

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
