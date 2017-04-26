import { Component, OnInit, OnChanges, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
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

  isModalShown: boolean = false;

  @ViewChild("canvas") canvas: ElementRef;

  constructor(
    private sourceService: SourceService
  ) { }

  ngOnInit() {
    // FOR TESTING PURPOSES
    this.sourceService.getSourcesForStash('2671055').then(
      (sources: Source[]) => {
        console.log(sources);
        this.sources = sources;
      }
    )

  }

  ngAfterContentChecked() {
    if (this.sources) {
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
                if (source.source_id == elementId) {
                  this.updateSourcePosition(elementId, xAbsolute, yAbsolute, elements);
                }
              })
            }
          }

          // Change the position of the root source first
          let rootSource = this.findRootSource(this.sources);

          let rootElement: Element = this.findMatchingElement(rootSource, elements);
          // Update the class of the root element
          rootElement.classList.add('root');

            // Now update all sources to draggables
            for(var i = 0; i < elements.length; i++) {
            let draggable = new Draggable(elements[i], options);
            // Check to see which source matches this element
            _.each(this.sources, source => {
              if (source.source_id == elements[i].id && source.type != 'root') {
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
                  let rect = parentElement.getBoundingClientRect();
                  parentX = rect.left;
                  parentY = rect.top;
                }

                // Update final positions
                let finalX = parentX + storedX;
                let finalY = parentY + storedY;

                // Update the position if not root
                if (source.type != 'root') {
                  draggable.set(finalX, finalY);
                }
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
  /**
   * Update the 'relative' position of the source. Need to retrieve the position
   * of the parent source first, to calculate the relative position
   * 
   * @param source_id - The id of the source
   * @param xAbsolute - The ON SCREEN (absolute) x position of the source
   * @param yAbsolute - The ON SCREEN (absolute) y position of the source
   * @param elements - the list of source elements
   */
  updateSourcePosition(source_id: string, xAbsolute: number, yAbsolute: number, elements: HTMLCollectionOf<Element>) {
    // Find the source model with the given id
    let source = this.findSource(source_id, this.sources);

    //DEBUGGING
    console.log('Original relative x and y: ' + source.xPosition + ', ' + source.yPosition);

    // Find the parent element of the source
    let parentElement: Element;
    if (source.parent_id != null) {
      // Must not be a root source, retrieve the parent element
      let parentSource: Source = this.findSource(source.parent_id, this.sources);
      parentElement = this.findMatchingElement(parentSource, elements);

      // Retrieve the top and left values of the parent
      let rect = parentElement.getBoundingClientRect()
      let parentX = rect.left;
      let parentY = rect.top;

      // Calculate relative position
      let relativeX = parentX - xAbsolute;
      let relativeY = parentY - yAbsolute;

      // Now update the source 
      source.xPosition = relativeX;
      source.yPosition = relativeY;

      // And now send the information to the service to update the source's position
      // NOTE: THIS MAY CAUSE SERVER TO BE UN-SYNCED
      this.sourceService.updateSourcePosition(source_id, relativeX, relativeY);

      console.log('New x and y: ' + relativeX + ', ' + relativeY);
    } 
  }
  /**
   * Find a Source model that matches the id of the given element
   * @param element - the element whose source model is to be found
   * @param sources - the list of sources to look for the source model
   */
  findMatchingSource(element: Element, sources: Source[]): Source {
    // Check to see which source matches this element
    _.each(sources, (source: Source) => {
      if (source.source_id == element.id) {
        return source;
      }
    })
    return null;
  };
  findMatchingElement(source: Source, elements: HTMLCollectionOf<Element>): Element {
    for (var i = 0; i < elements.length; i++) {
      if (source.source_id == elements[i].id) {
        return elements[i];
      }
    }
    return null;
  }
  findSource(id: string, sources: Source[]): Source {
    let returnSource: Source = null;

    _.each(sources, source => {
      if (source.source_id == id) {
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