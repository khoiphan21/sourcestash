import { Component, OnInit, Input } from '@angular/core';
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
  
  constructor(
    private boardService: BoardService
  ) { }

  ngOnInit() {
  }

}
