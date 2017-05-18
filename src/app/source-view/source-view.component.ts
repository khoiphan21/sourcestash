import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Source } from '../classes/source';

@Component({
  selector: 'app-source-view',
  templateUrl: './source-view.component.html',
  styleUrls: ['./source-view.component.scss']
})
export class SourceViewComponent implements OnInit {
  @Input()
  source: Source;

  @Output() onClose = new EventEmitter<boolean>();
  @Output() onAddSource = new EventEmitter<Source>();
  @Output() onEditSource = new EventEmitter<Source>();

  constructor() { }

  ngOnInit() {
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
