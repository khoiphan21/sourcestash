import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Source } from '../classes/source';
import { SourceService } from '../source.service';

@Component({
  selector: 'app-addsource',
  templateUrl: './addsource.component.html',
  styleUrls: ['./addsource.component.scss']
})
export class AddsourceComponent implements OnInit {
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
    // Store the parent source's id and author id
    this.source.parent_id = this.parentSource.source_id;
    this.source.stash_id = this.parentSource.stash_id;
    this.source.author_id = this.parentSource.author_id;

    console.log(this.source);

    // Make a request to the server


    this.closePopup();
  }
}
