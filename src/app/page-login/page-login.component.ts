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
    // var popup_window = window.open('', "myWindow", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=yes, width=400, height=400");
    // try {
    //   popup_window.focus();
    // }
    // catch (e) {
    //   alert("Pop-up Blocker is enabled! Please add this site to your exception list.");
    // }

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
