import { Component, OnInit } from '@angular/core';
import { Account } from '../classes/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  account: Account[];

  addEmail(value){
    // if (value!=='') {
    //   this.account.push ({
    //     email: value,
    //     password: '1234'
    //   });
    // }
  }

  constructor() { 
  }
  
  ngOnInit() {
  }

}
