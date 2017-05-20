import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Account } from '../classes/account';
import { AccountService } from '../account.service';
import { AppResponse } from '../classes/response';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {

  account: Account;

  constructor(
    private service: AccountService,
    private router: Router
  ) {
    // Have to create this empty account object first, otherwise you won't
    // see anything, since "account.email" will be referencing 'null'
    this.account = new Account('', '');
  }

  ngOnInit() {
    if (this.service.checkLoginStatus()) {
      // The user is logged in. Navigate to "home"
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.service.login(this.account.email, this.account.password).then(
      (result: AppResponse) => {
        if (result.success) {
          this.router.navigate(['/home']);
        }
      }, error => {
        alert('Login failed: ' + error);
      }
    )
  }

  loginGoogle() {
    this.service.loginWithGoogle().then((response: AppResponse) => {
      if (response.success) {
        this.router.navigate(['/home']);
      } else {
        alert('Login failed');
      }
    })
  }

  /**
   * Sign up for an account. 
   */
  signup() {

  }

}
