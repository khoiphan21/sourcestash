import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-page-welcome',
  templateUrl: './page-welcome.component.html',
  styleUrls: ['./page-welcome.component.scss']
})
export class PageWelcomeComponent implements OnInit {
  private isUserLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        let element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView();
        }
      }
    });
    this.isUserLoggedIn = this.accountService.checkLoginStatus();
  }

  goTo(anchor: string) {
    // TODO - HACK: remove click once https://github.com/angular/angular/issues/6595 is fixed  
    (<HTMLScriptElement>document.querySelector('#' + anchor)).scrollIntoView();
  }

}
