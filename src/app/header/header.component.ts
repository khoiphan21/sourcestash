import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isDropdown: boolean = false;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.accountService.logout();
  }

  toggleDropdown(){
    console.log(this.isDropdown);
    // how to use the ? again 
    if (this.isDropdown = false){
      this.isDropdown = true;
    } else if (this.isDropdown = true) {
      this.isDropdown = false;
    }
  }
}
