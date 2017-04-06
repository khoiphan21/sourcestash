import { Component, OnInit } from '@angular/core';
import { Account } from '../classes/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  account: Account;

  constructor() { 
  }
  
  ngOnInit() {
    // Have to create this empty account object first, otherwise you won't
    // see anything, since "account.email" will be referencing 'null'
    this.account = new Account('', '');
  }

}
