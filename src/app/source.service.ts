import { Injectable } from '@angular/core';
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
 */
  updateSourcePosition(id: string, xAbsolute: number, yAbsolute: number) {
    
  }

}
