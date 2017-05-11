import { Component, OnInit, OnChanges, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
import * as Draggable from 'draggable';
import { Source } from '../classes/source';
import { SourceService } from '../source.service';
import * as _ from 'underscore';
import { element } from 'protractor';



@Component({
  selector: 'app-stashpage',
  templateUrl: './stashpage.component.html',
  styleUrls: ['./stashpage.component.scss']
})
export class StashpageComponent implements OnInit, AfterContentChecked {
  sources: Source[];

  currentSource: Source;

  renderedElements: any;

  // Variables to control modal items display
  isModalShown: boolean = false;
  isAddStashShown: boolean = false;
  isAddSourceShown: boolean = false;
  isViewSourceShown: boolean = false;

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
    // This part is to create a popup section for creating the source and stash
    // Get the modal
    // let stashForm = document.getElementById('stashForm'); 
    // let modal = document.getElementById('sourceForm');
    // // Get the button that opens the modal
    // let createStash = document.getElementById("createStash");
    // let btn = document.getElementById("createForm");
    // // Get the div element (x) that closes the modal
    // let x = document.getElementById("x");
    // let close = document.getElementById("close");
    // // When the user clicks the button, open the modal 
    // createStash.onclick = function () {
    //   stashForm.style.display = "block";
    // }
    // btn.onclick = function () {
    //   modal.style.display = "block";
    // }
    // // When the user clicks on (x), close the modal
    // x.onclick = function () {
    //   stashForm.style.display = "none";
    // }
    // close.onclick = function () {
    //   modal.style.display = "none";
    // }
    // window.onclick = function (event) {
    //   if (event.target == modal) {
    //     modal.style.display = "none";
    //   }
    // }
  }
  

  ngAfterContentChecked() {
    if (this.sources) {
      if (!this.renderedElements) {
        let elements = document.getElementsByClassName('source');

        if (elements.length != 0) {
          this.renderedElements = elements;
          let options = {
            grid: 10,
            onDrag: (element, xAbsolute, yAbsolute, event) => {
              console.log(`Updating element: ${element.id} - (${xAbsolute}, ${yAbsolute}`);
              let source = this.findMatchingSource(element, this.sources);
              let elements = document.getElementsByClassName('source');
              this.resetCanvas();
              this.updateLines(elements);
            },
            onDragEnd: (element, xAbsolute, yAbsolute, event) => {
              let elementId = element.id;

              let source: Source = this.findMatchingSource(element, this.sources);
              this.updateSourcePosition(source.source_id, xAbsolute, yAbsolute, elements);
            }
          };

          // Change the position of the root source first
          let rootSource = this.findRootSource(this.sources);

          let rootElement: Element = this.findMatchingElement(rootSource, elements);
          // Update the class of the root element
          rootElement.classList.add('root');

          // Now update all sources to draggables
          for (var i = 0; i < elements.length; i++) {
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
                  let draggable = new Draggable(elements[i], options);
                  draggable.set(finalX, finalY);
                }
              }
            });
          }

          // DRAW LINES
          // MAKE SURE THE SOURCES ARE RENDERED AND POSITIONS UPDATED FIRST
          this.resetCanvas();
          this.updateLines(elements);
        }
      }
    }
  }
  
  /**
   * ALL MODAL FUNCTIONS GO HERE
   */
  hideModal() {
    this.isModalShown = false;
    this.hideAllModals();
  }
  showModal(modalType: string) {
    this.isModalShown = true;
    this.hideAllModals();
    // Then selectively show the modals
    if (modalType == 'addStash') {
      this.isAddStashShown = true;
    } else if (modalType == 'addSource') {
      this.isAddSourceShown = true;
    } else if (modalType == 'viewSource') {
      this.isViewSourceShown = true;
    }
  }
  hideAllModals() {
    this.isAddStashShown = false;
    this.isAddSourceShown = false;
    this.isViewSourceShown = false;
  }


  resetCanvas() {
    this.canvas.nativeElement.height = document.body.clientHeight;
    this.canvas.nativeElement.width = document.body.clientWidth;
  }

  updateLines(elements: HTMLCollectionOf<Element>) {
    _.each(this.sources, (source: Source) => {
      let parent: Source = this.findSource(source.parent_id, this.sources);

      if (parent) {
        // find the actual elements
        let sourceElement: Element = this.findMatchingElement(source, elements);
        let parentElement: Element = this.findMatchingElement(parent, elements);

        // find the x and y values
        let parentBounds = parentElement.getBoundingClientRect();
        let sourceBounds = sourceElement.getBoundingClientRect();
        let parentX = parentBounds.left + parentBounds.width / 2;
        let parentY = parentBounds.top + parentBounds.height / 2;
        let sourceX = sourceBounds.left + sourceBounds.width / 2;
        let sourceY = sourceBounds.top + sourceBounds.height / 2;

        console.log('drawing line');
        console.log(parentX, parentY, sourceX, sourceY)
        this.drawCanvas(parentX, parentY, sourceX, sourceY);
      }
    });
  }

  drawCanvas(rootSourceX: number, rootSourceY: number, sourceX: number, sourceY: number) {
    let context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    let parent: Element = this.canvas.nativeElement.parentElement;

    // this.canvas.nativeElement.width = parent.getBoundingClientRect().width;
    // this.canvas.nativeElement.height = parent.getBoundingClientRect().height;



    context.beginPath();
    context.moveTo(rootSourceX, rootSourceY);
    context.lineWidth = 3;
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
      let relativeX = xAbsolute - parentX;
      let relativeY = yAbsolute - parentY;

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
    let returnSource: Source = null;
    // Check to see which source matches this element
    _.each(sources, (source: Source) => {
      if (source.source_id == element.id) {
        returnSource = source;
      }
    })
    return returnSource;
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
  showPopupContent(source_id: string, title: string) {
    console.log(source_id);
    console.log(title);
    // Get the modal
    let modal = document.getElementById(title);
    // let source = document.getElementById({{sourceID}});
    // Get the button that opens the modal
    let btn = document.getElementById(source_id);
    // Get the div element (x) that closes the modal
    let x = document.getElementById("close");
    // When the user clicks the button, open the modal 
    btn.onclick = function () {
      modal.style.display = "block";
    }
    // When the user clicks on (x), close the modal
    x.onclick = function () {
      modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  selectCurrentSource(source_id: string) {
    _.each(this.sources, (source: Source) => {
      if (source.source_id == source_id) {
        this.currentSource = source;
        console.log(this.currentSource);
      }
    });
    this.showModal("viewSource");
    // this.showPopupContent(this.currentSource.source_id, this.currentSource.title);
  }
}