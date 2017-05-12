import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-addsource',
  templateUrl: './addsource.component.html',
  styleUrls: ['./addsource.component.scss']
})
export class AddsourceComponent implements OnInit {
  
  @Output() onClose = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  closePopup() {
    this.onClose.emit();
  }
}
