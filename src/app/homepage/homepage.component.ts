import { Component, OnInit } from '@angular/core';
import { StashService } from '../stash.service';
import { AccountService } from '../account.service';

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
    this.accountService.testGetUserInfo('1').then(account => {
      console.log(account);
    })
  }

}
