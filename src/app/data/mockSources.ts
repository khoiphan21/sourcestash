import { Source } from '../classes/source';
export const SOURCES: Source[] = [
  {
    id: '123',
    parent_id: null,
    stash_id: 'abd',
    author_id: '123456',
    title: 'Root Source',
    xPosition: 0,
    yPosition: 0,
    type: 'root'
  },
  {
    id: '1234',
    parent_id: '123',
    stash_id: 'abcd',
    author_id: '123456',
    title: 'Source 1',
    xPosition: 100,
    yPosition: 150,
    type: 'source'
  },
  {
    id: '12345',
    parent_id: '123',
    stash_id: 'abcd',
    author_id: '123456',
    title: 'Source 2',
    xPosition: -100,
    yPosition: -100,
    type: 'source'
  }
]