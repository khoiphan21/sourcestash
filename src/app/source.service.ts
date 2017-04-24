import { Injectable } from '@angular/core';
import * as _ from 'underscore';

import { Source } from './classes/source';
import { SOURCES } from './data/mockSources';


@Injectable()
export class SourceService {
  private sources: Source[];

  constructor() { }

  getSourcesForStash(stashId: string): Promise<Source[]> {
    this.sources = SOURCES;

    return Promise.resolve(this.sources);
  }

  /**
   * Update the 'relative' position of the source. Need to retrieve the position
   * of the parent source first, to calculate the relative position
   * 
   * @param id - The id of the source
   * @param xAbsolute - The ON SCREEN (absolute) x position of the source
   * @param yAbsolute - The ON SCREEN (absolute) y position of the source
   * @param elements - the list of source elements
   */
  updateSourcePosition(id: string, xAbsolute: number, yAbsolute: number, elements: HTMLCollectionOf<Element>) {
    // Find the source model with the given id
    let source = this.findSource(id, this.sources);

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

      // And now make http call to the server

      console.log('New x and y: ' + relativeX + ', ' + relativeY);
    } else {
      // Is a root source... update differently.
    }



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
}
