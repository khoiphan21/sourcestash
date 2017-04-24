export class Stash {
    stash_id?: string;
    title: string;
    description: string;
    author_id?: string;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }
}