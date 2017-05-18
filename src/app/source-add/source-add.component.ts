import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as _ from 'underscore';

import { Source } from '../classes/source';
import { SourceService } from '../source.service';

@Component({
  selector: 'app-source-add',
  templateUrl: './source-add.component.html',
  styleUrls: ['./source-add.component.scss']
})
export class SourceAddComponent implements OnInit {
// Properties of the new source
  private source = {
    parent_id: '',
    stash_id: '',
    author_id: '',
    title: '',
    xPosition: 100,
    yPosition: 100,
    type: 'source', // only sources are able to be added for now
    hyperlink: '',
    description: '',
    difficulty: '',
    tags: []
  }

  // Model for the tags input
  tagString: string;

  // The parent source that the new source will be attached to
  @Input() parentSource: Source;

  @Output() onClose = new EventEmitter<boolean>();

  constructor(
    private sourceService: SourceService
  ) { }

  ngOnInit() {
  }

  closePopup() {
    this.onClose.emit();
  }

  addSource() {
    let isInputValid: boolean = true;
    // Store the parent source's id and author id
    this.source.parent_id = this.parentSource.source_id;
    this.source.stash_id = this.parentSource.stash_id;
    this.source.author_id = this.parentSource.author_id;

    // Process the tag string
    this.source.tags = this.processTagString(this.tagString);
    if (this.source.tags == null) isInputValid = false;

    console.log(this.source);

    // Check if inputs are valid
    if (isInputValid) {
      // Make a request to the server
      this.sourceService.addNewSource(
        this.source.parent_id,
        this.source.stash_id,
        this.source.author_id,
        this.source.title,
        this.source.xPosition,
        this.source.yPosition,
        this.source.type,
        this.source.hyperlink,
        this.source.description,
        this.source.difficulty,
        this.source.tags
      )
    } else {
      alert('Inputs not valid!');
    }

    this.closePopup();
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
