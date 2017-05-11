import { Component, OnInit, Input } from '@angular/core';
import { Stash } from '../classes/stash';
import { StashService } from '../stash.service';

@Component({
  selector: 'app-stash',
  templateUrl: './stash.component.html',
  styleUrls: ['./stash.component.scss']
})
export class StashComponent implements OnInit {
  @Input()
  stash: Stash;
  
  stashes: Stash;
  constructor(private stashService: StashService) { }

  ngOnInit() {
    this.stashService.getStashInformation('stash').then(stash => {
      this.stashes = stash;
    })
  }
}
