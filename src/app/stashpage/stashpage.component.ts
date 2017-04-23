import { Component, OnInit, AfterContentChecked } from '@angular/core';
import * as Draggable from 'draggable';
import { Source } from '../classes/source';
import { SourceService } from '../source.service';
import * as _ from 'underscore';



@Component({
  selector: 'app-stashpage',
  templateUrl: './stashpage.component.html',
  styleUrls: ['./stashpage.component.scss']
})
export class StashpageComponent implements OnInit, AfterContentChecked {
  sources: Source[];

  renderedElements: any;

  constructor(
    private sourceService: SourceService
  ) { }

  ngOnInit() {
    this.sourceService.getSourcesForStash('test').then(
      sources => this.sources = sources
    )
  }

  ngAfterContentChecked() {
    if (!this.renderedElements) {
      let elements = document.getElementsByClassName('source');

      if (elements.length != 0) {
        this.renderedElements = elements;
        console.log(elements);
        let options = {
          grid: 10,
          onDrag: (element, xAbsolute, yAbsolute, event) => {
            let elementId = element.id;

            _.each(this.sources, source => {
              if (source.id == elementId) {
                this.sourceService.updateSourcePosition(elementId, xAbsolute, yAbsolute, elements);
              }
            })
          }
        }

        // Change the position of the root source first
        let rootSource = this.findRootSource(this.sources);

        let rootElement = this.findMatchingElement(rootSource, elements);
        // Update the class of the root element
        rootElement.classList.add('root');

        // Now update all sources to draggables
        for (var i = 0; i < elements.length; i++) {
          let draggable = new Draggable(elements[i], options);
          // Check to see which source matches this element
          _.each(this.sources, source => {
            if (source.id == elements[i].id) {
              // Find the relative position stored
              let storedX = source.xPosition;
              let storedY = source.yPosition;

              // Find the parent source and get its x, y positions
              let parentX: number;
              let parentY: number;
              if (source.parent_id != null) {
                // Must not be a root source, retrieve the parent element
                let parentSource: Source = this.findSource(source.parent_id, this.sources);
                let parentElement: Element = this.findMatchingElement(parentSource, elements);
                let rect = parentElement.getBoundingClientRect()
                parentX = rect.left;
                parentY = rect.top;
              }

              // Update final positions
              let finalX = parentX + storedX;
              let finalY = parentY + storedY;

              // Update the position
              draggable.set(finalX, finalY);
            }
          })

        }
      }
    }
  }
  
  // drawCanvas(){
  //   let canvas = document.getElementById('canvas');
  //   let ctx = canvas.getContext('2d');

  //   ctx.beginPath();
  //   ctx.moveTo(75, 50);
  //   ctx.lineTo(100, 75);
  //   ctx.lineTo(100, 25);
  //   ctx.fill();
  // }

  // HELPER FUNCTIONS
  findMatchingSource(element: Element, sources: Source[]): Source {
    // Check to see which source matches this element
    _.each(sources, (source: Source) => {
      if (source.id == element.id) {
        return source;
      }
    })
    return null;
  };
  findMatchingElement(source: Source, elements: HTMLCollectionOf<Element>): Element {
    for (var i = 0; i < elements.length; i++) {
      if (source.id == elements[i].id) {
        return elements[i];
      }
    }
    return null;
  }
  findSource(id: string, sources: Source[]): Source {
    let returnSource: Source = null;

    _.each(sources, source => {
      if (source.id == id) {
        returnSource = source;
      }
    })
    return returnSource;
  }
  findRootSource(sources: Source[]): Source {
    let returnSource: Source = null;
    _.each(this.sources, source => {
      if (source.type == 'root') {
        returnSource = source;
      };
    });
    return returnSource;
  }
}