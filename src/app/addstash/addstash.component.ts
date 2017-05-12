import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StashService } from '../stash.service';

@Component({
  selector: 'app-addstash',
  templateUrl: './addstash.component.html',
  styleUrls: ['./addstash.component.scss']
})
export class AddstashComponent implements OnInit {
  stashTitle: string;
  stashDescription: string;


  @Output() onClose = new EventEmitter<boolean>();

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

    // Close the popup
    this.closePopup();
  }

}
