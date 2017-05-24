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

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.isUserLoggedIn = this.accountService.checkLoginStatus();
    if(this.isUserLoggedIn = true){
      this.currentAccount = this.accountService.getCurrentUser();
      // console.log('yes');
      // console.log(this.currentAccount.firstName);
    }
  }

  logout() {
    this.accountService.logout();
  }

  toggleProfileDropdown(){
    this.isProfileDropdown = this.isProfileDropdown ? false : true;
  }

  // toggleDropdown(){
  //   this.isDropdown = this.isDropdown ? false : true;
  //   if (this.isDropdown = true){
  //     this.isModalShown = true;
  //   } else{
  //     this.isModalShown = false;
  //   }
  // }

  hideModal() {
    this.isModalShown = false;
    this.hideAllModals();
  }

  hideAllModals(){
    this.isModalShown = false;
    this.isDropdown = false;
  }
}
