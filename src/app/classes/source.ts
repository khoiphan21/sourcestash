/**
 * The class representing the model for a source.
 * 
 * Note: xPosition and yPosition are RELATIVE to the parent source
 */
export class Source {
    id: string;
    parent_id: string;
    stash_id: string;
    author_id: string;
    title: string;
    xPosition: number;
    yPosition: number;
    type: string;
    // Optional variables
    hyperlink?: string;
    description?: string;
    difficulty?: string;
    tags?: string[];

    constructor(
        id: string,
        parent_id: string,
        stash_id: string,
        author_id: string,
        title: string,
        xPosition: number,
        yPosition: number,
        type: string,
        hyperlink?: string,
        description?: string,
        difficulty?: string,
        tags?: string[]
    ) {
        this.id = id;
        this.parent_id = parent_id;
        this.author_id = author_id;
        this.title = title;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.type = type;
        if (hyperlink) { this.hyperlink = hyperlink };
        if (description) { this.description = description };
        if (difficulty) { this.difficulty = difficulty };
        if (tags) { this.tags = tags };
    }
}