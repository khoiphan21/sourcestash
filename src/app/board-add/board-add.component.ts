import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board-add',
  templateUrl: './board-add.component.html',
  styleUrls: ['./board-add.component.scss']
})
export class BoardAddComponent implements OnInit {

  @Output() onClose = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  closePopup() {
    this.onClose.emit();
  }
}
