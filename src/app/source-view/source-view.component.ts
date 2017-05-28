import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Source } from '../classes/source';

import * as _ from 'underscore';

@Component({
  selector: 'app-source-view',
  templateUrl: './source-view.component.html',
  styleUrls: ['./source-view.component.scss']
})
export class SourceViewComponent implements OnInit {
  tagString: string;

  @Input()
  source: Source;

  @Output() onClose = new EventEmitter<boolean>();
  @Output() onAddSource = new EventEmitter<Source>();
  @Output() onEditSource = new EventEmitter<Source>();

  constructor() { }

  ngOnInit() {
    if (this.source.tags != null) {
      // update the tagstring
      _.each(this.source.tags, tag => {
        this.tagString += `${tag}, `
      });

      // Trim the last 2 characters
      this.tagString = this.tagString.slice(0, -2);
    }
  }

  closePopup() {
    this.onClose.emit();
  }

  addSource() {
    this.onAddSource.emit(this.source);
  }

  editSource() {
    this.onEditSource.emit(this.source);
  }
}
