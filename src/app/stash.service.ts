import { Injectable } from '@angular/core';
import { Stash } from './classes/stash';
import { ANGULAR2 } from './data/mockStash';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class StashService {

  constructor(private http: Http) {
    
  }



  /**
   * Create a stash based on the given parameters
   * the id will be generated by hashing the title
   * 
   * @param stashDetails - the details of the stash (including id, title and description)
   */
  createStash(stashDetails: Stash): Promise<Response> {
    return Promise.resolve(null);
  }

  /**
   * 
   * @param title  the title of the stash
   */
  getStashInformation(title: string): Promise<Stash>  {
    return Promise.resolve(ANGULAR2[0]);
  }
}
