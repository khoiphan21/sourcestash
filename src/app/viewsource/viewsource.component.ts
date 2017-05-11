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

  constructor() { }

  ngOnInit() {
  }
  
  closePopup() {
    this.onClose.emit();
  }

}
