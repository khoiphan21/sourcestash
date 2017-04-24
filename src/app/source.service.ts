import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'; // needed for the 'throw' operator to work
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import * as _ from 'underscore';

import { Source } from './classes/source';
import { SOURCES } from './data/mockSources';
import { AccountService } from './account.service';
import { AppResponse } from './classes/response';
import { SERVER } from './classes/SERVER';

class Deferred<Source> {
  promise: Promise<Source>;
  resolve: (value: Source | PromiseLike<Source>) => void;
  reject: (reason?: any) => void;

  constructor() {
    this.promise = new Promise<Account>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    })
  }
}


@Injectable()
export class SourceService {
  private sources: Source[];

  constructor(
    private accountService: AccountService,
    private http: Http
  ) { }

  /**
   * Retrieve all the sources for a certain stash
   * 
   * @param stashId - the stash for which all the sources will be retrieved
   */
  getSourcesForStash(stashId: string): Promise<Source[]> {
    // Make a call to the server to add the basic info of the source


    return Promise.resolve(SOURCES);
  }


  /**
   * Add a new source to the remote database. This method will return a source object
   * with an id generated
   * 
   * @param parent_id - The id of this source's parent
   * @param stash_id - the id of the stash this source belongs to
   * @param author_id - the id of the user who created this source
   * @param title - the title of the source
   * @param xPosition - the relative x position of the source 
   * @param yPosition - the relative y position of the source
   * @param type - the type of the source
   * @param hyperlink - the hyperlink of the source
   * @param description - the description of the source
   * @param difficulty - the difficulty of the source
   * @param tags - the array of tags that this source should be attributed to
   */
  addNewSource(
    parent_id: string,
    stash_id: string,
    author_id: string,
    title: string,
    xPosition: number,
    yPosition: number,
    type: string,
    hyperlink: string,
    description: string,
    difficulty: string,
    tags: string[]
  ): Promise<Source> {
    let deferred = new Deferred<Source>();

    this.http.post(
      SERVER + '/source/new',
      {
        source: {
          parent_id: parent_id,
          stash_id: stash_id,
          author_id: author_id,
          title: title,
          xPosition: xPosition,
          yPosition: yPosition,
          type: type,
          hyperlink: hyperlink,
          description: description,
          difficulty: difficulty,
          tags: tags
        }
      }
    ).subscribe(
      response => {
        console.log(response);
        console.log('before attempting to call json()');
        console.log(response.json());
        console.log('after attempting to call json()');

        return deferred.resolve(response.json());
      },
      error => {
        return deferred.reject(error);
      }
    );

    return deferred.promise;
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
