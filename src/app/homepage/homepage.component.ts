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
  }

}
