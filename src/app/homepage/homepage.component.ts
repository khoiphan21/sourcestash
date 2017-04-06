import { Component, OnInit } from '@angular/core';
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

  constructor(
    private stashService: StashService,
    private accountService: AccountService) {

    }

  ngOnInit() {
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
