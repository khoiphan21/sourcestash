import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Board } from '../classes/board';
import { BoardService } from '../board.service';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.scss']
})
export class PageDashboardComponent implements OnInit {
  // Models for the UI
  boards: Board[] = null;
  sharedBoards: Board[];
  user_id: string;
  boardTitle: string;

  // Variables to control modal items display
  isModalShown: boolean = false;
  isAddBoardShown: boolean = false;
  isCreateShown: boolean = true;
  isFormShown: boolean = false;

  constructor(
    private boardService: BoardService,
    private accountService: AccountService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (!this.accountService.checkLoginStatus()){
      console.log('shuld navigate to login')
      this.router.navigate(['/login']);
    } else {
      console.log('user already logged in');
      this.user_id = this.accountService.getCurrentUserID();
      this.reloadBoard(this.user_id);
    }
  }
  
  navigateToBoard(board_id: string){
    this.router.navigate(['/boardpage', board_id]);
  }

  reloadBoard(user_id: string){
    this.boardService.getAllBoards(user_id).then((boards: Board[]) => {
      this.boards = boards;

      return this.boardService.getAllBoards(user_id);
    })
    /** no collaborators for now */
    // .then(sharedboards => {
    //   if (sharedboards.length != 0) {
    //     this.sharedBoards = sharedboards;
    //   }
    //   // reload the view
    //   console.log('should detect changes')
    //   this.changeDetector.detectChanges();
    // })
    .catch(error => {
      alert('error received');
      console.log(error);
    });
  }

  switchPage(name: string){
    if (name == 'form') {
      this.isFormShown = true;
      this.isCreateShown = false;
    } else if (name == 'create') {
      this.isCreateShown = true;
      this.isFormShown = false;
    }
  }
  
  addBoard(){
    // Make call to API for adding a board
    this.boardService.createBoard(this.boardTitle).then(response => {
      this.reloadBoard(this.user_id);
    }).catch(error => {
      alert('Error trying to create a board. View Log for more details');
      console.log(error);
    });
  }


  /**
   * ALL MODAL FUNCTIONS GO HERE
   */
  hideModal() {
    this.isModalShown = false;
    this.hideAllModals();
  }
  showModal(modalType: string) {
    this.isModalShown = true;
    this.hideAllModals();
    // Then selectively show the modals
    if (modalType == 'addBoard') {
      this.isAddBoardShown = true;
    }
  }
  hideAllModals() {
    this.isAddBoardShown = false;
  }

}
