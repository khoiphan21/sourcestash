import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { Component } from '@angular/core';
import { Board } from '../classes/board';
import { BoardService } from '../board.service';
import { GoogleApiService } from '../google-api.service';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

describe('BoardComponent', () => {
  let component: BoardWrapperComponent;
  let fixture: ComponentFixture<BoardWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoardComponent
      ],
      providers: [
        BoardService,
        { provide: GoogleApiService, useValue: { initialize: jasmine.createSpy('initialize') } },
        AccountService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ],
      imports: [
        HttpModule, BrowserModule, FormsModule
      ]
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
