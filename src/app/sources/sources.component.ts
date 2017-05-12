import { Component, OnInit, Input } from '@angular/core';
import { Source } from '../classes/source';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {
  @Input()
  source: Source;

  constructor() { }

  ngOnInit() {
  }

}
