import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-welcome',
  templateUrl: './page-welcome.component.html',
  styleUrls: ['./page-welcome.component.scss']
})
export class PageWelcomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        let element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView();
        }
      }
    })
  }

  goTo(anchor: string) {
    // TODO - HACK: remove click once https://github.com/angular/angular/issues/6595 is fixed  
    (<HTMLScriptElement>document.querySelector('#' + anchor)).scrollIntoView();
  }

}
