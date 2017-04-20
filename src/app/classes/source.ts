/**
 * The class representing the model for a source.
 * 
 * Note: xPosition and yPosition are RELATIVE to the parent source
 */
export class Source {
    id: string;
    parent_id: string;
    stash_id: string;
    title: string;
    xPosition: number;
    yPosition: number;
    type: string;
    // Optional variables
    hyperlink?: string;
    description?: string;
    difficulty?: string;
    tags?: string[];
}