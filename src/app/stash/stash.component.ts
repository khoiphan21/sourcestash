import { Component, OnInit, Input } from '@angular/core';
import { Stash } from '../classes/stash';
import { StashService } from '../stash.service';
import { SourceService } from '../source.service';
import { Source } from '../classes/source';

@Component({
  selector: 'app-stash',
  templateUrl: './stash.component.html',
  styleUrls: ['./stash.component.scss']
})
export class StashComponent implements OnInit {
  @Input()
  stash: Stash;

  sources: Source[];
  
  stashes: Stash;
  constructor(
    private stashService: StashService,
    private sourceService: SourceService
  ) { }

  ngOnInit() {
    this.stashService.getStashInformation('stash').then(stash => {
      this.stashes = stash;
    }).then(() => {
      this.sourceService.getSourcesForStash(this.stash.stash_id).then(sources => {
        this.sources = sources;
      });
    });
  }
}
