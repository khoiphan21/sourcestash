import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Board } from '../classes/board';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input()
  board: Board;

  @Output() onUpdate = new EventEmitter<boolean>();

  isEditShown: boolean = false;
  isEditIconShown: boolean = true;

  constructor(
    private boardService: BoardService
  ) { }

  ngOnInit() {
  }

  editMode(mode: string) {
    console.log('hi');
    if (mode == 'on') {
      this.isEditShown = true;
      this.isEditIconShown = false;
    }
    if (mode == 'off') {
      this.isEditShown = false;
      this.isEditIconShown = true;
    }
  }

  deleteBoard() {
    this.boardService.deleteBoard(this.board).then(response => {
      if (response.success) {
        this.onUpdate.emit();
      } else {
        alert('Failed to delete board');
      }
    }).catch(error => {
      console.log(error);
      alert('Failed to delete board');
    })
  }
}
