import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private router: Router,
    private changeDetector: ChangeDetectorRef 
  ) {
  }

  ngOnInit() {
    if (!this.accountService.checkLoginStatus()) {
      console.log('should navigate to login')
      this.router.navigate(['/login']);
    } else {
      console.log('user already logged in');
      this.reloadStashes();
    }
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
      if (sharedStashes.length != 0) {
        this.sharedStashes = sharedStashes;
      }
      // reload the view
      console.log('should detect changes')
      this.changeDetector.detectChanges();
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
