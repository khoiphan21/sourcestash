import { Source } from './source';
export class ChildSource extends Source {
    hyperlink: string;
    type: string;
    // Optional values
    description?: string;
    difficulty?: string;
}