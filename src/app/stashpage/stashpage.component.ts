import { Component, OnInit, AfterContentChecked, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as Draggable from 'draggable';
import { Source } from '../classes/source';
import { SourceService } from '../source.service';
import * as _ from 'underscore';



@Component({
  selector: 'app-stashpage',
  templateUrl: './stashpage.component.html',
  styleUrls: ['./stashpage.component.scss']
})
export class StashpageComponent implements OnInit, AfterContentChecked, AfterViewInit {
  sources: Source[];

  renderedElements: any;

  isModalShown: boolean = false;

  @ViewChild("canvas") canvas: ElementRef;

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

        //     // Get the modal
        // let modal = document.getElementById('myModal');

        // // Get the button that opens the modal
        // let btn = document.getElementById("myBtn");
        // console.log(btn);

        // // Get the div element (x) that closes the modal
        // let x = document.getElementById("close");

        // // When the user clicks the button, open the modal 
        // btn.onclick = function () {
        //   modal.style.display = "block";
        // }

        // // When the user clicks on (x), close the modal
        // x.onclick = function () {
        //   modal.style.display = "none";
        // }

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
          });
        }

        // DRAW LINES
        // MAKE SURE THE SOURCES ARE RENDERED AND POSITIONS UPDATED FIRST
        _.each(this.sources, (source: Source) => {
          let parent: Source = this.findSource(source.parent_id, this.sources);

          if (parent) {
            // find the actual elements
            let sourceElement: Element = this.findMatchingElement(source, elements);
            let parentElement: Element = this.findMatchingElement(parent, elements);

            // find the x and y values
            let parentX = parentElement.getBoundingClientRect().left;
            let parentY = parentElement.getBoundingClientRect().top;
            let sourceX = sourceElement.getBoundingClientRect().left;
            let sourceY = sourceElement.getBoundingClientRect().top;

            console.log('drawing line');
            console.log(parentX, parentY, sourceX, sourceY)
            this.drawCanvas(parentX, parentY, sourceX, sourceY);
          }
        });
      }
    }
  }

  ngAfterViewInit() {

  }

  toggleModal() {
    this.isModalShown = this.isModalShown ? false : true;

  }

  drawCanvas(rootSourceX: number, rootSourceY: number, sourceX: number, sourceY: number) {
    let context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    let parent: Element = this.canvas.nativeElement.parentElement;

    this.canvas.nativeElement.width = parent.getBoundingClientRect().width;
    this.canvas.nativeElement.height = parent.getBoundingClientRect().height;

    context.beginPath();
    context.moveTo(rootSourceX, rootSourceY);
    context.lineTo(sourceX, sourceY);
    context.stroke();
  }

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