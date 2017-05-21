import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isDropdown: boolean = false;
  isModalShown: boolean = false;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.accountService.logout();
  }

  toggleDropdown(){
    this.isDropdown = this.isDropdown ? false : true;
    if (this.isDropdown = true){
      this.isModalShown = true;
    } else{
      this.isModalShown = false;
    }
  }

  hideModal() {
    this.isModalShown = false;
    this.hideAllModals();
  }

  hideAllModals(){
    this.isModalShown = false;
    this.isDropdown = false;
  }
}
