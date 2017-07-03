import { Injectable } from '@angular/core';
import { Deferred } from './classes/deferred';
import { Link } from './classes/link';
import { AppResponse } from './classes/response';

@Injectable()
export class LinkService {

  constructor() { }

  createLink(
    title: string, 
    stackingOrder: number, 
    xPosition: number, 
    yPosition: number
  ): Promise<Link> {
    let deferred = new Deferred<Link>();

    return deferred.promise;
  }

  updateLink(link: Link): Promise<Link> {
    let deferred = new Deferred<Link>();

    return deferred.promise;
  }

  getLinkForCard(card_id: string): Promise<Link[]> {
    let deferred = new Deferred<Link[]>();

    return deferred.promise;
  }

  deleteLink(link_id: string): Promise<AppResponse> {
    let deferred = new Deferred<AppResponse>();

    return deferred.promise;

  }

}
