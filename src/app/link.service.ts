import { Injectable } from '@angular/core';
import { Deferred } from './classes/deferred';
import { Link } from './classes/link';
import { AppResponse } from './classes/response';
import { RequestOptions, Http } from '@angular/http';
import { Helper } from './classes/helper';
import { SERVER } from './classes/SERVER';

@Injectable()
export class LinkService {

  constructor(
    private http: Http
  ) { }

  createLink(
    card_id: string,
    title: string, 
    stackingOrder: number, 
    hyperlink: string
  ): Promise<Link> {
    let deferred = new Deferred<Link>();

    let options: RequestOptions;
    Helper.setupHeaderOptions(options);

    if (Helper.checkForNull([card_id, title, stackingOrder, hyperlink])) {
      return Promise.reject('Error occurred: empty title received.');
    }

    this.http.post(
      SERVER + '/link/new',
      {
        card_id: card_id,
        title: title,
        stacking_order: stackingOrder,
        hyperlink: hyperlink
      },
      options
    ).subscribe(response => {
      let link: Link = response.json();
      deferred.resolve(link);
    }, error => {
      deferred.reject('Error creating a link');
    });

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

    let options: RequestOptions;
    Helper.setupHeaderOptions(options);

    if (Helper.checkForNull([link_id])) {
      return Promise.reject('Error occurred: empty values received.');
    }

    this.http.post(
      SERVER + '/link/delete',
      {
        link_id: link_id
      },
      options
    ).subscribe(response => {
      deferred.resolve(new AppResponse(true, 'Link successfully deleted'));
    }, error => {
      console.log(error);
      deferred.reject('Unable to delete a link');
    });

    return deferred.promise;

  }

}
