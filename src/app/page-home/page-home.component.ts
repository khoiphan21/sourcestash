import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import * as _ from 'underscore';

import { Stash } from '../classes/stash';
import { ANGULAR2 } from '../data/mockStash';
import { StashService } from '../stash.service';
import { AccountService } from '../account.service';
import { Account } from '../classes/account';
import { JOHN } from '../data/mockAccount';
import { AppResponse } from '../classes/response';
import { CollaboratorService } from '../collaborator.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
  // Models for the UI
  stashes: Stash[] = null;
  sharedStashes: Stash[];

  // Variables to control modal items display
  isModalShown: boolean = false;
  isAddStashShown: boolean = false;
  isMenuShown: boolean = false;

  constructor(
    private stashService: StashService,
    private accountService: AccountService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.reloadStashes();
  }

  onSignIn(user) {
    let profile = user.getBasicProfile();
  }

  navigateToStash(stash_id: string) {
    this.router.navigate(['/stashpage', stash_id]);
  }

  reloadStashes() {
    this.stashService.getAllStashes().then((stashes: Stash[]) => {
      this.stashes = stashes;

      return this.stashService.getAllSharedStashes();
    }).then(sharedStashes => {
      this.sharedStashes = sharedStashes;
    }).catch(error => {
      alert('error received');
      console.log(error);
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
    console.log('showing modal: ' + modalType)
    this.isModalShown = true;
    this.hideAllModals();
    // Then selectively show the modals
    if (modalType == 'addStash') {
      this.isAddStashShown = true;
    } else if (modalType == 'clickMenu') {
      this.isMenuShown = true;
    }
  }
  hideAllModals() {
    this.isAddStashShown = false;
    this.isMenuShown = false;
  }
}
