import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../classes/account';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isDropdown: boolean = false;
  isModalShown: boolean = false;
  isProfileDropdown: boolean = false;
  isUserLoggedIn: boolean;
  currentAccount: Account;

  // for the current active link
  isMyStashes: boolean = true;
  isLogin: boolean = false;
  isContactUs: boolean = false;


  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.isUserLoggedIn = this.accountService.checkLoginStatus();
    if (this.isUserLoggedIn == true) {
      this.currentAccount = this.accountService.getCurrentUser();
    }
  }

  logout() {
    this.accountService.logout();
  }

  toggleProfileDropdown() {
    this.isProfileDropdown = this.isProfileDropdown ? false : true;
  }

  hideModal() {
    this.isModalShown = false;
    this.hideAllModals();
  }

  hideAllModals() {
    this.isModalShown = false;
    this.isDropdown = false;
  }

  activeTab(tabName: string) {
    if (tabName == "contactUs") {
      console.log('contact');
      this.isMyStashes = false;
      this.isLogin = false;
      this.isContactUs = true;
    } else if (tabName == "login") {
      console.log('login');
      this.isMyStashes = false;
      this.isLogin = true;
      this.isContactUs = false;
    } else if (tabName == "myStash") {
      console.log('stash');
      this.isMyStashes = false;
      this.isLogin = true;
      this.isContactUs = false;
    }
  }
}
