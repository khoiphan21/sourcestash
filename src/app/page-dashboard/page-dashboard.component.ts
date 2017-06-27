import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.scss']
})
export class PageDashboardComponent implements OnInit {

  // Variables to control modal items display
  isModalShown: boolean = false;
  isAddBoardShown: boolean = false;
  isCreateShown: boolean = true;
  isFormShown: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  switchPage(name: string){
    if (name == 'form') {
      this.isFormShown = true;
      this.isCreateShown = false;
    } else if (name == 'create') {
      this.isCreateShown = true;
      this.isFormShown = false;
    }
  }
  

  /**
   * ALL MODAL FUNCTIONS GO HERE
   */
  hideModal() {
    this.isModalShown = false;
    this.hideAllModals();
  }
  showModal(modalType: string) {
    this.isModalShown = true;
    this.hideAllModals();
    // Then selectively show the modals
    if (modalType == 'addBoard') {
      this.isAddBoardShown = true;
    }
  }
  hideAllModals() {
    this.isAddBoardShown = false;
  }

}
