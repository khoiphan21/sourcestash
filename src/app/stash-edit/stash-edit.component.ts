import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { StashService } from '../stash.service';
import { Stash } from '../classes/stash';

@Component({
  selector: 'app-stash-edit',
  templateUrl: './stash-edit.component.html',
  styleUrls: ['./stash-edit.component.scss']
})
export class StashEditComponent implements OnInit {
  stashTitle: string;
  stashDescription: string;

  // The model for this stash
  @Input()
  stash: Stash;


  @Output() onClose = new EventEmitter<boolean>();
  @Output() onUpdated = new EventEmitter<boolean>(); // When a stash is created

  constructor(
    private stashService: StashService
  ) { }

  ngOnInit() {
  }

  closePopup() {
    this.onClose.emit();
  }

  editStash() {
    // Make call to API for updating a stash

    
    // // Make call to API for adding a stash
    // console.log(this.stashTitle, this.stashDescription);
    // this.stashService.createStash(new Stash(this.stashTitle, this.stashDescription))
    //   .subscribe(response => {
    //     console.log('successfully created a stash')
    //     // Emit event to tell parent to reload the stashes
    //     this.onCreated.emit();
    //   }, error => {
    //     alert('Error trying to create a stash. View Log for more details.');
    //     console.log(error);
    //   });

    // Close the popup
    this.closePopup();
  }
}
