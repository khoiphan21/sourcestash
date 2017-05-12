import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

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

  // Variables to control modal items display
  isModalShown: boolean = false;
  isAddStashShown: boolean = false;

  constructor(
    private stashService: StashService,
    private accountService: AccountService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.stashService.getAllStashes().subscribe(stashes => {
      this.stashes = stashes;
    });

  }

  onSignIn(user) {
    let profile = user.getBasicProfile();
    console.log('User profile is: ' + profile.getId());
  }

  navigateToStash(stash_id: string) {
    this.router.navigate(['/stashpage', stash_id]);
  }

  reloadStashes() {
    this.stashService.getAllStashes().subscribe(stashes => {
      this.stashes = stashes;
    });
  }

  /**
   * ALL MODAL FUNCTIONS GO HERE
   */
  hideModal() {
    this.isModalShown = false;
    this.hideAllModals();
  }
  showModal(modalType: string) {
    this.isModalShown = true;
    this.hideAllModals();
    // Then selectively show the modals
    if (modalType == 'addStash') {
      this.isAddStashShown = true;
    } 
  }
  hideAllModals() {
    this.isAddStashShown = false;
  }
}
