/**
 * The class representing the model for a source.
 * 
 * Note: xPosition and yPosition are RELATIVE to the parent source
 */
export class Source {
    source_id: string;
    parent_id: string;
    stash_id: string;
    author_id: string;
    title: string;
    xPosition: number;
    yPosition: number;
    type: string;
    hyperlink: string;
    description: string;
    difficulty: string;
    tags: string[];

    constructor(
        id: string,
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
    ) {
        this.source_id = id;
        this.parent_id = parent_id;
        this.stash_id = stash_id;
        this.author_id = author_id;
        this.title = title;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.type = type;
        this.hyperlink = hyperlink;
        this.description = description;
        this.difficulty = difficulty;
        this.tags = tags;
    }
}