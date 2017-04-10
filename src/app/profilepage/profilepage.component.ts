import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../classes/account';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.scss']
})
export class ProfilepageComponent implements OnInit {
  userAccount: Account;
  currentSection: string;

  changeTab(name: string) {
    this.currentSection = name;
    console.log(this.currentSection === 'Favourite');

  }

  constructor(private accountService: AccountService) {
    // this.currentSection = 'Stashes';
  }

  ngOnInit() {
    this.accountService.getUserInformation('user').then(account => {
      this.userAccount = account;
    });

  }

}
