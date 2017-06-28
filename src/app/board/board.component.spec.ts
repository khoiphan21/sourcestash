import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { Component } from '@angular/core';
import { Board } from '../classes/board';

describe('BoardComponent', () => {
  let component: BoardWrapperComponent;
  let fixture: ComponentFixture<BoardWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'stash-wrapper',
  template: '<app-board [board]="board"></app-board>'
})
class BoardWrapperComponent {
  board: Board = new Board('owner_id', 'board_id','title');
}
