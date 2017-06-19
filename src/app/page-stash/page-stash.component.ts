import {
  Component, OnInit, Input, OnChanges,
  AfterContentChecked, ViewChild, ElementRef, HostListener, ChangeDetectorRef
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import * as Draggable from 'draggable';
import { Source } from '../classes/source';
import { SourceService } from '../source.service';
import * as _ from 'underscore';
import { element } from 'protractor';
import { Stash } from '../classes/stash';
import { StashService } from '../stash.service';
import { CollaboratorService } from '../collaborator.service';
import { AccountService } from '../account.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-page-stash',
  templateUrl: './page-stash.component.html',
  styleUrls: ['./page-stash.component.scss'],
})
export class PageStashComponent implements OnInit {
  /**
   * CONSTANTS
   */
  private LEFT_MOUSE_BUTTON = 0;
  private MIDDLE_MOUSE_BUTTON = 1;
  private RIGHT_MOUSE_BUTTON = 2;

  // Main model of the stash
  sources: Source[];
  stash_id: string;

  // Details of the stash
  stash: Stash;
  collaborators: Account[];
  owner: Account;

  currentSource: Source;

  renderedElements: any;

  // Variables to control user mouse events: [X, Y]
  startingMousedownCoords: number[] = [];
  currentCoords: number[] = [];
  isMousedown: boolean = false;
  isLeftMouseDown: boolean = false;

  // Variables to control modal items display
  isModalShown: boolean = false;
  isAddSourceShown: boolean = false;
  isViewSourceShown: boolean = false;
  isEditSourceShown: boolean = false;
  isEditStashShown: boolean = false;

  // Variables to control tab items display
  isStashTabShown: boolean = true;
  isSourceTabShown: boolean = false;
  isCollaboratorTabShown: boolean = false;
  isGraphTabShown: boolean = false;

  @ViewChild("canvas") canvas: ElementRef;

  constructor(
    private sourceService: SourceService,
    private stashService: StashService,
    private collaboratorService: CollaboratorService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.canvas.nativeElement.height = document.body.clientHeight;
    this.canvas.nativeElement.width = document.body.clientWidth;
    // FOR TESTING PURPOSES
    this.route.params.map(params => {
      this.stash_id = params['stashid'];

      // Refresh everything
      this.refresh();
    }).subscribe();
  }

  ngAfterContentChecked() {

    if (this.sources) {
      if (!this.renderedElements) {
        this.refreshCanvas();
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.moveSource('UP');
        break;
      case 'ArrowDown':
        this.moveSource('DOWN');
        break;
      case 'ArrowLeft':
        this.moveSource('LEFT');
        break;
      case 'ArrowRight':
        this.moveSource('RIGHT');
        break;
    }
  }

  @HostListener('window:mouseup', ['$event'])
  mouseUp(event: MouseEvent) {
    this.isMousedown = false;
    this.isLeftMouseDown = false;
    document.body.style.cursor = 'auto';

    // Reset the coordinates
    this.startingMousedownCoords = [0, 0];
  }

  prepareToPan(event: MouseEvent) {
    if (event.button === this.LEFT_MOUSE_BUTTON) {
      this.startingMousedownCoords = [event.x, event.y];
      this.isLeftMouseDown = true;
      event.stopPropagation();
      event.preventDefault();
    }
    this.isMousedown = true;
  }

  startPanning(event: MouseEvent) {
    // How many px the mouse should move per px panned
    let scaleRate: number = 80;
    // Static area (in px) where no movement will occur
    let staticArea: number = 20; // Means 40x40

    if (this.isLeftMouseDown && this.isMousedown) {
      let deltaX = event.x - this.startingMousedownCoords[0];
      let deltaY = event.y - this.startingMousedownCoords[1];
      // Start panning based on direction of mouse
      if (deltaX > staticArea || deltaY > staticArea || deltaX < -staticArea || deltaY < -staticArea) {

        // Prevent jerky movement
        this.moveSource('DYNAMIC', deltaX / scaleRate, deltaY / scaleRate);
      }
      event.preventDefault();
      event.stopPropagation();
    }
  }

  moveSource(direction: string, xrate?: number, yrate?: number) {
    let elements = document.getElementsByClassName('source');
    let rect, xChange = 0, yChange = 0, newX, newY;

    let panningRateX = xrate ? xrate : 10; // px
    let panningRateY = yrate ? yrate : 10; // px

    // Determine what values to change
    switch (direction) {
      case 'UP':
        yChange = -panningRateY;
        break;
      case 'DOWN':
        yChange = +panningRateY;
        break;
      case 'LEFT':
        xChange = -panningRateX;
        break;
      case 'RIGHT':
        xChange = +panningRateX;
        break;
      case 'DYNAMIC':
        xChange = panningRateX;
        yChange = panningRateY;
        break;
    }

    _.each(elements, element => {
      rect = element.getBoundingClientRect();

      newY = +element.style.top.slice(0, -2) + yChange; // slice is to remove the 'px'
      newX = +element.style.left.slice(0, -2) + xChange;

      element.style.top = newY + 'px';
      element.style.left = newX + 'px';
    });

    // Redraw the lines
    this.updateLines();
  }

  refresh() {
    // Refresh the sources
    this.refreshSources();
    // Retrieve the information of the stash from the server
    this.refreshStash();
  }

  /**
   * Call the server to reload all the sources
   */
  refreshSources() {
    this.sourceService.getSourcesForStash(this.stash_id).then(sources => {
      // Retrieve the sources for the stash
      this.sources = sources;
      this.changeDetector.detectChanges();

      this.refreshCanvas();
    });
  }

  /**
   * Call the server to retrieve the newest information about the stash
   */
  refreshStash() {
    this.stashService.getStash(this.stash_id).then((stash: Stash) => {
      this.stash = stash;
      // Retrieve the details of the owner of the stash
      return this.accountService.getUserInformation(stash.author_id);
    }).then(owner => {
      this.owner = owner;
    }).catch(error => {
      console.log(error);
    });
    // Retrieve the list of collaborators for the stash
    this.refreshCollaborators();
  }

  /**
   * Call the server to retrieve the collaborators information
   */
  refreshCollaborators() {
    this.collaboratorService.getAllCollaborators(this.stash_id).then(accounts => {
      delete this.collaborators;
      this.collaborators = accounts;
    });
  }

  refreshCanvas() {
    let elements = document.getElementsByClassName('source');

    if (elements.length) {
      this.renderedElements = elements;

      let options = {};
      this.setupDraggableOptions(options, elements);

      // Change the position of the root source first
      let rootSource = this.findRootSource(this.sources);
      let rootElement = this.findMatchingElement(rootSource, elements);
      // Set the root element to be at the middle
      // offset by size of the root element
      let parentElement = document.getElementById('left-container');
      let height = parentElement.getBoundingClientRect().height / 2 -
        rootElement.getBoundingClientRect().height / 2;
      let width = parentElement.getBoundingClientRect().width / 2 -
        rootElement.getBoundingClientRect().width / 2;;
      rootElement.style.top = `${height}px`;
      rootElement.style.left = `${width}px`;

      // Update the class of the root element
      rootElement.classList.add('root');

      // Now update all sources to draggables and update their positions
      this.updateSourcesToDraggables(elements, options);

      // DRAW LINES
      // MAKE SURE THE SOURCES ARE RENDERED AND POSITIONS UPDATED FIRST
      this.updateLines();
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
    if (modalType == 'addSource') {
      this.isAddSourceShown = true;
    } else if (modalType == 'viewSource') {
      this.isViewSourceShown = true;
    } else if (modalType == 'editSource') {
      this.isEditSourceShown = true;
    } else if (modalType == 'editStash') {
      this.isEditStashShown = true;
    }
  }
  hideAllModals() {
    this.isAddSourceShown = false;
    this.isViewSourceShown = false;
    this.isEditSourceShown = false;
    this.isEditStashShown = false;
  }

  /**
  * ALL TABS FUNCTIONS GO HERE
  */
  selectTab(tabName: string) {
    if (tabName == 'stashTab') {
      if (this.isStashTabShown) this.hideAllTabs();
      else this.showTab(tabName);
    } else if (tabName == 'sourceTab') {
      if (this.isSourceTabShown) this.hideAllTabs();
      else this.showTab(tabName);
    } else if (tabName == 'collaborateTab') {
      if (this.isCollaboratorTabShown) this.hideAllTabs();
      else this.showTab(tabName);
    }
  }
  showTab(tabName: string) {
    this.hideAllTabs();
    if (tabName == 'stashTab') {
      this.isStashTabShown = true;
    } else if (tabName == 'sourceTab') {
      this.isSourceTabShown = true;
    } else if (tabName == 'collaborateTab') {
      this.isCollaboratorTabShown = true;
    }
  }
  hideAllTabs() {
    this.isStashTabShown = false;
    this.isSourceTabShown = false;
    this.isCollaboratorTabShown = false;
  }

  // toggleGraphTab() {
  //   this.isGraphTabShown = this.isGraphTabShown ? false : true;
  //   if (this.isGraphTabShown == true) {
  //     this.isStashTabShown = true;
  //   } else {
  //     this.hideAllTabs();
  //   }
  // }


  onAddSource(source: Source) {
    // Re-set the value of the current source - this value also is the parent source
    // for the new source
    this.currentSource = source;
    // Close the modal window for view source and open add source
    this.showModal('addSource');
  }

  onEditSource(source: Source) {
    // Re-set the value of the current source - this value also is the parent source
    // for the new source
    this.currentSource = source;
    // Close the modal window for view source and open add source
    this.showModal('editSource');
  }

  onEditStash() {
    this.showModal('editStash');
  }

  resetCanvas() {
    let context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.clearRect(
      0, 0,
      document.body.clientWidth,
      document.body.clientHeight
    )
  }

  updateLines() {
    let elements = document.getElementsByClassName('source');

    this.resetCanvas();

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
    context.strokeStyle = "#ffffff";
    context.stroke();
  }

  /*******************
   * HELPER FUNCTIONS
   ********************/
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
  findMatchingElement(source: Source, elements: HTMLCollectionOf<Element>): any {
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
  setupDraggableOptions(optionObject: any, elements: HTMLCollectionOf<Element>) {
    optionObject.grid = 10;
    optionObject.onDrag = (element, xAbsolute, yAbsolute, event) => {
      this.updateLines();
    }
    optionObject.onDragEnd = (element, xAbsolute, yAbsolute, event) => {
      let elementId = element.id;

      this.updateLines();

      let source: Source = this.findMatchingSource(element, this.sources);
      this.updateSourcePosition(source.source_id, xAbsolute, yAbsolute, elements);
    }
  }
  updateSourcesToDraggables(elements: HTMLCollectionOf<Element>, options: any) {
    // Add a structure to make sure to render sources from root outward
    let sourceDictionary = {};
    let rootSourceID: string;
    _.each(this.sources, (source: Source) => {
      if (source.type === 'root') {
        rootSourceID = source.source_id;
      }
      sourceDictionary[source.source_id] = source.parent_id;
    });
    // then delete the root source
    delete sourceDictionary[rootSourceID];

    while (_.size(sourceDictionary) > 0) {
      // Find the next source whose element is to be updated
      let allIDs = _.allKeys(sourceDictionary);
      // The source whose element will be updated
      let currentSource: Source;
      // loop through the sources array
      _.each(sourceDictionary, (parent_id, source_id) => {
        // find in the array of all keys to see if the parent_id is in there
        let sourceKey = _.find(allIDs, ID => {
          return parent_id === ID;
        });
        // Check if sourceKey is undefined
        if (sourceKey === undefined) {
          // then this source_id should be the current source
          currentSource = _.find(this.sources, (source: Source) => {
            return source.source_id === source_id;
          });
        }
      })
      // Update that source's position
      // Find the relative position stored
      let storedX = currentSource.xPosition;
      let storedY = currentSource.yPosition;

      // Find the parent source and get its x, y positions
      let parentX: number;
      let parentY: number;
      if (currentSource.parent_id != null && currentSource.parent_id != '') {
        // Must not be a root source, retrieve the parent element
        let parentElement: Element;
        _.each(elements, element => {
          if (element.id === currentSource.parent_id) {
            parentElement = element;
          }
        })
        let rect = parentElement.getBoundingClientRect();
        parentX = rect.left;
        parentY = rect.top;
      }

      // Update final positions
      let finalX = parentX + storedX;
      let finalY = parentY + storedY;

      // Update the position if not root
      if (currentSource.type != 'root') {
        let matchingElement = this.findMatchingElement(currentSource, elements);
        let draggable = new Draggable(matchingElement, options);
        draggable.set(finalX, finalY);
      }

      // at this point the element has been updated - remove the source
      // from the dictionary
      delete sourceDictionary[currentSource.source_id];
    }
  }
  selectCurrentSource(source_id: string) {
    _.each(this.sources, (source: Source) => {
      if (source.source_id == source_id) {
        this.currentSource = source;
      }
    });
    this.showModal("viewSource");
  }
}
