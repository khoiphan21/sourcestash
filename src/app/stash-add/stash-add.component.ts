import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StashService } from '../stash.service';
import { Stash } from '../classes/stash';

@Component({
  selector: 'app-stash-add',
  templateUrl: './stash-add.component.html',
  styleUrls: ['./stash-add.component.scss']
})
export class StashAddComponent implements OnInit {
  stashTitle: string;
  stashDescription: string;

  @Output() onClose = new EventEmitter<boolean>();
  @Output() onCreated = new EventEmitter<boolean>(); // When a stash is created

  constructor(
    private stashService: StashService
  ) { }

  ngOnInit() {
  }

  closePopup() {
    this.onClose.emit();
  }

  addStash() {
    // Make call to API for adding a stash
    console.log(this.stashTitle, this.stashDescription);
    this.stashService.createStash(new Stash(this.stashTitle, this.stashDescription))
      .subscribe(response => {
        // Emit event to tell parent to reload the stashes
        this.onCreated.emit();
      }, error => {
        alert('Error trying to create a stash. View Log for more details.');
        console.log(error);
      });

    // Close the popup
    this.closePopup();
  }

}
