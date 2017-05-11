import { Component, OnInit, Input } from '@angular/core';
import { Source } from '../classes/source';

@Component({
  selector: 'app-viewsource',
  templateUrl: './viewsource.component.html',
  styleUrls: ['./viewsource.component.scss']
})
export class ViewsourceComponent implements OnInit {
  @Input()
  source: Source;

  constructor() { }

  ngOnInit() {
  }

}
