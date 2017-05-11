import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-addstash',
  templateUrl: './addstash.component.html',
  styleUrls: ['./addstash.component.scss']
})
export class AddstashComponent implements OnInit {

  @Output() onClose = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  closePopup() {
    this.onClose.emit();
  }

}
