import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Source } from '../classes/source';

@Component({
  selector: 'app-viewsource',
  templateUrl: './viewsource.component.html',
  styleUrls: ['./viewsource.component.scss']
})
export class ViewsourceComponent implements OnInit {
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
