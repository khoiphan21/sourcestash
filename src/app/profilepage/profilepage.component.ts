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
  public currentSection: string;

  changeTab(name) {
    this.currentSection= name;
  }

  constructor(private accountService: AccountService) {
    this.currentSection = 'Stashes';
  }

  ngOnInit() {
    this.accountService.getUserInformation('user').then(account => {
      this.userAccount = account;
    })
  }

}
