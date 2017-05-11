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

class Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
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
  getSourcesForStash(stash_id: string): Promise<Source[]> {
    console.log(stash_id)
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    // The deferred promise
    let deferred = new Deferred<Source[]>();

    // Make a call to the server to get the array of sources
    this.http.post(
      SERVER + '/source/all/' + stash_id,
      {
        stash_id: stash_id
      },
      options
    ).subscribe(response => {
      let sources = response.json();
      this.sources = sources;
      console.log(sources);
      deferred.resolve(sources);
    }, error => {
      deferred.reject(error);
    })


    return deferred.promise;
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
    parent_id: string, stash_id: string, author_id: string, title: string, xPosition: number,
    yPosition: number, type: string, hyperlink: string, description: string,
    difficulty: string, tags: string[]
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
    ).subscribe(response => {
      if (response.status != 201) {
        deferred.reject('Failed to create a new source');
      } else {
        console.log(response);
        deferred.resolve(response.json());
      }
    }, error => {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  /**
   * Update the given source's position in the database
   * 
   * @param source_id - the id of the source 
   * @param xPosition - the relative xPosition of the source
   * @param yPosition - the relative yPosition of the source
   */
  updateSourcePosition(source_id: string, xPosition: number, yPosition: number): Promise<AppResponse> {
    let deferred = new Deferred<AppResponse>();

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    // Make api request
    this.http.post(
      SERVER + '/source/update/position',
      {
        coords: {
          source_id: source_id,
          xPosition: xPosition,
          yPosition: yPosition
        }
      },
      options
    ).subscribe(response => {
      if (response.status == 200) {
        deferred.resolve(new AppResponse(true, 'Source position updated successfully'));
      } else {
        deferred.reject(new AppResponse(false, 'Source failed to update. Server message: ' + response.text()));
      }
    }, error => {
      deferred.reject(error);
    })
    
    return deferred.promise;
  }

  deleteSource(source_id: string): Promise<AppResponse> {
    let deferred = new Deferred<AppResponse>();

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    
    // MAKE API REQUEST
    this.http.post(
      SERVER + '/source/delete/' + source_id,
      {
        source_id: source_id
      },
      options
    ).subscribe(response => {
      if (response.status == 200) {
        deferred.resolve(new AppResponse(true, 'Deleted Successfully'));
      } else {
        deferred.reject(response.text());
      }
    }, error => {
      deferred.reject(error);
    })

    return deferred.promise;
  }

  // HELPER FUNCTIONS
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
}
