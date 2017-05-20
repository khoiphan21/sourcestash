import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../classes/account';
import { Stash } from '../classes/stash';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent implements OnInit {
  userAccount: Account;

  stash: Stash;

  isStashesClicked: boolean = false;
  isSettingsClicked: boolean = false;
  isProfileClicked: boolean = true;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.getUserInformation('user').then(account => {
      this.userAccount = account;
    });
  }

  clickTab(tabname: string) {
    if (tabname == 'clickProfile') {
      this.isStashesClicked = false;
      this.isSettingsClicked = false;
      this.isProfileClicked = true;
    } else if (tabname == 'clickStash') {
      this.isStashesClicked = true;
      this.isSettingsClicked = false;
      this.isProfileClicked = false;
    } else if (tabname == 'clickSetting') {
      this.isStashesClicked = false;
      this.isSettingsClicked = true;
      this.isProfileClicked = false;
    } 
  }

}
