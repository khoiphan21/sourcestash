import { Component, OnInit, AfterContentChecked } from '@angular/core';
import * as Draggable from 'draggable';
import { Source } from '../classes/source';

export const SOURCES: Source[] = [
  {
    stash_id: 'abd',
    id: '123',
    title: 'Root Source',
    xPosition: 200,
    yPosition: 200,
  },
  {
    stash_id: 'abcd',
    title: 'Source 1',
    id: '1234',
    xPosition: 200,
    yPosition: 200,
  }
]

@Component({
  selector: 'app-stashpage',
  templateUrl: './stashpage.component.html',
  styleUrls: ['./stashpage.component.scss']
})
export class StashpageComponent implements OnInit, AfterContentChecked {
  sources: Source[];

  renderedElements: any;

  constructor() {
    this.sources = SOURCES;
  }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    if (!this.renderedElements) {
      let elements = document.getElementsByClassName('source');

      if (elements.length != 0) {
        this.renderedElements = elements;
        console.log(elements);
        let options = {
          grid: 10,
          onDrag: (element, x, y, event) => {
            console.log("dragged");
            console.log("x, y: " + x + ", " + y);
          }
        }

        for (var i = 0; i < elements.length; i++) {
          new Draggable(elements[i], options);
        }
      }
    }



    // new Draggable(document.getElementById('123'), options);

  }

}
