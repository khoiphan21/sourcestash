export class Stash {
    stashID?: string;
    title: string;
    description: string;
    authorID?: string;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }
}