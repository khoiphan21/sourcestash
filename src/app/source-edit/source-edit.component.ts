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
  // The parent source that the new source will be attached to
  @Input() source: Source;
  
  // Model for the form
  title: string;
  hyperlink: string;
  difficulty: string;
  tagString: string = "";
  description: string;

  @Output() onClose = new EventEmitter<boolean>();
  @Output() onUpdate = new EventEmitter<boolean>();

  constructor(
    private sourceService: SourceService
  ) { }

  ngOnInit() {
    // Setup the model of the form
    this.title = this.source.title.toString();
    this.hyperlink = this.source.hyperlink.toString();
    this.difficulty = this.source.difficulty.toString();
    this.description = this.source.description.toString();
    
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

  updateSource() {
    // Transfer the values from the form model to the main model
    this.source.title = this.title;
    this.source.hyperlink = this.hyperlink;
    this.source.difficulty = this.difficulty;
    this.source.description = this.description;
    // Process the tagstring to an array
    this.source.tags = this.processTagString(this.tagString);
    
    this.sourceService.updateSource(this.source).then((response: AppResponse) => {
      if (response.success) {
        // this.onUpdate.emit();
      } else {
        alert('Failed to update source!');
      }
      this.closePopup();
    });
  }

  deleteSource() {
    this.sourceService.deleteSource(this.source.source_id).then(response => {
      if (response.success) {
        this.onUpdate.emit();
        this.closePopup();
      } else {
        alert('Failed to delete source');
      }
    }).catch (error => {
      console.log(error);
      alert('Failed to delete source');
    })
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
