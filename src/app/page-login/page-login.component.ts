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
  isGoogleApiReady: boolean;

  constructor(
    private service: AccountService,
    private router: Router
  ) {
    this.isGoogleApiReady = false;
  }

  ngOnInit() {
    if (this.service.checkLoginStatus()) {
      // The user is logged in. Navigate to "home"
      this.router.navigate(['/home']);
    } else {
      // Check if the google api service is ready
      this.service.checkGoogleAPI().then(googleApiStatus => {
        if (googleApiStatus) {
          this.isGoogleApiReady = true;
        }
      }).catch(error => {
        console.log(error);
        alert('Error trying to connect to Google for login.');
      })
    }
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
}
