import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { StashService } from '../stash.service';
import { Stash } from '../classes/stash';
import { Account } from '../classes/account';
import { CollaboratorService } from '../collaborator.service';
import { AccountService } from '../account.service';

import * as _ from 'underscore';

@Component({
  selector: 'app-stash-edit',
  templateUrl: './stash-edit.component.html',
  styleUrls: ['./stash-edit.component.scss']
})
export class StashEditComponent implements OnInit {
  // The model for this stash
  @Input()
  stash: Stash;
  // The list of collaborators
  @Input()
  collaborators: Account[];

  // Model for the collaborator string
  collaboratorEmail: string;

  @Output() onClose = new EventEmitter<boolean>();
  @Output() onUpdated = new EventEmitter<boolean>(); // When a stash is created

  constructor(
    private stashService: StashService,
    private accountService: AccountService,
    private collaboratorService: CollaboratorService
  ) { }

  ngOnInit() {
  }

  closePopup() {
    this.onClose.emit();
  }

  announceUpdate() {
    this.onUpdated.emit(true);
  }

  editStash() {
    // Make call to API for updating a stash
    this.stashService.updateStash(this.stash).then(response => {
      if (response.success) {
        this.announceUpdate();
      } else {
        alert('Failed to update stash.');
      }
    });

    // Close the popup
    this.closePopup();
  }

  addCollaborator() {
    this.accountService.getUserID(this.collaboratorEmail).then(user_id => {
      let collaboratorIdDictionary = {};

      // now add all the existing user_ids into the collaborators array
      _.each(this.collaborators, (account: Account) => {
        collaboratorIdDictionary[account.user_id] = true;
      });

      // Check if this user already is a collaborator
      if (collaboratorIdDictionary[user_id] == true) {
        alert('This user is already a collaborator!');
      } else {
        collaboratorIdDictionary[user_id] = true;

        let collaboratorIds = _.allKeys(collaboratorIdDictionary);

        // Make call to API to update the list of collaborators
        this.collaboratorService.updateCollaboratorList(
          this.stash.stash_id, collaboratorIds
        ).then(response => {
          if (response.success) {
            this.accountService.getUserInformation(user_id).then(userAccount => {
              this.collaborators.push(userAccount);
            })
            this.closePopup();
            this.announceUpdate();
          } else {
            console.log(response.error);
            alert('Unable to add collaborator!');
          }
        }).catch(error => {
          console.log(error);
          alert('Unknown error received.');
        })
      }
    }).catch(error => {
      alert('This user is not yet registered.');
    })
  }

  removeCollaborator(collaborator: Account) {
    this.collaboratorService.removeCollaborator(
      this.stash.stash_id, collaborator.user_id
    ).then(response => {
      this.closePopup();
      this.announceUpdate();
    })
  }
}
