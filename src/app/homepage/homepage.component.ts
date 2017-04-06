import { Component, OnInit } from '@angular/core';
import { Stash } from '../classes/stash';
import { ANGULAR2 } from '../data/mockStash';
import { StashService } from '../stash.service';
import { AccountService } from '../account.service';
import { Account } from '../classes/account';
import { JOHN } from '../data/mockAccount';
import { AppResponse } from '../classes/response';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  stashes: Stash[];

  constructor(
    private stashService: StashService,
    private accountService: AccountService) {
  }

  ngOnInit() {
    this.stashes = ANGULAR2;
    this.accountService.testGetUserInfo('1').then(account => {
      console.log(account);
    })


    // TESTING FOR CHECKING EMAIL AVAILABILITY
    this.accountService.checkEmail('john@example.com').subscribe(
      (response: AppResponse) => {
        alert(response.message);
      }, error => {
        console.log(error);
      }
    )

    // TESTING FOR ACCOUNT CREATION
    // this.accountService.createAccount(JOHN).subscribe( response => {
    //   console.log(response.message);
    // }, error => {
    //   console.log(error);
    // });
  }

}
