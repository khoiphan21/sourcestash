import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'underscore';

import { Source } from '../classes/source';
import { SourceService } from '../source.service';
import { AppResponse } from '../classes/response';

@Component({
  selector: 'app-source-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.scss']
})
export class SourceEditComponent implements OnInit {
  // Model for the tags input
  tagString: string = "";

  // The parent source that the new source will be attached to
  @Input() source: Source;

  @Output() onClose = new EventEmitter<boolean>();
  @Output() onUpdate = new EventEmitter<boolean>();

  constructor(
    private sourceService: SourceService
  ) { }

  ngOnInit() {
    // if (this.source.tags != null) {
    //   // update the tagstring
    //   _.each(this.source.tags, tag => {
    //     this.tagString += `${tag}, `
    //   })
    // }
  }

  closePopup() {
    this.onClose.emit();
  }

  updateSource() {
    this.sourceService.updateSource(this.source).then((response: AppResponse) => {
      if (response.success) {
        this.onUpdate.emit();
      } else {
        alert('Failed to update source!');
      }
      this.closePopup();
    });
  }

  processTagString(tagString: string): string[] {
    let tags: string[] = [];

    let rawTags: string[] = tagString.split(',');
    _.each(rawTags, (tag: string) => {
      tags.push(tag.trim());
    })

    return tags;
  }

}
