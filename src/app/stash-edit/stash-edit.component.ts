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
    this.stashService.updateStash(this.stash).then(response => {
      if (!response.success) alert('Failed to update stash.');
    });

    // Close the popup
    this.closePopup();
  }
}
